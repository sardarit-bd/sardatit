"use client";

import CtaSection from "@/components/Cta";
import HomeReviewsAngledSlider from "@/components/home/HomeReviewsAngledSlider";
import { ImpactStats } from "@/components/sections/ImpactStats";
import LeadersChapterShowcase from "@/components/sections/LeadersChapterShowcase";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Cpu,
    GitFork,
    Globe,
    Layers,
    ShieldCheck,
    Zap
} from "lucide-react";
import {
    FiCpu,
    FiLayers,
    FiMessageSquare,
    FiZap
} from "react-icons/fi";
import CompanyGallerySection from "../../components/sections/CompanyGallerySection";
import SectionHeader from "../../components/ui/SectionHeader";
import { StickyScrollReveal } from "../../components/ui/StickyScrollReveal";

const values = [
    {
        step: "01",
        icon: FiMessageSquare,
        title: "Transparent Communication",
        description:
            "We prioritize open dialogue, ensuring clients are informed at every turn. Our clear communication fosters trust and alignment, enriching collaboration.",
    },
    {
        step: "02",
        icon: FiLayers,
        title: "Precision Management",
        description:
            "Our meticulous planning and execution ensure project success. Deadlines are met, objectives achieved, and complexities managed seamlessly, guaranteeing client satisfaction.",
    },
    {
        step: "03",
        icon: FiCpu,
        title: "Meticulous Detail",
        description:
            "We obsess over details, perfecting design elements and codebase architecture to deliver exceptional outcomes. From aesthetics to functionality, our dedication shines.",
    },
    {
        step: "04",
        icon: FiZap,
        title: "Innovative Excellence",
        description:
            "We thrive on innovation, pushing creative and technical boundaries. By blending cutting-edge trends and strategic insights, we consistently deliver solutions at the forefront.",
    },
];

const features = [
    {
        icon: Layers,
        title: "Full-Cycle Product Engineering",
        desc: "From discovery architecture and UI/UX design systems to enterprise full-stack software and cloud deployment.",
    },
    {
        icon: Globe,
        title: "Global Footprint Across 60+ Countries",
        desc: "Proven track record delivering scalable digital solutions worldwide with seamless agile timezone alignment.",
    },
    {
        icon: Cpu,
        title: "Modern Battle-Tested Tech Stack",
        desc: "High-throughput architectures built on Next.js, React, Node.js, Python, Flutter, Docker, and AWS.",
    },
    {
        icon: GitFork,
        title: "Transparent Sprints & Milestones",
        desc: "Sprint visibility through weekly live demo walkthroughs, continuous deployment, and direct git repository access.",
    },
    {
        icon: ShieldCheck,
        title: "100% IP & Source Code Ownership",
        desc: "Complete transfer of fully-documented repositories, design systems, and software IP to your enterprise on day one.",
    },
    {
        icon: Zap,
        title: "Enterprise Security & SLA Scalability",
        desc: "Strict data privacy guardrails, post-launch maintenance, 99.9% uptime architectures, and continuous performance tuning.",
    },
];

const awards = [
    {
        platform: "Clutch",
        badge: "Top B2B Service Provider",
        desc: "Recognized as a leading global software engineering and product design firm.",
        rating: "4.9/5 Rating",
    },
    {
        platform: "GoodFirms",
        badge: "Top Development Agency",
        desc: "Awarded for exceptional client satisfaction and end-to-end tech delivery.",
        rating: "5.0/5 Rating",
    },
    {
        platform: "Behance",
        badge: "Featured UI/UX Excellence",
        desc: "Honored multiple times for outstanding interaction design and digital products.",
        rating: "Top Creative Showcase",
    },
    {
        platform: "Dribbble",
        badge: "Best Trending Showcase",
        desc: "Consistently recognized among the top design and engineering agencies.",
        rating: "Pro Agency Badge",
    },
];

