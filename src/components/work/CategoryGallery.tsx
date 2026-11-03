"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { ease, inView } from "@/lib/motion";
import { altFor, type Photo } from "@/data/projects";
import { Lightbox } from "./Lightbox";

/** Masonry run for a single specialisation, with the shared lightbox. */
export function CategoryGallery({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {photos.map((photo, index) => (
          <motion.figure
            key={photo.id}
            data-reveal=""
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{
              duration: 0.65,
              ease: ease.outExpo,
              delay: Math.min(index, 8) * 0.04,
            }}
            className="mb-5 break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              data-cursor="media"
              data-cursor-label="Ampliar"
              aria-label={`Ampliar: ${photo.kind}`}
              className="group/shot block w-full overflow-hidden bg-ink/10 text-left"
            >
              <span className="relative block overflow-hidden">
                <Image
                  src={photo.src}
                  alt={altFor(photo)}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="graded h-auto w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shot:scale-[1.06]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 transition-colors duration-500 group-hover/shot:bg-ink/15"
                />
              </span>
            </button>
          </motion.figure>
        ))}
      </div>

      <Lightbox
        photos={photos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}
