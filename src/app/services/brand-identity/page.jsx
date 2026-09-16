"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}
import {
    FiActivity,
    FiArrowLeft,
    FiArrowRight,
    FiArrowUpRight,
    FiBookOpen,
    FiCheckCircle,
    FiCpu,
    FiCreditCard,
    FiLayers,
    FiServer,
    FiShield,
    FiShoppingBag,
    FiZap
} from "react-icons/fi";
import Cta from "@/components/Cta";
import { InfiniteSpiral } from "@/components/InfiniteSpiral";
import TrustedBy from "@/components/TrustedBy";
import ServiceSplitView from "@/components/ServiceSplitView";
import { AceternityFaq } from "@/components/ui/AceternityFaq";
import BookaCallBtn from "@/components/ui/BookaCallBtn";
import { getServiceBySlug, getAdjacentServices } from "@/lib/services";

// 1. Verified Local Project Assets for Hero Infinite Spiral Showcase
const HERO_SPIRAL_ITEMS = [
    {
        src: "/image/project/CASA.webp",
        alt: "Casa Viva Luxury Real Estate Platform",
        href: "/works/casa-viva",
    },
    {
        src: "/image/project/MedEase.webp",
        alt: "MedEase Healthcare & Clinical Suite",
        href: "/works/medease",
    },
    {
        src: "/image/project/White_Cross_Clinic.webp",
        alt: "White Cross Clinic Patient Portal",
        href: "/works/white-cross-clinic",
    },
    {
        src: "/image/project/asia-lms.webp",
        alt: "Asia LMS Enterprise Learning Ecosystem",
        href: "/works/asia-lms",
    },
    {
        src: "/image/project/gulf.webp",
        alt: "Gulf Coast Music Digital Platform",
        href: "/works/gulf-coast-music",
    },
    {
        src: "/image/project/HomeServiceProvider.webp",
        alt: "Home Service On-Demand Mobile App",
        href: "/works/home-service",
    },
    {
        src: "/image/project/CASA.webp",
        alt: "Casa Viva Design Tokens & UI Architecture",
        href: "/works/casa-viva",
    },
    {
        src: "/image/project/MedEase.webp",
        alt: "MedEase Telehealth Interaction Prototype",
        href: "/works/medease",
    },
];

// 2. Specialized Design Practices (Enterprise Production Standards)
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

// 3. Enterprise Production Deliverables (Standard in Every Engagement)
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

