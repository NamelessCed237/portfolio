import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  /** Monospace label above the title, rendered as a code comment. */
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Accent dot after the title. */
  dot?: boolean;
  className?: string;
  /** Extra line below the title, for sections with their own subtitle style. */
  children?: ReactNode;
}

/** Centered heading shared by every section. */
export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  dot = false,
  className = "mb-16",
  children,
}: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`${className} text-center`}
  >
    <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">// {eyebrow}</p>
    <h2 className={`text-4xl font-bold${subtitle ? " mb-4" : ""}`}>
      {title}
      {dot && <span className="text-primary">.</span>}
    </h2>
    {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
    {children}
  </motion.div>
);
