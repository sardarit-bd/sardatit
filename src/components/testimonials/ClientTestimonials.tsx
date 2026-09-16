"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BsStarFill, BsStarHalf, BsStar, BsPatchCheckFill } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";
import SectionHeader from "@/components/ui/SectionHeader";

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  country: string;
  flag: string;
  avatar: string;
  rating: number;
  category: string;
  quote: string;
  metric: string;
  date: string;
  verified?: boolean;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 1,
    name: "Marcus Vance",
    role: "Head of Product",
    company: "Apex Global",
    country: "United States",
    flag: "🇺🇸",
    avatar: "/image/leaders/Md-Ekramul-Hasan-Sales-Manager.webp",
    rating: 5.0,
    category: "Enterprise Web App",
    quote:
      "Sardar IT transformed our complex enterprise portal into a fast, intuitive web app. Their attention to UX detail and engineering speed were outstanding.",
    metric: "+180% Engagement",
    date: "August 2024",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "CEO & Co-Founder",
    company: "TechFlow Inc",
    country: "United Kingdom",
    flag: "🇬🇧",
    avatar: "/image/leaders/amena.webp",
    rating: 4.8,
    category: "FinTech Platform",
    quote:
      "Working with Sardar IT felt like having an elite in-house engineering team. They delivered our Web3 dashboard ahead of schedule with zero compromises.",
    metric: "100k+ Active Users",
    date: "July 2024",
    verified: true,
  },
  {
    id: 3,
    name: "Hossain Mahmud",
    role: "Project Director",
    company: "CASA Logistics",
    country: "Bangladesh",
    flag: "🇧🇩",
    avatar: "/image/leaders/Hossain-Mahmud-Project-Manager.webp",
    rating: 5.0,
    category: "Logistics Automation",
    quote:
      "The custom software solution built by Sardar IT automated 70% of our daily operations. Truly a game-changer for our logistics pipeline.",
    metric: "70% Ops Time Saved",
    date: "May 2024",
    verified: true,
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Chief Marketing Officer",
    company: "Luminar Digital",
    country: "Germany",
    flag: "🇩🇪",
    avatar: "/image/leaders/Medhi.webp",
    rating: 4.5,
    category: "Brand & UI/UX Design",
    quote:
      "Their design team brought world-class aesthetic quality to our rebrand. Conversion rate jumped 45% within three weeks of launch!",
    metric: "+45% Conversion",
    date: "June 2024",
    verified: true,
  },
  {
    id: 5,
    name: "Sagor Hossein",
    role: "Managing Director",
    company: "Gulf Tech Solutions",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    avatar: "/image/leaders/sagor.webp",
    rating: 4.0,
    category: "Cloud Architecture",
    quote:
      "Minor revisions took a couple iterations to align on nuances, but the final code quality, cloud resilience, and support were rock-solid.",
    metric: "99.99% Uptime",
    date: "April 2024",
    verified: true,
  },
  {
    id: 6,
    name: "Md. Parvej Ahammed",
    role: "General Manager",
    company: "Nucleo Tech",
    country: "Singapore",
    flag: "🇸🇬",
    avatar: "/image/leaders/Md.-Parvej-Ahammed.webp",
    rating: 4.5,
    category: "Enterprise Web App",
    quote:
      "Our multi-tenant SaaS application scaled effortlessly to 50k active users thanks to Sardar IT's clean architecture and cloud optimization.",
    metric: "50k+ Active Users",
    date: "January 2024",
    verified: true,
  },
];

export const TESTIMONIAL_CATEGORIES = [
  "All",
  "Enterprise Web App",
  "FinTech Platform",
  "Logistics Automation",
  "Brand & UI/UX Design",
  "Cloud Architecture",
];

export interface StarRatingProps {
  rating: number;
  maxStars?: number;
  className?: string;
}