// 4. Cross-Industry Domain Expertise (The Interactive Split Showcase)
const INDUSTRIES = [
    {
        id: "fintech",
        name: "Fintech & Banking",
        icon: FiCreditCard,
        statusBadge: "PCI-DSS Level 1 & Zero-Trust",
        headline: "High-Frequency Financial & Trading Architecture",
        tagline: "Mission-critical architectures engineered for sub-millisecond trading execution, frictionless multi-currency payment gateways, and automated zero-trust compliance.",
        capabilities: [
            "Real-Time Trading & Portfolio Telemetry",
            "Multi-Currency Payment Gateway APIs",
            "Zero-Trust Ledger & Audit Encryption",
            "Sub-Millisecond Order Routing Engine",
        ],
        metric: { value: "99.999%", label: "Uptime SLA Guarantee" },
        accentGradient: "from-blue-600/30 via-indigo-600/15 to-transparent",
    },
    {
        id: "healthcare",
        name: "Healthcare & Medtech",
        icon: FiActivity,
        statusBadge: "HIPAA Aligned & HL7/FHIR",
        headline: "Confidential Clinical Suites & EHR Ecosystems",
        tagline: "Secure clinical workflows, electronic health record suites, and telemedicine interfaces engineered for zero data breach tolerance and seamless patient triage.",
        capabilities: [
            "Encrypted Telemedicine & Video Triage",
            "EHR Integration & HL7/FHIR Pipelines",
            "Clinical Diagnostic Telemetry Dashboards",
            "Zero-Leakage Patient Record Vaults",
        ],
        metric: { value: "<50ms", label: "P99 Telemetry Latency" },
        accentGradient: "from-emerald-500/30 via-teal-600/15 to-transparent",
    },
    {
        id: "saas",
        name: "Enterprise SaaS",
        icon: FiServer,
        statusBadge: "SOC2 Type II & Multi-Tenant",
        headline: "Scalable Multi-Tenant Cloud & Microservices",
        tagline: "Multi-tenant cloud management consoles, devops infrastructure tooling, and resilient microservices built for limitless horizontal scale and unified observability.",
        capabilities: [
            "Multi-Tenant RBAC & Tenant Isolation",
            "Cloud Microservices & Kubernetes Tooling",
            "Unified Distributed Tracing & Logs",
            "Automated Multi-Region Failover",
        ],
        metric: { value: "10M+", label: "Concurrent API Requests" },
        accentGradient: "from-purple-600/30 via-blue-600/15 to-transparent",
    },
    {
        id: "ecommerce",
        name: "Digital Commerce",
        icon: FiShoppingBag,
        statusBadge: "High Concurrency & Edge-Cached",
        headline: "Headless Omnichannel Commerce & Marketplaces",
        tagline: "High-conversion shopping ecosystems, headless Next.js storefronts, multi-vendor marketplace networks, and low-latency inventory sync engines built for extreme surge traffic.",
        capabilities: [
            "Frictionless Instant Checkout Funnels",
            "Multi-Vendor Marketplace Infrastructure",
            "Edge-Rendered Next.js Storefronts",
            "Real-Time Distributed Inventory Sync",
        ],
        metric: { value: "3.2x", label: "Checkout Conversion Lift" },
        accentGradient: "from-amber-500/30 via-orange-600/15 to-transparent",
    },
    {
        id: "edtech",
        name: "Edtech & LMS",
        icon: FiBookOpen,
        statusBadge: "SCORM & WCAG 2.1 AA Compliant",
        headline: "Scalable Virtual Campuses & Interactive Learning",
        tagline: "Scalable virtual campuses, interactive learning management systems, low-latency WebRTC video classrooms, and gamified student progression analytics.",
        capabilities: [
            "SCORM/xAPI Interactive Course Modules",
            "Low-Latency WebRTC Video Classrooms",
            "Gamified Progression & Skill Badging",
            "Real-Time Student Retention Telemetry",
        ],
        metric: { value: "100%", label: "WCAG 2.1 AA Compliance" },
        accentGradient: "from-sky-500/30 via-blue-600/15 to-transparent",
    },
    {
        id: "ai",
        name: "Autonomous AI",
        icon: FiCpu,
        statusBadge: "Agentic Ops & Zero-Data-Drift",
        headline: "Autonomous LLM Pipelines & Predictive Portals",
        tagline: "Production-grade generative AI interfaces, autonomous agent orchestrators, automated document intelligence pipelines, and predictive analytics portals built on enterprise model foundations.",
        capabilities: [
            "Agentic AI Copilots & Tool Calling",
            "Multimodal Document OCR Pipelines",
            "Real-Time LLM Observability & Guardrails",
            "Predictive Decision Intelligence Engines",
        ],
        metric: { value: "98.4%", label: "Model Extraction Precision" },
        accentGradient: "from-violet-600/30 via-indigo-600/15 to-transparent",
    },
];

// 4. Categorized FAQ Data
const FAQ_GROUPS = [
    {
        category: "Enterprise Deliverables & Architecture",
        items: [
            {
                q: "What makes Sardar IT's Brand Identity & Product Design different from graphic design agencies?",
                a: "We approach brand identity as an enterprise software system. Beyond logos and typography, we deliver multi-platform token kits (JSON, Tailwind, React, Flutter), component libraries, Storybook documentation, and WCAG 2.1 accessibility compliance to bridge the gap between design and production code.",
            },
            {
                q: "How does a unified design system accelerate our engineering velocity?",
                a: "Tokenized design systems eliminate redundant frontend code, reduce design debt, and enable engineering teams to ship features up to 40% faster with 100% brand consistency across web, iOS, and Android applications.",
            },
            {
                q: "Do we receive 100% intellectual property and code ownership?",
                a: "Yes. All design files, Figma libraries, vector suites, brand documentation, and code token repositories are 100% transferred to your enterprise upon project completion.",
            },
        ],
    },
    {
        category: "Process, Timeline & Collaboration",
        items: [
            {
                q: "How long does an enterprise brand and design system project take?",
                a: "Typical engagements run between 4 to 8 weeks depending on scope. An MVP brand identity kit takes 3-4 weeks, while an enterprise-wide multi-platform design system with Storybook integration typically spans 6-8 weeks.",
            },
            {
                q: "How does Sardar IT handle developer handoff?",
                a: "We collaborate directly with your development team via Figma, Storybook, and shared Slack channels. We provide tokenized design JSONs, responsive breakpoints, component states, and continuous QA reviews during the frontend implementation phase.",
            },
            {
                q: "Can Sardar IT also engineer the frontend and backend applications?",
                a: "Absolutely. As a full-cycle software engineering firm, our in-house developers can seamlessly transition design tokens into production-ready Next.js, React, Node.js, and Flutter codebases.",
            },
        ],
    },
];

