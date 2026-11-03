"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { registerScroller } from "@/lib/scroll-lock";

/**
 * Lenis-driven inertial scrolling, kept in step with GSAP's ScrollTrigger.
 * Completely bypassed when the visitor has asked for reduced motion.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Native momentum on touch feels better than an emulated one.
        syncTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);
      registerScroller(lenis);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Pinned sections need to re-measure once fonts and images have settled.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const settle = window.setTimeout(refresh, 600);

      cleanup = () => {
        window.clearTimeout(settle);
        window.removeEventListener("load", refresh);
        gsap.ticker.remove(tick);
        registerScroller(null);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduced]);

  // Every navigation starts at the top of the new page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
