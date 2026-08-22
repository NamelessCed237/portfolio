/**
 * Talks to the serverless functions in api/, which own the Neon database.
 * The browser never sees a connection string: it only calls these routes, and
 * writes are rejected without an admin session cookie.
 */
import { DEFAULT_CONTENT } from "./defaults";
import type { SiteContent } from "./types";

const ENDPOINT = "/api/content";
const SESSION_ENDPOINT = "/api/session";

/**
 * The dev server serves index.html for unknown paths, so a missing API answers
 * 200 with HTML. Anything that is not JSON is treated as "no API here".
 */
const readJson = async <T>(response: Response): Promise<T> => {
  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new Error("API unavailable");
  }
  return (await response.json()) as T;
};

export const readContent = async (): Promise<SiteContent> => {
  const response = await fetch(ENDPOINT, { credentials: "same-origin" });
  if (!response.ok) throw new Error(`Failed to load content (${response.status})`);
  const content = await readJson<Partial<SiteContent>>(response);
  // Merge over the defaults so a collection added in a later version of the app
  // is present even before the database knows about it.
  return { ...DEFAULT_CONTENT, ...content };
};

export const writeContent = async (content: SiteContent): Promise<void> => {
  const response = await fetch(ENDPOINT, {
    method: "PUT",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  });
  if (response.status === 401) throw new Error("unauthorized");
  if (!response.ok) throw new Error(`Failed to save content (${response.status})`);
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await fetch(SESSION_ENDPOINT, { credentials: "same-origin" });
    if (!response.ok) return false;
    return (await readJson<{ authenticated: boolean }>(response)).authenticated;
  } catch {
    return false;
  }
};

/**
 * "unavailable" and "invalid" are kept apart on purpose: a missing API and a
 * wrong password look identical from the outside, and reporting both as a bad
 * password sends you hunting for the wrong bug.
 */
export type SignInResult = { ok: true } | { ok: false; reason: "invalid" | "unavailable" };

export const signIn = async (password: string): Promise<SignInResult> => {
  let response: Response;
  try {
    response = await fetch(SESSION_ENDPOINT, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
  } catch {
    return { ok: false, reason: "unavailable" };
  }

  if (response.status === 401) return { ok: false, reason: "invalid" };
  if (!response.ok) return { ok: false, reason: "unavailable" };

  try {
    const { authenticated } = await readJson<{ authenticated: boolean }>(response);
    return authenticated ? { ok: true } : { ok: false, reason: "invalid" };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
};

export const signOut = async (): Promise<void> => {
  await fetch(SESSION_ENDPOINT, { method: "DELETE", credentials: "same-origin" }).catch(() => {});
};

/** Stable-ish id for new records, without pulling in a uuid dependency. */
export const createId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
