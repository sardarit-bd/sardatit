"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BookaCallBtn from "../components/ui/BookaCallBtn";
import styles from "./HeroTitle.module.css";

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
    <section className="relative min-h-[80vh] md:min-h-[70vh] lg:min-h-[60vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,82,255,0.06),rgba(255,255,255,0))] text-slate-950">
      <div className="container relative z-10">
        <div className="flex flex-col items-start text-left max-w-3xl lg:max-w-4xl ml-0">
          {/* Main Wavespace-style Headline */}
          <div className="mb-6 mt-5 text-left">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] text-neutral-950 text-left"
            >
              <span className={styles.titleWrapper}>
                <span className={styles.gradient3dText}>
                  A global digital agency for products that ship,
                </span>
                <span className={`${styles.orbitDot} ${styles.dot1}`} aria-hidden="true">
                  ●
                </span>
                <span className={`${styles.orbitDot} ${styles.dot2}`} aria-hidden="true">
                  ●
                </span>
                <span className={`${styles.orbitDot} ${styles.dot3}`} aria-hidden="true">
                  ●
                </span>
              </span>{" "}
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
                    delay: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 origin-left bg-highlight"
                />

                {/* Text */}
                <span className="relative z-10 text-neutral-950 font-extrabold">
                  convert, and scale.
                </span>
              </motion.span>

            </motion.h1>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-start gap-4 pt-6"
          >
            {/* Dark Pill Primary Button */}
            <BookaCallBtn />

            {/* Secondary Outline Button */}
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-300 text-slate-900 font-semibold text-sm md:text-base transition-colors duration-300"
            >
              <span>View work</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



