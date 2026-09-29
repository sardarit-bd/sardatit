import Lenis from "lenis";

/**
 * Enterprise Lenis smooth scrolling constants and utilities.
 */
export const SCROLL_DURATION = 2.0;

export const SCROLL_EASING = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const WHEEL_MULTIPLIER = 1;

/**
 * Access the active Lenis singleton instance from window if mounted.
 */
export function getGlobalLenis(): Lenis | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

export type { Lenis };
export default Lenis;
