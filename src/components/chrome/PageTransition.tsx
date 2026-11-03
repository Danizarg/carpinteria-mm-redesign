"use client";

import { motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Module-level, so it survives the remount that app/template.tsx performs on
 * every navigation. The very first page view must not be curtained: before
 * hydration a `scaleY: 1` panel would be painted over the server HTML and the
 * visitor would stare at a blank walnut screen. The preloader owns that moment.
 */
let appHasMounted = false;

export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const isFirstView = useRef(!appHasMounted);

  useEffect(() => {
    appHasMounted = true;
  }, []);

  if (isFirstView.current || reduced) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[150] bg-walnut"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        style={{ transformOrigin: "top" }}
        transition={{ duration: 0.75, ease: ease.inOutQuint }}
      />
      {/* Opacity only: a lingering transform on this wrapper would become the
          containing block for position:fixed and break ScrollTrigger's pins. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: ease.outExpo, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
