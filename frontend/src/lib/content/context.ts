import { createContext } from "react";
import type { SiteContent } from "./types";

export interface ContentContextValue {
  content: SiteContent;
  /** "offline" means the API could not be reached and defaults are showing. */
  status: "loading" | "ready" | "offline";
  /** Persist a change. Receives the current content, returns the next one. */
  update: (mutate: (current: SiteContent) => SiteContent) => Promise<void>;
  /** Re-read from the API, e.g. after signing in to pick up drafts. */
  reload: () => Promise<void>;
}

export const ContentContext = createContext<ContentContextValue | null>(null);
