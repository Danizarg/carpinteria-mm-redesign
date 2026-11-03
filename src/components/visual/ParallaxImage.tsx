"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import type { Photo } from "@/data/projects";

/**
 * Image in a fixed frame whose content drifts against the scroll. The inner
 * image is over-scaled so the frame never shows an edge at the extremes.
 */
export function ParallaxImage({
  photo,
  alt,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  /** Travel as a share of the frame height. */
  amount = 12,
  priority = false,
  overlay = true,
}: {
  photo: Photo;
  alt: string;
  className?: string;
  sizes?: string;
  amount?: number;
  priority?: boolean;
  overlay?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  const scale = 1 + (amount * 2) / 100;

  return (
    <div ref={ref} className={`relative overflow-hidden bg-ink-3 ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y, scale }}
      >
        <Image
          src={photo.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="graded object-cover"
        />
      </motion.div>
      {overlay && (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
        />
      )}
    </div>
  );
}
