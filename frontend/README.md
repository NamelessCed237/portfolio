# Portfolio — Bike Cedric

React 19 + Vite + Tailwind 4 single-page portfolio, bilingual (FR/EN), with an
admin dashboard for the blog and the site content, backed by Neon (PostgreSQL)
through serverless functions.

## Scripts

```bash
npm run dev         # Vite dev server (front only, no /api — see below)
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

`npm run dev` serves the front end only, so `/api/*` returns the SPA shell. The
site detects this and falls back to the content bundled in
`lib/content/defaults.ts` — useful for pure UI work. To exercise the real
endpoints:

```bash
npx vercel dev
```

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

## Contact form

EmailJS, configured through `.env` (see `.env.example`). Without the three keys
the form stays disabled and says so.
