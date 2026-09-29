"use client";

import React, { useRef } from "react";
import { FiCheckCircle } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

// Enterprise Production Deliverables (Standard in Every Engagement)
const BRAND_DELIVERABLES = [
    {
        title: "Multi-Platform Design Tokens",
        sublabel: "Tailwind, React & Flutter Sync",
        desc: "Machine-readable token architectures (JSON) configured for automated cross-platform synchronization, dynamic theme switching, and instant engineering adoption.",
    },
    {
        title: "Component Systems & Storybook",
        sublabel: "Living Component Architecture",
        desc: "Exhaustive Figma component kits and synchronized Storybook libraries with complete interactive states, variants, and zero design drift.",
    },
    {
        title: "Vector Assets & Typography Hierarchy",
        sublabel: "Brand Identity Asset Suite",
        desc: "Master vector logo suites, responsive logomarks, comprehensive typographic scale definitions, and multi-format exports for print and digital surfaces.",
    },
    {
        title: "Design Governance & Accessibility",
        sublabel: "WCAG 2.1 AA Compliance Suite",
        desc: "Strict design governance documentation, WCAG 2.1 AA contrast audit sheets, screen-reader workflows, and frontend QA handoff specifications.",
    },
];

export default function BrandDeliverables() {
    const deliverablesRef = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(
                {
                    isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
                    isMobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
                },
                (context) => {
                    const { isDesktop, isMobile } = context.conditions;

                    // Header reveal (all screen sizes)
                    gsap.from(".deliverable-header-item", {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: deliverablesRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    });

                    // Desktop: Four-direction converging entrance
                    if (isDesktop) {
                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: ".deliverable-grid",
                                start: "top 75%",
                                toggleActions: "play none none none",
                            },
                        });

                        const cols = gsap.utils.toArray(".deliverable-col");
                        if (cols.length >= 4) {
                            tl.from(
                                cols[0],
                                {
                                    x: -160,
                                    opacity: 0,
                                    duration: 1.7,
                                    ease: "power4.out",
                                },
                                0
                            )
                                .from(
                                    [cols[1], cols[2]],
                                    {
                                        y: -120,
                                        opacity: 0,
                                        duration: 1.7,
                                        stagger: 0.1,
                                        ease: "power4.out",
                                    },
                                    0
                                )
                                .from(
                                    cols[3],
                                    {
                                        x: 160,
                                        opacity: 0,
                                        duration: 1.7,
                                        ease: "power4.out",
                                    },
                                    0
                                );
                        }
                    }

                    // Mobile & Tablet: Safe vertical stagger fade-up
                    if (isMobile) {
                        gsap.from(".deliverable-col", {
                            y: 50,
                            opacity: 0,
                            duration: 0.9,
                            stagger: 0.15,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: ".deliverable-grid",
                                start: "top 80%",
                                toggleActions: "play none none none",
                            },
                        });
                    }
                }
            );
        },
        { scope: deliverablesRef }
    );

    return (
        <section ref={deliverablesRef} className="w-full py-24 sm:py-32 lg:py-36 bg-white border-t border-neutral-200/80 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                {/* Header */}
                <div className="max-w-3xl">
                    <div className="deliverable-header-item inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-600 font-semibold mb-4">
                        <span className="size-2 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
                        <span>/ PRODUCTION DELIVERABLES</span>
                    </div>
                    <h2 className="deliverable-header-item text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-[1.15] mb-6">
                        Standard Deliverables in Every Engagement
                    </h2>
                    <p className="deliverable-header-item text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-16 lg:mb-24">
                        Ready-to-ship assets, token architectures, and design governance kits handed over with 100% IP ownership.
                    </p>
                </div>

                {/* Minimalist Border-Divided Grid Layout */}
                <div className="deliverable-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-neutral-200">
                    {BRAND_DELIVERABLES.map((item, idx) => (
                        <div
                            key={idx}
                            className={`deliverable-col p-8 sm:p-10 border-neutral-200 sm:border-r last:border-r-0 hover:bg-neutral-50/50 transition-colors group flex flex-col justify-between ${
                                idx === 3 ? "border-b-0" : "border-b"
                            } ${idx === 1 ? "sm:border-r-0 lg:border-r" : ""} ${
                                idx < 2 ? "sm:border-b lg:border-b-0" : "sm:border-b-0"
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <span className="font-mono text-xs font-semibold tracking-wider text-neutral-400 group-hover:text-blue-600 transition-colors uppercase">
                                        DELIVERABLE 0{idx + 1}
                                    </span>
                                    <FiCheckCircle className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300 shrink-0" />
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug mb-1.5 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <span className="text-xs sm:text-sm font-medium text-slate-500 block">
                                        {item.sublabel}
                                    </span>
                                </div>

                                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="pt-6 mt-8 border-t border-neutral-100 flex items-center justify-between">
                                <div className="inline-flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-mono font-medium text-neutral-600 tracking-wide">
                                        Production Ready
                                    </span>
                                </div>
                                <span className="text-[11px] font-mono text-neutral-400">
                                    100% IP
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
