import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
  /** Extra content below the title. */
  children?: ReactNode;
}

/** Centered heading shared by every section. */
export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  className = "mb-12",
  children,
}: SectionHeadingProps) => (
  <motion.div {...fadeUp} className={`${className} text-center`}>
    <p className="eyebrow mb-3">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    {subtitle && (
      <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>
    )}
    {children}
  </motion.div>
);
