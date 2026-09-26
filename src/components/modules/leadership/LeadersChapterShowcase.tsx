"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERS_DATA, LeaderChapterItem } from "@/data/leaders";
import { Alex_Brush } from "next/font/google";

const signatureFont = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface LeadersChapterShowcaseProps {
  showMobileHeader?: boolean;
}

export default function LeadersChapterShowcase({
  showMobileHeader = true,
}: LeadersChapterShowcaseProps = {}) {
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
            if (numEl) gsap.set(numEl, { opacity: 1, scale: 1 });
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
            if (numEl) gsap.set(numEl, { opacity: 0, scale: 0.92 });
          }
        });

        // Master scroll timeline with smooth scrub
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
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
                opacity: 1,
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
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionTop = scrollTop + rect.top;
    const totalScroll = rect.height - window.innerHeight;
    const targetScroll = sectionTop + (targetIndex / (totalChapters - 1)) * totalScroll;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll);
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-neutral-900 border-t border-neutral-200/60 h-auto lg:h-[770vh]"
      aria-label="Our Leaders Chapter Showcase"
    >
      {/* =========================================================================
          DESKTOP PINNED VIEWPORT EXPERIENCE (Hidden on mobile < lg)
         ========================================================================= */}
      <div
        ref={pinRef}
        className="hidden lg:flex sticky top-0 h-screen w-full flex-col justify-between overflow-hidden bg-white pt-16 md:pt-20 select-none"
      >
        {/* 1. STATIC TOP HEADER BAR (Pinned inside viewport at top) */}
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-6 lg:pt-8 pb-4 border-b border-neutral-100 z-30 shrink-0">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-600 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-blue-600 inline-block shrink-0 animate-pulse"
                aria-hidden="true"
              />
              <span className="sr-only">•</span>
              <span>/ EXECUTIVE LEADERSHIP</span>
            </div>
            <div className="text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider">
              CHAPTER {String(activeIdx + 1).padStart(2, "0")} / {String(totalChapters).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* 2. FLEXIBLE MIDDLE AREA (Profile Details & Photo Card Stage) */}
        <div className="flex-1 flex items-center z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-2 min-h-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center w-full relative">
            {/* LEFT PROFILE DETAILS COLUMN (Span 7 cols) */}
            <div className="relative z-10 lg:col-span-7 flex flex-col justify-center min-h-[360px] sm:min-h-[400px] lg:min-h-[440px]">
              {/* Subtle Texture Watermark Number */}
              <div className="absolute -top-10 -left-6 pointer-events-none select-none z-0">
                {LEADERS_DATA.map((_, index) => (
                  <div
                    key={`bg-num-${index}`}
                    ref={(el) => {
                      bgNumberRefs.current[index] = el;
                    }}
                    className="absolute top-0 left-0 text-7xl sm:text-8xl lg:text-[130px] xl:text-[150px] font-black text-neutral-900/[0.04] leading-none tracking-tighter select-none will-change-transform"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                ))}
              </div>

              {LEADERS_DATA.map((leader: LeaderChapterItem, index: number) => (
                <div
                  key={`text-${leader.id}`}
                  ref={(el) => {
                    textGroupRefs.current[index] = el;
                  }}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-start z-10 will-change-transform pr-4"
                >
                  {/* 1. Category / Track Label */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-5 h-[1.5px] bg-slate-300" />
                    <span className="font-mono text-xs tracking-widest uppercase text-slate-400 font-medium">
                      {String(index + 1).padStart(2, "0")} — {leader.groupName}
                    </span>
                  </div>

                  {/* 2. Executive Name (Primary Big Heading) */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-2">
                    {leader.name}
                  </h2>

                  {/* 3. Role / Designation (Secondary Subheading) */}
                  <p className="text-lg sm:text-xl font-medium text-slate-600 mb-6">
                    {leader.role}
                  </p>

                  {/* 4. Bio Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mb-6 font-normal">
                    {leader.bio}
                  </p>

                  {/* 5. Sub-Label, Divider & Signature */}
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400 font-medium block mb-2">
                    {leader.subLabel || leader.role.toUpperCase()}
                  </span>
                  <div className="w-10 h-[1.5px] bg-slate-300 mb-6" />

                  <div className="h-10 sm:h-12 flex items-center">
                    <span
                      className={`${signatureFont.className} text-[#1e293b] text-3xl sm:text-4xl leading-none select-none tracking-normal font-normal`}
                    >
                      {leader.signature || leader.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT PORTRAIT CARD & DOT NAVIGATION (Span 5 cols) */}
            <div className="relative z-10 lg:col-span-5 flex items-center justify-between gap-6 w-full h-[52vh] sm:h-[55vh] lg:h-[58vh] max-h-[560px]">
              {/* 3D Perspective Portrait Stage */}
              <div
                className="relative flex-1 h-full w-full max-w-[420px] xl:max-w-[460px] mx-auto"
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
                    className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-neutral-200/90 bg-neutral-100 will-change-transform select-none"
                  >
                    <Image
                      src={leader.imageSrc}
                      alt={`${leader.name} - ${leader.role} at Sardar IT`}
                      fill
                      sizes="(min-width: 1280px) 460px, 420px"
                      className="object-cover object-top pointer-events-none"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-3xl pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Vertically Centered Right-Edge Dot Navigation */}
              <nav
                aria-label="Chapter navigation"
                className="flex flex-col items-end shrink-0 z-40 my-auto py-2"
              >
                {LEADERS_DATA.map((leader: LeaderChapterItem, index: number) => {
                  const isActive = activeIdx === index;
                  const isGroupSeparator = index === 1 || index === 6;

                    return (
                      <div
                        key={`dot-${leader.id}`}
                        className={`flex items-center gap-2.5 py-1 ${
                          isGroupSeparator ? "mb-2.5" : "mb-0.5"
                        }`}
                      >
                        {/* Active Leader Tooltip Tag */}
                        {isActive && (
                          <span className="hidden xl:inline-block text-[11px] font-mono font-bold text-neutral-800 bg-white/95 px-2.5 py-1 rounded-md shadow-xs border border-neutral-200/80 animate-fadeIn whitespace-nowrap">
                            {leader.name}
                          </span>
                        )}

                        {/* Interactive Dot Button */}
                        <button
                          type="button"
                          onClick={() => handleDotClick(index)}
                          aria-label={`Jump to chapter ${index + 1}: ${leader.name}`}
                          className="relative group p-1 flex items-center justify-center focus:outline-none cursor-pointer"
                        >
                          <span
                            className={`block rounded-full transition-all duration-300 ${
                              isActive
                                ? "w-3 h-3 bg-neutral-900 ring-4 ring-neutral-900/20 scale-110"
                                : "w-2 h-2 bg-neutral-300 hover:bg-neutral-600 hover:scale-125"
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

        {/* 3. STATIC BOTTOM FOOTER BAR (Pinned inside viewport at bottom) */}
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 shrink-0 z-20 pb-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
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
      <div className="lg:hidden w-full max-w-[1400px] mx-auto px-6 sm:px-8 py-16 sm:py-20 flex flex-col gap-12">
        {/* Mobile Section Header */}
        {showMobileHeader && (
          <div className="border-b border-neutral-200 pb-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-600 flex items-center gap-2 mb-2">
              <span
                className="w-2 h-2 rounded-full bg-blue-600 inline-block shrink-0"
                aria-hidden="true"
              />
              <span className="sr-only">•</span>
              <span>/ EXECUTIVE LEADERSHIP</span>
            </div>
            <h2 className="text-3xl font-extrabold text-neutral-900 mt-1">
              Leadership & Vision
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              The visionary executives driving excellence across all departments.
            </p>
          </div>
        )}

        {/* Mobile Stacked Leader Cards */}
        <div className="flex flex-col gap-10">
          {LEADERS_DATA.map((leader: LeaderChapterItem, index: number) => (
            <article
              key={`mob-${leader.id}`}
              className="relative flex flex-col gap-4 bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/80 overflow-hidden"
            >
              {/* Background index number */}
              <span className="absolute top-3 right-5 text-6xl font-black text-neutral-100 select-none pointer-events-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Group Eyebrow */}
              <div className="relative z-10 flex items-center gap-2">
                <span className="w-4 h-[1.5px] bg-neutral-400" />
                <span className="font-mono text-xs tracking-wider uppercase text-neutral-500">
                  {leader.groupName}
                </span>
              </div>

              {/* Portrait Image */}
              <div className="relative z-10 w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-neutral-100 shadow-md">
                <Image
                  src={leader.imageSrc}
                  alt={`${leader.name} - ${leader.role} at Sardar IT`}
                  fill
                  sizes="(max-width: 1023px) 90vw, 400px"
                  className="object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Leader Info */}
              <div className="relative z-10 flex flex-col items-start">
                {/* 1. Executive Name (Primary Big Heading) */}
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1">
                  {leader.name}
                </h3>

                {/* 2. Role / Designation (Secondary Subheading) */}
                <p className="text-base sm:text-lg font-medium text-slate-600 mb-4">
                  {leader.role}
                </p>

                {/* 3. Bio Description */}
                {leader.bio && (
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {leader.bio}
                  </p>
                )}

                {/* 4. Sub-Label & Divider */}
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400 font-medium block mb-2">
                  {leader.subLabel || leader.role.toUpperCase()}
                </span>
                <div className="w-10 h-[1.5px] bg-slate-300 mb-4" />

                {/* 5. Executive Signature Element */}
                <div className="h-10 flex items-center">
                  <span
                    className={`${signatureFont.className} text-[#1e293b] text-3xl leading-none select-none tracking-normal font-normal`}
                  >
                    {leader.signature || leader.name}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
