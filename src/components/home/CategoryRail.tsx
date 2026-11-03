"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitLines } from "@/components/ui/SplitLines";
import { WoodGrain } from "@/components/visual/WoodGrain";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import { railCovers } from "@/data/projects";
import { services } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Craft categories read as a horizontal run. On a large screen the section
 * pins and the track is driven by scroll — the one place a hand-rolled
 * implementation would be materially worse than GSAP's ScrollTrigger.
 * Narrow screens and reduced-motion visitors get a native snap-scroller.
 */
export function CategoryRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pinned = isDesktop && !reduced;

  useGSAP(
    () => {
      if (!pinned) return;
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [pinned] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-walnut text-ivory"
      aria-labelledby="rail-title"
    >
      <div className="container-wide pb-10 pt-[clamp(4.5rem,9vw,9rem)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-copper-2">Especialidades</Eyebrow>
            <SplitLines
              as="h2"
              id="rail-title"
              className="mt-6 font-display text-d2"
              lines={["Cuatro oficios,", "un mismo taller."]}
            />
          </div>
          <p className="label hidden text-ivory/45 lg:block">
            {pinned ? "Siga bajando" : "Deslice"} →
          </p>
        </div>
      </div>

      <div
        className={
          pinned
            ? "pb-[clamp(3rem,7vw,7rem)]"
            : "no-scrollbar overflow-x-auto overscroll-x-contain pb-[clamp(3rem,7vw,7rem)] [scroll-snap-type:x_mandatory]"
        }
      >
        <div
          ref={trackRef}
          className="flex w-max gap-5 px-[var(--gutter)] md:gap-8"
        >
          {services.map((service) => {
            const cover = railCovers[service.key];
            return (
              <article
                key={service.key}
                className="group/card relative w-[82vw] shrink-0 overflow-hidden sm:w-[62vw] lg:w-[42vw] xl:w-[36vw] [scroll-snap-align:center]"
              >
                <Link
                  href={service.href}
                  data-cursor="media"
                  data-cursor-label="Ver"
                  className="block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink-3">
                    {cover ? (
                      <Image
                        src={cover.src}
                        alt={`${service.title} — trabajo realizado por M&M en Marbella`}
                        fill
                        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 62vw, 40vw"
                        className="graded object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.06]"
                      />
                    ) : (
                      <>
                        <WoodGrain tone="dark" seed={61} pointerLight={false} sheen={false} />
                        <span className="label absolute bottom-5 left-5 z-10 max-w-[80%] text-ivory/55">
                          Archivo fotográfico en preparación
                        </span>
                      </>
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent"
                    />

                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                      <span className="label text-copper-2">{service.number}</span>
                      <h3 className="mt-3 font-display text-d4 leading-[1.05]">
                        {service.display[0]}
                        <br />
                        {service.display[1]}
                      </h3>
                      <p className="mt-4 max-w-sm text-sm text-ivory/70">{service.summary}</p>
                      <span className="label mt-6 inline-flex items-center gap-3 text-ivory">
                        Ver la especialidad
                        <span
                          aria-hidden
                          className="transition-transform duration-500 group-hover/card:translate-x-1.5"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}

          {/* closing card keeps the run from ending on a hard edge */}
          <div className="flex w-[70vw] shrink-0 items-center sm:w-[46vw] lg:w-[26vw]">
            <div className="px-2">
              <p className="font-display text-d4 leading-tight">
                ¿No encuentra
                <br />
                lo que busca?
              </p>
              <p className="mt-4 max-w-xs text-sm text-ivory/65">
                Trabajamos también cocinas, bibliotecas, escaleras, revestimientos y
                proyectos completos de remodelación.
              </p>
              <Link
                href="/contacto"
                className="label mt-7 inline-flex items-center gap-3 border-b border-ivory/30 pb-2 transition-colors hover:border-copper-2 hover:text-copper-2"
              >
                Cuéntenos su proyecto →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
