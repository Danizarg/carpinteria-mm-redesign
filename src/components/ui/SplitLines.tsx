"use client";

import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { ease, inView, lineReveal } from "@/lib/motion";

type SplitLinesProps = {
  /** Explicit lines — the typographer decides where a display heading breaks. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Animate on mount instead of on scroll (for above-the-fold headings). */
  onMount?: boolean;
  /** Set when the heading labels a landmark via aria-labelledby. */
  id?: string;
};

/**
 * Oversized headings reveal line by line from behind a mask. Lines are
 * authored, not measured, so the break points never drift between breakpoints.
 */
export function SplitLines({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  onMount = false,
  id,
}: SplitLinesProps) {
  const Comp = motion.create(as as "h2");
  const animateProps = onMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: inView };

  return (
    <Comp id={id} data-reveal="" initial="hidden" {...animateProps} className={className}>
      {lines.map((line, index) => (
        <span key={index} className={`reveal-mask block ${lineClassName ?? ""}`}>
          <motion.span
            className="block will-change-transform"
            variants={lineReveal}
            custom={index}
            transition={{ delay: delay + index * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/**
 * Word-by-word reveal, used once — for the homepage title. Each word carries
 * its own mask so the stagger reads as type being set rather than a fade.
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  italicFrom,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  /** Index from which words are set in italic — for the typographic accent. */
  italicFrom?: number;
}) {
  const words = text.split(" ");

  return (
    <span data-reveal="" className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`reveal-mask inline-block align-bottom ${wordClassName ?? ""}`}
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.15,
              ease: ease.outExpo,
              delay: delay + index * 0.085,
            }}
            style={
              italicFrom !== undefined && index >= italicFrom
                ? { fontStyle: "italic" }
                : undefined
            }
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
