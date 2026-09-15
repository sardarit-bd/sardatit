"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

// 160px wide seamless sine-wave SVG mask with solid fill down to 600px
const WAVE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 600' width='160' height='600'>
    <path d='M 0,20 Q 40,6 80,20 T 160,20 L 160,600 L 0,600 Z' fill='black'/>
  </svg>`
)}`;

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const fillTextRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll during preloading
    document.body.style.overflow = "hidden";

    const proxy = { progress: 0 };
    const waveX = { val: 0 };

    const ctx = gsap.context(() => {
      const updateMask = () => {
        if (!fillTextRef.current) return;
        const h = fillTextRef.current.offsetHeight || 120;
        const startY = h + 20;
        const endY = -35;
        const currentY = startY + (endY - startY) * (proxy.progress / 100);
        const pos = `${waveX.val}px ${currentY}px`;
        fillTextRef.current.style.webkitMaskPosition = pos;
        fillTextRef.current.style.maskPosition = pos;
      };

      // Set initial mask position immediately
      updateMask();

      // Continuous horizontal wave ripple (scrolling sideways)
      gsap.to(waveX, {
        val: -160,
        duration: 1.8,
        repeat: -1,
        ease: "none",
        onUpdate: updateMask,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setIsDone(true);
          if (onComplete) onComplete();
        },
      });

      // 1. Synchronized liquid water rise + percentage roll-up (0% -> 100%)
      tl.to(proxy, {
        progress: 100,
        duration: 2.4,
        ease: "power2.inOut",
        onUpdate: () => {
          const rounded = Math.round(proxy.progress);

          if (counterRef.current) {
            counterRef.current.textContent = `${rounded}%`;
          }

          updateMask();
        },
      });

      // 2. Settle pause
      tl.to({}, { duration: 0.15 });

      // 3. Exit: Fade & scale text elements outward + smooth curtain wipe
      tl.to(textWrapRef.current, {
        scale: 1.08,
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });

      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.35"
      );
    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black text-white select-none overflow-hidden will-change-transform"
      aria-label="Site loading"
      role="status"
    >
      {/* Brand Text & Counter Wrapper */}
      <div ref={textWrapRef} className="relative inline-block select-none will-change-transform">
        {/* Dual-Layer Text Container */}
        <div className="relative inline-block select-none">
          {/* Inactive Base Layer */}
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-neutral-800">
            Sardar IT
          </span>

          {/* Liquid Fill Active Layer with Wavy Water Mask */}
          <span
            ref={fillTextRef}
            style={{
              WebkitMaskImage: `url("${WAVE_SVG}")`,
              maskImage: `url("${WAVE_SVG}")`,
              WebkitMaskRepeat: "repeat-x",
              maskRepeat: "repeat-x",
              WebkitMaskSize: "160px 600px",
              maskSize: "160px 600px",
              WebkitMaskPosition: "0px 999px",
              maskPosition: "0px 999px",
            }}
            className="absolute inset-0 block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white pointer-events-none select-none will-change-[mask-position,-webkit-mask-position]"
            aria-hidden="true"
          >
            Sardar IT
          </span>
        </div>

        {/* Small plain counter tucked at the bottom-right of the text block */}
        <div className="absolute right-0 top-full pt-1.5 sm:pt-2 flex items-center gap-1.5 text-xs sm:text-sm font-mono text-neutral-500 tracking-wider">
          <span>loading...</span>
          <span ref={counterRef} className="tabular-nums text-neutral-400">
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
