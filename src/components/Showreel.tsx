"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full py-8 md:py-12 overflow-hidden bg-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden shadow-2xl shadow-slate-200/50 bg-slate-950 group aspect-video md:aspect-[21/9]"
        >
          {/* Live Background Video */}
          <video
            autoPlay
            loop
            muted={!isPlaying}
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
          >
            <source
              src="https://wavespaceagency.s3.us-east-2.amazonaws.com/Wavespace+-+UI%3AUX+design+for+future+unicorns+.mp4"
              type="video/mp4"
            />
          </video>

          {/* Gradient Overlay for Readable Text & Contrast
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Content Overlay & Play/Unmute Button */}
          {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative group/btn flex items-center justify-center size-16 md:size-24 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-slate-950 cursor-pointer mb-3 md:mb-4"
              aria-label={isPlaying ? "Mute Video" : "Unmute Video"}
            >
              {isPlaying ? (
                <FiPause className="text-xl md:text-3xl" />
              ) : (
                <FiPlay className="text-xl md:text-3xl ml-1" />
              )}
              {!isPlaying && (
                <span className="animate-ping absolute inset-0 rounded-full bg-white/30 pointer-events-none" />
              )}
            </button>

            <span className="text-white font-bold text-base md:text-2xl tracking-tight drop-shadow-md">
              {isPlaying ? "Audio Enabled" : "Watch 2026 Showreel"}
            </span>
            <span className="text-slate-200 text-xs md:text-sm mt-1 font-medium drop-shadow-xs">
              {isPlaying
                ? "Click to pause audio"
                : "Click to enable sound & view in full motion"}
            </span>
          </div>  */}

          {/* Bottom Floating Stats Tag inside Showreel Banner */}
          {/* <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex flex-wrap items-center justify-between gap-4 z-10 pt-3 md:pt-4 border-t border-white/20 text-white/90 text-xs md:text-sm font-medium backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full-Stack Design & Engineering Agency</span>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-white/80">
              <span>Next.js • React • AI Integration</span>
              <span>Webflow • UI/UX Design</span>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
