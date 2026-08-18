import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionProps {
  id?: string;
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Reading-width column instead of the full grid width. */
  narrow?: boolean;
  /** Tinted background, used to alternate between consecutive sections. */
  tinted?: boolean;
  children: ReactNode;
}

/**
 * Every section on the site is this: a padded band, a centered heading and
 * the section body. Keeping the shell here is what makes the vertical rhythm
 * and heading style identical everywhere.
 */
export const Section = ({
  id,
  eyebrow,
  title,
  subtitle,
  narrow = false,
  tinted = false,
  children,
}: SectionProps) => (
  <section
    id={id}
    className={`section border-t border-border ${tinted ? "bg-surface" : ""}`}
  >
    <div className={`page ${narrow ? "page-narrow" : ""}`}>
      <motion.div {...fadeUp} className="mb-12 text-center md:mb-16">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{title}</h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
        )}
      </motion.div>

      {children}
    </div>
  </section>
);
