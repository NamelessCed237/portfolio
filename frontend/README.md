# Portfolio — Bike Cedric

React 19 + Vite + Tailwind 4 single-page portfolio, bilingual (FR/EN), with an
admin dashboard for the blog and the site content, backed by Neon (PostgreSQL)
through serverless functions.

## Scripts

```bash
npm run dev         # Vite dev server, including the api/ functions
npm run build       # type-check every project + production build
npm run lint        # eslint
npm run db:migrate  # apply pending SQL migrations
npm run db:seed     # migrate, then fill the tables with the shipped content
```

## Structure

```
api/                serverless functions (the only code that touches the DB)
  _lib/             db client, session auth, content read/write
  content.ts        GET public content, PUT to replace it (admin)
  session.ts        sign in / out / check
db/
  migrations/       numbered .sql files, applied in order
  migrate.ts        forward-only runner, tracks schema_migrations
scripts/            entry points for the npm db:* commands
src/
  components/       layout, sections and the shared UI kit
    sections/       one file per section of the public pages
    admin/          field renderer used by every dashboard form
    ui/             shadcn primitives actually in use
  pages/            routed pages, admin/ holds the dashboard
  lib/content/      content model, seed, API client, form schema
  i18n/             structural labels (titles, buttons, navigation)
```

## Environment

Copy `.env.example` to `.env` and fill it in. `DATABASE_URL`,
`ADMIN_PASSWORD_HASH` and `SESSION_SECRET` are **server-side only** — they are
read by the functions in `api/`. Never prefix them with `VITE_`: that would
inline them into the browser bundle and hand your database to every visitor.

```bash
# password hash
node -e "console.log(require('crypto').createHash('sha256').update('YOUR_PASSWORD').digest('hex'))"
# session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

On Vercel, set the same three variables in the project settings.

## Database

```bash
npm run db:migrate   # idempotent, safe on every deploy
npm run db:seed      # migrate + write the content from lib/content/defaults.ts
```

Migrations are plain SQL in `db/migrations`, applied in filename order and
recorded in `schema_migrations`, one transaction per file. To add one, drop a
`0003_what_it_does.sql` next to the others — never edit a file that has already
run, since applied migrations are skipped.

Tables mirror the content model: `profile` (single row), `services`,
`projects`, `skills`, `experience`, `education` and `posts`. Bilingual strings
are `jsonb` (`{"fr": …, "en": …}`), lists are `text[]`, and every collection
carries a `position` so the dashboard controls ordering.

## Running the API locally

`npm run dev` runs the functions too: `dev-api-plugin.ts` mounts everything in
`api/` on the Vite dev server, with the same request and response shape Vercel
provides, and reloads a handler when you edit it. The server-side variables are
read from `.env` by the Vite config — anything already exported in your shell
takes precedence.

If the database is unreachable, the site falls back to the content bundled in
`lib/content/defaults.ts` and the dashboard shows a warning before you save.
Signing in keeps working without `DATABASE_URL`, since that endpoint never
touches the database.

`npx vercel dev` remains an option if you want the real Vercel runtime.

## Content and the dashboard

Open `/admin` and sign in with the admin password. It edits everything that is
not a structural label: profile, services, projects, skills, experience,
education and blog posts. Every text is bilingual — each field has an FR and an
EN input, and the site shows the one matching the current language.

- **Reads** — `GET /api/content`. Drafts are only returned to a signed-in
  caller, so an unpublished post is invisible to visitors.
- **Writes** — `PUT /api/content` replaces the document in one transaction and
  is rejected without the session cookie. A single author edits one document at
  a time, which makes a full replace both simpler and safer than partial
  updates.
- **Adding a field** — add it to the type in `lib/content/types.ts`, to the
  collection in `lib/content/schema.ts`, to the table in a new migration, and
  to the mapping in `api/_lib/content.ts`. The dashboard list and form pages
  are generic and need no change.
- **Auth** — one password, stored as a SHA-256 digest, exchanged for a 12-hour
  HttpOnly JWT cookie. The gate in the UI only decides what to render; the
  check that matters is on every write endpoint.

## Known gaps

- **No automated tests.** The data layer and the dashboard have been exercised
  by hand against a real Postgres, but nothing guards them against a
  regression. `setSqlClient` in `api/_lib/db.ts` is the seam a test suite
  would use to run `loadContent` / `saveContent` against a throwaway database.
- **No CI.** `npm run build` and `npm run lint` should run on every push.
- **Sign-in has no distributed lockout.** A failed attempt costs a fixed 500 ms,
  which makes scripted guessing impractical, but serverless functions share no
  memory so there is nothing to lock. Use a long random password; a persistent
  attempt counter is the proper fix.
- **No Content-Security-Policy.** The other security headers are set in
  `vercel.json`; a CSP needs to be written against the deployed page and
  verified there.

## Contact form

EmailJS, configured through `.env` (see `.env.example`). Without the three keys
the form stays disabled and says so.
