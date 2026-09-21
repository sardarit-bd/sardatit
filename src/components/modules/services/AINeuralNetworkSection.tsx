"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HyperText from "@/components/ui/HyperText";

import type { ParticleMotionConfig } from "./AINeuralField";

const AINeuralField = dynamic(() => import("./AINeuralField"), {
  ssr: false,
});

const KineticGrid = dynamic(() => import("@/components/ui/kinetic-grid"), {
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
  return (
    <section
      className={`relative z-0 overflow-hidden isolate w-full ${isHero
        ? "h-screen min-h-screen text-white"
        : "py-12 sm:py-16 lg:py-20 border-t border-neutral-100 bg-white text-neutral-900"
        } ${className}`}
    >
      {/* Background Image Implementation for Hero */}
      {isHero && (
        <>
          {/* Layer 0: Background Base */}
          <Image
            src="/hero/hero-img.png"
            alt="Hero Background"
            fill
            priority
            quality={100}
            className="object-cover object-center pointer-events-none select-none -z-20"
          />
          {/* Subtle backdrop overlay to preserve contrast without washing out the background image */}
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[0.5px] pointer-events-none -z-10" />

          {/* Layer 1: Transparent Kinetic Grid Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <KineticGrid className="w-full h-full bg-transparent" />
          </div>
        </>
      )}

      {/* Fullscreen Unbounded Particle Canvas (Strict Optical Center) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative w-full h-[320px] sm:h-[450px] md:h-[550px] lg:h-[650px] bg-transparent"
            style={{ contain: "layout paint size", transform: "translateZ(0)" }}
          >
            <AINeuralField
              className="absolute inset-0 bg-transparent"
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
        </div>
      </div>

      {/* Bottom Center Minimalist Selection Frame with HyperText */}
      {isHero && (
        <aside
          aria-label="Overview"
          className="absolute bottom-28 sm:bottom-32 md:bottom-36 lg:bottom-44 left-1/2 -translate-x-1/2 z-20 w-[90%] sm:w-auto max-w-sm md:max-w-md select-none pointer-events-auto"
        >
          {/* Minimalist Selection Frame with 4 corner anchor handles */}
          <div className="relative border border-white/20 p-3 sm:p-3.5 bg-transparent group text-center">
            {/* 4 Corner Anchor Square Handles (tiny solid square handles with hairline alignment) */}
            <span
              className="w-1.5 h-1.5 bg-neutral-950 border border-white/70 absolute -top-0.5 -left-0.5 pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="w-1.5 h-1.5 bg-neutral-950 border border-white/70 absolute -top-0.5 -right-0.5 pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="w-1.5 h-1.5 bg-neutral-950 border border-white/70 absolute -bottom-0.5 -left-0.5 pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="w-1.5 h-1.5 bg-neutral-950 border border-white/70 absolute -bottom-0.5 -right-0.5 pointer-events-none"
              aria-hidden="true"
            />

            {/* Monospace Metadata Tag */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-blue-400 uppercase">
                [ SARDAR IT / NEXT-GEN ]
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] text-white/40 tracking-wider">
                SYS.01 // ENG
              </span>
            </div>

            {/* Headline with Auto-looping Magic UI HyperText scramble */}
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white tracking-tight leading-snug mt-0.5">
              <HyperText
                text="Engineering Digital Frontiers"
                autoLoopInterval={5500}
                className="inline-block text-white font-semibold tracking-tight"
              />
            </h3>

            {/* Description */}
            <p className="text-[11px] sm:text-xs text-white/70 mt-1 leading-relaxed font-sans max-w-xs sm:max-w-sm mx-auto">
              Building scalable software, intelligent AI systems, and modern digital experiences.
            </p>
          </div>
        </aside>
      )}

      {/* Bottom-Right "Scroll to explore" Indicator */}
      {isHero && (
        <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 md:bottom-8 md:right-10 lg:right-12 z-20 flex flex-col items-end sm:items-center gap-1 select-none pointer-events-auto scale-80 sm:scale-100 origin-bottom-right">
          <motion.span
            animate={{
              textShadow: [
                "-1.5px 0 rgba(0, 240, 255, 0.8), 1.5px 0 rgba(255, 90, 0, 0.8)",
                "-1.2px 0 rgba(0, 240, 255, 0.7), 1.2px 0 rgba(255, 90, 0, 0.7)",
                "-1.8px 0.2px rgba(0, 240, 255, 0.9), 1.8px -0.2px rgba(255, 90, 0, 0.9)",
                "-1.5px 0 rgba(0, 240, 255, 0.8), 1.5px 0 rgba(255, 90, 0, 0.8)",
              ],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              textShadow: "-2.2px 0 rgba(0, 240, 255, 1), 2.2px 0 rgba(255, 90, 0, 1)",
              scale: 1.03,
            }}
            className="font-mono text-[9px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.25em] uppercase font-bold text-[#f8fafc] mb-1.5 sm:mb-2 cursor-default transition-transform whitespace-nowrap"
            style={{
              textShadow: "-1.5px 0 rgba(0, 240, 255, 0.8), 1.5px 0 rgba(255, 90, 0, 0.8)",
              fontFamily: 'ui-monospace, "SF Mono", "JetBrains Mono", "Space Mono", Menlo, Monaco, Consolas, monospace',
            }}
          >
            Scroll to explore
          </motion.span>
          <div className="flex flex-col items-center gap-1 text-slate-300">
            {/* Mouse capsule with animated scrolling dot */}
            <div className="w-4.5 h-7 sm:w-5 sm:h-8 rounded-full border border-white/30 flex items-start justify-center p-1 bg-slate-950/40 backdrop-blur-xs shadow-xs">
              <motion.div
                animate={{ y: [0, 7, 0], opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-1.5 sm:h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]"
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
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400/80 mt-0.5"
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
    </section>
  );
}
