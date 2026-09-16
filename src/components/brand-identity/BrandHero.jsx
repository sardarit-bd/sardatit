"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { InfiniteSpiral } from "@/components/InfiniteSpiral";
import TrustedBy from "@/components/TrustedBy";
import BookaCallBtn from "@/components/ui/BookaCallBtn";

// Verified Local Project Assets for Hero Infinite Spiral Showcase
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

export default function BrandHero({ service }) {
    const stats = service?.stats || [
        { label: "Projects Delivered Globally", value: "500+" },
        { label: "Client Satisfaction Rate", value: "99%" },
        { label: "Countries Served", value: "60+" },
        { label: "Design System Adoption", value: "100%" },
    ];

    return (
        <>
            <div className="bg-[#f8fafc] min-h-[calc(100dvh-80px)] flex flex-col justify-center py-10 lg:py-16 relative overflow-hidden">
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

            {/* ENTERPRISE KPI METRICS BANNER */}
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
        </>
    );
}