export default function AboutPage() {
    return (
        <main className="w-full bg-white text-neutral-900 overflow-x-clip pt-16 md:pt-20">
            {/* 1. HERO SECTION (Musemind Light Gray Theme) */}
            <section className="relative w-full py-6 lg:py-10 bg-[#E6E8EA]">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Title Column */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="text-md font-semibold tracking-wide uppercase text-gray-700">
                                    / About Sardar IT
                                </span>
                                <h1 className="text-4xl sm:text-6xl lg:text-[5.25rem] font-bold text-neutral-950 leading-[1.08] tracking-tight pt-3">
                                    Fueling Minds,
                                    <br />
                                    Inspiring Innovations..
                                </h1>
                            </motion.div>
                        </div>

                        {/* 3D Geometric Visual Accent Column */}
                        <div className="lg:col-span-4 flex justify-center lg:justify-end hidden">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="relative size-44 sm:size-56 lg:size-64 rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-700 p-1 shadow-2xl flex items-center justify-center"
                            >
                                <div className="size-full bg-[#E6E8EA] rounded-full flex items-center justify-center p-6 text-neutral-950">
                                    <FiCpu className="size-20 sm:size-24 text-neutral-900 animate-pulse" />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Hero Banner Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative w-full h-[280px] sm:h-[420px] lg:h-[540px] overflow-hidden mt-12 sm:mt-16"
                    >
                        <Image
                            src="/image/galary/G2.JPG"
                            alt="Sardar IT Team Collaboration"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* 2. COMPANY GALLERY CAROUSEL */}
            <CompanyGallerySection />

            {/* 3. VISION & EMPOWERING SUCCESS STORIES */}
            <section className="w-full py-10 lg:py-20 bg-[#E6E8EA] text-neutral-900">
                <div className="container">
                    <SectionHeader tag={"OUR VISION"} title1="We unite strategy, design, and full-stack engineering to drive impact inside and outside an organisation." pre="" title2="" isBgWhite={true} width="max-w-4xl" />

                    {/* Empowering Success Stories */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-16">
                        {/* Left Image */}
                        <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] overflow-hidden">
                            <Image
                                src="/image/galary/G4.JPG"
                                alt="Sardar IT Office Vision"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Right Copy & Stats */}
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <div>
                                <span className="text-sm sm:text-2xl font-bold uppercase tracking-widest mb-3 block">
                                    EMPOWERING SUCCESS STORIES
                                </span>
                                <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-6">
                                    Over the years, we&apos;ve propelled numerous businesses to thrive, maintaining robust partnerships through our collaborative approach.
                                </p>
                                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                                    We are proud to help businesses grow and succeed in different industries. From startups to established enterprises, our tailored solutions have helped them conquer challenges, reach milestones, and actualize their visions.
                                </p>
                            </div>

                            {/* Stats Counters */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-neutral-300">
                                <div>
                                    <div className="text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight mb-2">
                                        150+
                                    </div>
                                    <h4 className="text-lg font-bold text-neutral-900 mb-1">
                                        Businesses Thrived
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-600">
                                        We helped more than 150 businesses reach their goals with our innovative solutions.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
                                        99.9%
                                    </div>
                                    <h4 className="text-lg font-bold text-neutral-900 mb-1">
                                        Client Uptime & Retention
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-600">
                                        Delivering top-tier software reliability, continuous support, and scaling architectures.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. VALUES THAT SET US APART (Sticky Scroll Reveal) */}
            <StickyScrollReveal content={values} />

            {/* 5. IMPACT & SCALE METRICS */}
            <ImpactStats />

            {/* 6. CORE CAPABILITIES & ENGINEERING STRENGTHS */}
            <section className="w-full py-16 sm:py-24 bg-white text-neutral-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    <SectionHeader
                        tag="ENGINEERING STRENGTHS"
                        title="Why Global Businesses Build With Sardar IT"
                        description="Combining robust engineering discipline, enterprise scalability, and end-to-end delivery from Dhaka to global markets."
                        theme="light"
                        width="max-w-4xl"
                    />

                    {/* Minimalist Border-Divided Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 border-t border-b border-neutral-200/80 mt-12 sm:mt-16">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            // Precise border matrix per breakpoint (1-col mobile, 2-col tablet, 3-col desktop)
                            const isMobileLast = idx === 5;
                            const isMdRightBorder = idx % 2 === 0;
                            const isMdBottomBorder = idx < 4;
                            const isLgRightBorder = idx % 3 !== 2;
                            const isLgBottomBorder = idx < 3;

                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                                    className={`p-8 md:p-10 lg:p-12 flex flex-col justify-start group transition-colors duration-300 hover:bg-neutral-50/70 border-neutral-200/80 ${
                                        isMobileLast ? "border-b-0" : "border-b"
                                    } ${
                                        isMdRightBorder ? "md:border-r" : "md:border-r-0"
                                    } ${
                                        isMdBottomBorder ? "md:border-b" : "md:border-b-0"
                                    } ${
                                        isLgRightBorder ? "lg:border-r" : "lg:border-r-0"
                                    } ${
                                        isLgBottomBorder ? "lg:border-b" : "lg:border-b-0"
                                    }`}
                                >
                                    {/* Minimalist Stroke Icon with Two-Tone Accent */}
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="relative flex items-center">
                                            <Icon
                                                className="w-8 h-8 sm:w-9 sm:h-9 text-neutral-900 stroke-[1.5] group-hover:text-blue-600 transition-colors duration-300"
                                            />
                                            {/* Electric blue highlight accent */}
                                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
                                        </div>
                                        <span className="font-mono text-xs text-neutral-300 font-semibold tracking-wider group-hover:text-neutral-500 transition-colors">
                                            0{idx + 1}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-snug mb-3">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7. LEADERSHIP SHOWCASE & VISION MANIFESTO */}
            <section className="w-full bg-white pt-16 sm:pt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-12 sm:mb-16">
                    <SectionHeader
                        tag="• / OUR LEADERS"
                        title="Introducing the Visionary Leader Behind Sardar IT"
                        description="Since 2021 at Sardar IT, we believe Bangladesh's next generation of engineers, designers, and innovators can compete with — and lead — the best in the world. Our goal isn't just to serve clients from Dhaka; it's to make Bangladesh a recognized name in global technology, the same way other nations became known for manufacturing or finance. Every project we deliver, every student we train, and every career we help build is a step toward that future — a Bangladesh known not for outsourced labor, but for original innovation the world depends on."
                        theme="light"
                        width="max-w-5xl"
                    />
                </div>
                <LeadersChapterShowcase showMobileHeader={false} />
            </section>

            {/* 8. GLOBAL RECOGNITION & INDUSTRY AWARDS */}
            <section className="w-full py-16 sm:py-24 bg-[#0B1120] text-white overflow-hidden relative">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                    <SectionHeader
                        tag="GLOBAL RECOGNITION"
                        title="Honored by Global Tech Platforms"
                        description="Verified client reviews, design excellence recognition, and top development badges across leading international directories."
                        theme="dark"
                        width="max-w-4xl"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:mt-16">
                        {awards.map((award, idx) => (
                            <motion.div
                                key={award.platform}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
                                className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 group"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span className="text-base font-bold tracking-wide text-white uppercase font-mono">
                                            {award.platform}
                                        </span>
                                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                            {award.rating}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-100 mb-2">
                                        {award.badge}
                                    </h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {award.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. TESTIMONIALS & CLIENT REVIEWS */}
            <HomeReviewsAngledSlider />

            {/* 10. LANDING PAGE CTA SECTION */}
            <CtaSection />
        </main>
    );
}
