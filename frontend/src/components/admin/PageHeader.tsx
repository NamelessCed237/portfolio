import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Buttons pinned to the right of the title. */
  actions?: ReactNode;
  /** Shown between the title and the actions, e.g. an unsaved-changes badge. */
  status?: ReactNode;
}

/**
 * Header of every dashboard screen. Sticky so the primary action stays within
 * reach on long forms and long lists.
 */
export const PageHeader = ({ eyebrow, title, description, actions, status }: PageHeaderProps) => (
  <header className="sticky top-0 z-20 -mx-4 mb-6 border-b border-border/60 bg-background/85 px-4 py-4 backdrop-blur md:-mx-6 md:px-6">
    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
      <div className="min-w-0">
        {eyebrow && <p className="font-mono text-xs uppercase tracking-widest text-primary">{eyebrow}</p>}
        <h1 className="mt-1 truncate text-2xl font-semibold">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-3">
        {status}
        {actions}
      </div>
    </div>
  </header>
);
