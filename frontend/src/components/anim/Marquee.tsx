import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}

/** Seamless infinite marquee. Pauses on hover. */
export const Marquee = ({ children, reverse = false, duration = 26, className = "" }: MarqueeProps) => (
  <div
    className={`marquee-wrap group relative flex overflow-hidden ${className}`}
    style={{ ["--marquee-duration" as string]: `${duration}s` }}
  >
    {[0, 1].map((i) => (
      <div
        key={i}
        aria-hidden={i === 1}
        className={`flex shrink-0 items-center ${reverse ? "marquee-r" : "marquee-l"} group-hover:[animation-play-state:paused]`}
      >
        {children}
      </div>
    ))}
  </div>
);