export function StarRating({ rating, maxStars = 5, className = "" }: StarRatingProps) {
  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starNumber = index + 1;
    if (rating >= starNumber) {
      return <BsStarFill key={index} className="text-amber-400 shrink-0" />;
    } else if (rating >= starNumber - 0.5) {
      return <BsStarHalf key={index} className="text-amber-400 shrink-0" />;
    } else {
      return <BsStar key={index} className="text-neutral-300 shrink-0" />;
    }
  });

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className="flex items-center gap-0.5 text-base text-amber-400"
        aria-label={`${rating} out of ${maxStars} stars`}
      >
        {stars}
      </div>
      <span className="font-mono text-xs sm:text-sm font-bold text-neutral-800 tracking-tight">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export interface ClientTestimonialsProps {
  testimonials?: TestimonialItem[];
  categories?: string[];
  showCategories?: boolean;
  showHeader?: boolean;
  showFeedbackButton?: boolean;
  tag?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
}

export function ClientTestimonials({
  testimonials = TESTIMONIALS_DATA,
  categories = TESTIMONIAL_CATEGORIES,
  showCategories = true,
  showHeader = true,
  showFeedbackButton,
  tag = "Client Testimonials",
  title = "What Our Clients Say About Working With Us",
  description = "Verified reviews from enterprise founders, engineering directors, and product leaders across 60+ countries.",
  ctaText = "See Client Feedback",
  ctaLink = "/testimonials",
}: ClientTestimonialsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const pathname = usePathname();

  const shouldShowButton =
    showFeedbackButton !== undefined
      ? showFeedbackButton
      : pathname !== "/testimonials";

  const filteredTestimonials =
    selectedCategory === "All"
      ? testimonials
      : testimonials.filter((item) => item.category === selectedCategory);

  return (
    <section className="w-full py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Responsive "INNOVATION" Background Watermark Text */}
      <div className="absolute inset-0 w-full overflow-hidden flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-black uppercase leading-none tracking-tighter text-5xl sm:text-7xl md:text-8xl lg:text-[140px] xl:text-[160px] text-neutral-900/[0.04] dark:text-white/[0.04] max-w-full text-center truncate select-none pointer-events-none">
          INNOVATION
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Optional Section Header */}
        {showHeader && (
          <div className="mb-14">
            <SectionHeader
              tag={tag}
              title={title}
              description={description}
              ctaText={shouldShowButton ? ctaText : undefined}
              ctaLink={shouldShowButton ? ctaLink : undefined}
              theme="light"
            />
          </div>
        )}

        {/* Category Filter Pills */}
        {showCategories && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#133bd4] text-white shadow-md scale-105"
                      : "bg-[#F3F4F6] text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Testimonials 3-Column Responsive Card Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[#F8FAFC] hover:bg-white p-8 border border-neutral-200/80 hover:border-[#133bd4]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Dynamic Star Rating + Badges */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <StarRating rating={item.rating} />

                    <div className="flex items-center gap-2">
                      {/* Country Flag Badge */}
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-neutral-600 bg-white border border-neutral-200/80 rounded-full shadow-xs"
                        title={item.country}
                      >
                        <span className="text-sm leading-none">{item.flag}</span>
                        <span className="hidden sm:inline text-[11px] font-medium text-neutral-500">
                          {item.country}
                        </span>
                      </span>

                      {/* Metric Tag */}
                      <span className="text-xs font-bold text-[#133bd4] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 whitespace-nowrap">
                        {item.metric}
                      </span>
                    </div>
                  </div>

                  {/* Service Pill Tag */}
                  <div className="mb-4">
                    <span className="inline-block text-[11px] font-semibold text-neutral-600 bg-neutral-200/60 px-2.5 py-0.5 rounded-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Quote Icon & Text */}
                  <FaQuoteLeft className="text-neutral-300 text-2xl mb-4 group-hover:text-[#133bd4] transition-colors" />
                  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                    &quot;{item.quote}&quot;
                  </p>
                </div>

                {/* Client Info Row */}
                <div className="pt-6 border-t border-neutral-200/70 flex items-center gap-4">
                  <div className="relative size-12 rounded-full overflow-hidden shrink-0 border border-neutral-300 bg-neutral-100">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-bold text-neutral-950 leading-tight">
                        {item.name}
                      </h4>
                      {item.verified && (
                        <BsPatchCheckFill
                          className="text-[#133bd4] size-4 shrink-0"
                          title="Verified Client Review"
                        />
                      )}
                    </div>
                    <p className="text-xs font-medium text-neutral-500 mt-0.5">
                      {item.role} •{" "}
                      <span className="text-neutral-700 font-semibold">
                        {item.company}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default ClientTestimonials;
