/**
 * Slug rules, shared by the editor and the API so a post can never be rejected
 * by the database check constraint without the form having said so first.
 * Mirrors `posts_slug_format` in db/migrations/0002_content_constraints.sql.
 */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const isValidSlug = (value: string) => SLUG_PATTERN.test(value);

/** "Déployer un smart contract !" -> "deployer-un-smart-contract" */
export const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
