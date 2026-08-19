import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { neon } from "@neondatabase/serverless";

/**
 * Minimal forward-only migration runner.
 *
 * Every .sql file in db/migrations is applied once, in filename order, and
 * recorded in schema_migrations. Re-running is a no-op, which is what makes it
 * safe to call from a deploy step.
 */
const MIGRATIONS_DIR = join(dirname(fileURLToPath(import.meta.url)), "migrations");

/** Splits a file into statements, ignoring semicolons inside quotes. */
export const splitStatements = (source: string): string[] => {
  const statements: string[] = [];
  let current = "";
  let quote: "'" | '"' | null = null;
  let lineComment = false;

  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    const next = source[i + 1];

    if (lineComment) {
      current += char;
      if (char === "\n") lineComment = false;
      continue;
    }
    if (!quote && char === "-" && next === "-") {
      lineComment = true;
      current += char;
      continue;
    }
    if (!quote && (char === "'" || char === '"')) {
      quote = char;
    } else if (quote && char === quote) {
      // A doubled quote is an escaped quote, not the end of the literal.
      if (next === quote) {
        current += char;
        i++;
      } else {
        quote = null;
      }
    }

    if (char === ";" && !quote) {
      statements.push(current);
      current = "";
      continue;
    }
    current += char;
  }

  statements.push(current);

  return statements
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0 && !/^(--[^\n]*\n?)*$/.test(statement));
};

export const migrate = async (databaseUrl: string) => {
  const sql = neon(databaseUrl);

  await sql`
    create table if not exists schema_migrations (
      name       text primary key,
      applied_at timestamptz not null default now()
    )
  `;

  const applied = new Set(
    (await sql`select name from schema_migrations`).map((row) => row.name as string),
  );

  const files = (await readdir(MIGRATIONS_DIR)).filter((file) => file.endsWith(".sql")).sort();

  const pending = files.filter((file) => !applied.has(file));
  if (pending.length === 0) {
    console.log(`schema up to date (${files.length} migrations applied)`);
    return { applied: [] as string[], total: files.length };
  }

  for (const file of pending) {
    const statements = splitStatements(await readFile(join(MIGRATIONS_DIR, file), "utf8"));

    // One transaction per file: a migration either lands whole or not at all.
    await sql.transaction([
      ...statements.map((statement) => sql.query(statement)),
      sql.query("insert into schema_migrations (name) values ($1)", [file]),
    ]);

    console.log(`applied ${file} (${statements.length} statements)`);
  }

  return { applied: pending, total: files.length };
};
