"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

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
  return (
    <section
      className={`relative z-0 overflow-hidden isolate w-full ${
        isHero
          ? "min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-8 sm:pb-12 text-white"
          : "py-12 sm:py-16 lg:py-20 border-t border-neutral-100 bg-white text-neutral-900"
      } ${className}`}
    >
      {/* Background Image Implementation for Hero */}
      {isHero && (
        <>
          <Image
            src="/hero/hero-img.png"
            alt="Hero Background"
            fill
            priority
            quality={100}
            className="object-cover object-center pointer-events-none select-none -z-10"
          />
          {/* Subtle backdrop overlay to preserve contrast without washing out the background image */}
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[0.5px] pointer-events-none -z-10" />
        </>
      )}

      {/* Fullscreen Unbounded Particle Canvas */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center my-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative w-full h-[380px] sm:h-[500px] lg:h-[600px] xl:h-[640px] bg-transparent"
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

      {/* "Scroll to explore" Indicator */}
      {isHero && (
        <div className="relative z-10 flex flex-col items-center justify-center pt-4 pb-2 select-none">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold text-slate-300 mb-2.5">
            Scroll to explore
          </span>
          <div className="flex flex-col items-center gap-1 text-slate-300">
            {/* Mouse capsule with animated scrolling dot */}
            <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1 bg-white/10 backdrop-blur-xs shadow-xs">
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]"
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
              className="w-3.5 h-3.5 text-slate-300 mt-1"
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
