import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Code editor window with tabs (macOS-style chrome)                  */
/* ------------------------------------------------------------------ */
interface CodeEditorProps {
  tabs: string[];
  activeTab?: number;
  children: ReactNode;
  className?: string;
  hint?: string;
}

export const CodeEditor = ({ tabs, activeTab = 0, children, className = "", hint }: CodeEditorProps) => (
  <div className={`overflow-hidden rounded-xl border border-border/70 bg-card/60 shadow-2xl backdrop-blur ${className}`}>
    <div className="flex items-center gap-1 border-b border-border/60 bg-[hsl(200_30%_9%)]/80 px-3 py-2 dark:bg-[hsl(200_30%_9%)]/80">
      <div className="mr-2 flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
      </div>
      {tabs.map((tab, i) => (
        <span
          key={tab}
          className={`flex items-center gap-2 rounded-t-md px-3 py-1.5 font-mono text-xs ${
            i === activeTab ? "bg-card text-foreground" : "text-muted-foreground"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${i === activeTab ? "bg-primary" : "bg-muted-foreground/40"}`} />
          {tab}
        </span>
      ))}
      {hint && <span className="ml-auto font-mono text-[11px] text-muted-foreground">{hint}</span>}
    </div>
    <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">{children}</pre>
  </div>
);

/* Syntax token helpers — short names keep the code readable in usage. */
export const C = ({ children }: { children: ReactNode }) => <span className="text-muted-foreground/70">{children}</span>; // comment
export const K = ({ children }: { children: ReactNode }) => <span className="text-secondary">{children}</span>; // keyword
export const S = ({ children }: { children: ReactNode }) => <span className="text-primary">{children}</span>; // string
export const P = ({ children }: { children: ReactNode }) => <span className="text-foreground/90">{children}</span>; // property
export const N = ({ children }: { children: ReactNode }) => <span className="text-[#e0af68]">{children}</span>; // number
export const Fn = ({ children }: { children: ReactNode }) => <span className="text-[#7aa2f7]">{children}</span>; // function
export const Pn = ({ children }: { children: ReactNode }) => <span className="text-muted-foreground">{children}</span>; // punctuation
