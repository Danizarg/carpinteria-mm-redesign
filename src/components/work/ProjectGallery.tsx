"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ease } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { altFor, allPhotos, countByCategory, filters } from "@/data/projects";
import type { ServiceKey } from "@/data/site";
import { Lightbox } from "./Lightbox";

type FilterKey = ServiceKey | "todos";

/** Rendering all 73 frames at once costs a phone far more than it gains. */
const PAGE = 24;

export function ProjectGallery() {
  const [active, setActive] = useState<FilterKey>("todos");
  const [shown, setShown] = useState(PAGE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (active === "todos" ? allPhotos : allPhotos.filter((p) => p.category === active)),
    [active]
  );

  const page = visible.slice(0, shown);
  const remaining = visible.length - page.length;

  const choose = (key: FilterKey) => {
    setActive(key);
    setShown(PAGE);
    setOpenIndex(null);
  };

  return (
    <>
      <div className="container-wide">
        <div
          role="group"
          aria-label="Filtrar proyectos por especialidad"
          className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2"
        >
          {filters.map((filter) => {
            const isActive = filter.key === active;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => choose(filter.key)}
                aria-pressed={isActive}
                className="label relative shrink-0 whitespace-nowrap px-5 py-3.5 transition-colors duration-300"
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span
                  className={`relative z-10 ${isActive ? "text-ivory" : "text-ink/55 hover:text-ink"}`}
                >
                  {filter.label}
                  <span className={isActive ? "opacity-60" : "opacity-40"}>
                    {" "}
                    ({countByCategory(filter.key)})
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-wide mt-10">
        {/* Keyed on the filter and crossfaded as a whole: animating individual
            items in and out of a CSS multi-column flow collapses it. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: ease.outExpo }}
          >
            {visible.length === 0 ? (
              <EmptyCategory />
            ) : (
              <>
                <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
                  {page.map((photo, index) => (
                    <motion.figure
                      key={photo.id}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: ease.outExpo,
                        delay: Math.min(index, 10) * 0.04,
                      }}
                      className="mb-5 break-inside-avoid"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(index)}
                        data-cursor="media"
                        data-cursor-label="Ampliar"
                        className="group/shot block w-full overflow-hidden bg-ink/10 text-left"
                        aria-label={`Ampliar: ${photo.kind}`}
                      >
                        <span className="relative block overflow-hidden">
                          <Image
                            src={photo.src}
                            alt={altFor(photo)}
                            width={photo.width}
                            height={photo.height}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            loading={index < 4 ? "eager" : "lazy"}
                            className="graded h-auto w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shot:scale-[1.06]"
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 transition-colors duration-500 group-hover/shot:bg-ink/15"
                          />
                        </span>
                        <span className="label mt-3 block text-ink/50">{photo.kind}</span>
                      </button>
                    </motion.figure>
                  ))}
                </div>

                {remaining > 0 && (
                  <div className="mt-6 flex flex-col items-center gap-4">
                    <p className="label text-ink/45" aria-live="polite">
                      {page.length} de {visible.length} fotografías
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      magnetic
                      onClick={() => setShown((current) => current + PAGE)}
                      className="!text-ink"
                    >
                      Ver {Math.min(remaining, PAGE)} más
                    </Button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The lightbox walks the whole filtered set, not just what is on screen. */}
      <Lightbox
        photos={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}

/** Honest state for a category the company has not photographed yet. */
function EmptyCategory() {
  return (
    <div className="border border-ink/15 px-6 py-16 text-center md:py-24">
      <p className="font-display text-d4 text-ink">Todavía sin fotografías en el archivo</p>
      <p className="mx-auto mt-4 max-w-md text-ink/60">
        Fabricamos esta especialidad, pero aún no hemos digitalizado fotografías propias de
        estos trabajos. Preferimos no mostrar imágenes de catálogo como si fueran obra
        nuestra.
      </p>
      <a
        href="/contacto"
        className="label mt-8 inline-flex items-center gap-3 border-b border-ink/30 pb-2 text-ink transition-colors hover:border-copper hover:text-copper"
      >
        Pedir referencias de trabajos realizados →
      </a>
    </div>
  );
}
