"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Handles the seam where the site changes tone. A panel of the *previous*
 * tone covers the incoming section and retracts as it scrolls into view, so
 * dark and light sections hand over to each other instead of butting together.
 */
export function ToneCurtain({
  children,
  from = "#14100e",
  className = "",
}: {
  children: ReactNode;
  /** The colour of the section being left behind. */
  from?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 35%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{ background: from, transformOrigin: "top", scaleY }}
        />
      )}
    </div>
  );
}
