import { useState } from 'react';
import { CONTACT_EMAIL, LINKEDIN_URL } from '../content';

const NOTES = {
  idle: 'Goes straight to my inbox.',
  sending: 'Sending…',
  sent: 'Thanks, I’ll reply within a day.',
  error: 'Couldn’t send that. Please email me directly.',
};

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [errorNote, setErrorNote] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'sending') return;

    // Read the form synchronously: currentTarget is null once we await.
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    setErrorNote('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || '');

      form.reset();
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorNote(err && err.message ? err.message : '');
    }
  }

  const note = status === 'error' ? errorNote || NOTES.error : NOTES[status];
  const submitLabel =
    status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send message';

  const noteClass =
    status === 'sent'
      ? 'form__note form__note--sent'
      : status === 'error'
        ? 'form__note form__note--error'
        : 'form__note';

  return (
    <section id="contact">
      <div className="contact__inner">
        <div className="contact__copy">
          <h2 className="contact__title">Got a build or a migration in mind?</h2>
          <p className="contact__lead">
            Tell me what you&apos;re working on. I usually reply within a day.
          </p>
          <div className="contact__links">
            <a className="link-rule" href={`mailto:${CONTACT_EMAIL}`}>
              Email Me
            </a>
            <a className="link-rule" href={LINKEDIN_URL} target="_blank" rel="noopener">
              LinkedIn ↗
            </a>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {/* Hidden from people, so anything in it came from a bot. */}
          <div className="form__honeypot" aria-hidden="true">
            <label>
              Leave this field empty:
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <input name="name" type="text" required placeholder="Name" />
          <input name="email" type="email" required placeholder="Email" />
          <textarea name="message" rows={5} required placeholder="Project, platform, timeline" />

          <button type="submit" className="form__submit">
            {submitLabel}
          </button>

          <span className={noteClass} aria-live="polite">
            {note}
          </span>
        </form>
      </div>
    </section>
  );
}
