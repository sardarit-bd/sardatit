"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Lenis, {
  SCROLL_DURATION,
  SCROLL_EASING,
  WHEEL_MULTIPLIER,
} from "@/lib/lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export { SCROLL_DURATION, SCROLL_EASING, WHEEL_MULTIPLIER };

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

