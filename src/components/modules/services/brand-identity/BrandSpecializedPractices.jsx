"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

// Specialized Design Practices (Enterprise Production Standards)
const ON_DEMAND_SERVICES = [
    {
        image: "/image/project/CASA.webp",
        title: "Design Systems & Tokenization",
        desc: "Multi-platform design token architecture (JSON, Tailwind, React, Flutter), reusable component libraries, and strict design-to-code governance.",
        features: ["Multi-Platform Tokens", "WCAG 2.1 AA Compliance", "Dark & Light Modes", "Storybook Integration"],
        href: "/works/casa-viva",
        accent: "group-hover:border-blue-500/50",
        badgeTitle: "Design Systems",
    },
    {
        image: "/image/project/MedEase.webp",
        title: "Enterprise SaaS Product Design",
        desc: "High-density data dashboards, modular workflows, and friction-free onboarding designed for high-concurrency enterprise cloud platforms.",
        features: ["Data Visualizations", "Modular Components", "Role-Based Access UI", "Micro-Interactions"],
        href: "/works/medease",
        accent: "group-hover:border-purple-500/50",
        badgeTitle: "SaaS Product Design",
    },
    {
        image: "/image/project/HomeServiceProvider.webp",
        title: "Mobile App Design (iOS & Android)",
        desc: "Native touch-first mobile interfaces optimized for smooth gesture navigation, responsive haptics, and high task-completion velocity.",
        features: ["Native iOS & Android", "Gesture Navigation", "Mobile Component Kits", "App Store Visuals"],
        href: "/works/home-service",
        accent: "group-hover:border-emerald-500/50",
        badgeTitle: "Mobile UX/UI",
    },
    {
        image: "/image/project/White_Cross_Clinic.webp",
        title: "Healthcare & Clinical UX Systems",
        desc: "Patient portals, doctor scheduling interfaces, and clinical management systems with zero cognitive friction and high security.",
        features: ["Clinical Workflows", "Accessibility First", "Patient Dashboards", "Cross-Device Sync"],
        href: "/works/white-cross-clinic",
        accent: "group-hover:border-amber-500/50",
        badgeTitle: "Healthcare UX",
    },
    {
        image: "/image/project/asia-lms.webp",
        title: "Edtech & Interactive LMS Design",
        desc: "Engaging multimedia learning systems, course progress visualizers, and interactive student engagement dashboards.",
        features: ["Course Management UI", "Gamified Progress", "Virtual Classrooms", "High-Engagement UI"],
        href: "/works/asia-lms",
        accent: "group-hover:border-indigo-500/50",
        badgeTitle: "Edtech Design",
    },
    {
        image: "/image/project/gulf.webp",
        title: "UX Auditing & Heuristic Optimization",
        desc: "Data-driven heuristic evaluations, conversion funnel audits, and usability benchmark roadmaps to eliminate drop-offs.",
        features: ["Funnel Drop-Off Audit", "Usability Benchmarks", "Cognitive Load Mapping", "CRO Roadmaps"],
        href: "/contact",
        accent: "group-hover:border-rose-500/50",
        badgeTitle: "UX Audit & CRO",
    },
];

