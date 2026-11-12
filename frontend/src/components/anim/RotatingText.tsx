import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RotatingTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * Cycles through words with a clean slide + fade.
 * All words stay mounted (no AnimatePresence pile-up); only the active
 * one is visible. An invisible sizer keeps the line from reflowing.
 */
export const RotatingText = ({ words, interval = 2400, className = "" }: RotatingTextProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span
      className={`relative inline-block overflow-hidden align-bottom ${className}`}
      style={{ height: "1.25em" }}
    >
      <span className="invisible whitespace-nowrap">{longest}</span>
      {words.map((word, i) => (
        <motion.span
          key={word}
          className="absolute left-0 top-0 whitespace-nowrap"
          initial={false}
          animate={i === index ? { y: "0%", opacity: 1 } : { y: "-70%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};
