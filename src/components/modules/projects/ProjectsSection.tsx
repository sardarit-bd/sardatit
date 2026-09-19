"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";
import ProjectCardVertical from "@/components/ui/ProjectCardVertical";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // One ref array: one unified chapter card element per project
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgNumberRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const totalChapters = projects.length;

  useGSAP(
    () => {
      // Pinning and timeline enabled only for desktop (>= 1024px)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!containerRef.current || !pinRef.current) return;

        // Initialize state for each chapter card
        projects.forEach((_, index) => {
          const cardEl = chapterRefs.current[index];
          const numEl = bgNumberRefs.current[index];

          if (index === 0) {
            if (cardEl) {
              gsap.set(cardEl, {
                opacity: 1,
                xPercent: 0,
                pointerEvents: "auto",
                zIndex: 10,
              });
            }
            if (numEl) gsap.set(numEl, { opacity: 0.05, scale: 1 });
          } else {
            if (cardEl) {
              gsap.set(cardEl, {
                opacity: 0,
                xPercent: 115,
                pointerEvents: "none",
                zIndex: 5,
              });
            }
            if (numEl) gsap.set(numEl, { opacity: 0, scale: 0.92 });
          }
        });

        // Master pinned scroll timeline strictly bound to scroll position (zero lag)
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: () => `+=${(totalChapters - 1) * 115}%`,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const rawCur = progress * (totalChapters - 1);
              const cur = Math.min(
                Math.round(rawCur),
                totalChapters - 1
              );
              setActiveIdx(cur);

              // Defensive Force-Hide Safety Net:
              // Strictly silences any chapter card or background number not in the currently active transition pair
              const lower = Math.max(0, Math.floor(rawCur));
              const upper = Math.min(totalChapters - 1, Math.ceil(rawCur));

              for (let k = 0; k < totalChapters; k++) {
                if (k !== lower && k !== upper) {
                  const distantCard = chapterRefs.current[k];
                  if (distantCard) {
                    gsap.set(distantCard, {
                      opacity: 0,
                      pointerEvents: "none",
                    });
                  }
                  const distantNum = bgNumberRefs.current[k];
                  if (distantNum) {
                    gsap.set(distantNum, {
                      opacity: 0,
                    });
                  }
                }
              }
            },
          },
        });

        scrollTriggerRef.current = masterTl.scrollTrigger as ScrollTrigger;

        // Unified chapter-to-chapter transitions: strictly linear scroll tracking
        for (let i = 0; i < totalChapters - 1; i++) {
          const stepTime = i;
          const curChapter = chapterRefs.current[i];
          const nextChapter = chapterRefs.current[i + 1];
          const curNum = bgNumberRefs.current[i];
          const nextNum = bgNumberRefs.current[i + 1];

          // 1. Outgoing Chapter Card: Lower zIndex than incoming, slides out left
          if (curChapter) {
            masterTl.set(curChapter, { zIndex: 5 + i }, stepTime);
            masterTl.to(
              curChapter,
              {
                opacity: 0,
                xPercent: -115,
                zIndex: 5 + i,
                duration: 1,
                ease: "none",
                onComplete: () => {
                  gsap.set(curChapter, { pointerEvents: "none" });
                },
              },
              stepTime
            );
          }

          // 2. Incoming Chapter Card: Higher zIndex, enters from right
          if (nextChapter) {
            masterTl.fromTo(
              nextChapter,
              {
                opacity: 0,
                xPercent: 115,
                zIndex: 10 + i,
              },
              {
                opacity: 1,
                xPercent: 0,
                zIndex: 10 + i,
                duration: 1,
                ease: "none",
                immediateRender: false,
                onStart: () => {
                  gsap.set(nextChapter, { pointerEvents: "auto" });
                },
              },
              stepTime
            );
          }

          // 3. Background Numbers: Crossfade in linear sync
          if (curNum) {
            masterTl.to(
              curNum,
              {
                opacity: 0,
                scale: 1.06,
                duration: 0.5,
                ease: "none",
              },
              stepTime
            );
          }

          if (nextNum) {
            masterTl.fromTo(
              nextNum,
              { opacity: 0, scale: 0.92 },
              {
                opacity: 0.05,
                scale: 1,
                duration: 0.5,
                ease: "none",
                immediateRender: false,
              },
              stepTime + 0.3
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

  // Jump to specific chapter when clicking bottom stepper navigation
  const handleStepClick = (targetIndex: number) => {
    const st = scrollTriggerRef.current;
    if (st) {
      const scrollPos =
        st.start + (targetIndex / (totalChapters - 1)) * (st.end - st.start);
      const lenis = (
        window as unknown as {
          __lenis?: { scrollTo: (target: number) => void };
        }
      ).__lenis;
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
      id="selected-work"
      className="relative w-full bg-white text-neutral-900 border-t border-neutral-100 overflow-hidden"
      aria-label="Selected Work and Case Studies Chapter Showcase"
    >
      {/* =========================================================================
          DESKTOP PINNED EXPERIENCE (lg and above: 1024px+)
         ========================================================================= */}
      <div
        ref={pinRef}
        className="hidden lg:flex relative w-full h-[100dvh] flex-col justify-between py-6 px-10 xl:px-16 overflow-hidden select-none bg-white"
      >
        {/* 1. PERSISTENT TOP HEADER AREA */}
        <div className="w-full flex flex-col border-b border-neutral-200/60 pb-3 xl:pb-4 z-30">
          <div className="w-full flex items-center justify-between">
            <div className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-600 font-semibold flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-blue-600 inline-block shrink-0"
                aria-hidden="true"
              />
              <span className="sr-only">•</span>
              <span>/ SELECTED WORK &amp; CASE STUDIES</span>
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-medium">
              Chapter {String(activeIdx + 1).padStart(2, "0")} /{" "}
              {String(totalChapters).padStart(2, "0")}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mt-3 mb-2">
            Featured Works &amp; Real-World Case Studies
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl font-normal leading-relaxed">
            Engineering impactful digital experiences, mission-critical systems, and verified ROI for global brands.
          </p>
        </div>

        {/* 2. MAIN CHAPTER STAGE (Single Unified Card per Project + Faint Background Index Number) */}
        <div className="relative flex-1 w-full flex items-center my-auto py-4 min-h-0 overflow-hidden">
          {/* HUGE FAINT BACKGROUND NUMBER */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
            {projects.map((_, index) => (
              <div
                key={`bg-num-${index}`}
                ref={(el) => {
                  bgNumberRefs.current[index] = el;
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[22vw] font-black text-neutral-900/[0.04] leading-none tracking-tighter select-none will-change-transform"
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            ))}
          </div>

          {/* CHAPTER CARDS CONTAINER (Single card per project holding text + image) */}
          <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex items-center justify-center">
            {projects.map((project, index) => (
              <div
                key={`chapter-${project.id}`}
                ref={(el) => {
                  chapterRefs.current[index] = el;
                }}
                className="absolute inset-y-0 left-[3%] xl:left-[4%] w-[94%] xl:w-[92%] h-full flex items-center justify-between gap-10 xl:gap-16 will-change-transform"
              >
                {/* LEFT HALF: CHAPTER EDITORIAL DETAILS */}
                <div className="w-[48%] max-w-xl flex flex-col justify-center gap-4 xl:gap-5">
                  {/* Category / Eyebrow Label */}
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-blue-600">
                    <span>{project.category}</span>
                    <span className="text-neutral-300">•</span>
                    <span>{project.eyebrow}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-3xl xl:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.1]">
                    {project.title}
                  </h3>

                  {/* Thin Divider Line */}
                  <div className="w-full h-px bg-neutral-200/90" />

                  {/* Description Paragraph */}
                  <p className="text-sm xl:text-base text-neutral-600 font-normal leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-md border border-neutral-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Key Metric & Case Study CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200/80 mt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl xl:text-4xl font-extrabold text-neutral-900 tracking-tight">
                        {project.statValue}
                      </span>
                      <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {project.statLabel}
                      </span>
                    </div>

                    <Link
                      href={project.link}
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs xl:text-sm font-semibold transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                    >
                      <span>{project.ctaLabel || "View Case Study"}</span>
                      <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>

                {/* RIGHT HALF: SCREENSHOT / IMAGE PRESENTATION */}
                <div className="w-[50%] max-w-xl h-full flex items-center justify-center">
                  <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/80 bg-neutral-50">
                    <Link
                      href={project.link}
                      className="group relative block w-full h-full"
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} - ${project.eyebrow}`}
                        fill
                        sizes="(max-width: 1280px) 50vw, 600px"
                        priority={index === 0}
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white text-sm font-medium flex items-center gap-1.5">
                          Explore case study{" "}
                          <FiArrowUpRight className="text-base" />
                        </span>
                      </div>

                      {/* Category Floating Pill Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/95 text-neutral-900 backdrop-blur-md shadow-sm border border-neutral-200/80">
                          {project.category}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. HORIZONTAL STEPPER NAVIGATION & RELOCATED CTA */}
        <div className="w-full pt-4 pb-2 border-t border-neutral-200/70 z-30 flex flex-col items-center">
          <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-1 xl:gap-2">
            {projects.map((project, idx) => {
              const isActive = activeIdx === idx;
              return (
                <React.Fragment key={`step-${project.id}`}>
                  {/* Step Button */}
                  <button
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-xs"
                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/80"
                    }`}
                    aria-label={`Jump to chapter ${idx + 1}: ${project.title}`}
                  >
                    <span
                      className={`size-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-neutral-200 text-neutral-600 group-hover:bg-neutral-300"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
                        isActive
                          ? "text-blue-900 font-bold"
                          : "text-neutral-600 group-hover:text-neutral-900"
                      }`}
                    >
                      {project.title}
                    </span>
                  </button>

                  {/* Connecting thin horizontal line */}
                  {idx < projects.length - 1 && (
                    <div className="flex-1 h-px bg-neutral-200 mx-1 hidden xl:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Relocated 'All Case Studies' CTA button */}
          <div className="mt-5 xl:mt-6 flex justify-center">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white hover:bg-blue-600 text-sm font-semibold tracking-wide transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              <span>All Case Studies</span>
              <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE & TABLET FALLBACK (< lg: 1024px)
          Normal unpinned scrolling with clean stacked vertical card grid
         ========================================================================= */}
      <div className="block lg:hidden py-16 px-6 sm:px-8">
        <div className="mb-10 flex flex-col">
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-600 font-semibold flex items-center gap-2">
            <span
              className="size-2 rounded-full bg-blue-600 inline-block shrink-0"
              aria-hidden="true"
            />
            <span className="sr-only">•</span>
            <span>/ SELECTED WORK &amp; CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight mt-3 mb-2">
            Featured Works &amp; Real-World Case Studies
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl font-normal leading-relaxed">
            Engineering impactful digital experiences, mission-critical systems, and verified ROI for global brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCardVertical
              key={project.id}
              title={project.title}
              category={project.category}
              eyebrow={project.eyebrow}
              description={project.description}
              imageSrc={project.image}
              imageAlt={`${project.title} - ${project.eyebrow}`}
              tags={project.tags}
              ctaHref={project.link}
              ctaLabel={project.ctaLabel || "View Case Study"}
              statValue={project.statValue}
              statLabel={project.statLabel}
              priority={project.priority}
            />
          ))}
        </div>

        {/* Relocated Bottom CTA on mobile */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white hover:bg-blue-600 text-sm font-semibold tracking-wide transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            <span>All Case Studies</span>
            <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
