"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { ease } from "@/lib/motion";
import { site, whatsappHref } from "@/data/site";
import { Magnetic } from "@/components/ui/Magnetic";

const MESSAGE = `Hola ${site.shortName}, he visto su web y me gustaría pedir presupuesto.`;

/** Floating WhatsApp channel — appears once the visitor is past the first screen. */
export function WhatsAppButton() {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => setShown(value > 520));

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          className="fixed bottom-5 right-5 z-[130] md:bottom-8 md:right-8"
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 16 }}
          transition={{ duration: 0.45, ease: ease.outExpo }}
        >
          <Magnetic strength={0.2}>
            <a
              href={whatsappHref(MESSAGE)}
              target="_blank"
              rel="noreferrer"
              data-cursor-label="WhatsApp"
              aria-label="Escribirnos por WhatsApp"
              className="group/wa flex items-center gap-0 overflow-hidden border border-ivory/15 bg-ink-2/95 py-3.5 pl-4 pr-4 text-ivory shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-sm transition-colors duration-400 hover:border-copper-2 hover:bg-copper md:pr-5"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 fill-current"
                aria-hidden
                focusable="false"
              >
                <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 2.5A9.42 9.42 0 0 0 2.6 11.9c0 1.66.43 3.28 1.26 4.71L2.5 21.5l5.02-1.31a9.4 9.4 0 0 0 4.51 1.15h.01a9.42 9.42 0 0 0 9.44-9.4 9.35 9.35 0 0 0-2.76-6.66 9.36 9.36 0 0 0-6.68-2.78zm5.5 14.9a7.82 7.82 0 0 1-5.5 2.28h-.01a7.8 7.8 0 0 1-3.98-1.09l-.29-.17-2.98.78.8-2.9-.19-.3a7.78 7.78 0 0 1-1.2-4.16 7.83 7.83 0 0 1 13.36-5.53 7.74 7.74 0 0 1 2.3 5.54 7.83 7.83 0 0 1-2.3 5.55z" />
              </svg>
              <span className="label grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/wa:grid-cols-[1fr] group-focus-visible/wa:grid-cols-[1fr]">
                <span className="overflow-hidden whitespace-nowrap">
                  <span className="pl-3">Pedir presupuesto</span>
                </span>
              </span>
            </a>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
