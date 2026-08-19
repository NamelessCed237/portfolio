import { migrate } from "../db/migrate";
import { DEFAULT_CONTENT } from "../src/lib/content/defaults";
import { saveContent } from "../api/_lib/content";

/**
 * Brings the schema up to date, then fills the tables with the content the
 * site ships with. Safe to re-run: migrations are tracked and the content
 * write upserts by id.
 *
 *   npm run db:seed
 */
const run = async () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set — copy .env.example to .env first");
  }

  await migrate(url);

  await saveContent(DEFAULT_CONTENT);

  const { profile, posts, ...collections } = DEFAULT_CONTENT;
  console.log(
    `content seeded: profile "${profile.name}", ${posts.length} posts, ` +
      Object.entries(collections)
        .map(([key, items]) => `${items.length} ${key}`)
        .join(", "),
  );
};

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
