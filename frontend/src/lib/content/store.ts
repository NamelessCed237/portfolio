import { DEFAULT_CONTENT } from "./defaults";
import type { SiteContent } from "./types";

const STORAGE_KEY = "portfolio.content.v1";

/**
 * Where the editable content lives.
 *
 * Today: this browser's localStorage, with a JSON export so edits can be
 * committed to the repo. Swapping in a real backend means replacing the three
 * functions below with fetch calls — nothing else in the app talks to storage.
 */
export const readContent = (): SiteContent => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    // Merge on top of the defaults so content added in a later version of the
    // app is present even for a visitor with an older saved copy.
    return { ...DEFAULT_CONTENT, ...(JSON.parse(raw) as Partial<SiteContent>) };
  } catch {
    return DEFAULT_CONTENT;
  }
};

export const writeContent = (content: SiteContent) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
};

export const clearContent = () => {
  localStorage.removeItem(STORAGE_KEY);
};

/** Stable-ish id for new records, without pulling in a uuid dependency. */
export const createId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
