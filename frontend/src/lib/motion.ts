import type { MotionProps } from "framer-motion";

/** Shared scroll reveal: a short fade with a slight rise, played once. */
export const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.4 },
};

/** Same reveal, staggered by position in a list. */
export const fadeUpAt = (index: number): MotionProps => ({
  ...fadeUp,
  transition: { duration: 0.4, delay: index * 0.05 },
});
