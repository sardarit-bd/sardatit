"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Lottie } from "lottie-react";
import { statsData } from "@/data/stats";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Resilient Lottie icon component filling the upper body of each card
 */
function StatLottieIcon({ lottiePath }: { lottiePath?: string }) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    if (!lottiePath) return;
    let isCurrent = true;

    fetch(lottiePath)
      .then((res) => {
        if (!res.ok) throw new Error("Lottie file not available");
        const contentType = res.headers.get("content-type");
        if (contentType && !contentType.includes("application/json")) {
          throw new Error("Invalid response format");
        }
        return res.json();
      })
      .then((data) => {
        if (isCurrent && data && typeof data === "object") {
          setAnimationData(data);
        }
      })
      .catch(() => {
        // Fallback gracefully without error
      });

    return () => {
      isCurrent = false;
    };
  }, [lottiePath]);

  if (!animationData) {
    return (
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-blue-50/50 border border-blue-100/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
        <span
          className="w-3.5 h-3.5 rounded-full bg-blue-600 inline-block shadow-[0_0_12px_rgba(37,99,235,0.5)] animate-pulse"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
      <Lottie
        src={animationData}
        loop={true}
        autoplay={true}
        className="w-full h-full"
      />
    </div>
  );
}

export function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Parse numeric values and suffixes cleanly from statsData
  const parsedStats = useMemo(() => {
    return statsData.map((stat) => {
      const rawNumber =
        stat.number || `${stat.value ?? 0}${stat.suffix ?? ""}`;
      const match = rawNumber.match(/^(\d+(?:\.\d+)?)(.*)$/);
      const val = match ? parseFloat(match[1]) : (stat.value ?? 0);
      const suffix = match ? match[2] : (stat.suffix ?? "");
      const indexStr = stat.index.replace(/^\//, "");
      return {
        ...stat,
        val,
        suffix,
        index: indexStr,
      };
    });
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        parsedStats.forEach((item, idx) => {
          const numEl = numbersRef.current[idx];
          if (numEl) {
            numEl.textContent = Math.round(item.val).toString();
          }
        });
        return;
      }

      // Staggered card entrance animation
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0 && cardsContainerRef.current) {
        gsap.fromTo(
          validCards,
          {
            opacity: 0,
            y: 16,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Numeric count-up animation
        let counted = false;
        ScrollTrigger.create({
          trigger: cardsContainerRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            if (counted) return;
            counted = true;

            parsedStats.forEach((item, idx) => {
              const numEl = numbersRef.current[idx];
              if (!numEl) return;

              const counter = { val: 0 };
              gsap.to(counter, {
                val: item.val,
                duration: 1.8,
                delay: idx * 0.08,
                ease: "power2.out",
                onUpdate: () => {
                  numEl.textContent = Math.round(counter.val).toString();
                },
              });
            });
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [parsedStats] }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white py-20 lg:py-24 border-y border-neutral-200/80 relative"
    >
      <div className="container mx-auto px-6 md:px-12 flex flex-col gap-12 lg:gap-14 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="w-full max-w-3xl flex flex-col gap-3">
          <div className="text-xs font-semibold tracking-widest uppercase text-blue-600 flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-blue-600 inline-block"
              aria-hidden="true"
            />
            <span>/ ACHIEVEMENT & IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
            Success in Action, engineered at global scale.
          </h2>
          <p className="text-neutral-600 max-w-2xl text-base font-normal leading-relaxed">
            Building the future through technology — backed by verified global
            metrics, high-reliability architecture, and measurable client ROI.
          </p>
        </div>

        {/* 5-Column Connected Grid with Rising Water-Level Index Numbers */}
        <div
          ref={cardsContainerRef}
          className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border border-neutral-200/80 divide-y md:divide-y-0 md:divide-x divide-neutral-200/80 bg-white"
        >
          {parsedStats.map((item, idx) => (
            <div
              key={item.index}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="relative p-8 lg:p-10 flex flex-col justify-between items-center text-center sm:items-start sm:text-left min-h-[380px] sm:min-h-[420px] group"
            >
              {/* Card surface background to conceal lower part of index number */}
              <div className="absolute inset-0 bg-white group-hover:bg-neutral-50/50 transition-colors duration-200 z-[1]" />

              {/* Rising Water-Level Index Number: Dual-layer Stroke & Liquid Fill */}
              <div className="absolute -top-12 left-6 z-0 translate-y-8 opacity-0 pointer-events-none transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <div className="relative inline-block select-none">
                  {/* Base Layer: Crisp Outline Stroke */}
                  <span
                    style={{
                      WebkitTextStroke: "2px #cbd5e1",
                      color: "transparent",
                    }}
                    className="text-6xl sm:text-7xl font-black font-mono tracking-tight select-none inline-block group-hover:[-webkit-text-stroke:2px_#2563eb] transition-all duration-300"
                    aria-hidden="true"
                  >
                    {item.index}
                  </span>

                  {/* Overlay Layer: Bottom-to-Top Liquid Water Fill */}
                  <span
                    className="absolute inset-0 text-6xl sm:text-7xl font-black font-mono tracking-tight select-none pointer-events-none text-blue-600 [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0%_0_0_0)] transition-[clip-path] duration-700 ease-in-out inline-block"
                    aria-hidden="true"
                  >
                    {item.index}
                  </span>
                  <span className="sr-only">{item.index}</span>
                </div>
              </div>

              {/* Upper Body: Large Centered Lottie Animation */}
              <div className="relative z-10 w-full flex items-center justify-center my-auto py-4">
                <StatLottieIcon lottiePath={item.lottiePath} />
              </div>

              {/* Lower Body: Big Bold Metric & Label */}
              <div className="relative z-10 w-full flex flex-col mt-4">
                <div className="text-5xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 flex items-baseline justify-center sm:justify-start gap-0.5">
                  <span
                    ref={(el) => {
                      numbersRef.current[idx] = el;
                    }}
                  >
                    {item.val}
                  </span>
                  <span className="text-blue-600 font-bold ml-0.5">
                    {item.suffix}
                  </span>
                </div>
                <p className="text-base sm:text-lg font-semibold text-neutral-700 mt-2 leading-snug">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImpactStats;
