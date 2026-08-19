import { createHash, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireEnv } from "./db";

const COOKIE = "portfolio_session";
const MAX_AGE_SECONDS = 60 * 60 * 12;

const secret = () => new TextEncoder().encode(requireEnv("SESSION_SECRET"));

const sha256 = (value: string) => createHash("sha256").update(value).digest();

/**
 * Single-author auth: one password, compared against its SHA-256 digest in
 * ADMIN_PASSWORD_HASH. Comparison is constant time so a wrong password cannot
 * be narrowed down by timing.
 */
export const passwordMatches = (candidate: string): boolean => {
  const expected = Buffer.from(requireEnv("ADMIN_PASSWORD_HASH"), "hex");
  const actual = sha256(candidate);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};

export const issueSession = async (res: VercelResponse) => {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secret());

  res.setHeader(
    "Set-Cookie",
    `${COOKIE}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${MAX_AGE_SECONDS}; Secure`,
  );
};

export const clearSession = (res: VercelResponse) => {
  res.setHeader("Set-Cookie", `${COOKIE}=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0; Secure`);
};

export const hasValidSession = async (req: VercelRequest): Promise<boolean> => {
  const token = req.cookies?.[COOKIE];
  if (!token) return false;
  try {
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
};

/** Guard for every write endpoint. Returns false once it has answered 401. */
export const requireAdmin = async (req: VercelRequest, res: VercelResponse) => {
  if (await hasValidSession(req)) return true;
  res.status(401).json({ error: "Unauthorized" });
  return false;
};
