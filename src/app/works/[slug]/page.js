"use client";

import Cta from "@/components/Cta";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaWhatsapp,
} from "react-icons/fa6";
import {
    FiArrowLeft,
    FiCheck,
    FiCopy
} from "react-icons/fi";
import { ImArrowDownRight2 } from "react-icons/im";

// Case Studies Data Dictionary
const CASE_STUDIES = {
    "recharge-iv": {
        slug: "recharge-iv",
        title: "Recharge IV",
        company: "Recharge IV",
        category: "Web Design",
        timelines: "3 Months",
        services: ["User Research", "UI Design", "Development"],
        heroImage:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4975b4_Frame%201984077426%20(3).avif",
        about: [
            "Recharge IV provides convenient door-to-door drip therapy services, offering wellness treatments in the comfort of clients' homes.",
            "We designed the entire website for Recharge IV, incorporating engaging 3D elements and micro-interactions to enhance the user experience.",
            "This thoughtful design not only streamlines the booking process but also reflects the ease and comfort of the services.",
        ],
        coverImage:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4975b5_Cover%20(11).avif",
        objectives:
            "The client wanted a website for Recharge IV that makes booking door-to-door drip therapies effortless. They emphasized the importance of keeping the design consistent even when adding new drip and wellness products.",
        requirements:
            "The drip booking should be straightforward and swift, avoiding unnecessary steps for users. Additionally, they want the ability to update the site with new content easily, minimizing the need for frequent designer involvement.",
        solutions:
            "We designed a modern website for Recharge IV, featuring engaging 3D product images and smooth micro-interactions to create a swift and intuitive booking experience for users.",
        macbookView:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497343_Recharge-IV-macbook-view.avif",
        mobileGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497342_Recharge-IV-mobile-version.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497344_Recharge-IV-mobile-view.avif",
        ],
        styleGuideText:
            "The style guide for Recharge IV features a bold color palette. This combination was chosen to convey an energetic and vibrant vibe, reflecting the dynamic nature of the drip therapy services.",
        styleGuideGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497345_Recharge-IV-typography.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497346_Recharge-IV-color.avif",
        ],
        styleBanner:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497347_Recharge-IV-style-image.avif",
        productGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b49734c_Recharge-IV-bottol-image.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b49734d_Recharge-IV-run-image.avif",
        ],
        illustrationsText:
            "The website required vibrant icons and illustrations to capture users' attention and complement the overall design. We created dynamic visuals that embody the energetic nature of the website.",
        illustrationBanner:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b49734e_Recharge-IV-icon-ilustration.avif",
        responsiveGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497350_Recharge-IV-mobile-responsive.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b49734f_Recharge-IV-ios-version.avif",
        ],
        responsiveViewBanner:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497351_Recharge-IV-responsive-view.avif",
        responsivenessText:
            "We ensured the platform is easily accessible from any device, allowing users to book drips seamlessly while maintaining a consistent experience across all screen sizes.",
        macbookVersion:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b49733e_Recharge-IV-macbook-version.avif",
        footerShowcase:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4975b9_fff.avif",
    },
    "casa-viva": {
        slug: "casa-viva",
        title: "CASA VIVA",
        company: "Casa Viva Properties",
        category: "Real Estate Website",
        timelines: "4 Months",
        services: ["Brand Identity", "UI/UX Design", "Web Development", "Search & Maps Integration"],
        heroImage: "/images/projects/casa-viva.webp",
        about: [
            "CASA VIVA is a high-converting luxury real estate platform built to showcase luxury property listings, capture qualified leads, and simplify the property discovery experience for buyers and investors.",
            "Our solution includes advanced property listings, smart search filters, interactive map exploration, and seamless inquiry management for buyers and agents.",
        ],
        coverImage: "/images/projects/casa-viva.webp",
        objectives:
            "To establish a premier real estate portal with advanced search, virtual showcases, and direct agent inquiry routing.",
        requirements:
            "Multi-criteria filtering by price, location, and property type, responsive layout on all screen sizes, and broker management tools.",
        solutions:
            "Delivered a blazing fast Next.js platform featuring interactive spatial views, instant inquiries, and an admin dashboard.",
        macbookView: "/images/projects/casa-viva.webp",
        mobileGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497342_Recharge-IV-mobile-version.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497344_Recharge-IV-mobile-view.avif",
        ],
        responsivenessText:
            "Fully responsive and optimized across all mobile devices, tablets, and desktops for real estate buyers and investors on the move.",
    },
    medease: {
        slug: "medease",
        title: "MedEase",
        company: "MedEase Healthcare",
        category: "Hospital Management System",
        timelines: "3 Months",
        services: ["UX Research", "UI Design", "AI Automation", "Full Stack Development"],
        heroImage: "/images/projects/medease.webp",
        about: [
            "MedEase is a secure hospital management platform designed to streamline clinical operations, patient engagement, and medical workflows.",
            "We created intuitive doctor-patient dashboards, automated scheduling, and centralized electronic health records (EHR).",
        ],
        coverImage: "/images/projects/medease.webp",
        objectives:
            "Streamline patient intake, appointment scheduling, and electronic health record management for multi-specialty clinics.",
        requirements:
            "HIPAA compliance, role-based access for nurses and doctors, and real-time bed and clinic resource allocation.",
        solutions:
            "An intuitive dashboard interface that reduces administrative workload by 70% and enhances patient care experience.",
        macbookView: "/images/projects/medease.webp",
        mobileGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497342_Recharge-IV-mobile-version.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497344_Recharge-IV-mobile-view.avif",
        ],
        responsivenessText:
            "Accessible securely anywhere for clinicians, patients, and administrators on hospital tablets and smartphones.",
    },
    "white-cross-clinic": {
        slug: "white-cross-clinic",
        title: "White Cross Clinic",
        company: "White Cross Medical Center",
        category: "Medical Website",
        timelines: "2.5 Months",
        services: ["UI/UX Design", "Patient Portal", "Web Development"],
        heroImage: "/images/projects/white-cross-clinic.webp",
        about: [
            "White Cross Clinic is a modern healthcare website for a multi-disciplinary medical clinic with a patient-centered design focused on accessibility and trust.",
            "Features automated doctor dispatch, instant consultation booking, and health tips repository.",
        ],
        coverImage: "/images/projects/white-cross-clinic.webp",
        objectives:
            "Modernize the clinic's digital presence and allow patients to easily book appointments and view clinical specialties.",
        requirements:
            "Fast load times, WCAG accessibility compliance, and integration with existing patient registry systems.",
        solutions:
            "Engineered a high-performance Next.js clinic portal with streamlined booking and direct doctor communications.",
        macbookView: "/images/projects/white-cross-clinic.webp",
        mobileGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497342_Recharge-IV-mobile-version.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497344_Recharge-IV-mobile-view.avif",
        ],
        responsivenessText:
            "Ensured rapid access from mobile devices so patients can schedule appointments or view clinic hours anytime.",
    },
    "gulf-county": {
        slug: "gulf-county",
        title: "Gulf County",
        company: "Gulf County Media",
        category: "Music Application",
        timelines: "4 Months",
        services: ["Mobile App Development", "Audio Streaming UI", "API Architecture"],
        heroImage: "/images/projects/gulf-county.webp",
        about: [
            "Gulf County is an engaging audio and cultural streaming application designed to showcase regional heritage, stories, and music.",
            "Built with cross-platform technology offering crisp audio streaming, offline playback, and customized user playlists.",
        ],
        coverImage: "/images/projects/gulf-county.webp",
        objectives:
            "Deliver an immersive music and cultural streaming experience with rich community sharing features.",
        requirements:
            "Low-latency streaming, offline downloads, seamless media player controls, and curated audio stories.",
        solutions:
            "Developed an intuitive React Native app with local cache management and interactive audio visualization.",
        macbookView: "/images/projects/gulf-county.webp",
        mobileGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497342_Recharge-IV-mobile-version.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497344_Recharge-IV-mobile-view.avif",
        ],
        responsivenessText:
            "Crafted specifically for seamless listening on iOS and Android devices on the go.",
    },
    "home-service-provider": {
        slug: "home-service-provider",
        title: "Home Service Provider",
        company: "Home Service Pro Network",
        category: "Home Services Platform",
        timelines: "3.5 Months",
        services: ["Product Architecture", "UI/UX Design", "Full Stack Development"],
        heroImage: "/images/projects/home-service-provider.webp",
        about: [
            "A comprehensive service marketplace platform connecting homeowners with certified maintenance specialists for plumbing, electrical, and HVAC repairs.",
            "Features automated technician matching, transparent pricing estimates, and real-time appointment tracking.",
        ],
        coverImage: "/images/projects/home-service-provider.webp",
        objectives:
            "Create a friction-free booking platform that converts homeowners looking for trusted on-demand home repair services.",
        requirements:
            "Instant booking engine, service catalog management, customer review verification, and mobile worker portal.",
        solutions:
            "Delivered an end-to-end web application driving 3.5x higher quote request conversion and automated technician dispatch.",
        macbookView: "/images/projects/home-service-provider.webp",
        mobileGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497342_Recharge-IV-mobile-version.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497344_Recharge-IV-mobile-view.avif",
        ],
        responsivenessText:
            "Seamless experience for homeowners making urgent repair requests from their mobile phones.",
    },
    "asia-lms": {
        slug: "asia-lms",
        title: "Asia LMS",
        company: "Asia Learning Systems",
        category: "Learning Management System",
        timelines: "3 Months",
        services: ["LMS Architecture", "UI/UX Design", "Video Platform Integration"],
        heroImage: "/images/projects/asia-lms.webp",
        about: [
            "An intuitive LMS platform that simplifies online education through structured video courses, progress tracking, and interactive quizzes across all devices.",
            "Built for high concurrency, accessibility, and role-based student and instructor management.",
        ],
        coverImage: "/images/projects/asia-lms.webp",
        objectives:
            "Provide educational institutions and training academies with an end-to-end digital learning environment.",
        requirements:
            "Structured video courses, quiz engines, certificate generation, and student engagement analytics.",
        solutions:
            "Developed an enterprise-grade web application supporting 10k+ learners with real-time course progress tracking.",
        macbookView: "/images/projects/asia-lms.webp",
        mobileGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497342_Recharge-IV-mobile-version.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497344_Recharge-IV-mobile-view.avif",
        ],
        responsivenessText:
            "Optimized for students learning on tablets, laptops, and mobile devices with adaptive video streaming.",
    },
};

