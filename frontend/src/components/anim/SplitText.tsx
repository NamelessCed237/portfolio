import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** play on mount instead of on scroll-into-view (for above-the-fold text) */
  immediate?: boolean;
}

/**
 * Reveals text word-by-word rising from behind a mask (editorial reveal).
 * Uses the useInView hook (reliable) to trigger the animation on scroll.
 * DRY: the single reveal primitive reused across the site.
 */
export const SplitText = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
  once = true,
  immediate = false,
}: SplitTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -12% 0px" });
  const show = immediate || inView;
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden align-bottom" style={{ lineHeight: 1 }}>
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={show ? { y: 0 } : { y: "115%" }}
            transition={{ duration: 0.6, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};
