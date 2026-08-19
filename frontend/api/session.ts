import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clearSession, hasValidSession, issueSession, passwordMatches } from "./_lib/auth";

/**
 * GET    /api/session  is the current visitor signed in
 * POST   /api/session  sign in with the admin password
 * DELETE /api/session  sign out
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      return res.status(200).json({ authenticated: await hasValidSession(req) });
    }

    if (req.method === "POST") {
      const password = (req.body as { password?: string } | undefined)?.password;
      if (typeof password !== "string" || !passwordMatches(password)) {
        // Same answer whether the field is missing or simply wrong.
        return res.status(401).json({ error: "Invalid password" });
      }
      await issueSession(res);
      return res.status(200).json({ authenticated: true });
    }

    if (req.method === "DELETE") {
      clearSession(res);
      return res.status(200).json({ authenticated: false });
    }

    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("[api/session]", error);
    return res.status(500).json({ error: "Server error" });
  }
}
