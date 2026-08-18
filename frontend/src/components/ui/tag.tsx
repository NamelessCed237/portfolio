import type { ReactNode } from "react";

/** Inline pill for technologies and short facts. */
export const Tag = ({ children }: { children: ReactNode }) => (
  <span className="tag">{children}</span>
);
