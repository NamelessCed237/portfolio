import type { VercelRequest, VercelResponse } from "@vercel/node";
import { loadContent, saveContent } from "./_lib/content";
import { hasValidSession, requireAdmin } from "./_lib/auth";
import type { SiteContent } from "../src/lib/content/types";

const message = (error: unknown) =>
  error instanceof Error ? error.message : "Erreur serveur inattendue";

/**
 * GET  /api/content  public content (drafts included once signed in)
 * PUT  /api/content  replace the content, admin only
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const isAdmin = await hasValidSession(req).catch(() => false);

  try {
    if (req.method === "GET") {
      const content = await loadContent(isAdmin);
      // Visitors may cache briefly; the dashboard must always see its own writes.
      res.setHeader("Cache-Control", isAdmin ? "no-store" : "public, max-age=0, s-maxage=60");
      return res.status(200).json(content);
    }

    if (req.method === "PUT") {
      if (!(await requireAdmin(req, res))) return;
      const body = req.body as SiteContent | undefined;
      if (!body?.profile || !Array.isArray(body.posts)) {
        return res.status(400).json({ error: "Contenu invalide" });
      }
      await saveContent(body);
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, PUT");
    return res.status(405).json({ error: "Méthode non autorisée" });
  } catch (error) {
    console.error("[api/content]", error);
    // The admin is the only person who can act on a constraint violation or a
    // missing table, so they get the real message; visitors get none.
    return res.status(500).json({
      error: "Erreur serveur",
      ...(isAdmin ? { details: message(error) } : {}),
    });
  }
}
