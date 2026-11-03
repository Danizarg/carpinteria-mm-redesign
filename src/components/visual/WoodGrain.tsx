"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/* ── deterministic value noise ─────────────────────────────────────────── */

function hash(x: number, y: number) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

function noise2(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = smooth(x - xi);
  const v = smooth(y - yi);
  return lerp(
    lerp(hash(xi, yi), hash(xi + 1, yi), u),
    lerp(hash(xi, yi + 1), hash(xi + 1, yi + 1), u),
    v
  );
}

function fbm(x: number, y: number, octaves = 4) {
  let amplitude = 0.5;
  let frequency = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i += 1) {
    sum += amplitude * noise2(x * frequency, y * frequency);
    norm += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return sum / norm;
}

/* ── the drawing ───────────────────────────────────────────────────────── */

type Palette = {
  base: [string, string];
  grain: string[];
  knot: string;
};

const PALETTES: Record<"dark" | "light", Palette> = {
  dark: {
    base: ["#14100e", "#2d1f17"],
    grain: ["#4a3426", "#5d4330", "#3a281d", "#6b4e39", "#2a1d15"],
    knot: "#7a5a40",
  },
  light: {
    base: ["#efe7da", "#d9c9ae"],
    grain: ["#c2a884", "#b2946c", "#cdb795", "#a6855c", "#d8c7a8"],
    knot: "#9b7a52",
  },
};

type Knot = { x: number; y: number; r: number; rings: number };

function drawGrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: Palette,
  seed: number
) {
  const { base, grain, knot: knotColour } = palette;

  const bg = ctx.createLinearGradient(0, 0, width * 0.35, height);
  bg.addColorStop(0, base[0]);
  bg.addColorStop(1, base[1]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // knots the grain has to flow around
  const knotCount = width > 900 ? 3 : 2;
  const knots: Knot[] = Array.from({ length: knotCount }, (_, i) => {
    const t = hash(seed + i * 31, 7);
    const u = hash(seed + i * 57, 13);
    return {
      x: width * (0.14 + 0.72 * t),
      y: height * (0.12 + 0.76 * u),
      r: Math.min(width, height) * (0.035 + 0.045 * hash(seed + i, 29)),
      rings: 10 + Math.floor(8 * hash(seed + i, 41)),
    };
  });

  // grain bands run the full width, undulating and bending around each knot
  const bandCount = Math.round(height / 7) + 40;
  const step = Math.max(6, Math.round(width / 220));

  ctx.lineCap = "round";

  for (let b = 0; b < bandCount; b += 1) {
    const baseY = (b / bandCount) * height * 1.15 - height * 0.07;
    const seedY = b * 0.37 + seed;
    const colour = grain[b % grain.length];
    const weight = 0.5 + 1.9 * hash(b, seed);
    const alpha = 0.10 + 0.3 * hash(b + 101, seed);

    ctx.beginPath();
    ctx.strokeStyle = colour;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = weight;

    let started = false;
    for (let x = -step; x <= width + step; x += step) {
      // long slow wave + fine fibre detail
      const wave = (fbm(x * 0.0016, seedY * 0.6, 3) - 0.5) * height * 0.09;
      const fibre = (noise2(x * 0.03, seedY * 4) - 0.5) * 5;
      let y = baseY + wave + fibre;

      // deflect around knots so the grain wraps rather than crossing
      for (const k of knots) {
        const dx = x - k.x;
        const dy = y - k.y;
        const dist = Math.hypot(dx, dy);
        const influence = k.r * 3.1;
        if (dist < influence) {
          const push = (1 - dist / influence) ** 2 * k.r * 1.5;
          y += (dy >= 0 ? 1 : -1) * push;
        }
      }

      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  // concentric rings inside each knot
  for (const k of knots) {
    for (let r = 0; r < k.rings; r += 1) {
      const t = r / k.rings;
      ctx.beginPath();
      ctx.globalAlpha = 0.3 * (1 - t) + 0.06;
      ctx.strokeStyle = knotColour;
      ctx.lineWidth = 0.6 + 1.4 * (1 - t);
      ctx.ellipse(
        k.x,
        k.y,
        k.r * t * 1.05 + 1.5,
        k.r * t * 0.62 + 1,
        0.4 + hash(Math.round(k.x), r) * 0.4,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
}

/* ── component ─────────────────────────────────────────────────────────── */

export function WoodGrain({
  className = "",
  tone = "dark",
  seed = 11,
  /** Soft light that follows the pointer on precise-pointer devices. */
  pointerLight = true,
  /** Slow sheen sweeping across the grain. */
  sheen = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  seed?: number;
  pointerLight?: boolean;
  sheen?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();

  /* The grain is expensive to generate and never changes — render it once per
     size, then animate only cheap compositing layers on top. */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let frame = 0;
    const render = () => {
      const { clientWidth: w, clientHeight: h } = wrap;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      drawGrain(ctx, w, h, PALETTES[tone], seed);
    };

    render();

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    });
    observer.observe(wrap);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [tone, seed]);

  /* Pointer light writes CSS custom properties — no React re-render per move. */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !pointerLight || !fine || reduced) return;

    let frame = 0;
    let targetX = 50;
    let targetY = 40;
    let currentX = 50;
    let currentY = 40;

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      wrap.style.setProperty("--lx", `${currentX}%`);
      wrap.style.setProperty("--ly", `${currentY}%`);
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width) * 100;
      targetY = ((event.clientY - rect.top) / rect.height) * 100;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [pointerLight, fine, reduced]);

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ ["--lx" as string]: "50%", ["--ly" as string]: "40%" }}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* pointer-tracked warmth */}
      {pointerLight && !reduced && (
        <div
          className="absolute inset-0 opacity-70 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(42rem 42rem at var(--lx) var(--ly), rgba(255,228,190,0.55), transparent 62%)",
          }}
        />
      )}

      {/* slow sheen across the grain */}
      {sheen && !reduced && (
        <div
          className="absolute inset-y-0 -left-1/3 w-2/3 opacity-[0.17] mix-blend-screen"
          style={{
            background:
              "linear-gradient(100deg, transparent, rgba(255,220,175,0.9), transparent)",
            animation: "mm-sheen 17s cubic-bezier(0.4,0,0.2,1) infinite",
          }}
        />
      )}

      <style>{`@keyframes mm-sheen{0%{transform:translateX(-30%)}55%{transform:translateX(260%)}100%{transform:translateX(260%)}}`}</style>
    </div>
  );
}
