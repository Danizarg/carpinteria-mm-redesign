"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { WoodGrain } from "@/components/visual/WoodGrain";
import { site } from "@/data/site";

const SESSION_KEY = "mm:intro";
const DURATION = 2000;

/**
 * First-visit curtain. Runs once per browsing session, and not at all when
 * reduced motion is requested — the page is simply there.
 */
export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<"checking" | "running" | "done">("checking");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) {
      setState("done");
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* private mode — show it, it is harmless */
    }
    if (seen) {
      setState("done");
      return;
    }

    setState("running");
    document.documentElement.style.overflow = "hidden";

    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION);
      // ease-out so the count decelerates into 100
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      // Recorded only once the intro has actually played, so React's
      // double-invoked effect in development cannot consume the flag.
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setState("done");
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.style.overflow = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (state === "done") document.documentElement.style.overflow = "";
  }, [state]);

  return (
    <AnimatePresence>
      {state === "running" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-ink px-[var(--gutter)] py-[var(--gutter)] text-ivory"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 1.1, ease: ease.inOutQuint }}
          aria-hidden
        >
          <WoodGrain tone="dark" seed={4} pointerLight={false} sheen={false} />

          <motion.span
            className="label relative opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {site.city} · Más de {site.yearsOfExperience} años
          </motion.span>

          <div className="relative">
            <span className="reveal-mask block">
              <motion.span
                className="block font-display text-d1 leading-[0.85]"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease: ease.outExpo, delay: 0.1 }}
              >
                {site.monogram}
              </motion.span>
            </span>
          </div>

          <div className="relative">
            <div className="mb-4 flex items-end justify-between gap-8">
              <span className="label opacity-55">Cargando el taller</span>
              <motion.span
                className="font-display text-d4 leading-none tabular-nums opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {String(progress).padStart(3, "0")}
              </motion.span>
            </div>
            <div className="h-px w-full bg-ivory/20">
              <motion.div
                className="h-full origin-left bg-copper-2"
                style={{ scaleX: progress / 100 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
