"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      lerp: 0.09,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(500, 33);

    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    return () => {
      if (typeof window !== "undefined") {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
