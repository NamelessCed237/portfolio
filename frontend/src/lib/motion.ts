import type { MotionProps } from "framer-motion";

/**
 * Shared scroll reveal: a short fade with a slight rise, played once.
 * `MotionConfig reducedMotion="user"` in App.tsx neutralises it for visitors
 * who ask for reduced motion, so sections never need to check themselves.
 */
export const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

/** Same reveal, staggered by position in a list. */
export const fadeUpAt = (index: number): MotionProps => ({
  ...fadeUp,
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 },
});
