import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ContentContext } from "./context";
import { readContent, writeContent, clearContent } from "./store";
import { DEFAULT_CONTENT } from "./defaults";
import type { SiteContent } from "./types";

/** Holds the editable content and persists every change through the store. */
export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(readContent);

  const update = useCallback((mutate: (current: SiteContent) => SiteContent) => {
    setContent((current) => {
      const next = mutate(current);
      writeContent(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    clearContent();
    setContent(DEFAULT_CONTENT);
  }, []);

  const value = useMemo(() => ({ content, update, reset }), [content, update, reset]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
