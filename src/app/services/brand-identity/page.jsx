"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiArrowRight,
    FiArrowUpRight,
    FiCheckCircle,
    FiCpu,
    FiLayers,
    FiShield,
    FiZap
} from "react-icons/fi";
import {
    FaBuildingColumns,
    FaCartShopping,
    FaGraduationCap,
    FaHeartPulse,
    FaRobot
} from "react-icons/fa6";
import Cta from "@/components/Cta";
import { InfiniteSpiral } from "@/components/InfiniteSpiral";
import TrustedBy from "@/components/TrustedBy";
import ServiceSplitView from "@/components/ServiceSplitView";
import { AceternityFaq } from "@/components/ui/AceternityFaq";
import BookaCallBtn from "@/components/ui/BookaCallBtn";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
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

// 3. Cross-Industry Domain Expertise
const INDUSTRIES = [
    {
        icon: FaBuildingColumns,
        name: "Fintech & Global Banking",
        desc: "High-security trading apps, digital wallets, payment gateways, and real-time financial dashboards.",
    },
    {
        icon: FaHeartPulse,
        name: "Healthcare & Medtech",
        desc: "Clinical management suites, telemedicine interfaces, and patient monitoring applications.",
    },
    {
        icon: FiCpu,
        name: "SaaS & Enterprise Cloud",
        desc: "Multi-tenant cloud management consoles, devops tooling, and enterprise workflow engines.",
    },
    {
        icon: FaCartShopping,
        name: "E-Commerce & Marketplaces",
        desc: "High-throughput checkout funnels, multi-vendor marketplaces, and personalized storefronts.",
    },
    {
        icon: FaGraduationCap,
        name: "Edtech & Learning Systems",
        desc: "Interactive learning management systems, video classrooms, and student assessment portals.",
    },
    {
        icon: FaRobot,
        name: "AI & Machine Learning Systems",
        desc: "Intuitive interfaces for generative AI workflows, model observability dashboards, and automation tools.",
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
    const deliverables = service?.deliverables || [];

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
                <section className="container mx-auto px-4 sm:px-6 lg:px-12 my-20 md:my-28">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs uppercase tracking-wider text-blue-600 font-bold block mb-2 font-mono">
                            Engineering Methodology
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 mb-4">
                            How We Architect Digital Design Systems
                        </h2>
                        <p className="text-neutral-600 text-base sm:text-lg">
                            From brand archetype strategy to tokenized code handoff, our four-stage framework ensures seamless design-to-development execution.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((stepItem, idx) => (
                            <motion.div
                                key={stepItem.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="font-mono text-2xl font-black text-neutral-300 group-hover:text-blue-600 transition-colors">
                                            {stepItem.step}
                                        </span>
                                        <span className="size-2 rounded-full bg-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-950 mb-3 tracking-tight">
                                        {stepItem.title}
                                    </h3>
                                    <p className="text-neutral-600 text-sm leading-relaxed">
                                        {stepItem.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* -------------------- 4. ENTERPRISE DELIVERABLES MATRIX -------------------- */}
            {deliverables.length > 0 && (
                <section className="w-full bg-[#f8fafc] py-20 border-y border-neutral-200/80">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                        <div className="max-w-3xl mb-12">
                            <span className="text-xs uppercase tracking-wider text-blue-600 font-bold block mb-2 font-mono">
                                Production Deliverables
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 mb-3">
                                Standard Deliverables in Every Engagement
                            </h2>
                            <p className="text-neutral-600 text-base sm:text-lg">
                                Ready-to-ship assets, token architectures, and design governance kits handed over with 100% IP ownership.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {deliverables.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm flex items-start gap-3.5 hover:border-blue-500/40 transition-colors"
                                >
                                    <FiCheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <span className="text-sm font-semibold text-neutral-800 leading-snug">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* -------------------- 5. COMPLETE CAPABILITIES SUITE (SPLIT VIEW) -------------------- */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-12 my-20 md:my-28">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-2 font-mono">
                        Complete Capabilities Suite
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 mb-4">
                        Explore All Specialized Practices
                    </h2>
                    <p className="text-neutral-600 text-base sm:text-lg">
                        Explore our full spectrum of specialized engineering, design, AI automation, and growth solutions.
                    </p>
                </div>
                <ServiceSplitView initialServiceId="brand-identity" activeMode="hover" />
            </section>

            {/* -------------------- 6. SPECIALIZED DESIGN PRACTICES -------------------- */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-12 mb-20 md:mb-28 pt-8">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-2 font-mono">
                        Tailored Solutions
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 mb-4">
                        Our Specialized Design Practices
                    </h2>
                    <p className="text-neutral-600 text-base sm:text-lg">
                        Whether launching an MVP or re-architecting an enterprise SaaS suite, we provide dedicated design systems tailored to your technical requirements.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ON_DEMAND_SERVICES.map((srv, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="h-full"
                        >
                            <FollowerPointerCard
                                title={
                                    <div className="flex items-center gap-1.5 font-semibold text-xs text-white">
                                        <span>{srv.badgeTitle || srv.title}</span>
                                    </div>
                                }
                                className="h-full"
                            >
                                <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                                    {/* Top Cover Image */}
                                    <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                                        <img
                                            src={srv.image}
                                            alt={srv.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/80 text-[11px] font-bold text-neutral-800 shadow-sm">
                                            0{idx + 1}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                                        <div>
                                            <h3 className="text-xl font-bold text-neutral-950 mb-2.5 group-hover:text-blue-600 transition-colors">
                                                {srv.title}
                                            </h3>

                                            <p className="text-neutral-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {srv.desc}
                                            </p>

                                            {/* Feature Checklist */}
                                            <div className="grid grid-cols-2 gap-2.5 mb-6 pt-4 border-t border-neutral-100">
                                                {srv.features.map((feat, fIdx) => (
                                                    <div
                                                        key={fIdx}
                                                        className="flex items-center gap-1.5 text-xs font-medium text-neutral-700"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                                        <span className="truncate">{feat}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-3 border-t border-neutral-100 flex justify-start">
                                            <Link
                                                href={srv.href}
                                                className="w-fit inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                                            >
                                                <span>Explore Service</span>
                                                <FiArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </FollowerPointerCard>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* -------------------- 7. INDUSTRY EXPERTISE -------------------- */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-12 mb-20 md:mb-28 pt-8">
                <div className="bg-neutral-950 text-white p-8 sm:p-14 border border-neutral-800 shadow-2xl relative overflow-hidden rounded-3xl">
                    {/* Subtle Glow Orb */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="max-w-3xl mb-12 relative z-10">
                        <span className="text-xs uppercase tracking-wider text-blue-400 font-bold block mb-2 font-mono">
                            Cross-Industry Domain Knowledge
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                            Enterprise Domain Knowledge Built for Real Business Impact
                        </h2>
                        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
                            We architect high-impact UI/UX and design systems tailored for Fintech, Healthcare, Cloud SaaS, E-Commerce, and Artificial Intelligence platforms.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                        {INDUSTRIES.map((ind, idx) => {
                            const Icon = ind.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 p-6 transition-colors group rounded-xl"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center text-xl mb-4">
                                        <Icon />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {ind.name}
                                    </h3>
                                    <p className="text-neutral-400 text-xs leading-relaxed">
                                        {ind.desc}
                                    </p>
                                </div>
                            );
                        })}
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

            {/* -------------------- 9. ADJACENT SERVICE PAGINATION -------------------- */}
            <section className="w-full bg-[#f8fafc] border-t border-neutral-200/80 py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        {prev && (
                            <Link
                                href={prev.href || `/services/${prev.slug}`}
                                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-neutral-200 w-full sm:w-auto"
                            >
                                <div className="size-10 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 group-hover:border-blue-500 group-hover:text-blue-600 transition-colors shrink-0">
                                    <FiArrowLeft className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <span className="text-xs font-mono text-neutral-400 block uppercase">Previous Service</span>
                                    <span className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                                        {prev.title}
                                    </span>
                                </div>
                            </Link>
                        )}

                        {next && (
                            <Link
                                href={next.href || `/services/${next.slug}`}
                                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-neutral-200 sm:ml-auto w-full sm:w-auto justify-between sm:justify-start"
                            >
                                <div className="text-left sm:text-right">
                                    <span className="text-xs font-mono text-neutral-400 block uppercase">Next Service</span>
                                    <span className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                                        {next.title}
                                    </span>
                                </div>
                                <div className="size-10 rounded-lg bg-blue-600 text-white flex items-center justify-center group-hover:bg-blue-700 transition-colors shrink-0">
                                    <FiArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* -------------------- 10. CTA SECTION -------------------- */}
            <div id="contact">
                <Cta />
            </div>
        </div>
    );
}