export default function BrandSpecializedPractices() {
    const practicesRef = useRef(null);

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
                    gsap.from(".practices-header-item", {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: practicesRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    });

                    // Desktop: 3D Isometric Card Unfold & Depth Entry + Image Zoom-Out Reveal + Feature Tags
                    if (isDesktop) {
                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: ".practices-grid",
                                start: "top 78%",
                                toggleActions: "play none none none",
                            },
                        });

                        // 1. 3D Isometric Card Unfold across 2x3 grid
                        tl.from(
                            ".practice-card",
                            {
                                rotateX: 16,
                                rotateY: -8,
                                y: 80,
                                scale: 0.93,
                                opacity: 0,
                                duration: 1.5,
                                ease: "expo.out",
                                stagger: {
                                    each: 0.14,
                                    grid: [2, 3],
                                    from: "start",
                                },
                            },
                            0
                        )
                            // 2. Inner Image Zoom-Out Reveal
                            .from(
                                ".practice-card-img",
                                {
                                    scale: 1.2,
                                    duration: 1.7,
                                    ease: "power3.out",
                                    stagger: {
                                        each: 0.14,
                                        grid: [2, 3],
                                        from: "start",
                                    },
                                },
                                0
                            )
                            // 3. Feature Tags Micro Stagger
                            .from(
                                ".practice-feat-item",
                                {
                                    opacity: 0,
                                    x: -10,
                                    duration: 0.6,
                                    stagger: 0.04,
                                    ease: "power2.out",
                                },
                                "-=0.6"
                            );
                    }

                    // Mobile & Tablet: Safe vertical stagger fade-up
                    if (isMobile) {
                        const tlMobile = gsap.timeline({
                            scrollTrigger: {
                                trigger: ".practices-grid",
                                start: "top 80%",
                                toggleActions: "play none none none",
                            },
                        });

                        tlMobile
                            .from(".practice-card", {
                                y: 40,
                                opacity: 0,
                                duration: 0.9,
                                stagger: 0.12,
                                ease: "power2.out",
                            })
                            .from(
                                ".practice-card-img",
                                {
                                    scale: 1.15,
                                    duration: 1.2,
                                    ease: "power3.out",
                                    stagger: 0.12,
                                },
                                0
                            );
                    }
                }
            );
        },
        { scope: practicesRef }
    );

    return (
        <section ref={practicesRef} className="w-full py-24 sm:py-32 lg:py-36 bg-white border-t border-neutral-200/80 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                {/* Header Spacing & Hierarchy */}
                <div className="max-w-3xl mb-16 lg:mb-24">
                    <div className="practices-header-item inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-600 font-semibold mb-4">
                        <span className="size-2 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
                        <span>/ TAILORED SOLUTIONS</span>
                    </div>
                    <h2 className="practices-header-item text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-[1.15] mb-6">
                        Our Specialized Design Practices
                    </h2>
                    <p className="practices-header-item text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                        Whether launching an MVP or re-architecting an enterprise SaaS suite, we provide dedicated design systems tailored to your technical requirements.
                    </p>
                </div>

                {/* Signature Minimalist Border-Divided Grid with 3D Isometric Perspective */}
                <div className="practices-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-neutral-200 [perspective:1400px]">
                    {ON_DEMAND_SERVICES.map((srv, idx) => (
                        <div
                            key={idx}
                            className="practice-card p-8 sm:p-10 border-b border-neutral-200 md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 hover:bg-neutral-50/60 transition-colors group flex flex-col justify-between [transform-style:preserve-3d] will-change-transform"
                        >
                            <div>
                                {/* Media Thumbnail Container with Overflow Masking */}
                                <div className="relative h-52 sm:h-60 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/70 mb-8">
                                    <div className="practice-card-img relative w-full h-full">
                                        <Image
                                            src={srv.image}
                                            alt={srv.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    {/* Step number pill anchored top-right */}
                                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 text-xs font-mono font-bold text-neutral-800 shadow-sm z-10">
                                        0{idx + 1}
                                    </div>
                                </div>

                                {/* Typography */}
                                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                                    {srv.title}
                                </h3>
                                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 font-normal line-clamp-3">
                                    {srv.desc}
                                </p>

                                {/* 2-Column Grid of Features */}
                                <div className="grid grid-cols-2 gap-2.5 mb-8 pt-5 border-t border-neutral-100">
                                    {srv.features.map((feat, fIdx) => (
                                        <div
                                            key={fIdx}
                                            className="practice-feat-item flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-700"
                                        >
                                            <span className="size-1.5 rounded-full bg-blue-600 shrink-0" />
                                            <span className="truncate">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Call to Action Button */}
                            <div className="pt-4 border-t border-neutral-100 flex items-center justify-start mt-auto">
                                <Link
                                    href={srv.href}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                                >
                                    <span>Explore Practice</span>
                                    <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
