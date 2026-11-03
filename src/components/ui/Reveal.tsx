"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { frameReveal, inView, riseIn } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Stagger index — multiplies the built-in delay. */
  i?: number;
  as?: ElementType;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "variants" | "initial" | "whileInView">;

/**
 * Quiet rise-and-fade on scroll. `data-reveal` lets the reduced-motion
 * stylesheet force the final state without JavaScript.
 */
export function Reveal({ children, i = 0, as = "div", className, ...rest }: RevealProps) {
  const Comp = motion.create(as as "div");
  return (
    <Comp
      data-reveal=""
      variants={riseIn}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Image frame that opens upward from its bottom edge. */
export function FrameReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      data-reveal=""
      variants={frameReveal}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
