import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ContentContext } from "./context";
import { readContent, writeContent } from "./store";
import { DEFAULT_CONTENT } from "./defaults";
import type { SiteContent } from "./types";

/**
 * Loads the content from the API once, keeps it in memory and pushes every
 * change back. The site renders the shipped defaults until the fetch resolves,
 * so a slow or unreachable database degrades to a static portfolio instead of
 * a blank page.
 */
export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [status, setStatus] = useState<"loading" | "ready" | "offline">("loading");

  useEffect(() => {
    let cancelled = false;

    readContent()
      .then((loaded) => {
        if (cancelled) return;
        setContent(loaded);
        setStatus("ready");
      })
      .catch((error) => {
        if (cancelled) return;
        console.warn("[content] falling back to the bundled defaults:", error);
        setStatus("offline");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const update = useCallback(
    async (mutate: (current: SiteContent) => SiteContent) => {
      const next = mutate(content);
      setContent(next);
      await writeContent(next);
    },
    [content],
  );

  const reload = useCallback(async () => {
    setContent(await readContent());
    setStatus("ready");
  }, []);

  const value = useMemo(
    () => ({ content, status, update, reload }),
    [content, status, update, reload],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
