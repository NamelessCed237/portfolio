import { neon } from "@neondatabase/serverless";

/**
 * Neon HTTP client. One connection per invocation, no pool to manage — which
 * is what makes Neon a good fit for serverless functions.
 */
export const sql = neon(requireEnv("DATABASE_URL"));

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}
