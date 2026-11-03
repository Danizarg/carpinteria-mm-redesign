"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { ease } from "@/lib/motion";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { altFor, type Photo } from "@/data/projects";

export function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, onIndexChange, photos.length]
  );

  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement | null;
    lockScroll();
    dialogRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key !== "Tab") return;

      // Keep focus inside the dialog.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      restoreFocus.current?.focus?.();
    };
  }, [open, onClose, go]);

  const photo = index === null ? null : photos[index];

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ${index + 1} de ${photos.length}`}
          tabIndex={-1}
          className="fixed inset-0 z-[180] flex flex-col bg-ink/97 backdrop-blur-sm outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between gap-4 px-[var(--gutter)] py-5">
            <span className="label text-ivory/60">
              {photo.kind} · {String(index + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="label flex items-center gap-3 text-ivory transition-colors hover:text-copper-2"
            >
              Cerrar
              <span aria-hidden className="text-base leading-none">
                ✕
              </span>
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-[var(--gutter)] pb-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Imagen anterior"
              className="absolute left-2 z-10 flex h-14 w-14 items-center justify-center text-2xl text-ivory/60 transition-colors hover:text-ivory md:left-6"
            >
              ‹
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={photo.id}
                className="relative flex h-full max-h-[76vh] w-full items-center justify-center"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.35, ease: ease.outExpo }}
              >
                <Image
                  src={photo.src}
                  alt={altFor(photo)}
                  width={photo.width}
                  height={photo.height}
                  sizes="92vw"
                  className="graded max-h-[76vh] w-auto object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Imagen siguiente"
              className="absolute right-2 z-10 flex h-14 w-14 items-center justify-center text-2xl text-ivory/60 transition-colors hover:text-ivory md:right-6"
            >
              ›
            </button>
          </div>

          <p className="px-[var(--gutter)] pb-6 text-center text-sm text-ivory/40">
            Fotografía del archivo de Carpintería y Ebanistería M&amp;M · Use ← → para navegar
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
