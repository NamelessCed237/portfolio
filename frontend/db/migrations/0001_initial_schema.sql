-- Portfolio content schema (Neon / PostgreSQL).
-- Bilingual strings are stored as jsonb: {"fr": "...", "en": "..."}.
-- Every collection keeps an explicit `position` so the dashboard controls order.

create table if not exists profile (
  id                smallint primary key default 1 check (id = 1),
  name              text        not null default '',
  email             text        not null default '',
  location          text        not null default '',
  greeting          jsonb       not null default '{}'::jsonb,
  role              jsonb       not null default '{}'::jsonb,
  bio               jsonb       not null default '{}'::jsonb,
  availability      jsonb       not null default '{}'::jsonb,
  about_title       jsonb       not null default '{}'::jsonb,
  about_description jsonb       not null default '{}'::jsonb,
  about_highlight   jsonb       not null default '{}'::jsonb,
  socials           jsonb       not null default '[]'::jsonb,
  updated_at        timestamptz not null default now()
);

create table if not exists services (
  id          text primary key,
  position    integer not null default 0,
  icon        text    not null default 'monitor',
  title       jsonb   not null default '{}'::jsonb,
  description jsonb   not null default '{}'::jsonb
);

create table if not exists projects (
  id          text primary key,
  position    integer not null default 0,
  title       jsonb   not null default '{}'::jsonb,
  description jsonb   not null default '{}'::jsonb,
  image       text    not null default '',
  url         text    not null default '',
  tech        text[]  not null default '{}'
);

create table if not exists skills (
  id       text primary key,
  position integer not null default 0,
  icon     text    not null default 'code2',
  title    jsonb   not null default '{}'::jsonb,
  skills   text[]  not null default '{}',
  level    jsonb   not null default '{}'::jsonb,
  percent  integer not null default 80 check (percent between 0 and 100)
);

create table if not exists experience (
  id          text primary key,
  position    integer not null default 0,
  title       jsonb   not null default '{}'::jsonb,
  company     text    not null default '',
  location    text    not null default '',
  period      jsonb   not null default '{}'::jsonb,
  description jsonb   not null default '{}'::jsonb,
  tech        text[]  not null default '{}'
);

create table if not exists education (
  id          text primary key,
  position    integer not null default 0,
  title       jsonb   not null default '{}'::jsonb,
  school      text    not null default '',
  period      jsonb   not null default '{}'::jsonb,
  description jsonb   not null default '{}'::jsonb
);

create table if not exists posts (
  id         text primary key,
  slug       text        not null unique,
  title      jsonb       not null default '{}'::jsonb,
  excerpt    jsonb       not null default '{}'::jsonb,
  body       jsonb       not null default '{}'::jsonb,
  cover      text        not null default '',
  tags       text[]      not null default '{}',
  date       date        not null default current_date,
  published  boolean     not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- The public blog only ever reads published posts, most recent first.
create index if not exists posts_published_date_idx
  on posts (published, date desc);
