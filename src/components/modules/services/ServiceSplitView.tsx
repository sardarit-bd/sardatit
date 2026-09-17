"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { SERVICES_DATA } from "@/data/services";
import { ServiceItem, ServiceSplitViewProps } from "@/types/service";

export default function ServiceSplitView({
  services = SERVICES_DATA,
  activeMode = "hover",
  className = "",
  initialServiceId,
  onServiceSelect,
  showCta = true,
}: ServiceSplitViewProps) {
  // Find initial active service index
  const initialIndex = initialServiceId
    ? services.findIndex(
        (s) => s.id === initialServiceId || s.slug === initialServiceId
      )
    : 0;

  const [activeIndex, setActiveIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const activeService = services[activeIndex] || services[0];

  // Callback when active service changes
  const handleSelectService = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
      if (onServiceSelect && services[index]) {
        onServiceSelect(services[index]);
      }
    },
    [activeIndex, onServiceSelect, services]
  );

  const handleImageError = (slug: string) => {
    setImageErrors((prev) => ({ ...prev, [slug]: true }));
  };

  // Preload preview images for seamless switching
  useEffect(() => {
    services.forEach((service) => {
      if (service.image && typeof window !== "undefined") {
        const img = new window.Image();
        img.src = service.image;
      }
    });
  }, [services]);

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Hidden preloader for instant cross-fade */}
      <div className="hidden" aria-hidden="true">
        {services.map((service) => (
          <img
            key={`preload-${service.slug}`}
            src={service.image}
            alt=""
            loading="eager"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Practice Cards */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-4">
          {services.map((service, idx) => {
            const isActive = idx === activeIndex;
            const itemNumber = (idx + 1).toString().padStart(2, "0");

            return (
              <div
                key={service.slug || service.id}
                role="button"
                tabIndex={0}
                aria-selected={isActive}
                onMouseEnter={() => {
                  if (activeMode === "hover") handleSelectService(idx);
                }}
                onClick={() => handleSelectService(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectService(idx);
                  }
                }}
                className={`group relative text-left p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  isActive
                    ? "bg-neutral-950 text-white border-neutral-900 shadow-xl shadow-neutral-950/15"
                    : "bg-white border-neutral-200/80 text-neutral-900 hover:bg-neutral-50/70 hover:border-neutral-300 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Top Row: Pill Badge + Tag */}
                    <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-semibold tracking-wider ${
                          isActive
                            ? "bg-blue-600/30 text-blue-400 border border-blue-500/40"
                            : "bg-neutral-100 text-neutral-500 border border-neutral-200/80"
                        }`}
                      >
                        {itemNumber}
                      </span>
                      {service.badgeTitle && (
                        <span
                          className={`text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            isActive
                              ? "bg-white/10 text-neutral-300"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {service.badgeTitle}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-neutral-900 group-hover:text-blue-600"
                      }`}
                    >
                      {service.title}
                    </h3>

                    {/* Descriptive Paragraph */}
                    <p
                      className={`text-sm sm:text-base leading-relaxed line-clamp-2 transition-colors ${
                        isActive ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      {service.description}
                    </p>

                    {/* Animated expandable row of feature pills with checkmarks */}
                    {isActive && service.features && service.features.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="mt-4 pt-4 border-t border-neutral-800 flex flex-wrap gap-2 overflow-hidden"
                      >
                        {service.features.slice(0, 3).map((feat, fIdx) => {
                          const featText =
                            typeof feat === "string" ? feat : feat.title;
                          return (
                            <span
                              key={fIdx}
                              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-white/10 border border-white/10 text-neutral-200"
                            >
                              <FiCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              <span>{featText}</span>
                            </span>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>

                  {/* Circular Icon Button with Arrow that rotates on active */}
                  <div
                    className={`shrink-0 size-10 sm:size-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30"
                        : "bg-neutral-50 border-neutral-200 text-neutral-500 group-hover:text-blue-600 group-hover:border-blue-200 group-hover:bg-blue-50/50"
                    }`}
                  >
                    <FiArrowUpRight
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                        isActive ? "rotate-45 text-white" : "group-hover:rotate-45"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky Dynamic Preview Window */}
        <div className="lg:col-span-6 xl:col-span-5 w-full lg:sticky lg:top-28">
          <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[580px] rounded-3xl overflow-hidden border border-neutral-200/80 shadow-2xl bg-neutral-950 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.slug || activeService.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                {/* Visual Image */}
                <Image
                  src={
                    imageErrors[activeService.slug]
                      ? activeService.fallbackImage || "/image/project/CASA.webp"
                      : activeService.image || "/image/project/CASA.webp"
                  }
                  alt={activeService.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => handleImageError(activeService.slug)}
                  className="object-cover object-center"
                />

                {/* High Contrast Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40 pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 text-white">
                  {/* Top Status Badges */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-200 shadow-sm">
                      <span className="size-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
                      <span>/ Specialized Practice</span>
                    </span>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/15 text-xs font-mono text-neutral-300 shadow-sm">
                      <span className="text-blue-400 font-bold">500+</span>
                      <span>Projects Delivered Globally</span>
                    </div>
                  </div>

                  {/* Bottom Content & Action Buttons */}
                  <div>
                    <span className="text-xs uppercase font-mono tracking-[0.2em] text-blue-400 font-semibold mb-2 block">
                      Enterprise Architecture
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-[1.2] tracking-tight">
                      {activeService.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-300 line-clamp-3 leading-relaxed mb-8 max-w-lg">
                      {activeService.detailedDescription || activeService.description}
                    </p>

                    {showCta && (
                      <div className="flex items-center gap-3.5 flex-wrap">
                        <Link
                          href={`/services/${activeService.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all hover:gap-3 cursor-pointer"
                        >
                          <span>Explore Practice</span>
                          <FiArrowUpRight className="w-4 h-4" />
                        </Link>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-semibold transition-all hover:bg-white/25 cursor-pointer"
                        >
                          <span>Get Free Proposal</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
