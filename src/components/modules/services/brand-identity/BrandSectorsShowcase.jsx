"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiActivity,
    FiArrowRight,
    FiBookOpen,
    FiCheckCircle,
    FiCpu,
    FiCreditCard,
    FiServer,
    FiShoppingBag,
} from "react-icons/fi";

// Cross-Industry Domain Expertise (The Interactive Split Showcase)
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

export default function BrandSectorsShowcase() {
    const [activeSector, setActiveSector] = useState(0);

    return (
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
                                    className={`relative w-full p-4 sm:p-5 rounded-2xl transition-all duration-200 text-left flex items-center justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                        isActive
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
                                            className={`font-mono text-xs sm:text-sm font-bold transition-colors shrink-0 ${
                                                isActive
                                                    ? "text-blue-400"
                                                    : "text-neutral-400 group-hover:text-neutral-600"
                                            }`}
                                        >
                                            0{idx + 1}
                                        </span>

                                        <div
                                            className={`size-10 sm:size-11 rounded-xl flex items-center justify-center text-lg transition-all duration-200 shrink-0 ${
                                                isActive
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
                                        className={`size-8 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                                            isActive
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
    );
}
