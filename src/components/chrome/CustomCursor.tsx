"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

const STORAGE_KEY = "mm:cursor";

type CursorContextValue = {
  /** The visitor's preference. */
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  /** Whether the bespoke cursor is actually on screen right now. */
  active: boolean;
};

const CursorContext = createContext<CursorContextValue>({
  enabled: true,
  setEnabled: () => {},
  active: false,
});

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(true);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "off") setEnabledState(false);
    } catch {
      /* private mode — keep the default */
    }
  }, []);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
    } catch {
      /* ignore */
    }
  }, []);

  // A bespoke cursor is only ever shown to a precise pointer that has not
  // asked for reduced motion. Touch and reduced-motion always get the real one.
  const active = enabled && fine && !reduced;

  useEffect(() => {
    document.documentElement.dataset.cursor = active ? "custom" : "native";
    return () => {
      document.documentElement.dataset.cursor = "native";
    };
  }, [active]);

  const value = useMemo(
    () => ({ enabled, setEnabled, active }),
    [enabled, setEnabled, active]
  );

  return (
    <CursorContext.Provider value={value}>
      {children}
      {active && <Cursor />}
    </CursorContext.Provider>
  );
}

const INTERACTIVE = 'a,button,[role="button"],input,textarea,select,summary,[data-cursor]';

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ring = { stiffness: 420, damping: 36, mass: 0.42 };
  const sx = useSpring(x, ring);
  const sy = useSpring(y, ring);

  const [mode, setMode] = useState<"default" | "interactive" | "media">("default");
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = (event.target as Element | null)?.closest?.(INTERACTIVE) ?? null;
      if (!target) {
        setMode("default");
        setLabel(null);
        return;
      }
      const custom = target.getAttribute("data-cursor");
      const text = target.getAttribute("data-cursor-label");
      setMode(custom === "media" ? "media" : "interactive");
      setLabel(text);
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    // Any keyboard navigation hands control back to the real pointer.
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Tab") setVisible(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("keydown", onKey);
    };
  }, [x, y]);

  const size = mode === "media" ? 92 : mode === "interactive" ? 54 : 16;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] will-change-transform"
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-ivory/70 bg-ivory/10 backdrop-blur-[1px]"
        style={{ translateX: "-50%", translateY: "-50%", mixBlendMode: "difference" }}
        animate={{
          width: size,
          height: size,
          scale: down ? 0.82 : 1,
          backgroundColor:
            mode === "default" ? "rgba(245,240,231,0.9)" : "rgba(245,240,231,0.08)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.5 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="label whitespace-nowrap text-ivory"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/** Lets anyone switch back to the standard system cursor. */
export function CursorToggle({ className = "" }: { className?: string }) {
  const { enabled, setEnabled } = useCursor();
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();

  // The control is meaningless where the bespoke cursor never appears.
  if (!fine || reduced) return null;

  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      aria-pressed={enabled}
      className={`label inline-flex items-center gap-3 opacity-60 transition-opacity hover:opacity-100 ${className}`}
    >
      <span
        aria-hidden
        className={`inline-block h-2 w-2 shrink-0 rounded-full transition-colors ${
          enabled ? "bg-copper-2" : "bg-current"
        }`}
      />
      Cursor {enabled ? "personalizado" : "del sistema"}
    </button>
  );
}
