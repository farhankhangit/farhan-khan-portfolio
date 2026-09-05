# Farhan Khan — Portfolio

Single-page portfolio built with React + Vite, deployed on Vercel. The contact
form posts to a Vercel serverless function that sends mail through Resend.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
```

`npm run dev` serves the front end only. `/api/contact` does not exist in the
Vite dev server, so submitting the form locally shows a network error — that is
expected. To exercise the function too, run `vercel dev` instead.

```bash
npm run build    # production build into dist/
npm run preview  # serve the built output
```

## Layout

```
index.html            Vite entry: fonts, favicon, pre-paint theme stamp
src/
  main.jsx            React root
  App.jsx             page composition
  content.js          all copy: projects, services, stats, roles
  styles.css          design tokens + component styles
  useTheme.js         dark/light toggle, persisted to localStorage
  components/         Nav, Hero, Marquee, Work, Services, Stats, About, Contact, Footer
public/               project screenshots (served from /)
api/contact.js        Vercel serverless function: validates and sends the form
```

### Theming and breakpoints

Both live in `src/styles.css`. `:root` holds every colour and layout value as a
custom property; `html[data-theme="dark"]` and the two media queries only swap
those values. Components never restyle themselves per breakpoint, so layout
changes are made in one place.

## Environment variables

Set these in Vercel under Settings → Environment Variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key used to send the message |
| `CONTACT_TO` | no | Inbox that receives enquiries (defaults to the owner's address) |
| `CONTACT_FROM` | no | Verified sender, e.g. `Farhan Khan <hi@example.com>` |

Without a verified domain, Resend only delivers from `onboarding@resend.dev` to
the Resend account owner's own address. Verify a domain and set `CONTACT_FROM`
to send from your own.