export default function WorksSlugPage() {
    const params = useParams();
    const rawSlug = typeof params?.slug === "string" ? params.slug : "recharge-iv";
    const slugKey = rawSlug.toLowerCase();

    // Retrieve matching study or fallback to recharge-iv data
    const data = CASE_STUDIES[slugKey] || {
        ...CASE_STUDIES["recharge-iv"],
        title: rawSlug.replace(/-/g, " ").toUpperCase(),
        company: rawSlug.replace(/-/g, " ").toUpperCase(),
    };

    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Other project links for navigator
    const otherProjects = [
        { name: "CASA VIVA", slug: "casa-viva", category: "Real Estate Website" },
        { name: "MedEase", slug: "medease", category: "Hospital Management" },
        { name: "White Cross Clinic", slug: "white-cross-clinic", category: "Medical Website" },
        { name: "Gulf County", slug: "gulf-county", category: "Music Application" },
        { name: "Home Service Provider", slug: "home-service-provider", category: "Home Services" },
        { name: "Asia LMS", slug: "asia-lms", category: "LMS Platform" },
        { name: "Recharge IV", slug: "recharge-iv", category: "Web Design" },
    ].filter((p) => p.slug !== slugKey);

    return (
        <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-20">
            <div className="border-t border-gray-200/70 pt-10">
                {/* Header Container & Back Navigation */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 md:mb-12"
                    >
                        <Link
                            href="/works"
                            className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-neutral-600 hover:text-neutral-950 transition-colors group mb-6"
                        >
                            <span className="p-2 bg-gray-100 border border-gray-200 border-neutral-200 group-hover:-translate-x-1 transition-transform">
                                <FiArrowLeft className="text-sm" />
                            </span>
                            Back to Case Studies
                        </Link>

                        {/* Main Case Title */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                            {data.title}
                        </h1>
                    </motion.div>

                    {/* Case Details Wrapper Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
                        {/* Left Sticky Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="lg:col-span-3 lg:sticky lg:top-28 space-y-8"
                        >
                            <div className="p-6 sm:p-8 border border-gray-200 bg-gray-100 space-y-6">
                                {/* Company */}
                                <div className="border-b border-neutral-100 pb-5">
                                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                                        Company
                                    </span>
                                    <span className="text-lg font-bold text-neutral-900">
                                        {data.company}
                                    </span>
                                </div>

                                {/* Category */}
                                <div className="border-b border-neutral-100 pb-5">
                                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                                        Category
                                    </span>
                                    <span className="text-lg font-semibold text-neutral-900">
                                        {data.category}
                                    </span>
                                </div>

                                {/* Timelines */}
                                <div className="border-b border-neutral-100 pb-5">
                                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                                        Timelines
                                    </span>
                                    <span className="text-lg font-semibold text-neutral-900">
                                        {data.timelines}
                                    </span>
                                </div>

                                {/* live link */}
                                <div className="border-b border-neutral-100 pb-5">
                                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                                        Live view
                                    </span>
                                    <Link target="_blank" href={data.liveview || "/"} className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
                                        <span>
                                            Visit Website
                                        </span>
                                        <ImArrowDownRight2 className="text-lg rotate-270" />
                                    </Link>
                                </div>

                                {/* Services Provided */}
                                <div>
                                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block mb-3">
                                        Services Provided
                                    </span>
                                    <ul className="space-y-2">
                                        {data.services?.map((service, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-center gap-2 text-sm font-medium text-neutral-700 justify-start w-fit"
                                            >
                                                <span className="w-fit h-fit bg-white px-3 py-1 border border-gray-200">
                                                    {service}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>




                                {/* Social Sharing Box */}
                                <div className="pt-5">
                                    <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-4">
                                        Share this Case Study
                                    </h4>
                                    <div className="flex items-center gap-3">
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                                typeof window !== "undefined" ? window.location.href : ""
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10  bg-white border border-gray-200 text-neutral-700 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
                                            title="Share on Facebook"
                                        >
                                            <FaFacebookF className="text-sm" />
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                                typeof window !== "undefined" ? window.location.href : ""
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white border border-gray-200 text-neutral-700 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
                                            title="Share on Twitter"
                                        >
                                            <FaTwitter className="text-sm" />
                                        </a>
                                        <a
                                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                                                typeof window !== "undefined" ? window.location.href : ""
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white border border-gray-200 text-neutral-700 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
                                            title="Share on LinkedIn"
                                        >
                                            <FaLinkedinIn className="text-sm" />
                                        </a>
                                        <a
                                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                                                typeof window !== "undefined" ? window.location.href : ""
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white border border-gray-200 text-neutral-700 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
                                            title="Share on WhatsApp"
                                        >
                                            <FaWhatsapp className="text-sm" />
                                        </a>
                                        <button
                                            onClick={handleCopyLink}
                                            className="w-10 h-10 bg-white border border-gray-200 text-neutral-700 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer relative"
                                            title="Copy Page Link"
                                        >
                                            {copied ? (
                                                <FiCheck className="text-sm text-emerald-600 hover:text-white" />
                                            ) : (
                                                <FiCopy className="text-sm" />
                                            )}
                                        </button>
                                    </div>
                                    {copied && (
                                        <p className="text-xs text-emerald-600 font-semibold mt-2">
                                            Copied link to clipboard!
                                        </p>
                                    )}
                                </div>

                            </div>

                        </motion.div>

                        {/* Right Main Showcase Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-9 space-y-12 md:space-y-16"
                        >
                            {/* Main Hero Gallery Image */}
                            {data.heroImage && (
                                <div className="overflow-hidden bg-neutral-100">
                                    <img
                                        src={data.heroImage}
                                        alt={`${data.title} Hero Showcase`}
                                        className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-500"
                                    />
                                </div>
                            )}

                            {/* About Section */}
                            {data.about && (
                                <div className="bg-white space-y-4">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                                        About the Project
                                    </h2>
                                    <div className="space-y-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
                                        {data.about.map((para, i) => (
                                            <p key={i}>{para}</p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Cover Image Banner */}
                            {data.coverImage && (
                                <div className="overflow-hidden bg-neutral-100">
                                    <img
                                        src={data.coverImage}
                                        alt={`${data.title} Cover Banner`}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}

                            {/* Objectives Section */}
                            {data.objectives && (
                                <div className="bg-white space-y-3">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                                        Objectives
                                    </h2>
                                    <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                                        {data.objectives}
                                    </p>
                                </div>
                            )}

                            {/* Requirements Section */}
                            {data.requirements && (
                                <div className="bg-white  space-y-3">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                                        Requirements
                                    </h2>
                                    <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                                        {data.requirements}
                                    </p>
                                </div>
                            )}

                            {/* Solutions Section */}
                            {data.solutions && (
                                <div className="bg-white  space-y-3">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                                        Solutions
                                    </h2>
                                    <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                                        {data.solutions}
                                    </p>
                                </div>
                            )}

                            {/* Macbook View Showcase */}
                            {data.macbookView && (
                                <div className="overflow-hidden bg-neutral-100">
                                    <img
                                        src={data.macbookView}
                                        alt="Macbook View Showcase"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}

                            {/* Mobile Grid Gallery */}
                            {data.mobileGrid && data.mobileGrid.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.mobileGrid.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="overflow-hidden bg-neutral-100"
                                        >
                                            <img
                                                src={img}
                                                alt={`Mobile Showcase ${idx + 1}`}
                                                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Style Guide Section */}
                            {data.styleGuideText && (
                                <div className="space-y-6">
                                    <div className="bg-white space-y-3">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                                            Style Guide
                                        </h3>
                                        <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                                            {data.styleGuideText}
                                        </p>
                                    </div>

                                    {data.styleGuideGrid && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {data.styleGuideGrid.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="overflow-hidden bg-neutral-100"
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Style Guide Element ${idx + 1}`}
                                                        className="w-full h-auto object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {data.styleBanner && (
                                        <div className="overflow-hidden bg-neutral-100">
                                            <img
                                                src={data.styleBanner}
                                                alt="Style Guide Banner"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    )}

                                    {data.productGrid && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {data.productGrid.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="overflow-hidden bg-neutral-100"
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Product Feature ${idx + 1}`}
                                                        className="w-full h-auto object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Icons and Illustrations Section */}
                            {data.illustrationsText && (
                                <div className="space-y-6">
                                    <div className="bg-white space-y-3">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                                            Icons and Illustrations
                                        </h3>
                                        <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                                            {data.illustrationsText}
                                        </p>
                                    </div>

                                    {data.illustrationBanner && (
                                        <div className="overflow-hidden bg-neutral-100">
                                            <img
                                                src={data.illustrationBanner}
                                                alt="Icons and Illustrations Showcase"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    )}

                                    {data.responsiveGrid && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {data.responsiveGrid.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="overflow-hidden bg-neutral-100"
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Responsive Showcase ${idx + 1}`}
                                                        className="w-full h-auto object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Responsiveness Section */}
                            {data.responsivenessText && (
                                <div className="space-y-6">
                                    <div className="bg-white space-y-3">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                                            Responsiveness
                                        </h3>
                                        <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                                            {data.responsivenessText}
                                        </p>
                                    </div>

                                    {data.responsiveViewBanner && (
                                        <div className="overflow-hidden bg-neutral-100">
                                            <img
                                                src={data.responsiveViewBanner}
                                                alt="Responsive View Showcase"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    )}

                                    {data.macbookVersion && (
                                        <div className="overflow-hidden bg-neutral-100">
                                            <img
                                                src={data.macbookVersion}
                                                alt="Macbook Version Showcase"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    )}

                                    {data.footerShowcase && (
                                        <div className="overflow-hidden bg-neutral-100">
                                            <img
                                                src={data.footerShowcase}
                                                alt="Final Showcase"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20">
                <Cta />
            </div>
        </div>
    );
}
