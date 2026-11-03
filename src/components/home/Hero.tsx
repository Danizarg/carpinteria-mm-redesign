"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { WoodGrain } from "@/components/visual/WoodGrain";
import { SplitWords } from "@/components/ui/SplitLines";
import { ButtonLink } from "@/components/ui/Button";
import { contact, site } from "@/data/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Three depths: grain drifts slowest, type leads, veil deepens.
  const grainY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const veil = useTransform(scrollYProgress, [0, 1], [0.1, 0.65]);

  // The intro curtain runs for ~2s on a first visit; start just after it.
  const delay = 0.35;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pb-[clamp(2.5rem,6vw,5rem)] pt-32"
    >
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: grainY }}>
        <WoodGrain tone="dark" seed={11} />
      </motion.div>

      {/* legibility veil + vignette */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-ink"
        style={reduced ? { opacity: 0.18 } : { opacity: veil }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_15%,transparent_35%,rgba(10,8,7,0.85)_100%)]"
      />

      {/* top meta rail */}
      <motion.div
        className="container-wide absolute inset-x-0 top-28 hidden items-center justify-between md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: delay + 0.5 }}
      >
        <span className="label text-ivory/55">
          {site.city} · Costa del Sol
        </span>
        <span className="label text-ivory/55">
          Diseño · Fabricación · Colocación
        </span>
      </motion.div>

      <motion.div
        className="container-wide relative"
        style={reduced ? undefined : { y: typeY, opacity: typeOpacity }}
      >
        {/* The ch limit must sit on the element that owns the display font
            size — on a wrapper it would resolve against the inherited 16px. */}
        <h1 className="max-w-[12ch] font-display text-d1 text-ivory">
          <SplitWords text={site.tagline} delay={delay} italicFrom={3} />
        </h1>

        <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-10 border-t border-ivory/15 pt-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <motion.p
            className="max-w-xl text-lede text-ivory/70"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: ease.outExpo, delay: delay + 0.75 }}
          >
            Taller de carpintería y ebanistería en {site.city}. Más de{" "}
            {site.yearsOfExperience} años diseñando, fabricando y colocando puertas,
            vestidores, ventanas y mobiliario a medida.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 text-ivory"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: ease.outExpo, delay: delay + 0.9 }}
          >
            <ButtonLink href="/proyectos" variant="solid">
              Ver proyectos
            </ButtonLink>
            <ButtonLink href="/contacto" variant="outline">
              Pedir presupuesto
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        className="container-wide relative mt-10 hidden items-center gap-4 text-ivory/45 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: delay + 1.1 }}
      >
        <span className="label">Desliza</span>
        <span className="relative h-px w-24 overflow-hidden bg-ivory/20">
          <motion.span
            className="absolute inset-y-0 left-0 w-1/3 bg-copper-2"
            animate={reduced ? undefined : { x: ["-100%", "300%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <a href={contact.phones[1].href} className="label ml-auto hover:text-ivory">
          {contact.phones[1].label}
        </a>
      </motion.div>
    </section>
  );
}
