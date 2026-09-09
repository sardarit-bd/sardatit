"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

import type { ParticleMotionConfig } from "./AINeuralField";

const AINeuralField = dynamic(() => import("./AINeuralField"), {
  ssr: false,
});

interface AINeuralNetworkSectionProps {
  className?: string;
  isHero?: boolean;
  motionConfig?: ParticleMotionConfig;
}

export default function AINeuralNetworkSection({
  className = "",
  isHero = true,
  motionConfig,
}: AINeuralNetworkSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [holdDuration, setHoldDuration] = useState(6);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleIndexChange = (index: number, duration?: number) => {
    setActiveIndex(index);
    if (duration) setHoldDuration(duration);
    setIsTransitioning(false);
  };

  const handleTransitionStart = () => {
    setIsTransitioning(true);
  };

  return (
    <section
      className={`relative overflow-hidden bg-white text-neutral-900 ${
        isHero
          ? "pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-14"
          : "py-12 sm:py-16 lg:py-20 border-t border-neutral-100"
      } ${className}`}
    >
      {/* Keyframe animations for Shiny Text & GPU Shimmer */}
      <style>{`
        @keyframes shinyText {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
        .animate-shiny-text {
          background-image: linear-gradient(
            110deg,
            #64748b 35%,
            #0284c7 48%,
            #38bdf8 50%,
            #0284c7 52%,
            #64748b 65%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: shinyText 4.5s ease-in-out infinite;
        }

        @keyframes gridLinePulse {
          0% {
            transform: translate3d(-35%, -35%, 0);
          }
          100% {
            transform: translate3d(35%, 35%, 0);
          }
        }
      `}</style>

      {/* 1. Precision Hairline Grid: ultra-soft blueprint lines (subtle, non-distracting) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* 2. Line-Only Shimmer Pulse: continuous, gap-free soft gleam strictly along the 1px grid lines */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-35"
        style={{
          contain: "strict",
          transform: "translateZ(0)",
          maskImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          WebkitMaskImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          maskSize: "56px 56px",
          WebkitMaskSize: "56px 56px",
        }}
      >
        <div
          className="absolute -top-[50%] -bottom-[50%] -left-[50%] -right-[50%] pointer-events-none will-change-transform"
          style={{
            background:
              "linear-gradient(135deg, transparent 40%, rgba(37, 99, 235, 0.3) 47%, rgba(6, 182, 212, 0.45) 50%, rgba(37, 99, 235, 0.3) 53%, transparent 60%)",
            animation: "gridLinePulse 4s ease-in-out infinite",
            transform: "translate3d(-35%, -35%, 0)",
          }}
        />
      </div>

      {/* Framed Container */}
      <div className="container relative mx-auto px-3 sm:px-6 lg:px-12">
        <div className="relative w-full border border-slate-200/80 rounded-2xl bg-slate-50/[0.25] p-2.5 sm:p-5 lg:p-6 shadow-xs">
          {/* 4-corner bracket markers */}
          <span className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t-2 border-l-2 border-slate-300 pointer-events-none" />
          <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t-2 border-r-2 border-slate-300 pointer-events-none" />
          <span className="absolute -bottom-1.5 -left-1.5 sm:-bottom-2 sm:-left-2 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b-2 border-l-2 border-slate-300 pointer-events-none" />
          <span className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b-2 border-r-2 border-slate-300 pointer-events-none" />

          {/* Top metadata tags */}
          <div className="flex items-center justify-between px-2 sm:px-3 pt-1 mb-2">
            {/* Slot-machine rolling counter for [ AI / 0X ] */}
            <div className="font-mono text-[11px] sm:text-xs tracking-widest text-slate-500 font-semibold uppercase tabular-nums inline-flex items-center select-none">
              <span>[ AI /&nbsp;</span>
              <div className="relative inline-flex h-4 w-[2.2ch] overflow-hidden items-center justify-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={activeIndex}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{
                      y: { type: "spring", stiffness: 320, damping: 26 },
                      opacity: { duration: 0.18 },
                    }}
                    className="inline-block"
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span>&nbsp;]</span>
            </div>

            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs tracking-widest text-slate-400 font-semibold uppercase">
                Neural Field / Active
              </span>
            </div>
          </div>

          {/* Clean full-width particle canvas with responsive container height */}
          <div
            className="relative w-full h-[280px] sm:h-[400px] lg:h-[500px] xl:h-[540px]"
            style={{ contain: "layout paint size", transform: "translateZ(0)" }}
          >
            <AINeuralField
              className="absolute inset-0"
              onIndexChange={handleIndexChange}
              onTransitionStart={handleTransitionStart}
              motionConfig={{
                waveSpeed: 1.8,
                waveFrequency: 0.9,
                waveAmplitudeZ: 0.15,
                waveAmplitudeY: 0.035,
                floatSpeed: 0.8,
                floatDistance: 0.08,
                tiltIntensity: 1.0,
                ...motionConfig,
              }}
            />
          </div>

          {/* Bottom frame strip with responsive wrap for tagline & progress */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2 px-2 sm:px-3 pt-3 mt-2 border-t border-slate-100">
            <span
              className="font-mono text-[10px] sm:text-xs tracking-wider uppercase font-semibold inline-block text-transparent bg-clip-text select-none animate-shiny-text leading-tight"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #64748b 35%, #0284c7 48%, #38bdf8 50%, #0284c7 52%, #64748b 65%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                animation: "shinyText 4.5s ease-in-out infinite",
              }}
            >
              Building the Future Through Technology
            </span>

            {/* Timer Progress Bar placed directly above SARDAR IT ENGINE */}
            <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-2 sm:gap-1.5 pt-1 sm:pt-0">
              <div className="w-20 sm:w-28 h-[2px] bg-slate-200/90 rounded-full overflow-hidden">
                <motion.div
                  key={`${activeIndex}-${isTransitioning ? "transit" : "fill"}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isTransitioning ? "0%" : "100%" }}
                  transition={{
                    duration: isTransitioning ? 0 : holdDuration,
                    ease: "linear",
                  }}
                  className="h-full bg-[#2563eb] rounded-full"
                />
              </div>
              <span className="font-mono text-[9px] sm:text-[11px] tracking-widest text-slate-400 uppercase select-none">
                Sardar IT Engine
              </span>
            </div>
          </div>
        </div>

        {/* "Scroll to explore" Indicator */}
        {isHero && (
          <div className="flex flex-col items-center justify-center pt-8 sm:pt-10 select-none">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold text-slate-400 mb-2.5">
              Scroll to explore
            </span>
            <div className="flex flex-col items-center gap-1 text-slate-400">
              {/* Mouse capsule with animated scrolling dot */}
              <div className="w-5 h-8 rounded-full border border-slate-300 flex items-start justify-center p-1 bg-white/70 shadow-xs">
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1 h-2 rounded-full bg-slate-400"
                />
              </div>
              {/* Subtle downward chevron */}
              <motion.svg
                animate={{ y: [0, 3, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="w-3.5 h-3.5 text-slate-400 mt-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


