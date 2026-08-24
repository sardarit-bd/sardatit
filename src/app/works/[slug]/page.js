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
        services: ["Brand Identity", "UI/UX Design", "Webflow Development"],
        heroImage:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970fb_Rivertel-UI-UX-Design-for-Telecom-Solutions.webp",
        about: [
            "CASA VIVA is a premium real estate platform built to showcase luxury property listings and simplify the property discovery experience for buyers and investors.",
            "We designed an elegant web experience with high-resolution visual tours, effortless search filters, and smooth digital booking.",
        ],
        coverImage:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970fb_Rivertel-UI-UX-Design-for-Telecom-Solutions.webp",
        objectives:
            "To establish a luxury real estate portal that turns property discovery into a refined, high-converting digital experience.",
        requirements:
            "Dynamic filtering by location and budget, mobile-first responsiveness, and easy broker updates.",
        solutions:
            "A fast, modern website featuring slick animations, architectural grid layouts, and direct lead generation.",
        macbookView:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497343_Recharge-IV-macbook-view.avif",
        mobileGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497342_Recharge-IV-mobile-version.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497344_Recharge-IV-mobile-view.avif",
        ],
        responsivenessText:
            "Fully responsive and optimized across all mobile devices, tablets, and desktops for buyers on the move.",
    },
    medease: {
        slug: "medease",
        title: "MedEase",
        company: "MedEase Healthcare",
        category: "Hospital Management System",
        timelines: "3 Months",
        services: ["UX Research", "UI Design", "Full Stack Development"],
        heroImage:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970b7_Abyan-Capital-Trading-Mobile-App.webp",
        about: [
            "A secure hospital management platform with an intuitive interface to improve healthcare operations, patient engagement, and medical workflows.",
            "We created simple, human-centered dashboards for medical practitioners and automated patient scheduling systems.",
        ],
        coverImage:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970b7_Abyan-Capital-Trading-Mobile-App.webp",
        objectives:
            "Streamline patient intake, appointment scheduling, and electronic health record management for multi-specialty clinics.",
        requirements:
            "Clean UI architecture, high accessibility standards, and multi-device support for hospital tablets.",
        solutions:
            "An intuitive dashboard interface that reduces administrative workload and enhances patient care experience.",
        macbookView:
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497343_Recharge-IV-macbook-view.avif",
        mobileGrid: [
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497342_Recharge-IV-mobile-version.avif",
            "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497344_Recharge-IV-mobile-view.avif",
        ],
        responsivenessText:
            "Accessible anywhere for clinicians, patients, and administrators on any screen size.",
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
        { name: "Recharge IV", slug: "recharge-iv", category: "Web Design" },
        { name: "CASA VIVA", slug: "casa-viva", category: "Real Estate Website" },
        { name: "MedEase", slug: "medease", category: "Hospital Management" },
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
