import type { VercelRequest, VercelResponse } from "@vercel/node";
import { loadContent, saveContent } from "./_lib/content";
import { hasValidSession, requireAdmin } from "./_lib/auth";
import type { SiteContent } from "../src/lib/content/types";

/**
 * GET  /api/content  public content (drafts included once signed in)
 * PUT  /api/content  replace the content, admin only
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const isAdmin = await hasValidSession(req);
      const content = await loadContent(isAdmin);
      // Visitors may cache briefly; the dashboard must always see its own writes.
      res.setHeader("Cache-Control", isAdmin ? "no-store" : "public, max-age=0, s-maxage=60");
      return res.status(200).json(content);
    }

    if (req.method === "PUT") {
      if (!(await requireAdmin(req, res))) return;
      const body = req.body as SiteContent | undefined;
      if (!body?.profile || !Array.isArray(body.posts)) {
        return res.status(400).json({ error: "Invalid content payload" });
      }
      await saveContent(body);
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, PUT");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("[api/content]", error);
    return res.status(500).json({ error: "Server error" });
  }
}
