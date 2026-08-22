import { createHash, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireEnv } from "./db";

const COOKIE = "portfolio_session";
const MAX_AGE_SECONDS = 60 * 60 * 12;

const secret = () => {
  const value = requireEnv("SESSION_SECRET");
  // HS256 keys shorter than the digest are trivially brute-forced; refuse to
  // pretend a four-character secret protects anything.
  if (value.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters");
  }
  return new TextEncoder().encode(value);
};

const sha256 = (value: string) => createHash("sha256").update(value).digest();

/**
 * Single-author auth: one password, compared against its SHA-256 digest in
 * ADMIN_PASSWORD_HASH. Comparison is constant time so a wrong password cannot
 * be narrowed down by timing.
 */
/**
 * There is no shared store to lock an attacker out with, so a failed attempt
 * costs a fixed delay instead: enough to make scripted guessing impractical,
 * cheap enough that a mistyped password is barely noticed.
 */
export const penaliseFailure = () => new Promise((resolve) => setTimeout(resolve, 500));

export const passwordMatches = (candidate: string): boolean => {
  const expected = Buffer.from(requireEnv("ADMIN_PASSWORD_HASH"), "hex");
  const actual = sha256(candidate);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};

/** localhost over plain HTTP must not get a Secure cookie. */
const isSecureRequest = (req: VercelRequest) => {
  const proto = req.headers["x-forwarded-proto"];
  if (typeof proto === "string") return proto.split(",")[0].trim() === "https";
  return false;
};

export const issueSession = async (req: VercelRequest, res: VercelResponse) => {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secret());

  const secure = isSecureRequest(req) ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${MAX_AGE_SECONDS}${secure}`,
  );
};

export const clearSession = (req: VercelRequest, res: VercelResponse) => {
  const secure = isSecureRequest(req) ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${COOKIE}=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0${secure}`);
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
