import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

let client: NeonQueryFunction<false, false> | null = null;

/**
 * Neon HTTP client, created on first use and reused for the rest of the
 * invocation. Building it lazily keeps endpoints that never touch the database
 * — signing in, for one — working when DATABASE_URL is absent.
 */
export const getSql = (): NeonQueryFunction<false, false> => {
  client ??= neon(requireEnv("DATABASE_URL"));
  return client;
};

/**
 * Replaces the client, so the data layer can be exercised against something
 * other than Neon (a recorder, a local Postgres adapter) without every caller
 * having to thread a connection through.
 */
export const setSqlClient = (override: NeonQueryFunction<false, false> | null) => {
  client = override;
};
