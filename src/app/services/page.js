"use client";

import Cta from "@/components/Cta";
import TrustedBy from "@/components/TrustedBy";
import BookaCallBtn from "@/components/ui/BookaCallBtn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
    FaBuildingColumns,
    FaCartShopping,
    FaGraduationCap,
    FaHeartPulse,
    FaRobot
} from "react-icons/fa6";
import {
    FiArrowUpRight,
    FiChevronDown,
    FiCpu,
    FiGrid,
    FiLayers,
    FiLayout,
    FiSearch,
    FiSmartphone,
    FiZap
} from "react-icons/fi";

// 1. Key Performance Metrics
const HERO_STATS = [
    { value: "99.4%", label: "Client Satisfaction Rate" },
    { value: "150+", label: "Digital Products Shipped" },
    { value: "2.5x", label: "Average Conversion Growth" },
    { value: "4.9/5", label: "Clutch & GoodFirms Rating" },
];

// 2. UI/UX Design Process Data
const PROCESS_STEPS = [
    {
        number: "01",
        title: "User Research & Discovery",
        desc: "We analyze target user personas, conduct competitive research, and evaluate user behavior to define clear product requirements and strategic UX goals.",
        deliverables: ["User Persona Maps", "Competitor Benchmark", "User Journey Maps"],
        color: "from-blue-500/20 to-indigo-500/20 text-blue-600",
    },
    {
        number: "02",
        title: "Wireframing & Information Architecture",
        desc: "Structuring intuitive navigation, user flow diagrams, and low-fidelity interactive wireframes that set a rock-solid foundation for smooth digital interaction.",
        deliverables: ["Information Architecture", "Lo-Fi Wireframes", "UX Blueprint"],
        color: "from-purple-500/20 to-pink-500/20 text-purple-600",
    },
    {
        number: "03",
        title: "Visual UI Design & Design Systems",
        desc: "Crafting pixel-perfect interface components, scalable typography, vibrant color palettes, and dynamic design systems that align with your brand identity.",
        deliverables: ["Figma Component Library", "Visual UI Kit", "Design Tokens"],
        color: "from-emerald-500/20 to-teal-500/20 text-emerald-600",
    },
    {
        number: "04",
        title: "Interactive Prototyping & Testing",
        desc: "Transforming static screens into interactive clickable prototypes to validate user flows, gather early usability feedback, and refine micro-interactions.",
        deliverables: ["Clickable Prototype", "Usability Audit Report", "A/B Test Specs"],
        color: "from-amber-500/20 to-orange-500/20 text-amber-600",
    },
    {
        number: "05",
        title: "Developer Handoff & Quality Assurance",
        desc: "Providing clean Figma assets, interactive design specifications, and continuous collaboration with front-end developers to guarantee pixel-perfect execution.",
        deliverables: ["Production Handoff Kit", "Responsive Specs", "QA Support"],
        color: "from-cyan-500/20 to-blue-500/20 text-cyan-600",
    },
];

// 3. On-Demand Services Data
const ON_DEMAND_SERVICES = [
    {
        icon: FiLayout,
        title: "UI/UX Design",
        desc: "End-to-end user experience and visual interface design crafted to boost user engagement, retention, and business growth across web and mobile platforms.",
        features: ["Custom UI Systems", "User Research", "Responsive Design", "Figma Handoff"],
        href: "/works/recharge-iv",
        accent: "group-hover:border-blue-500/50",
        badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
        icon: FiSearch,
        title: "UX/UI Consulting & Audit",
        desc: "Data-driven UX audits, heuristic evaluations, and actionable conversion rate optimization strategies to fix drop-offs in existing digital products.",
        features: ["Heuristic Evaluation", "Funnel Optimization", "Usability Reports", "UX Roadmap"],
        href: "/contact",
        accent: "group-hover:border-purple-500/50",
        badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
        icon: FiGrid,
        title: "SaaS Product Design",
        desc: "Scalable dashboard interfaces, complex web application workflows, and friction-free onboarding flows tailored for enterprise B2B SaaS platforms.",
        features: ["Complex Dashboards", "Data Visualization", "Modular UI", "User Roles"],
        href: "/works/medease",
        accent: "group-hover:border-emerald-500/50",
        badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
        icon: FiSmartphone,
        title: "Mobile App Design",
        desc: "Native iOS and Android UI designs optimized for gesture control, high performance, and memorable mobile user experiences on smartphones and tablets.",
        features: ["iOS & Android Native", "Micro-Interactions", "Mobile Navigation", "App Store Visuals"],
        href: "/works/casa-viva",
        accent: "group-hover:border-amber-500/50",
        badgeColor: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
        icon: FiLayers,
        title: "Design Systems & Tokenization",
        desc: "Custom component libraries, tokenized design guides, and reusable UI kits that empower engineering teams to build faster and maintain consistency.",
        features: ["Component Libraries", "Design Tokens", "Dark/Light Modes", "Documentation"],
        href: "/works",
        accent: "group-hover:border-indigo-500/50",
        badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
        icon: FiZap,
        title: "Web Design & Webflow",
        desc: "High-converting marketing websites and custom Webflow platforms built with responsive typography, smooth micro-interactions, and ultra-fast load speeds.",
        features: ["Webflow Development", "SEO Optimization", "Dynamic CMS", "Custom Animations"],
        href: "/works/casa-viva",
        accent: "group-hover:border-rose-500/50",
        badgeColor: "bg-rose-50 text-rose-600 border-rose-200",
    },
];

