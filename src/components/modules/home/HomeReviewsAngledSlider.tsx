"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import { BsStarFill, BsStarHalf, BsStar, BsPatchCheckFill } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";
import AngledSlider from "@/components/ui/angled-slider";
import { REVIEWS_DATA } from "@/data/testimonials";
import { ReviewItem } from "@/types/testimonial";

export type { ReviewItem };

function StarRating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    if (rating >= starNumber) {
      return <BsStarFill key={index} className="text-amber-400 shrink-0 text-sm" />;
    } else if (rating >= starNumber - 0.5) {
      return <BsStarHalf key={index} className="text-amber-400 shrink-0 text-sm" />;
    } else {
      return <BsStar key={index} className="text-neutral-300 shrink-0 text-sm" />;
    }
  });

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">{stars}</div>
      <span className="font-mono text-xs font-bold text-neutral-800 tracking-tight ml-0.5">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export interface HomeReviewsAngledSliderProps {
  showFeedbackButton?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function HomeReviewsAngledSlider({
  showFeedbackButton,
  eyebrow = "/ CLIENT TESTIMONIALS",
  title = "What Our Clients Say About Working With Us",
  description = "Verified feedback from production-grade deployments, design systems, and automated pipelines across 60+ countries.",
  className = "",
}: HomeReviewsAngledSliderProps = {}) {
  const pathname = usePathname();
  const shouldShowButton =
    showFeedbackButton !== undefined
      ? showFeedbackButton
      : pathname !== "/testimonials";

  return (
    <section className={`w-full py-20 sm:py-28 bg-[#FAFAFA] text-neutral-900 border-t border-neutral-200/80 overflow-hidden relative ${className}`}>
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Responsive "INNOVATION" Background Watermark Text */}
      <div className="absolute inset-0 w-full overflow-hidden flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-black uppercase leading-none tracking-tighter text-5xl sm:text-7xl md:text-8xl lg:text-[140px] xl:text-[160px] text-neutral-900/[0.04] dark:text-white/[0.04] max-w-full text-center truncate select-none pointer-events-none">
          INNOVATION
        </span>
      </div>

      {/* Standard Unified Page Container Constraints */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            {/* Eyebrow: Blue dot + uppercase mono text */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-600 font-semibold mb-3">
              <span className="size-2 rounded-full bg-blue-600 shrink-0 animate-pulse" />
              <span>{eyebrow}</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 leading-[1.15] tracking-tight mb-4">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-neutral-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
              {description}
            </p>
          </div>

          {/* Action Button linking to /testimonials */}
          {shouldShowButton && (
            <Link
              href="/testimonials"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-neutral-950 text-white hover:bg-[#133bd4] font-semibold text-sm transition-all duration-300 shadow-sm hover:scale-[1.02] shrink-0 self-start md:self-end"
            >
              <span>See Client Feedback</span>
              <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          )}
        </div>

        {/* 3D Angled Slider Container with Edge Fade Gradients Constrained within Container */}
        <div className="w-full overflow-hidden relative">
          {/* Soft edge-fade gradients inside container */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

          <AngledSlider<ReviewItem>
            items={REVIEWS_DATA}
            angle={18}
            speed={35}
            direction="left"
            containerHeight="520px"
            cardWidth="360px"
            gap="32px"
            renderItem={(item) => (
              <div
                className="bg-white border border-neutral-200/90 rounded-2xl p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-blue-500/40 transition-colors duration-200 flex flex-col justify-between h-[380px] text-left"
              >
                {/* Top: Star Rating & Service Pill Tag */}
                <div className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <StarRating rating={item.rating} />
                  <span className="text-[11px] font-semibold text-[#133bd4] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/80 truncate max-w-[170px]">
                    {item.service}
                  </span>
                </div>

                {/* Middle: Client Quote */}
                <div className="my-auto py-2">
                  <FaQuoteLeft className="text-neutral-200 text-xl mb-2.5" />
                  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed italic font-normal line-clamp-4">
                    &quot;{item.quote}&quot;
                  </p>
                </div>

                {/* Bottom: Client Name + Verified Checkmark + Role/Company + Country Flag */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm sm:text-base font-bold text-neutral-950 truncate">
                        {item.name}
                      </h4>
                      <BsPatchCheckFill
                        className="text-[#133bd4] size-3.5 shrink-0"
                        title="Verified Client Review"
                      />
                    </div>
                    <p className="text-xs text-neutral-500 truncate mt-0.5">
                      {item.role} · <span className="text-neutral-700 font-medium">{item.company}</span>
                    </p>
                  </div>

                  {/* Country Flag Badge */}
                  <span
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-xs font-semibold text-neutral-700 shrink-0 shadow-2xs"
                    title={item.country}
                  >
                    <span className="text-sm leading-none">{item.flag}</span>
                  </span>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}

export const TestimonialsSection = HomeReviewsAngledSlider;
export default HomeReviewsAngledSlider;
