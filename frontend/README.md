# Portfolio — Bike Cedric

React 19 + Vite + Tailwind 4 single-page portfolio, bilingual (FR/EN), with an
admin dashboard for the blog and the site content.

## Scripts

```bash
npm run dev      # dev server
npm run build    # type-check + production build
npm run lint     # eslint
npm run preview  # serve the build
```

## Structure

```
src/
  components/         layout, sections and the shared UI kit
    sections/         one file per section of the public pages
    admin/            field renderer used by every dashboard form
    ui/               shadcn primitives actually in use
  pages/              routed pages, admin/ holds the dashboard
  lib/content/        editable content: model, seed, store, schema
  i18n/               structural labels (titles, buttons, navigation)
```

## Content and the dashboard

Open `/admin`. It edits everything that is not a structural label: profile,
services, projects, skills, experience, education and blog posts. Every text is
bilingual — each field has an FR and an EN input, and the site shows the one
matching the current language.

- **Seed** — `lib/content/defaults.ts` builds the initial content from the
  translation files, so a fresh visitor sees exactly what the repo ships.
- **Storage** — `lib/content/store.ts` writes to this browser's localStorage.
  Edits are therefore local: export the JSON from the dashboard and commit it,
  or point the store at an API.
- **Adding a field** — add it to the type in `lib/content/types.ts` and to the
  collection in `lib/content/schema.ts`. The list and form pages are generic;
  no dashboard screen needs changing.
- **Adding a collection** — same two files, plus reading it in the section that
  displays it.

### Plugging in a backend

`store.ts` exposes `readContent`, `writeContent` and `clearContent`. Replacing
those three with fetch calls (and making the provider await them) is the whole
migration — no page or section talks to storage directly.

> The dashboard has no authentication because there is no server: it only edits
> the visitor's own copy. Whoever adds the backend has to add real auth with it.

## Contact form

EmailJS, configured through `.env` (see `.env.example`). Without the three keys
the form stays disabled and says so.
