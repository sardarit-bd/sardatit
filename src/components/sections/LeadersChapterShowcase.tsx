"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERS_DATA, LeaderChapterItem } from "@/data/leaders";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LeadersChapterShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // References for animating elements across chapters
  const textGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgNumberRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const totalChapters = LEADERS_DATA.length;

  useGSAP(
    () => {
      // Pinning and timeline only for desktop (>= 1024px)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!containerRef.current || !pinRef.current) return;

        // Perspective angles for organic 3D entry/exit
        const TILT_IN_Y = [18, -18, 16, -16, 18, -18, 16, -16, 18, -18, 16];
        const TILT_IN_Z = [4, -4, 3, -3, 4, -4, 3, -3, 4, -4, 3];
        const TILT_OUT_Y = [-18, 18, -16, 16, -18, 18, -16, 16, -18, 18, -16];
        const TILT_OUT_Z = [-4, 4, -3, 3, -4, 4, -3, 3, -4, 4, -3];

        // Initialize state for each chapter's elements
        LEADERS_DATA.forEach((_, index) => {
          const textEl = textGroupRefs.current[index];
          const imgEl = imageGroupRefs.current[index];
          const numEl = bgNumberRefs.current[index];

          if (index === 0) {
            if (textEl) gsap.set(textEl, { opacity: 1, y: 0, pointerEvents: "auto" });
            if (imgEl) {
              gsap.set(imgEl, {
                opacity: 1,
                xPercent: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1,
                pointerEvents: "auto",
                zIndex: 10,
              });
            }
            if (numEl) gsap.set(numEl, { opacity: 0.08, scale: 1 });
          } else {
            if (textEl) gsap.set(textEl, { opacity: 0, y: 25, pointerEvents: "none" });
            if (imgEl) {
              gsap.set(imgEl, {
                opacity: 0,
                xPercent: 85,
                rotateY: TILT_IN_Y[index] ?? 16,
                rotateZ: TILT_IN_Z[index] ?? 3,
                scale: 0.88,
                pointerEvents: "none",
                zIndex: 5,
              });
            }
            if (numEl) gsap.set(numEl, { opacity: 0, scale: 0.9 });
          }
        });

        // Master pinned scroll timeline with smooth scrub
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: () => `+=${(totalChapters - 1) * 110}%`,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const cur = Math.min(
                Math.round(progress * (totalChapters - 1)),
                totalChapters - 1
              );
              setActiveIdx(cur);
            },
          },
        });

        scrollTriggerRef.current = masterTl.scrollTrigger as ScrollTrigger;

        // Chain 3D chapter transitions
        for (let i = 0; i < totalChapters - 1; i++) {
          const stepTime = i;
          const curText = textGroupRefs.current[i];
          const nextText = textGroupRefs.current[i + 1];
          const curImg = imageGroupRefs.current[i];
          const nextImg = imageGroupRefs.current[i + 1];
          const curNum = bgNumberRefs.current[i];
          const nextNum = bgNumberRefs.current[i + 1];

          // 1. OUTGOING PORTRAIT: 3D tilt away to the left with rotateY & rotateZ
          if (curImg) {
            masterTl.to(
              curImg,
              {
                opacity: 0,
                xPercent: -85,
                rotateY: TILT_OUT_Y[i] ?? -16,
                rotateZ: TILT_OUT_Z[i] ?? -4,
                scale: 0.88,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                  gsap.set(curImg, { pointerEvents: "none" });
                },
              },
              stepTime
            );
          }

          // 2. INCOMING PORTRAIT: Enter tilted in 3D from right, then ease to level 0deg
          if (nextImg) {
            masterTl.fromTo(
              nextImg,
              {
                opacity: 0,
                xPercent: 85,
                rotateY: TILT_IN_Y[i + 1] ?? 16,
                rotateZ: TILT_IN_Z[i + 1] ?? 3,
                scale: 0.88,
                zIndex: 10 + i,
              },
              {
                opacity: 1,
                xPercent: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1,
                zIndex: 10 + i,
                duration: 1,
                ease: "power2.inOut",
                onStart: () => {
                  gsap.set(nextImg, { pointerEvents: "auto" });
                },
              },
              stepTime
            );
          }

          // 3. TEXT TRANSITIONS: Outgoing fades up, incoming fades in as card settles
          if (curText) {
            masterTl.to(
              curText,
              {
                opacity: 0,
                y: -25,
                duration: 0.35,
                ease: "power1.in",
                onComplete: () => {
                  gsap.set(curText, { pointerEvents: "none" });
                },
              },
              stepTime
            );
          }

          if (nextText) {
            masterTl.fromTo(
              nextText,
              { opacity: 0, y: 25 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
                onStart: () => {
                  gsap.set(nextText, { pointerEvents: "auto" });
                },
              },
              stepTime + 0.45
            );
          }

          // 4. BIG BACKGROUND NUMBER: crossfades in sync
          if (curNum) {
            masterTl.to(
              curNum,
              {
                opacity: 0,
                scale: 1.05,
                duration: 0.35,
                ease: "power1.in",
              },
              stepTime
            );
          }

          if (nextNum) {
            masterTl.fromTo(
              nextNum,
              { opacity: 0, scale: 0.92 },
              {
                opacity: 0.08,
                scale: 1,
                duration: 0.45,
                ease: "power2.out",
              },
              stepTime + 0.45
            );
          }
        }
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [totalChapters] }
  );

  // Jump to specific chapter when clicking vertical dot navigation
  const handleDotClick = (targetIndex: number) => {
    const st = scrollTriggerRef.current;
    if (st) {
      const scrollPos = st.start + (targetIndex / (totalChapters - 1)) * (st.end - st.start);
      // Support Lenis smooth scroll if present on window
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(scrollPos);
      } else {
        window.scrollTo({ top: scrollPos, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#fbfbfd] text-neutral-900 border-t border-neutral-200/60 overflow-hidden"
      aria-label="Our Leaders Chapter Showcase"
    >
      {/* =========================================================================
          DESKTOP PINNED EXPERIENCE (Hidden on mobile < lg)
         ========================================================================= */}
      <div
        ref={pinRef}
        className="hidden lg:flex relative w-full h-[100dvh] flex-col justify-between py-8 px-12 xl:px-20 overflow-hidden select-none"
      >
        {/* 1. PERSISTENT TOP BAR */}
        <div className="w-full flex items-center justify-between border-b border-neutral-200/60 pb-5 z-30">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest uppercase font-bold text-neutral-900 px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200">
              SARDAR IT
            </span>
            <span className="text-xs tracking-wider uppercase font-semibold text-neutral-400">
              Leadership & Vision
            </span>
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Our Leaders — Chapter {String(activeIdx + 1).padStart(2, "0")}/{String(totalChapters).padStart(2, "0")}
          </div>
        </div>

        {/* 2. MAIN CHAPTER STAGE (Left Text + Right Portrait + Faint Background Number) */}
        <div className="relative flex-1 w-full flex items-center justify-between my-auto py-6">
          {/* HUGE FAINT BACKGROUND NUMBER (Bottom-Left) */}
          <div className="absolute left-0 bottom-0 pointer-events-none select-none z-0">
            {LEADERS_DATA.map((_, index) => (
              <div
                key={`bg-num-${index}`}
                ref={(el) => {
                  bgNumberRefs.current[index] = el;
                }}
                className="absolute left-0 bottom-0 text-[18vw] font-black text-neutral-900/10 leading-none tracking-tighter select-none will-change-transform"
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            ))}
          </div>

          {/* LEFT COLUMN: CHAPTER EYEBROW, LEADER NAME, ROLE */}
          <div className="relative z-10 w-[50%] max-w-xl pr-8">
            {LEADERS_DATA.map((leader: LeaderChapterItem, index: number) => (
              <div
                key={`text-${leader.id}`}
                ref={(el) => {
                  textGroupRefs.current[index] = el;
                }}
                className="absolute inset-y-0 left-0 flex flex-col justify-center will-change-transform"
              >
                {/* Thin rule + Group Eyebrow */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-neutral-900" />
                  <span className="text-xs xl:text-sm font-mono font-bold tracking-widest uppercase text-neutral-600">
                    {String(index + 1).padStart(2, "0")} — {leader.groupName}
                  </span>
                </div>

                {/* Leader Name Heading */}
                <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-black tracking-tight text-neutral-900 leading-[1.1] mb-3">
                  {leader.name}
                </h2>

                {/* Leader Role */}
                <p className="text-lg xl:text-xl font-medium text-neutral-500 tracking-normal">
                  {leader.role}
                </p>

                {/* Subtle Pillar Tag */}
                <div className="mt-8 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-neutral-200/80 shadow-sm text-neutral-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Key Executive
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: LEADER PORTRAIT WITH 3D PERSPECTIVE */}
          <div
            className="relative z-10 w-[45%] max-w-lg xl:max-w-xl h-[58vh] xl:h-[65vh] flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {LEADERS_DATA.map((leader: LeaderChapterItem, index: number) => (
              <div
                key={`img-${leader.id}`}
                ref={(el) => {
                  imageGroupRefs.current[index] = el;
                }}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                className="absolute inset-0 w-full h-full rounded-2xl xl:rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.16)] border border-neutral-200/90 bg-neutral-100 will-change-transform select-none"
              >
                <Image
                  src={leader.imageSrc}
                  alt={leader.name}
                  fill
                  sizes="(min-width: 1280px) 50vw, 45vw"
                  className="object-cover object-top pointer-events-none"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                {/* Subtle glass gloss highlight edge */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-2xl xl:rounded-3xl pointer-events-none" />
              </div>
            ))}
          </div>

          {/* RIGHT-EDGE VERTICAL DOT NAVIGATION */}
          <nav
            aria-label="Chapter navigation"
            className="fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end"
          >
            {LEADERS_DATA.map((leader: LeaderChapterItem, index: number) => {
              const isActive = activeIdx === index;
              // Add visual separation between the 3 groups (between 1 & 2, and 6 & 7)
              const isGroupSeparator = index === 1 || index === 6;

              return (
                <div
                  key={`dot-${leader.id}`}
                  className={`flex items-center gap-3 py-1.5 ${
                    isGroupSeparator ? "mb-3" : "mb-1"
                  }`}
                >
                  {/* Label for active chapter */}
                  {isActive && (
                    <span className="hidden xl:inline-block text-xs font-mono font-bold text-neutral-900 bg-white/95 px-2.5 py-1 rounded-md shadow-sm border border-neutral-200 animate-fadeIn">
                      {leader.name}
                    </span>
                  )}

                  {/* Interactive Dot button */}
                  <button
                    type="button"
                    onClick={() => handleDotClick(index)}
                    aria-label={`Jump to chapter ${index + 1}: ${leader.name}`}
                    className="relative group p-1 flex items-center justify-center focus:outline-none"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-3.5 h-3.5 bg-neutral-900 ring-4 ring-neutral-900/20 scale-110"
                          : "w-2 h-2 bg-neutral-300 hover:bg-neutral-600 hover:scale-125"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* 3. BOTTOM BAR: SCROLL HINT & PROGRESS INDICATOR */}
        <div className="w-full flex items-center justify-between border-t border-neutral-200/60 pt-4 z-30">
          <div className="text-xs font-mono text-neutral-400">
            {LEADERS_DATA[activeIdx]?.groupName}
          </div>

          {/* Center scroll hint (hidden when on final chapter) */}
          <div
            className={`flex items-center gap-2 text-xs font-medium text-neutral-500 transition-opacity duration-300 ${
              activeIdx === totalChapters - 1 ? "opacity-0" : "opacity-100"
            }`}
          >
            <span>Scroll for next leader</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-neutral-700" />
          </div>

          <div className="text-xs font-mono font-semibold text-neutral-900">
            {String(activeIdx + 1).padStart(2, "0")} / {String(totalChapters).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE FALLBACK (In-flow stacked layout for < lg, no scroll-jacking)
         ========================================================================= */}
      <div className="lg:hidden w-full py-16 px-6 sm:px-10 flex flex-col gap-12">
        {/* Mobile Section Header */}
        <div className="border-b border-neutral-200 pb-4">
          <span className="font-mono text-xs tracking-widest uppercase font-bold text-neutral-500">
            Our Leaders — Sardar IT
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-900 mt-1">
            Leadership & Vision
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            The visionary executives driving excellence across all departments.
          </p>
        </div>

        {/* Mobile Stacked Leader Cards */}
        <div className="flex flex-col gap-14">
          {LEADERS_DATA.map((leader: LeaderChapterItem, index: number) => (
            <article
              key={`mob-${leader.id}`}
              className="relative flex flex-col gap-4 bg-white rounded-2xl p-5 shadow-sm border border-neutral-200 overflow-hidden"
            >
              {/* Huge background index number */}
              <span className="absolute top-2 right-4 text-7xl font-black text-neutral-100 select-none pointer-events-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Group Eyebrow */}
              <div className="relative z-10 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-neutral-900" />
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-500">
                  {leader.groupName}
                </span>
              </div>

              {/* Portrait Image */}
              <div className="relative z-10 w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden bg-neutral-100 shadow-md">
                <Image
                  src={leader.imageSrc}
                  alt={leader.name}
                  fill
                  sizes="(max-width: 1023px) 90vw, 400px"
                  className="object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Leader Info */}
              <div className="relative z-10 flex flex-col">
                <h3 className="text-2xl font-bold text-neutral-900">
                  {leader.name}
                </h3>
                <p className="text-sm font-medium text-neutral-600 mt-0.5">
                  {leader.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
