/**
 * Shared handle on the Lenis instance so overlays (lightbox, menus) can stop
 * inertial scrolling instead of fighting it with `overflow: hidden` alone.
 */

type Lenis = { stop: () => void; start: () => void };

let instance: Lenis | null = null;

export const registerScroller = (lenis: Lenis | null) => {
  instance = lenis;
};

export const lockScroll = () => {
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
};

export const unlockScroll = () => {
  instance?.start();
  document.documentElement.style.overflow = "";
};
