"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const isPopStateRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isPopStateRef.current = true;
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (isPopStateRef.current) {
      // Browser back/forward navigation: do not override scroll position so restoration works
      isPopStateRef.current = false;
      return;
    }

    // Skip scroll to top if navigating to an in-page hash
    if (typeof window !== "undefined" && window.location.hash) {
      return;
    }

    // 1. Instant native window and document scroll reset
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    // 2. Synchronize with Lenis smooth-scroll instance if active
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } }).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
