// POST /api/contact — Vercel Serverless Function (zero dependencies).
//
// The page submits here with fetch(); the message is delivered by the Resend
// HTTP API. Set these in Vercel > Project > Settings > Environment Variables:
//
//   RESEND_API_KEY  (required)  from https://resend.com/api-keys
//   CONTACT_TO      (optional)  inbox that receives the enquiry
//   CONTACT_FROM    (optional)  verified sender, e.g. "Portfolio <hi@yourdomain.com>"

const TO = process.env.CONTACT_TO || 'farhanabbas.niazi@gmail.com';
const FROM = process.env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>';

const LIMITS = { name: 120, email: 200, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ENTITIES[c]);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (err) { body = null; }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Could not read the form.' });
  }

  // Honeypot: the field is hidden, so only a bot ever fills it. Pretend it worked.
  if (String(body.company || '').trim()) {
    return res.status(200).json({ ok: true });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Please fill in every field.' });
  }
  if (!EMAIL.test(email)) {
    return res.status(400).json({ ok: false, error: 'That email address looks wrong.' });
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return res.status(400).json({ ok: false, error: 'That message is too long.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set — cannot send the contact form.');
    return res.status(500).json({ ok: false, error: 'Mail is not configured yet.' });
  }

  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Portfolio enquiry - ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: [
          `<p><strong>Name:</strong> ${esc(name)}<br>`,
          `<strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>`,
          `<p style="white-space:pre-wrap">${esc(message)}</p>`,
        ].join(''),
      }),
    });

    if (!sent.ok) {
      console.error('Resend rejected the message:', sent.status, await sent.text());
      return res.status(502).json({ ok: false, error: "Couldn't send the message. Please email me directly." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form failed:', err);
    return res.status(502).json({ ok: false, error: "Couldn't send the message. Please email me directly." });
  }
};
