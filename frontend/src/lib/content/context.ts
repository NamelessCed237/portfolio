import { createContext } from "react";
import type { SiteContent } from "./types";

export interface ContentContextValue {
  content: SiteContent;
  /** Persist a change. Receives the current content, returns the next one. */
  update: (mutate: (current: SiteContent) => SiteContent) => void;
  /** Drop local edits and go back to the content shipped with the repo. */
  reset: () => void;
}

export const ContentContext = createContext<ContentContextValue | null>(null);
