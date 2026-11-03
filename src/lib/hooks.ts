"use client";

import { useEffect, useState } from "react";

/** Subscribes to a media query, SSR-safe (false until mounted). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** True when the visitor has asked the system for reduced motion. */
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/** True on devices with a precise pointer — mouse or trackpad, not touch. */
export const useFinePointer = () => useMediaQuery("(pointer: fine) and (hover: hover)");

/** True once the component has hydrated on the client. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * Every animated surface asks this first: animate only when the visitor has
 * not requested reduced motion, and only after hydration.
 */
export function useCanAnimate() {
  const mounted = useMounted();
  const reduced = usePrefersReducedMotion();
  return mounted && !reduced;
}
