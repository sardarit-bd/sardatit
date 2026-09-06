"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  FiPlus,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiSmartphone,
  FiZap,
  FiCloud,
  FiCpu,
  FiActivity,
  FiShield,
} from "react-icons/fi";

export interface FeatureItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  glowColor: string;
  icon: React.ElementType;
}

export const SHOWCASE_FEATURES: FeatureItem[] = [
  {
    id: "cross-platform",
    title: "Cross-Platform Frameworks",
    badge: "iOS & Android",
    description:
      "Unified codebase engineering with React Native & Flutter. Native-grade 60fps fluidity with shared logic efficiency across mobile ecosystems.",
    image: "/image/services/mobile-dual-mockup.svg",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    badgeBorder: "border-sky-200",
    glowColor: "rgba(14, 165, 233, 0.08)",
    icon: FiSmartphone,
  },
  {
    id: "scalable-web",
    title: "Scalable Web Architecture",
    badge: "Next.js 16",
    description:
      "Edge-rendered, SEO-primed web applications built with React Server Components, zero layout shift, and instant sub-second TTFB.",
    image: "/image/services/web-performance.svg",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    badgeBorder: "border-purple-200",
    glowColor: "rgba(168, 85, 247, 0.08)",
    icon: FiZap,
  },
  {
    id: "cloud-backends",
    title: "Cloud & Headless Backends",
    badge: "Microservices",
    description:
      "Distributed database layers, auto-scaling Kubernetes clusters, and low-latency API mesh built for million-user concurrency.",
    image: "/image/services/cloud-infra.svg",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    badgeBorder: "border-blue-200",
    glowColor: "rgba(59, 130, 246, 0.08)",
    icon: FiCloud,
  },
  {
    id: "native-hardware",
    title: "Native Hardware Integrations",
    badge: "Sensors & APIs",
    description:
      "Deep integration with camera controls, biometric authentications, Bluetooth LE peripherals, and SQLite offline synchronizations.",
    image: "/image/services/native-sensors.svg",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    glowColor: "rgba(16, 185, 129, 0.08)",
    icon: FiCpu,
  },
  {
    id: "micro-interactions",
    title: "Ultra-Fluid Micro-Interactions",
    badge: "60fps Fluidity",
    description:
      "Delightful spatial interactions, dynamic spring haptics, and responsive layout transitions powered by high-performance canvas & shaders.",
    image: "/image/services/micro-ui.svg",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badgeBorder: "border-amber-200",
    glowColor: "rgba(245, 158, 11, 0.08)",
    icon: FiActivity,
  },
  {
    id: "enterprise-security",
    title: "Enterprise Security & Compliance",
    badge: "Zero-Trust",
    description:
      "End-to-end encrypted storage, automated SOC2 compliance auditing, biometric lock gates, and resilient token revocation.",
    image: "/image/services/security-shield.svg",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    badgeBorder: "border-indigo-200",
    glowColor: "rgba(99, 102, 241, 0.08)",
    icon: FiShield,
  },
];

const DEFAULT_IDLE_IMAGE = "/image/services/showcase-default.svg";

// Directional Carousel Transition Variants
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.32, 0.72, 0, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      duration: 0.45,
      ease: [0.32, 0.72, 0, 1],
    },
  }),
};

interface InteractiveFeatureShowcaseProps {
  className?: string;
}

