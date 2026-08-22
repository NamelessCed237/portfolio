-- The unique index on `position` was a mistake.
--
-- Saving rewrites positions as 0..n-1 with one statement per row, and Postgres
-- checks a unique index per statement rather than at commit. Reordering two
-- entries therefore collided halfway through the transaction — the whole write
-- was rejected and nothing was saved. Ordering does not need uniqueness: the
-- read sorts by (position, id), which is already deterministic.

drop index if exists services_position_idx;
drop index if exists projects_position_idx;
drop index if exists skills_position_idx;
drop index if exists experience_position_idx;
drop index if exists education_position_idx;

create index if not exists services_position_order_idx   on services (position);
create index if not exists projects_position_order_idx   on projects (position);
create index if not exists skills_position_order_idx     on skills (position);
create index if not exists experience_position_order_idx on experience (position);
create index if not exists education_position_order_idx  on education (position);
