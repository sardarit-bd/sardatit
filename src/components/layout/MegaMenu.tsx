"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// Raw, Flat SVG Icons for the 4 Core Services
// ============================================================================

export function LayersDesignIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
      <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

export function CodeLaptopIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="2" fill="currentColor" fillOpacity="0.08" />
      <path d="m9 8.5-2.5 2.5 2.5 2.5" />
      <path d="m15 8.5 2.5 2.5-2.5 2.5" />
      <path d="M2 18h20" />
      <path d="M7 18v2h10v-2" />
    </svg>
  );
}

export function WorkflowCpuIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" fillOpacity="0.08" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  );
}

export function GrowthChartIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
      <path d="M14 9h5v5" />
      <path d="M19 9l-5 5-4-4-3 3" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

// ============================================================================
// Exactly 4 Core Services
// ============================================================================

export interface CoreServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CORE_SERVICES: CoreServiceItem[] = [
  {
    id: "product-design",
    number: "01",
    title: "Digital Product Design & Brand Systems",
    subtitle: "Design systems, UI/UX architecture & modern brand identity",
    href: "/services/brand-identity",
    icon: LayersDesignIcon,
  },
  {
    id: "engineering",
    number: "02",
    title: "Enterprise Web & Mobile App Engineering",
    subtitle: "High-performance full-stack web and cross-platform apps",
    href: "/services/web-mobile-development",
    icon: CodeLaptopIcon,
  },
  {
    id: "automation",
    number: "03",
    title: "Intelligent Workflow Automation & AI Integration",
    subtitle: "Autonomous pipelines, self-hosted webhooks & custom AI agents",
    href: "/services/ai-automation-solutions",
    icon: WorkflowCpuIcon,
  },
  {
    id: "growth",
    number: "04",
    title: "Digital Growth & Global Marketing",
    subtitle: "Data-driven SEO, conversion audits & performance scaling",
    href: "/services/digital-marketing",
    icon: GrowthChartIcon,
  },
];

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="hidden lg:block absolute top-full inset-x-0 w-full pointer-events-none z-50"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Global Container Alignment: Left edge aligns with logo, right edge with 'Book a call' */}
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="pointer-events-auto w-full bg-white border-x border-b border-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              {/* Category Header Row */}
              <div className="pt-6 px-6 lg:px-8 pb-4 border-b border-neutral-100 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                  SERVICES
                </span>
                <span className="text-xs font-mono text-neutral-400 tracking-wider">
                  4 CORE PILLARS · END-TO-END EXECUTION
                </span>
              </div>

              {/* 4-Column Grid with Vertical Line Dividers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-200/80 py-8">
                {CORE_SERVICES.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.id}
                      href={service.href}
                      onClick={onClose}
                      className="group flex flex-col justify-between px-6 lg:px-8 py-4 lg:py-2 transition-colors cursor-pointer"
                    >
                      <div>
                        {/* Top Icon & Number */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="text-slate-500 group-hover:text-blue-600 transition-colors">
                            <Icon className="w-7 h-7" />
                          </div>
                          <span className="font-mono text-xs font-semibold text-slate-300 group-hover:text-blue-600 transition-colors">
                            {service.number}
                          </span>
                        </div>

                        {/* Title with Arrow */}
                        <h3 className="text-base lg:text-lg font-bold text-neutral-900 group-hover:text-blue-600 transition-colors inline-flex items-center gap-2 tracking-tight">
                          <span>{service.title}</span>
                          <svg
                            className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all duration-200 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </h3>

                        {/* Subtitle */}
                        <p className="text-xs lg:text-sm text-neutral-500 mt-2 leading-relaxed font-normal group-hover:text-neutral-600 transition-colors">
                          {service.subtitle}
                        </p>
                      </div>

                      {/* Explore Link Tag */}
                      <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                        <span>Explore Pillar</span>
                        <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
