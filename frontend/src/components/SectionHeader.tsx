import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

/** Reusable section heading (DRY): eyebrow + title + optional subtitle. */
export const SectionHeader = ({ eyebrow, title, subtitle, center = true }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${center ? "text-center" : ""}`}
  >
    <span className="eyebrow mb-4">{eyebrow}</span>
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    {subtitle && (
      <p className={`mt-3 text-muted-foreground ${center ? "mx-auto" : ""} max-w-2xl`}>{subtitle}</p>
    )}
  </motion.div>
);