// 4. Featured Success Stories
const CASE_STUDIES = [
    {
        title: "Recharge IV",
        subtitle: "Web Design & 3D Interactive Drip Booking Experience",
        category: "Web Design & 3D",
        image:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4975b4_Frame%201984077426%20(3).avif",
        href: "/works/recharge-iv",
        stats: "+140% Booking Conversion",
    },
    {
        title: "CASA VIVA",
        subtitle: "Luxury Real Estate Digital Platform & Visual Discovery",
        category: "Real Estate Website",
        image:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970fb_Rivertel-UI-UX-Design-for-Telecom-Solutions.webp",
        href: "/works/casa-viva",
        stats: "4.8/5 Buyer Satisfaction",
    },
    {
        title: "MedEase",
        subtitle: "Hospital Management Dashboard & Clinical Workflow System",
        category: "Healthcare SaaS",
        image:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970b7_Abyan-Capital-Trading-Mobile-App.webp",
        href: "/works/medease",
        stats: "-35% Admin Task Time",
    },
];

// 5. Industry Expertise
const INDUSTRIES = [
    {
        icon: FaBuildingColumns,
        name: "Fintech & Trading",
        desc: "Secure trading apps, digital wallets, and financial analytics dashboards.",
    },
    {
        icon: FaHeartPulse,
        name: "Healthcare & Medtech",
        desc: "Patient portals, tele-health platforms, and clinical management systems.",
    },
    {
        icon: FiCpu,
        name: "SaaS & Enterprise Cloud",
        desc: "Complex data dashboards, admin suites, and B2B workflow automation tools.",
    },
    {
        icon: FaCartShopping,
        name: "E-Commerce & Retail",
        desc: "Seamless checkout funnels, personalized shopfronts, and marketplace apps.",
    },
    {
        icon: FaGraduationCap,
        name: "Edtech & E-Learning",
        desc: "Interactive learning management systems and virtual classroom platforms.",
    },
    {
        icon: FaRobot,
        name: "AI & Machine Learning",
        desc: "Intuitive interfaces for generative AI tools, prompt builders, and analytics.",
    },
];

// 6. FAQ Accordion Data
const FAQS = [
    {
        q: "What are the core deliverables in your UI/UX design service?",
        a: "Our deliverables include user research personas, journey maps, low & high-fidelity wireframes, interactive Figma prototypes, production design systems, asset handoff documentation, and developer support.",
    },
    {
        q: "How much do professional UI/UX design services cost?",
        a: "Pricing varies based on project scope and complexity. Typically, focused web redesigns or landing platforms start around $5,000, while complete enterprise SaaS platforms or multi-device product design systems range from $15,000 to $50,000+.",
    },
    {
        q: "Why should companies invest in dedicated UI/UX design?",
        a: "A well-crafted user experience directly impacts your bottom line by reducing user churn, increasing task completion rates, elevating brand credibility, and multiplying user conversion rates.",
    },
    {
        q: "How long does a typical UI/UX design project take?",
        a: "Projects usually range from 3 to 10 weeks depending on scope. Marketing websites and mobile app MVPs take 3-5 weeks, whereas complex SaaS products or enterprise design systems require 6-10 weeks.",
    },
    {
        q: "Why hire an agency over an individual freelancer or in-house team?",
        a: "An agency brings a cohesive, multi-disciplinary team of researchers, UI experts, design strategists, and QA reviewers. You gain immediate access to battle-tested frameworks, faster execution speed, and high design standards without lengthy recruitment delays.",
    },
    {
        q: "How do you handle developer handoff?",
        a: "We provide tokenized Figma design systems, exact spacing/typography guidelines, component state documentation, and direct Slack/Figma collaboration with your front-end engineers to ensure 100% implementation accuracy.",
    },
];

