"use client";

import CtaSection from "@/components/Cta";
import ClientFeedbackAccordion from "@/components/sections/ClientFeedbackAccordion";
import { FoundersSection } from "@/components/sections/FoundersSection";
import TeamMembers from "@/components/team";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    FiAward,
    FiCpu,
    FiGlobe,
    FiLayers,
    FiLock,
    FiMessageSquare,
    FiRepeat,
    FiTarget,
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
        icon: FiTarget,
        title: "User-Centric Core",
        desc: "Designing intuitive experiences engineered for real human needs and maximum engagement.",
    },
    {
        icon: FiCpu,
        title: "Expert Engineering Team",
        desc: "Seasoned developers and designers with deep mastery across modern web and software stacks.",
    },
    {
        icon: FiLock,
        title: "Transparent Process",
        desc: "Full visibility into sprint progress, technical roadmaps, and continuous code deployments.",
    },
    {
        icon: FiRepeat,
        title: "Responsive Agility",
        desc: "Adapting rapidly to user feedback, market shifts, and evolving business requirements.",
    },
    {
        icon: FiCpu,
        title: "Strategic Innovation",
        desc: "Integrating state-of-the-art tools, AI capabilities, and ultra-scalable architecture.",
    },
    {
        icon: FiGlobe,
        title: "Data-Driven Decisions",
        desc: "Guided by user analytics, performance benchmark metrics, and verified empirical results.",
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

const galleryImages = [
    { src: "/image/galary/G2.JPG", alt: "Sardar IT Team", h: "h-[320px] md:h-[400px]" },
    { src: "/image/galary/G3.webp", alt: "Workspace Collaboration", h: "h-[260px] md:h-[320px]" },
    { src: "/image/galary/G4.JPG", alt: "Tech Discussion", h: "h-[340px] md:h-[440px]" },
    { src: "/image/galary/G5.JPG", alt: "Team Outing", h: "h-[280px] md:h-[350px]" },
    { src: "/image/designer.png", alt: "Design Studio", h: "h-[300px] md:h-[380px]" },
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




            <CompanyGallerySection />



            {/* 3. VISION & EMPOWERING SUCCESS STORIES (Light Gray Theme) */}
            <section className="w-full py-20 lg:py-28 bg-[#E6E8EA] text-neutral-900">
                <div className="container">

                    <SectionHeader tag={"OUR VISION"} title1="We unite strategy, design, and full-stack engineering to drive impact inside and outside an organisation." pre="" title2="" isBgWhite={true} width="max-w-4xl" />

                    {/* Empowering Success Stories */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-16">
                        {/* Left Image */}
                        <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] overflow-hidden ">
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
                                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#133bd4] mb-3 block">
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
                                    <div className="text-4xl sm:text-5xl font-extrabold text-[#133bd4] tracking-tight mb-2">
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

            {/* 4. VALUES THAT SET US APART (Aceternity UI Sticky Scroll Reveal) */}
            <StickyScrollReveal content={values} />

            {/* 6. ACHIEVEMENTS & AWARDS (Light Gray Theme) */}
            <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#E6E8EA] text-neutral-900">
                <div className="container">

                    <SectionHeader tag={"RECOGNITION"} title1=" Achieved Awards & Industry Badges" pre="Recognized globally for technical execution, client satisfaction, and digital innovation." title2="" isBgWhite={true} width="max-w-4xl" />


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {awards.map((award, idx) => (
                            <motion.div
                                key={award.platform}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white p-8 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-[#133bd4] uppercase tracking-wider">
                                            {award.platform}
                                        </span>
                                        <FiAward className="text-neutral-400 text-xl" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-950 mb-2">
                                        {award.badge}
                                    </h3>
                                    <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                                        {award.desc}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
                                    <FiCpu />
                                    <span>{award.rating}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FOUNDERS & EXECUTIVE LEADERSHIP (Pure White Theme) */}
            <section className="w-full bg-white py-12">
                <FoundersSection />
                <TeamMembers />
            </section>

            {/* Testimonials */}
            <ClientFeedbackAccordion />

            {/* 9. LANDING PAGE CTA SECTION */}
            <CtaSection />
        </main>
    );
}
