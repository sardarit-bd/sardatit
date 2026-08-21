"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BookaCallBtn from "../components/ui/BookaCallBtn";
import Threads from "./sections/Threads";

const clientAvatars = [
  {
    name: "Ishraq Khan",
    role: "CEO @ TechCorp",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  },
  {
    name: "Nikita Ribakovs",
    role: "Founder @ SaaSify",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  },
  {
    name: "Matt Kabus",
    role: "CEO @ VentureApp",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-[70vh] lg:min-h-[60vh] flex items-center justify-center pt-28 pb-12 overflow-hidden bg-white text-slate-950">
      <Threads
        color={[1, 1, 1]}
        amplitude={2.4}
        distance={0.5}
        enableMouseInteraction={false}
        className="absolute inset-0 top-60 md:top-40 w-full h-full"
      />
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[300px] h-[300px] bg-[#133bd4]/30 rounded-full blur-[140px]" />
        <div className="absolute top-20 right-1/4 w-[350px] h-[350px] bg-[#133bd4]/15 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        {/* Availability Pill Tag */}


        {/* Main Wavespace-style Headline */}
        <div className="mb-6 max-w-5xl mt-5">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.15] text-slate-900/90"
          >
            A global digital agency for products that ship,{" "}
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative inline-block overflow-hidden px-3 py-1 md:px-5 md:py-1.5 text-white mt-3"
            >
              {/* Background reveal */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  delay: .25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 origin-left bg-highlight"
              />

              {/* Text */}
              <span className="relative z-10 text-black">
                convert, and scale.
              </span>
            </motion.span>

          </motion.h1>
        </div>

        {/* Details Row: Sub-paragraph & Founders Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end"
        >
          {/* Paragraph */}
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed hidden">
              Build your brand with design, engineering, and growth marketing
              under one team. We build high-converting web apps, AI software,
              and digital platforms for startups and enterprise teams.
            </p>
          </div>

          {/* Social Proof Founders Stack & Rating */}
          <div className="lg:col-span-5 flex items-center gap-4 lg:justify-end hidden">
            <div className="flex -space-x-3 overflow-hidden p-1">
              {clientAvatars.map((client, idx) => (
                <img
                  key={idx}
                  src={client.image}
                  alt={client.name}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-xs"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-slate-950">
                Loved by 80+
              </div>
              <div className="text-xs font-medium text-slate-500">
                Founders & Tech Leaders
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center gap-4 md:gap-6 pt-6"
        >
          {/* Dark Pill Primary Button */}
          <BookaCallBtn />

          {/* Secondary Outline Button */}
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-sm md:text-base transition-colors duration-300"
          >
            <span>View work</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}