export default function InteractiveFeatureShowcase({
  className = "",
}: InteractiveFeatureShowcaseProps) {
  // Dual-State Variables
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const activeFeature =
    activeIndex !== null ? SHOWCASE_FEATURES[activeIndex] : null;

  // Up & Down navigation handlers with circular looping
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => {
      if (prev === null || prev === 0) return SHOWCASE_FEATURES.length - 1;
      return prev - 1;
    });
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => {
      if (prev === null || prev === SHOWCASE_FEATURES.length - 1) return 0;
      return prev + 1;
    });
  }, []);

  const handleSelectPill = (index: number) => {
    if (!isExpanded || activeIndex === null) {
      setDirection(1);
      setActiveIndex(index);
      setIsExpanded(true);
    } else if (activeIndex !== index) {
      const dir = index > activeIndex ? 1 : -1;
      setDirection(dir);
      setActiveIndex(index);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setActiveIndex(null);
  };

  const handleImageError = (imageKey: string) => {
    setImageErrorMap((prev) => ({ ...prev, [imageKey]: true }));
  };

  // Keyboard navigation when expanded
  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, handlePrev, handleNext]);

  return (
    <div
      className={`relative w-full min-h-[680px] bg-white text-neutral-900 rounded-3xl border border-neutral-200/80 shadow-sm overflow-hidden p-6 md:p-12 flex items-center ${className}`}
      role="region"
      aria-label="Interactive Product Showcase"
    >
      {/* =========================================================================
          TOP-RIGHT CLOSE (✕) BUTTON (STATE 2 ONLY)
          ========================================================================= */}
      <AnimatePresence>
        {isExpanded && (
          <motion.button
            type="button"
            onClick={handleClose}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            aria-label="Close feature explorer"
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-600 hover:text-black flex items-center justify-center cursor-pointer transition-colors z-50 shadow-sm"
          >
            <FiX className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MAIN 2-COLUMN SPLIT GRID
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full relative z-10">
        {/* =========================================================================
            LEFT COLUMN: ENLARGED CONTENT (RED BOX LEFT)
            ========================================================================= */}
        <div className="lg:col-span-5 w-full max-w-md lg:max-w-lg z-20 flex items-start gap-4">
          {/* Floating Navigation Arrows (State 2 only: Up ▲ and Down ▼) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-2.5 shrink-0 pt-1"
              >
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous feature (Arrow Up)"
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 hover:text-black flex items-center justify-center shadow-sm cursor-pointer transition active:scale-90"
                >
                  <FiChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next feature (Arrow Down)"
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 hover:text-black flex items-center justify-center shadow-sm cursor-pointer transition active:scale-90"
                >
                  <FiChevronDown className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pills Accordion Stack */}
          <div className="flex flex-col gap-3.5 w-full">
            {SHOWCASE_FEATURES.map((item, index) => {
              const isActive = isExpanded && activeIndex === index;

              return (
                <motion.div
                  key={item.id}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 32,
                  }}
                  className="w-full flex justify-start"
                >
                  {isActive ? (
                    /* Expanded Active Card (Light Mode) */
                    <motion.div
                      layout
                      className="rounded-2xl bg-white border border-neutral-300/90 p-6 md:p-7 shadow-xl shadow-neutral-200/50 w-full text-left cursor-default"
                    >
                      {/* Header: Title + Tag Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                          <h3 className="text-lg md:text-xl font-bold text-neutral-950 tracking-tight">
                            {item.title}
                          </h3>
                        </div>
                        <span
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md ${item.badgeBg} ${item.badgeText} border ${item.badgeBorder} tracking-wide shrink-0`}
                        >
                          {item.badge}
                        </span>
                      </div>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-sm md:text-base text-neutral-600 leading-relaxed mt-3 font-normal"
                      >
                        {item.description}
                      </motion.p>
                    </motion.div>
                  ) : (
                    /* Compact Inactive Pill (Light Mode) */
                    <motion.button
                      layout
                      type="button"
                      onClick={() => handleSelectPill(index)}
                      className="px-5 py-3.5 rounded-full bg-neutral-100/90 hover:bg-neutral-200/80 border border-neutral-200 text-neutral-800 text-base font-semibold transition-all flex items-center gap-3 w-fit max-w-full cursor-pointer text-left shadow-2xs group"
                    >
                      <span className="w-5 h-5 rounded-full bg-white border border-neutral-300 text-neutral-500 group-hover:border-neutral-400 group-hover:text-black flex items-center justify-center text-xs font-bold shrink-0 transition-colors">
                        <FiPlus className="w-3 h-3" />
                      </span>
                      <span className="truncate">{item.title}</span>
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: MASSIVE TRANSPARENT STAGE (RED BOX RIGHT)
            ========================================================================= */}
        <div className="lg:col-span-7 relative w-full h-[520px] md:h-[640px] flex items-center justify-center overflow-hidden">
          {/* Subtle Dynamic Light Radial Glow */}
          <div
            style={{
              background: activeFeature
                ? `radial-gradient(ellipse at center, ${activeFeature.glowColor}, transparent 70%)`
                : "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.06), transparent 70%)",
            }}
            className="absolute inset-0 pointer-events-none transition-all duration-700"
          />

          {/* Carousel Motion Stage with Pure Transparent Background */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction}>
              {!isExpanded || activeFeature === null ? (
                /* STATE 1: Default centered transparent mockup */
                <motion.div
                  key="default-idle-transparent"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0 flex items-center justify-center p-2 sm:p-4"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={
                        imageErrorMap["default"]
                          ? SHOWCASE_FEATURES[0].image
                          : DEFAULT_IDLE_IMAGE
                      }
                      alt="Product Showcase Overview"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-contain object-center drop-shadow-[0_25px_35px_rgba(0,0,0,0.12)]"
                      onError={() => handleImageError("default")}
                    />
                  </div>
                </motion.div>
              ) : (
                /* STATE 2: Directional carousel slide with transparent mockup */
                <motion.div
                  key={activeFeature.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center p-2 sm:p-4"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {!imageErrorMap[activeFeature.id] ? (
                      <Image
                        src={activeFeature.image}
                        alt={activeFeature.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 65vw"
                        className="object-contain object-center drop-shadow-[0_25px_35px_rgba(0,0,0,0.12)]"
                        onError={() => handleImageError(activeFeature.id)}
                      />
                    ) : (
                      /* Clean Glass Card Fallback if image path is unavailable */
                      <TransparentGlassFallback item={activeFeature} />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Clean SVG vector fallback inside a transparent glass card container
 */
function TransparentGlassFallback({ item }: { item: FeatureItem }) {
  const Icon = item.icon;

  return (
    <div className="w-full h-full max-w-lg max-h-[460px] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-neutral-50/80 rounded-3xl border border-neutral-200/90 shadow-lg shadow-neutral-100 backdrop-blur-md">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-md relative"
        style={{ background: item.glowColor }}
      >
        <Icon className={`w-10 h-10 ${item.badgeText}`} />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-600 animate-ping" />
      </div>

      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${item.badgeBg} ${item.badgeText} border ${item.badgeBorder} mb-3`}
      >
        {item.badge}
      </span>

      <h4 className="text-2xl font-bold text-neutral-900 mb-2">{item.title}</h4>
      <p className="text-sm md:text-base text-neutral-600 max-w-md leading-relaxed font-normal">
        {item.description}
      </p>

      {/* Decorative Spec Badges */}
      <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-sm">
        <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-2xs text-left">
          <span className="text-[10px] text-neutral-500 uppercase block font-semibold">
            Speed
          </span>
          <span className="text-xs font-mono font-bold text-emerald-600">
            &lt; 16ms
          </span>
        </div>
        <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-2xs text-left">
          <span className="text-[10px] text-neutral-500 uppercase block font-semibold">
            Refresh
          </span>
          <span className="text-xs font-mono font-bold text-blue-600">
            60 FPS
          </span>
        </div>
        <div className="p-3 rounded-xl bg-white border border-neutral-200 shadow-2xs text-left">
          <span className="text-[10px] text-neutral-500 uppercase block font-semibold">
            Security
          </span>
          <span className="text-xs font-mono font-bold text-indigo-600">
            Zero-Trust
          </span>
        </div>
      </div>
    </div>
  );
}
