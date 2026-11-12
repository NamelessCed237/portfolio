import { Suspense, lazy } from "react";

// three.js is heavy: load the whole scene as its own chunk, after first paint.
const HeroScene = lazy(() => import("./HeroScene"));

/**
 * Decorative 3D object for the hero. Non-interactive for pointer events
 * (so it never blocks the text/links) but still reacts to cursor movement.
 */
export const Hero3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>
  );
};
