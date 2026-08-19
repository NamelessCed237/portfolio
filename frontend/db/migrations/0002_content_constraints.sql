-- Guard rails the first migration left out.
-- Everything here is idempotent so a partially migrated database catches up.

-- A post is reachable by its slug, so it has to look like a URL segment.
alter table posts
  drop constraint if exists posts_slug_format;
alter table posts
  add constraint posts_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');

-- The dashboard always writes both languages; an empty object would render as
-- a blank title with no way to tell it apart from a genuine empty string.
alter table posts
  drop constraint if exists posts_title_localized;
alter table posts
  add constraint posts_title_localized check (title ? 'fr' and title ? 'en');

alter table profile
  drop constraint if exists profile_socials_is_array;
alter table profile
  add constraint profile_socials_is_array check (jsonb_typeof(socials) = 'array');

-- Ordering is per collection, and two rows sharing a position makes the list
-- flip around between reads.
create unique index if not exists services_position_idx   on services (position);
create unique index if not exists projects_position_idx   on projects (position);
create unique index if not exists skills_position_idx     on skills (position);
create unique index if not exists experience_position_idx on experience (position);
create unique index if not exists education_position_idx  on education (position);

-- Blog listings filter on tags.
create index if not exists posts_tags_idx on posts using gin (tags);
