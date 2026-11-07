"use client";

import React, { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { statsData } from "@/data/stats";
const BG_IMAGE = "/image/bg.jpg";
const BG_POS_X = "50%";
const BG_POS_Y = "0%";
const BG_SIZE = "cover";

const CARD_BG_IMAGE = "/image/cardbg.png";
const CARD_BG_POS_X = "90%";
const CARD_BG_POS_Y = "50%";
const CARD_BG_SIZE = "cover";
const CARD_BG_OPACITY = 0.3;
const BG_OPACITY = 0.5;
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const parsedStats = useMemo(() => {
    return statsData.map((stat) => {
      const rawNumber = stat.number || `${stat.value ?? 0}${stat.suffix ?? ""}`;
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
          },
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
    { scope: sectionRef, dependencies: [parsedStats] },
  );

  return (
    <section
      id="achievement-impact-stats"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-[72px]"
    >
      {/* Background image (CSS background for exact position/size control) */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundPosition: `${BG_POS_X} ${BG_POS_Y}`,
          backgroundSize: BG_SIZE,
          backgroundRepeat: "no-repeat",
          opacity: BG_OPACITY,
        }}
        aria-hidden="true"
      />
      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(194, 208, 255, 0.8) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto">
        <div ref={headerRef} className="w-full text-center">
          <h2 className="text-5xl font-medium leading-[1.1] tracking-tight text-[#222] sm:text-6xl lg:text-7xl xl:text-[84px]">
            Our Impact &amp;
            <br />
            Achievements
          </h2>
        </div>

        <div
          ref={cardsContainerRef}
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 md:grid-cols-3 lg:mt-[52px] lg:grid-cols-5 lg:gap-[13px]"
        >
          {parsedStats.map((item, idx) => (
            <div
              key={item.index}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="relative flex min-h-[240px] flex-col overflow-hidden rounded-[3px] bg-white lg:aspect-[203/287] lg:min-h-0"
            >
              {/* Card background image layer (30% opacity) */}
              <div
                className="pointer-events-none absolute inset-0 z-0 select-none"
                style={{
                  backgroundImage: `url(${CARD_BG_IMAGE})`,
                  backgroundPosition: `${CARD_BG_POS_X} ${CARD_BG_POS_Y}`,
                  backgroundSize: CARD_BG_SIZE,
                  backgroundRepeat: "no-repeat",
                  opacity: CARD_BG_OPACITY,
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-6 pt-5 lg:px-[22px] lg:pt-[22px]">
                <span className="text-base font-normal leading-none text-[#133BD4]">
                  {item.index}
                </span>

                <div className="flex items-baseline text-4xl font-semibold leading-none tracking-tight text-[#222] sm:text-[40px]">
                  <span
                    ref={(el) => {
                      numbersRef.current[idx] = el;
                    }}
                  >
                    {item.val}
                  </span>
                  <span>{item.suffix}</span>
                </div>
              </div>

              <div className="relative z-10 flex min-h-[64px] items-center border-t border-neutral-200 px-5 lg:min-h-[73px] lg:px-[22px]">
                <p className="text-[13px] font-normal leading-snug text-[#222]">
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