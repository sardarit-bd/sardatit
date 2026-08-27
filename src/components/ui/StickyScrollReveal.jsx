"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useRef, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import SectionHeader from "./SectionHeader";

const gradients = [
  "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
  "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
  "linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)",
];

const accentColors = ["#38bdf8", "#a855f7", "#34d399", "#fbbf24"];

export function StickyScrollReveal({ content }) {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestIndex);
  });

  return (
    <div ref={containerRef} className="relative w-full py-10 lg:py-20 bg-white text-neutral-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        <SectionHeader tag={"OUR CORE VALUES"} title1="Values That Set Us Apart" pre=" Our principles shape every line of code we write, every pixel we refine, and every client relationship we build." title2="" isBgWhite={true} width="max-w-4xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative mt-10">
          {/* Left Column: Scrolling Text Items */}
          <div className="lg:col-span-6 flex flex-col gap-12 py-4">
            {content.map((item, index) => {
              const isActive = activeCard === index;
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title + index}
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                    scale: isActive ? 1.02 : 0.98,
                    x: isActive ? 8 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActiveCard(index)}
                  className={`cursor-pointer p-8 sm:p-10 border transition-all duration-300 ${isActive
                    ? "bg-[#F3F5F7] border-[#133bd4]/40 shadow-xl"
                    : "bg-[#FAFAFA] border-neutral-200/60 hover:opacity-70"
                    }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`size-12 rounded-2xl flex items-center justify-center text-xl transition-colors ${isActive
                        ? "bg-[#133bd4] text-white shadow-md"
                        : "bg-white text-neutral-500 border border-neutral-200"
                        }`}
                    >
                      <Icon />
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full ${isActive
                        ? "bg-blue-100 text-[#133bd4]"
                        : "bg-neutral-200/60 text-neutral-500"
                        }`}
                    >
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Sticky Visual Container (Aceternity Style) */}
          <div className="hidden lg:block lg:col-span-6 h-full">
            <div className="sticky top-28 lg:top-32">
              <motion.div
                animate={{
                  background: gradients[activeCard % gradients.length],
                }}
                transition={{ duration: 0.6 }}
                className="w-full h-[460px] p-10 text-white shadow-2xl border border-white/10 flex flex-col justify-between overflow-hidden relative"
              >
                {/* Background ambient glow */}
                <motion.div
                  animate={{
                    backgroundColor: accentColors[activeCard % accentColors.length],
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute -top-24 -right-24 size-72 rounded-full blur-[100px] opacity-30 pointer-events-none"
                />

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    {content[activeCard].step} / {content.length < 10 ? `0${content.length}` : content.length}
                  </span>
                  <FiCheckCircle className="text-2xl" style={{ color: accentColors[activeCard % accentColors.length] }} />
                </div>

                <div className="relative z-10 my-auto py-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-4"
                    >
                      <div
                        className="size-16 rounded-2xl flex items-center justify-center text-3xl bg-white/10 backdrop-blur-md border border-white/20 mb-2 shadow-inner"
                        style={{ color: accentColors[activeCard % accentColors.length] }}
                      >
                        {React.createElement(content[activeCard].icon)}
                      </div>
                      <h3 className="text-3xl font-bold tracking-tight text-white">
                        {content[activeCard].title}
                      </h3>
                      <p className="text-white/80 text-base leading-relaxed max-w-md">
                        {content[activeCard].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress dots at bottom */}
                <div className="flex items-center gap-2 relative z-10">
                  {content.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCard(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeCard === idx
                        ? "w-8 bg-white"
                        : "w-2 bg-white/30 hover:bg-white/50"
                        }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
