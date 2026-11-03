import type { Transition, Variants } from "motion/react";

/** One easing vocabulary for the whole site. */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuint: [0.83, 0, 0.17, 1],
  outQuart: [0.25, 1, 0.5, 1],
} as const;

export const springSoft: Transition = { type: "spring", stiffness: 140, damping: 20, mass: 0.6 };
export const springSnappy: Transition = { type: "spring", stiffness: 420, damping: 34, mass: 0.5 };

/** Line-by-line mask reveal used by every display heading. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 1.05, ease: ease.outExpo, delay: 0.06 * i },
  }),
};

/** Quiet fade-and-rise for body copy and small elements. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: ease.outExpo, delay: 0.05 * i },
  }),
};

/** Image frames open from the bottom edge. */
export const frameReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.2, ease: ease.outExpo },
  },
};

export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Shared viewport trigger — fires a little before the element is centred. */
export const inView = { once: true, margin: "0px 0px -12% 0px" } as const;
