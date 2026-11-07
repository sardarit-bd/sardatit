"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const width = useTransform(scrollYProgress, [0.1, 0.45], ["60%", "100%"]);
  const height = useTransform(scrollYProgress, [0.1, 0.45], ["80vh", "100vh"]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0.1, 0.45],
    ["0px", "0px"],
  );
  const scale = useTransform(scrollYProgress, [0.1, 0.45], [0.9, 1]);

  const toggleAudio = () => {
    setIsPlaying((prev) => {
      const nextState = !prev;
      if (videoRef.current) {
        videoRef.current.muted = !nextState;
      }
      return nextState;
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[170vh] bg-gray-100 z-60"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-60">
        <motion.div
          style={{
            width,
            height,
            scale,
            borderRadius,
          }}
          onClick={toggleAudio}
          className="relative overflow-hidden bg-slate-950 transition-all duration-75 ease-out cursor-pointer group"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={!isPlaying}
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://designmonks.b-cdn.net/DM%20Others/DM%20Showreel%202026.mp4"
              type="video/mp4"
            />
          </video>
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-black/25">
              <div className="relative flex items-center justify-center size-32 sm:size-36 md:size-40 rounded-full bg-white shadow-2xl text-[#133BD4] transition-transform duration-300 group-hover:scale-110 transform-gpu">
                <svg
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full animate-spin [animation-duration:12s]"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text
                    fontSize="7.5"
                    fontWeight="600"
                    fill="#133BD4"
                    style={{ textTransform: "uppercase" }}
                  >
                    <textPath
                      href="#circlePath"
                      startOffset="0%"
                      textLength="236"
                      lengthAdjust="spacing"
                    >
                      ★ Sardar IT ★ Let&apos;s work with your dream, together
                    </textPath>
                  </text>
                </svg>
                <FiArrowUpRight
                  strokeWidth={1.5}
                  className="size-12 sm:size-14 md:size-16 text-[#133BD4]"
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
