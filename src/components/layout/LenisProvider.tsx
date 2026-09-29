"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger once to avoid refresh jumps when the mobile address bar shows/hides
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Lenis smooth scrolling configuration constants.
 * Tweak these values to adjust scroll feel.
 */

// Animation duration in seconds: 1.15s ensures a single wheel notch settles in ~1s without feeling floaty
export const SCROLL_DURATION = 2.0;

// Exponential ease-out: direct initial response with organic, smooth deceleration
export const SCROLL_EASING = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

// Multiplier for mouse wheel events: 1.0 ensures standard 1:1 wheel distance
export const WHEEL_MULTIPLIER = 1;

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If the user prefers reduced motion, bypass Lenis entirely (native browser scrolling)
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false, // Retain native touch scrolling on mobile/touch screens
      duration: SCROLL_DURATION,
      easing: SCROLL_EASING,
      wheelMultiplier: WHEEL_MULTIPLIER,
    });

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    const unsubscribeScroll = lenis.on("scroll", ScrollTrigger.update);

    // Named ticker callback stored in a const to ensure clean removal on unmount/remount/HMR
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // Disable lag smoothing to eliminate sudden scroll jumps after frame spikes
    gsap.ticker.lagSmoothing(0);

    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // Intercept in-page anchor links (href="#id") to scroll smoothly with dynamic header offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      const isPureHash = href.startsWith("#");
      const isCurrentPageHash =
        href.includes("#") &&
        href.startsWith(window.location.pathname + "#");

      if (isPureHash || isCurrentPageHash) {
        const hash = href.substring(href.indexOf("#"));
        if (hash === "#" || hash === "") return;

        const id = hash.slice(1);
        const targetEl =
          document.getElementById(id) || document.querySelector(hash);

        if (targetEl) {
          e.preventDefault();
          const header = document.querySelector("header");
          const headerHeight = header
            ? header.getBoundingClientRect().height
            : window.innerWidth >= 768
              ? 80
              : 64;

          lenis.scrollTo(targetEl as HTMLElement, {
            offset: -headerHeight,
            duration: SCROLL_DURATION,
            easing: SCROLL_EASING,
          });

          if (window.history.pushState) {
            window.history.pushState(null, "", hash);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      unsubscribeScroll();

      if (typeof window !== "undefined") {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}