export default function ServicesPage() {
    const [openFaq, setOpenFaq] = useState(0);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? -1 : index);
    };

    return (
        <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-20 relative">
            {/* Background Ambient Glow Effects */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-[120px] pointer-events-none -z-10 rounded-full" />


            <div className="bg-[#f8fafc] py-14">
                {/* -------------------- 1. HERO SECTION -------------------- */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-12 mb-20 md:mb-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        {/* Eyebrow Pill */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-semibold mb-6">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            UI/UX Design & Digital Product Agency
                        </div>

                        {/* Main Display Headline */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.08] mb-6">
                            Transform Your Digital Experience with Innovative{" "}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                UI & UX Design
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-neutral-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
                            We create user-centered, visually captivating, and high-converting web
                            and mobile interfaces. From strategic research to pixel-perfect Figma systems,
                            we accelerate your product growth.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mb-14">
                            <BookaCallBtn />

                        </div>
                    </motion.div>

                </section>

                <TrustedBy />


                {/* -------------------- 3. ON-DEMAND SERVICES -------------------- */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-12 mb-20 md:mb-28 pt-14">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-2">
                            Tailored Solutions
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 mb-4">
                            Our On-Demand UI/UX Services
                        </h2>
                        <p className="text-neutral-600 text-base sm:text-lg">
                            Whether launching a new MVP or redesigning an enterprise SaaS suite, we
                            provide specialized design services tailored to your exact business goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ON_DEMAND_SERVICES.map((srv, idx) => {
                            const Icon = srv.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                    className={`bg-white p-8 border border-neutral-200/80 ${srv.accent} transition-all duration-300 flex flex-col justify-between group`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div
                                                className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl ${srv.badgeColor}`}
                                            >
                                                <Icon />
                                            </div>
                                            <span className="text-xs font-semibold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                                                Service 0{idx + 1}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-neutral-950 mb-3 group-hover:text-blue-600 transition-colors">
                                            {srv.title}
                                        </h3>

                                        <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                                            {srv.desc}
                                        </p>

                                        {/* Feature Checklist */}
                                        <div className="grid grid-cols-2 gap-2 mb-6 pt-4 border-t border-neutral-100">
                                            {srv.features.map((feat, fIdx) => (
                                                <div
                                                    key={fIdx}
                                                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-700"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                    {feat}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        href={srv.href}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors pt-2"
                                    >
                                        Explore Service
                                        <FiArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>


                {/* -------------------- 5. INDUSTRY EXPERTISE -------------------- */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-12 mb-20 md:mb-28 pt-14">
                    <div className="bg-neutral-950 text-white p-8 sm:p-14 border border-neutral-800 shadow-2xl relative overflow-hidden">
                        {/* Subtle Glow Orb */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="max-w-3xl mb-12 relative z-10">
                            <span className="text-xs uppercase tracking-wider text-blue-400 font-bold block mb-2">
                                Cross-Industry Domain Knowledge
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                Industry Expertise Customized for Business Impact
                            </h2>
                            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
                                We design exceptional UI/UX solutions customized for Fintech, Edtech,
                                Healthcare, SaaS, E-Commerce, and Artificial Intelligence platforms.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                            {INDUSTRIES.map((ind, idx) => {
                                const Icon = ind.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 p-6 transition-colors group"
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

                {/* -------------------- 6. FREQUENTLY ASKED QUESTIONS -------------------- */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-12 mb-20 md:mb-28">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-2">
                                Got Questions?
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-neutral-600 text-base">
                                Everything you need to know about our UI/UX design workflow and services.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {FAQS.map((faq, idx) => {
                                const isOpen = openFaq === idx;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white  border border-neutral-200/80 overflow-hidden transition-all"
                                    >
                                        <button
                                            onClick={() => toggleFaq(idx)}
                                            className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-neutral-950 hover:text-blue-600 transition-colors cursor-pointer"
                                        >
                                            <span>{faq.q}</span>
                                            <FiChevronDown
                                                className={`text-xl transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180 text-blue-600" : "text-neutral-400"
                                                    }`}
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="px-6 pb-6 text-neutral-600 text-sm sm:text-base leading-relaxed border-t border-neutral-100 pt-4"
                                                >
                                                    {faq.a}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div >



            {/* -------------------- 7. CTA SECTION -------------------- */}
            <div id="contact">
                <Cta />
            </div>
        </div >
    );
}
