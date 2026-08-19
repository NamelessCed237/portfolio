import { migrate } from "../db/migrate";

/**
 * Applies pending migrations against DATABASE_URL.
 *
 *   npm run db:migrate
 */
const url = process.env.DATABASE_URL;

if (!url) {
  console.error("DATABASE_URL is not set — copy .env.example to .env first");
  process.exit(1);
}

migrate(url).catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
