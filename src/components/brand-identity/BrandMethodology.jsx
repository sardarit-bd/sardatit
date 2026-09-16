"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function BrandMethodology({ processSteps = [] }) {
    const methodologyRef = useRef(null);

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
                    gsap.from(".methodology-header-item", {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: methodologyRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    });

                    // Desktop: Four-direction converging entrance
                    if (isDesktop) {
                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: ".methodology-grid",
                                start: "top 75%",
                                toggleActions: "play none none none",
                            },
                        });

                        const cols = gsap.utils.toArray(".methodology-col");
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
                        gsap.from(".methodology-col", {
                            y: 50,
                            opacity: 0,
                            duration: 0.9,
                            stagger: 0.15,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: ".methodology-grid",
                                start: "top 80%",
                                toggleActions: "play none none none",
                            },
                        });
                    }
                }
            );
        },
        { scope: methodologyRef }
    );

    if (!processSteps || processSteps.length === 0) return null;

    return (
        <section ref={methodologyRef} className="w-full py-24 sm:py-32 lg:py-36 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                {/* Header */}
                <div className="max-w-3xl">
                    <div className="methodology-header-item inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-600 font-semibold mb-4">
                        <span className="size-2 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
                        <span>/ ENGINEERING METHODOLOGY</span>
                    </div>
                    <h2 className="methodology-header-item text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15] mb-6">
                        How We Architect Digital Design Systems
                    </h2>
                    <p className="methodology-header-item text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-16 lg:mb-24">
                        From brand archetype strategy to tokenized code handoff, our four-stage framework ensures seamless design-to-development execution.
                    </p>
                </div>

                {/* Minimalist Border-Divided Grid */}
                <div className="methodology-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-neutral-200">
                    {processSteps.map((stepItem, idx) => (
                        <div
                            key={stepItem.step}
                            className={`methodology-col p-8 sm:p-10 lg:p-12 border-neutral-200 sm:border-r last:border-r-0 hover:bg-neutral-50/50 transition-colors group flex flex-col justify-start ${
                                idx === 3 ? "border-b-0" : "border-b"
                            } ${idx === 1 ? "sm:border-r-0 lg:border-r" : ""} ${
                                idx < 2 ? "sm:border-b lg:border-b-0" : "sm:border-b-0"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-8 sm:mb-10">
                                <span className="font-mono text-2xl font-light text-neutral-400 group-hover:text-blue-600 transition-colors">
                                    {stepItem.step}
                                </span>
                                <span className="size-2 rounded-full bg-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 leading-snug mb-4">
                                {stepItem.title}
                            </h3>
                            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                                {stepItem.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
