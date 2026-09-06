"use client";

import React, { useState, useEffect, useId, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiLayers } from "react-icons/fi";
import { SERVICES_DATA } from "@/lib/services";
import { ServiceItem, ServiceSplitViewProps } from "@/types/service";

export default function ServiceSplitView({
  services = SERVICES_DATA,
  activeMode = "hover",
  className = "",
  initialServiceId,
  onServiceSelect,
  showCta = true,
}: ServiceSplitViewProps) {
  const componentId = useId();
  
  // Find initial active service
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

  // Preload preview images
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
      {/* Hidden preloader for seamless transitions */}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Interactive Service Selector */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-3">
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
                className={`group relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  isActive
                    ? "bg-neutral-900 text-white border-neutral-800 shadow-xl shadow-neutral-950/10 scale-[1.01]"
                    : "bg-neutral-50/60 hover:bg-neutral-100 text-neutral-800 border-neutral-200/80"
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div
                    layoutId={`active-indicator-${componentId}`}
                    className="absolute left-0 top-3 bottom-3 w-1.5 bg-blue-600 rounded-r-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    {/* Numeric Badge */}
                    <span
                      className={`text-xs sm:text-sm font-mono font-bold tracking-wider pt-0.5 transition-colors ${
                        isActive ? "text-blue-400" : "text-neutral-400 group-hover:text-neutral-600"
                      }`}
                    >
                      {itemNumber}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3
                          className={`text-lg sm:text-xl lg:text-2xl font-bold tracking-tight transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-neutral-900 group-hover:text-blue-600"
                          }`}
                        >
                          {service.title}
                        </h3>
                        {service.badgeTitle && (
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              isActive
                                ? "bg-white/10 text-neutral-300"
                                : "bg-neutral-200/80 text-neutral-700"
                            }`}
                          >
                            {service.badgeTitle}
                          </span>
                        )}
                      </div>

                      {/* Brief Description */}
                      <p
                        className={`text-sm mt-1.5 line-clamp-2 leading-relaxed transition-colors ${
                          isActive
                            ? "text-neutral-300"
                            : "text-neutral-600 group-hover:text-neutral-700"
                        }`}
                      >
                        {service.description}
                      </p>

                      {/* Deliverables / Features Chips (Active state) */}
                      {isActive && service.features && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-3.5 pt-3 border-t border-neutral-800/80 flex flex-wrap gap-2"
                        >
                          {service.features.slice(0, 3).map((feat, fIdx) => {
                            const featText =
                              typeof feat === "string" ? feat : feat.title;
                            return (
                              <span
                                key={fIdx}
                                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300"
                              >
                                <FiCheck className="w-3 h-3 text-blue-400" />
                                {featText}
                              </span>
                            );
                          })}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Route Jump Arrow */}
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View details for ${service.title}`}
                    className={`shrink-0 p-2 sm:p-2.5 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 border-white/20 text-white hover:bg-blue-600 hover:border-blue-600"
                        : "bg-white border-neutral-200 text-neutral-600 group-hover:text-blue-600 group-hover:border-blue-200 shadow-sm"
                    }`}
                  >
                    <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Preview Card */}
        <div className="lg:col-span-6 xl:col-span-5 w-full">
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden border border-neutral-200/80 shadow-2xl bg-neutral-900 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                {/* Visual Image */}
                <Image
                  src={
                    imageErrors[activeService.slug]
                      ? activeService.fallbackImage || "/image/project/CASA.webp"
                      : activeService.image
                  }
                  alt={activeService.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => handleImageError(activeService.slug)}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Ambient Dark Overlay with Glassmorphism Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-6 sm:p-8 text-white">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white">
                      <FiLayers className="w-3.5 h-3.5 text-blue-400" />
                      {activeService.badgeTitle || "Service Preview"}
                    </span>

                    {activeService.stats && activeService.stats.length > 0 && (
                      <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-neutral-200">
                        <span className="text-blue-400 font-bold">
                          {activeService.stats[0].value}
                        </span>{" "}
                        {activeService.stats[0].label}
                      </div>
                    )}
                  </div>

                  {/* Bottom Content & Action */}
                  <div>
                    <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-1 block">
                      Featured Architecture
                    </span>
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                      {activeService.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-200/90 line-clamp-3 leading-relaxed mb-5 max-w-md">
                      {activeService.detailedDescription || activeService.description}
                    </p>

                    {showCta && (
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/services/${activeService.slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all hover:gap-3 cursor-pointer"
                        >
                          <span>Explore Service</span>
                          <FiArrowUpRight className="w-4 h-4" />
                        </Link>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-medium transition-colors"
                        >
                          <span>Get Quote</span>
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
