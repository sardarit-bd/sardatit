"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ElectricBorder from "../ui/ElectricBorder";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatMetric {
  index: string;
  value: number;
  suffix: string;
  label: string;
  decimals: number;
}

const statsData: StatMetric[] = [
  {
    index: "/01",
    value: 99,
    suffix: "%",
    label: "Client Satisfaction",
    decimals: 0,
  },
  {
    index: "/02",
    value: 15,
    suffix: "k+",
    label: "Projects Completed",
    decimals: 0,
  },
  {
    index: "/03",
    value: 5.5,
    suffix: "k+",
    label: "Clients Served",
    decimals: 1,
  },
  {
    index: "/04",
    value: 60,
    suffix: "+",
    label: "Countries Served",
    decimals: 0,
  },
  {
    index: "/05",
    value: 50,
    suffix: "+",
    label: "Team Specialists",
    decimals: 0,
  },
];

export function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const eyebrowDotRef = useRef<HTMLSpanElement>(null);
  const accentBarRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Check prefers-reduced-motion
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        // Render final counter values directly for users with reduced motion
        statsData.forEach((stat, idx) => {
          const numEl = numbersRef.current[idx];
          if (numEl) {
            numEl.textContent =
              stat.decimals > 0
                ? stat.value.toFixed(stat.decimals)
                : Math.round(stat.value).toString();
          }
        });
        return;
      }

      // 1. Eyebrow Dot: Continuous subtle pulse (always running, not scroll-triggered)
      if (eyebrowDotRef.current) {
        gsap.to(eyebrowDotRef.current, {
          scale: 1.35,
          opacity: 0.45,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Header ScrollTrigger timeline
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Eyebrow label entrance (fades/slides up first)
      if (eyebrowRef.current) {
        headerTl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }

      // 2. 3-line heading words reveal (split into individual words with overflow mask)
      const solidWords = headerRef.current?.querySelectorAll(".heading-word-solid");
      const strokeWords = headerRef.current?.querySelectorAll(".heading-word-stroke");

      if (solidWords && solidWords.length > 0) {
        headerTl.fromTo(
          solidWords,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.2"
        );
      }

      if (strokeWords && strokeWords.length > 0) {
        headerTl.fromTo(
          strokeWords,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      // 3. Vertical accent bar draws from top (scaleY 0 -> 1)
      if (accentBarRef.current) {
        headerTl.fromTo(
          accentBarRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.45, ease: "power2.out" },
          "-=0.1"
        );
      }

      // Paragraph fades and slides up shortly after bar finishes growing
      if (paragraphRef.current) {
        headerTl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "+=0.06"
        );
      }

      // 4. Staggered card entrance on scroll into view
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0 && cardsContainerRef.current) {
        gsap.fromTo(
          validCards,
          {
            opacity: 0,
            y: 28,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 5. Dynamic numeric count-up animation (runs ONCE per page view, staggered with card entrance)
        let counted = false;
        ScrollTrigger.create({
          trigger: cardsContainerRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            if (counted) return;
            counted = true;

            statsData.forEach((stat, idx) => {
              const numEl = numbersRef.current[idx];
              if (!numEl) return;

              const counter = { val: 0 };
              gsap.to(counter, {
                val: stat.value,
                duration: 1.8,
                delay: idx * 0.1, // Staggered to align with card entrance
                ease: "power2.out",
                onUpdate: () => {
                  numEl.textContent =
                    stat.decimals > 0
                      ? counter.val.toFixed(stat.decimals)
                      : Math.round(counter.val).toString();
                },
              });
            });
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-28 bg-black text-white relative overflow-hidden"
    >
      {/* Background ambient lighting orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 flex flex-col gap-14 sm:gap-16 relative z-10">
        {/* Header - Left-Aligned & Animated */}
        <header
          ref={headerRef}
          className="flex flex-col items-start text-left gap-6 max-w-5xl"
        >
          {/* Top Eyebrow Tag: Architectural System Tag with Live Breathing Dot */}
          <div
            ref={eyebrowRef}
            className="flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-blue-400/90"
          >
            <span
              ref={eyebrowDotRef}
              className="size-2 rounded-full bg-blue-500 shadow-[0_0_8px_#38bdf8] inline-block shrink-0"
            />
            <span>// ACHIEVEMENT &amp; IMPACT</span>
          </div>

          {/* 3-Line Heading with Word Clipping Masks */}
          <div className="flex flex-col gap-1 sm:gap-2">
            {/* Line 1: Solid White Heading */}
            <h2
              style={{
                fontFamily:
                  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white leading-none"
            >
              {["SUCCESS", "IN", "ACTION"].map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0 pb-1"
                >
                  <span className="heading-word heading-word-solid inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            {/* Line 2: Stroked Heading */}
            <h2 className="clean-stroke-text text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-none">
              {["ENGINEERED", "AT"].map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0 pb-1"
                >
                  <span className="heading-word heading-word-stroke inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            {/* Line 3: Stroked Heading */}
            <h2 className="clean-stroke-text text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-none">
              {["SCALE"].map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0 pb-1"
                >
                  <span className="heading-word heading-word-stroke inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          {/* Vertical Accent Bar + Editorial Description */}
          <div className="flex items-stretch gap-4 max-w-2xl mt-2">
            <div
              ref={accentBarRef}
              className="w-[2.5px] bg-gradient-to-b from-blue-400 to-blue-600 rounded-full origin-top shrink-0"
              style={{ minHeight: "100%" }}
            />
            <p
              ref={paragraphRef}
              className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed tracking-wide"
            >
              Building the future through technology — backed by verified global metrics, high-reliability architecture, and measurable client ROI.
            </p>
          </div>
        </header>

        {/* 5-Column High-End Stats Grid with ElectricBorder */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {statsData.map((stat, idx) => (
            <div
              key={stat.index}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="w-full flex"
            >
              <ElectricBorder
                color="#00d2ff"
                speed={0.7}
                chaos={0.08}
                borderRadius={22}
                className="w-full h-full rounded-[22px]"
              >
                {/* Modern Dark Glassmorphic Card */}
                <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/80 rounded-[22px] p-6 sm:p-8 flex flex-col justify-between h-64 sm:h-72 text-white shadow-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500 w-full">
                  {/* Subtle inner radial gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-500 pointer-events-none" />

                  {/* Top: Index Tag */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-500 tracking-wider">
                      {stat.index}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d2ff]" />
                  </div>

                  {/* Bottom: Stat Number & Label */}
                  <div className="relative z-10 flex flex-col gap-1.5">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white flex items-baseline gap-0.5">
                      <span
                        ref={(el) => {
                          numbersRef.current[idx] = el;
                        }}
                      >
                        0
                      </span>
                      <span className="text-cyan-400 font-bold text-3xl sm:text-4xl lg:text-5xl ml-0.5">
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-neutral-400 font-medium leading-snug">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </ElectricBorder>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImpactStats;