export default function BrandIdentityPage() {
    // 1. Central Data Source Integration
    const service = getServiceBySlug("brand-identity");
    const { prev, next } = getAdjacentServices("brand-identity");

    // Corporate metrics aligned with Sardar IT Company Profile
    const stats = service?.stats || [
        { label: "Projects Delivered Globally", value: "500+" },
        { label: "Client Satisfaction Rate", value: "99%" },
        { label: "Countries Served", value: "60+" },
        { label: "Design System Adoption", value: "100%" },
    ];

    const processSteps = service?.processSteps || [];

    // Scoped container refs for GSAP ScrollTrigger animations
    const methodologyRef = useRef(null);
    const deliverablesRef = useRef(null);
    const practicesRef = useRef(null);

    // Interactive Split Showcase state for Industries section
    const [activeSector, setActiveSector] = useState(0);

    // 1. GSAP ScrollTrigger Animations for Methodology Section
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
                            // Card 1 (Leftmost): enters from left
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
                                // Card 2 & Card 3 (Middle two): drop down from top
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
                                // Card 4 (Rightmost): enters from right
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

    // 2. GSAP ScrollTrigger Animations for Deliverables Section
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
                            // Card 1 (Leftmost): enters from left
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
                                // Card 2 & Card 3 (Middle two): drop down from top
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
                                // Card 4 (Rightmost): enters from right
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

    // 3. GSAP ScrollTrigger Animations for Specialized Design Practices (3D Isometric Unfold)
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
        <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-20 relative">
            {/* Background Ambient Glow Effects */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

            <div className="bg-[#f8fafc] min-h-[calc(100dvh-80px)] flex flex-col justify-center py-10 lg:py-16 relative overflow-hidden">
                {/* -------------------- 1. HERO SECTION -------------------- */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-12 my-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        {/* Left Column: Hero Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-7 flex flex-col justify-center"
                        >
                            {/* Eyebrow Pill */}
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-semibold mb-6 w-fit">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                                </span>
                                <span>{service?.badgeTitle || "Brand & Design Systems"}</span>
                                <span className="text-neutral-300">|</span>
                                <span className="text-neutral-500 font-mono text-xs">Enterprise Practice</span>
                            </div>

                            {/* Main Display Headline (Sleek, High-Contrast Typography) */}
                            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.12] mb-6">
                                Engineering Cohesive Brands &{" "}
                                <span className="text-[#133BD4] inline-block">
                                    Digital Design Systems
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-neutral-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
                                {service?.description ||
                                    "Architecting intuitive digital experiences, tokenized design systems, and cohesive brand identities that resonate across 60+ global markets."}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap items-center gap-4">
                                <BookaCallBtn />
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-neutral-100 transition-all cursor-pointer"
                                >
                                    <span>Request Proposal</span>
                                    <FiArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Column: Infinite Spiral 3D Visual with Local Assets */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            className="lg:col-span-5 relative w-full h-[440px] sm:h-[500px] lg:h-[540px] xl:h-[580px] overflow-hidden flex items-center justify-center"
                        >
                            <InfiniteSpiral
                                items={HERO_SPIRAL_ITEMS}
                                cardWidth={160}
                                cardHeight={115}
                                radius={175}
                                verticalSpacing={65}
                                speed={0.55}
                                pauseOnHover={true}
                                animationMode="auto"
                                centerScale={1.25}
                                edgeFade={0.35}
                                edgeBlur={5}
                                className="w-full h-full"
                            />
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* -------------------- 2. ENTERPRISE KPI METRICS BANNER -------------------- */}
            <section className="w-full bg-[#0B1120] text-white py-12 border-y border-slate-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col">
                                <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-1">
                                    {stat.value}
                                </span>
                                <span className="text-xs sm:text-sm font-medium text-slate-400">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <TrustedBy />

            {/* -------------------- 3. PROCESS STEPS (Central Data Source) -------------------- */}
            {processSteps.length > 0 && (
                <section ref={methodologyRef} className="w-full py-24 sm:py-32 lg:py-36 bg-white overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                        {/* Header with high-contrast hierarchy & generous spacing */}
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

                        {/* Minimalist Border-Divided Grid Layout */}
                        <div className="methodology-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-neutral-200">
                            {processSteps.map((stepItem, idx) => (
                                <div
                                    key={stepItem.step}
                                    className={`methodology-col p-8 sm:p-10 lg:p-12 border-neutral-200 sm:border-r last:border-r-0 hover:bg-neutral-50/50 transition-colors group flex flex-col justify-start ${idx === 3 ? "border-b-0" : "border-b"
                                        } ${idx === 1 ? "sm:border-r-0 lg:border-r" : ""
                                        } ${idx < 2 ? "sm:border-b lg:border-b-0" : "sm:border-b-0"
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
            )}

            {/* -------------------- 4. PRODUCTION DELIVERABLES MATRIX -------------------- */}
            <section ref={deliverablesRef} className="w-full py-24 sm:py-32 lg:py-36 bg-white border-t border-neutral-200/80 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    {/* Header with high-contrast hierarchy & generous spacing */}
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
                                className={`deliverable-col p-8 sm:p-10 border-neutral-200 sm:border-r last:border-r-0 hover:bg-neutral-50/50 transition-colors group flex flex-col justify-between ${idx === 3 ? "border-b-0" : "border-b"
                                    } ${idx === 1 ? "sm:border-r-0 lg:border-r" : ""
                                    } ${idx < 2 ? "sm:border-b lg:border-b-0" : "sm:border-b-0"
                                    }`}
                            >
                                <div>
                                    {/* Header row: Index label on left, circular checkmark on right */}
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="font-mono text-xs font-semibold tracking-wider text-neutral-400 group-hover:text-blue-600 transition-colors uppercase">
                                            DELIVERABLE 0{idx + 1}
                                        </span>
                                        <FiCheckCircle className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300 shrink-0" />
                                    </div>

                                    {/* Title with high contrast & secondary sub-label in muted slate */}
                                    <div className="mb-4">
                                        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug mb-1.5 group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <span className="text-xs sm:text-sm font-medium text-slate-500 block">
                                            {item.sublabel}
                                        </span>
                                    </div>

                                    {/* Clear brief description */}
                                    <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Footer tag with green status indicator */}
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

            {/* -------------------- 5. COMPLETE CAPABILITIES SUITE (SPLIT VIEW) -------------------- */}
            <section className="w-full py-24 sm:py-32 lg:py-36 bg-[#FBFBFC] border-t border-neutral-200/80">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    {/* Header with electric blue dot + uppercase tag & generous spacing */}
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-600 font-semibold mb-4">
                            <span className="size-2 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
                            <span>/ COMPLETE CAPABILITIES SUITE</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-[1.15] mb-6">
                            Explore All Specialized Practices
                        </h2>
                        <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-16 lg:mb-24">
                            Explore our full spectrum of specialized engineering, design, AI automation, and growth solutions.
                        </p>
                    </div>

                    <ServiceSplitView initialServiceId="brand-identity" activeMode="hover" />
                </div>
            </section>

            {/* -------------------- 6. SPECIALIZED DESIGN PRACTICES -------------------- */}
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

            {/* -------------------- 7. INDUSTRIES WE SERVE (THE INTERACTIVE SPLIT SHOWCASE) -------------------- */}
            <section className="w-full py-24 sm:py-32 lg:py-36 bg-white border-t border-neutral-200/80 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    {/* Header Spacing & Corporate Hierarchy */}
                    <div className="max-w-3xl mb-16 lg:mb-20">
                        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-600 font-semibold mb-4">
                            <span className="size-2 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
                            <span>/ INDUSTRIES WE SERVE</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-[1.15] mb-6">
                            Sectors We Power Globally
                        </h2>
                        <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                            Delivering specialized software architecture, design token kits, and enterprise digital solutions tailored to strict industry benchmarks across 60+ countries.
                        </p>
                    </div>

                    {/* 2-Column Interactive Split Showcase */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                        {/* Left Column (Interactive Sector Selector) */}
                        <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
                            {INDUSTRIES.map((ind, idx) => {
                                const Icon = ind.icon;
                                const isActive = activeSector === idx;

                                return (
                                    <button
                                        key={ind.id}
                                        type="button"
                                        onClick={() => setActiveSector(idx)}
                                        onMouseEnter={() => setActiveSector(idx)}
                                        className={`relative w-full p-4 sm:p-5 rounded-2xl transition-all duration-200 text-left flex items-center justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isActive
                                            ? "text-white"
                                            : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/70"
                                            }`}
                                    >
                                        {/* Animated Background Indicator Bar via layoutId */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeSectorIndicator"
                                                className="absolute inset-0 bg-neutral-950 rounded-2xl shadow-xl -z-10"
                                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                            />
                                        )}

                                        {/* Accent indicator strip on active item */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeSectorBar"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full bg-blue-500"
                                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                            />
                                        )}

                                        {/* Left Side: Index + Icon + Title */}
                                        <div className="flex items-center gap-4 min-w-0 pl-1 sm:pl-2">
                                            <span
                                                className={`font-mono text-xs sm:text-sm font-bold transition-colors shrink-0 ${isActive
                                                    ? "text-blue-400"
                                                    : "text-neutral-400 group-hover:text-neutral-600"
                                                    }`}
                                            >
                                                0{idx + 1}
                                            </span>

                                            <div
                                                className={`size-10 sm:size-11 rounded-xl flex items-center justify-center text-lg transition-all duration-200 shrink-0 ${isActive
                                                    ? "bg-neutral-800 text-blue-400 border border-neutral-700"
                                                    : "bg-neutral-100 text-neutral-600 border border-neutral-200/80 group-hover:bg-neutral-200/70"
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5 stroke-[1.8]" />
                                            </div>

                                            <span className="text-base sm:text-lg font-bold tracking-tight truncate">
                                                {ind.name}
                                            </span>
                                        </div>

                                        {/* Right Indicator Arrow */}
                                        <div
                                            className={`size-8 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${isActive
                                                ? "bg-blue-600 text-white"
                                                : "text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-0.5"
                                                }`}
                                        >
                                            <FiArrowRight className="w-4 h-4" />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Column (The Dynamic Enterprise Tech Display) */}
                        <div className="lg:col-span-7">
                            <div className="bg-neutral-950 rounded-3xl min-h-[540px] text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-neutral-800 flex flex-col justify-between h-full">
                                {/* Ambient Radial Glow Shifting Accent per Sector */}
                                <motion.div
                                    key={`glow-${activeSector}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className={`absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl ${INDUSTRIES[activeSector].accentGradient} rounded-full blur-3xl pointer-events-none`}
                                />

                                {/* Subtle Dot-Matrix Background Grid */}
                                <div
                                    className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40"
                                    aria-hidden="true"
                                />

                                {/* Cross-Fading Interactive Content via AnimatePresence */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={INDUSTRIES[activeSector].id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.32, ease: "easeOut" }}
                                        className="relative z-10 flex flex-col justify-between h-full flex-grow gap-8"
                                    >
                                        {/* Header Row */}
                                        <div>
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                                {/* Live Pulsing Status Badge */}
                                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-xs font-mono text-neutral-200 shadow-inner">
                                                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span>{INDUSTRIES[activeSector].statusBadge}</span>
                                                </div>

                                                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest font-semibold">
                                                    0{activeSector + 1} / ENTERPRISE SPEC
                                                </span>
                                            </div>

                                            {/* Large Bold Architectural Title + Tagline */}
                                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                                                {INDUSTRIES[activeSector].headline}
                                            </h3>
                                            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                                                {INDUSTRIES[activeSector].tagline}
                                            </p>
                                        </div>

                                        {/* 2-Column List of 4 Concrete Architectural Capabilities */}
                                        <div>
                                            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 block mb-3 font-semibold">
                                                Architectural Capabilities
                                            </span>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                                {INDUSTRIES[activeSector].capabilities.map((cap, cIdx) => (
                                                    <div
                                                        key={cIdx}
                                                        className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3 hover:border-neutral-700 transition-colors"
                                                    >
                                                        <div className="size-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                                            <FiCheckCircle className="w-3.5 h-3.5" />
                                                        </div>
                                                        <span className="text-xs sm:text-sm font-medium text-neutral-200 leading-snug">
                                                            {cap}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bottom Bar: Numerical Metric + CTA Button */}
                                        <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 mt-auto">
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
                                                    {INDUSTRIES[activeSector].metric.value}
                                                </span>
                                                <span className="text-xs sm:text-sm font-medium text-neutral-400">
                                                    {INDUSTRIES[activeSector].metric.label}
                                                </span>
                                            </div>

                                            <Link
                                                href="#contact"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-blue-600/20 hover:shadow-blue-600/40 shrink-0 cursor-pointer"
                                            >
                                                <span>Request Architecture Brief</span>
                                                <FiArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* -------------------- 8. FREQUENTLY ASKED QUESTIONS -------------------- */}
            <section className="w-full py-20 md:py-28 relative overflow-hidden bg-white">
                <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100/80 border border-neutral-200/80 text-neutral-800 uppercase tracking-wider shadow-sm select-none font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                            FAQ
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 text-center mt-4 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-base sm:text-lg text-neutral-500 text-center max-w-xl mx-auto">
                            Everything you need to know about our enterprise Brand Identity & UI/UX design workflow.
                        </p>
                    </div>

                    <AceternityFaq groups={FAQ_GROUPS} />
                </div>
            </section>

            {/* -------------------- 10. CTA SECTION -------------------- */}
            <div id="contact">
                <Cta />
            </div>
        </div>
    );
}
