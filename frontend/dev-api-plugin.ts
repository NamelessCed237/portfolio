import { readdirSync } from "node:fs";
import { join, extname } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin, ViteDevServer } from "vite";

/**
 * Runs the functions in api/ inside the Vite dev server.
 *
 * In production Vercel turns every file under api/ into an endpoint. Without
 * this plugin `npm run dev` serves the front end only, so /api/* answers 404
 * (or the SPA shell) and the dashboard cannot sign in. The handlers are loaded
 * through Vite so they pick up edits without a restart.
 */
const API_DIR = "api";

type VercelLikeRequest = IncomingMessage & {
  query: Record<string, string>;
  cookies: Record<string, string>;
  body?: unknown;
};

type VercelLikeResponse = ServerResponse & {
  status: (code: number) => VercelLikeResponse;
  json: (payload: unknown) => VercelLikeResponse;
  send: (payload: string) => VercelLikeResponse;
};

const parseCookies = (header?: string): Record<string, string> =>
  Object.fromEntries(
    (header ?? "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      }),
  );

const readBody = (req: IncomingMessage): Promise<unknown> =>
  new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve(undefined);
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(raw);
      }
    });
  });

/** Maps /api/session to api/session.ts, ignoring api/_lib. */
const resolveHandlerFile = (root: string, pathname: string): string | null => {
  const name = pathname.replace(/^\/api\//, "").replace(/\/$/, "");
  if (!name || name.startsWith("_")) return null;

  const dir = join(root, API_DIR);
  const candidates = readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && [".ts", ".js"].includes(extname(entry.name)))
    .map((entry) => entry.name);

  const match = candidates.find((file) => file.replace(/\.(ts|js)$/, "") === name);
  return match ? join(dir, match) : null;
};

export const devApiPlugin = (): Plugin => ({
  name: "portfolio:dev-api",
  apply: "serve",
  configureServer(server: ViteDevServer) {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url ?? "";
      if (!url.startsWith("/api/")) return next();

      const [pathname, search] = url.split("?");
      const file = resolveHandlerFile(server.config.root, pathname);

      if (!file) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ error: `No API handler for ${pathname}` }));
      }

      const request = req as VercelLikeRequest;
      request.query = Object.fromEntries(new URLSearchParams(search ?? ""));
      request.cookies = parseCookies(req.headers.cookie);
      request.body = await readBody(req);

      // Minimal shim of the Vercel response helpers the handlers use.
      const response = res as VercelLikeResponse;
      response.status = (code) => {
        response.statusCode = code;
        return response;
      };
      response.json = (payload) => {
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(payload));
        return response;
      };
      response.send = (payload) => {
        response.end(payload);
        return response;
      };

      try {
        const module = (await server.ssrLoadModule(file)) as {
          default?: (req: unknown, res: unknown) => unknown;
        };
        if (typeof module.default !== "function") {
          throw new Error(`${file} has no default export`);
        }
        await module.default(request, response);
      } catch (error) {
        server.config.logger.error(`[dev-api] ${pathname}: ${String(error)}`);
        if (!res.writableEnded) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : "Server error" }));
        }
      }
    });
  },
});
