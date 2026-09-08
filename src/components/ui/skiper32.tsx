"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiArrowDown,
  FiTrendingUp,
  FiExternalLink,
} from "react-icons/fi";

export interface CampaignItem {
  id: string;
  title: string;
  category: string;
  platform: "Meta" | "Google" | "TikTok" | "Analytics" | "Creative" | "LinkedIn";
  metric: string;
  metricLabel: string;
  imageUrl: string;
  fallbackColor: string;
}

export const DIGITAL_MARKETING_CAMPAIGNS: CampaignItem[] = [
  {
    id: "camp-01",
    title: "Omnichannel D2C Brand Scale",
    category: "Meta Ads & Advantage+",
    platform: "Meta",
    metric: "5.4x",
    metricLabel: "Blended ROAS",
    imageUrl:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-blue-600 to-indigo-900",
  },
  {
    id: "camp-02",
    title: "Google Performance Max Funnel",
    category: "Paid Search & Shopping",
    platform: "Google",
    metric: "+320%",
    metricLabel: "Revenue Lift",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-emerald-600 to-teal-950",
  },
  {
    id: "camp-03",
    title: "Viral TikTok Creator UGC Machine",
    category: "Short-Form Video Ads",
    platform: "TikTok",
    metric: "4.8M",
    metricLabel: "Target Impressions",
    imageUrl:
      "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-rose-600 to-pink-950",
  },
  {
    id: "camp-04",
    title: "Executive ROAS & Cohort BI",
    category: "Media Mix Modeling",
    platform: "Analytics",
    metric: "99.2%",
    metricLabel: "Attribution Match",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-amber-600 to-stone-900",
  },
  {
    id: "camp-05",
    title: "B2B Enterprise Pipeline Gen",
    category: "LinkedIn Sponsored InMail",
    platform: "LinkedIn",
    metric: "$2.4M",
    metricLabel: "Qualified Pipeline",
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-cyan-700 to-blue-950",
  },
  {
    id: "camp-06",
    title: "High-Converting Hero Landing Page",
    category: "CRO & Split Testing",
    platform: "Creative",
    metric: "14.8%",
    metricLabel: "Conversion Rate",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-violet-700 to-purple-950",
  },
  {
    id: "camp-07",
    title: "Instagram Story Carousel Hooks",
    category: "Dynamic Product Ads",
    platform: "Meta",
    metric: "6.2%",
    metricLabel: "Click-Through (CTR)",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-pink-600 to-rose-950",
  },
  {
    id: "camp-08",
    title: "Retention & SMS/Email Flows",
    category: "Klaviyo Lifecycle Automations",
    platform: "Analytics",
    metric: "42%",
    metricLabel: "Repeat Purchase Rate",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-sky-600 to-slate-900",
  },
  {
    id: "camp-09",
    title: "TikTok Spark Ads Community Push",
    category: "Influencer Amplification",
    platform: "TikTok",
    metric: "120K+",
    metricLabel: "App Installs",
    imageUrl:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-fuchsia-600 to-purple-950",
  },
  {
    id: "camp-10",
    title: "Black Friday Cyber Week Surge",
    category: "Full-Funnel Holiday Blitz",
    platform: "Meta",
    metric: "+480%",
    metricLabel: "YoY GMV Scale",
    imageUrl:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-red-600 to-amber-950",
  },
  {
    id: "camp-11",
    title: "Global SaaS Search Capture",
    category: "High-Intent Keyword Bidding",
    platform: "Google",
    metric: "-45%",
    metricLabel: "Customer Acquisition (CAC)",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-blue-700 to-cyan-950",
  },
  {
    id: "camp-12",
    title: "Brand Film & Visual Motion Identity",
    category: "Brand Equity & Recall",
    platform: "Creative",
    metric: "+88%",
    metricLabel: "Brand Sentiment",
    imageUrl:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-neutral-700 to-neutral-950",
  },
  {
    id: "camp-13",
    title: "Real-Time Conversion Tracking Hub",
    category: "CAPI & Server-Side Tracking",
    platform: "Analytics",
    metric: "100%",
    metricLabel: "Data Accuracy",
    imageUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-emerald-700 to-teal-950",
  },
  {
    id: "camp-14",
    title: "Multi-Language Global Search Ads",
    category: "International Expansion",
    platform: "Google",
    metric: "24",
    metricLabel: "Countries Reached",
    imageUrl:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-amber-600 to-orange-950",
  },
  {
    id: "camp-15",
    title: "AI Dynamic Creative Optimization",
    category: "Algorithmic Ad Variants",
    platform: "Creative",
    metric: "640+",
    metricLabel: "Creatives Generated",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-indigo-600 to-purple-950",
  },
  {
    id: "camp-16",
    title: "Fintech Trust & Social Proof Push",
    category: "Testimonial Ad Formats",
    platform: "LinkedIn",
    metric: "+210%",
    metricLabel: "Sign-Up Velocity",
    imageUrl:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-slate-700 to-slate-950",
  },
  {
    id: "camp-17",
    title: "Re-engagement Cart Abandonment",
    category: "Hyper-Segmented Dynamic Ads",
    platform: "Meta",
    metric: "28.4%",
    metricLabel: "Recovered Checkouts",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-green-600 to-teal-950",
  },
  {
    id: "camp-18",
    title: "Video View-Through Retargeting",
    category: "YouTube & Display Network",
    platform: "Google",
    metric: "72%",
    metricLabel: "Avg. Watch Duration",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-red-700 to-rose-950",
  },
  {
    id: "camp-19",
    title: "Viral Challenge & Audio Campaign",
    category: "Sound-On Native Storytelling",
    platform: "TikTok",
    metric: "18.2M",
    metricLabel: "Hashtag Plays",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-pink-700 to-purple-950",
  },
  {
    id: "camp-20",
    title: "360° Media Architecture",
    category: "Unified Performance Engine",
    platform: "Analytics",
    metric: "$18.5M",
    metricLabel: "Managed Ad Spend",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    fallbackColor: "from-neutral-800 to-black",
  },
];

interface Skiper32Props {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  campaigns?: CampaignItem[];
  className?: string;
}

export function Skiper32({
  title = "High-Impact Campaigns & Creative Showcase",
  subtitle = "Interactive 3D perspective grid of performance-driven ad creatives, omni-channel scale experiments, and data-backed marketing systems.",
  eyebrow = "Proprietary Growth Lab",
  campaigns = DIGITAL_MARKETING_CAMPAIGNS,
  className = "",
}: Skiper32Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Scroll Progress across 280vh travel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 3D Perspective Physics Interpolations
  const rotateX = useTransform(scrollYProgress, [0, 0.65, 1], [48, 12, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [0.46, 0.72, 0.86]);
  const translateY = useTransform(scrollYProgress, [0, 0.7, 1], ["-15%", "-6%", "0%"]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [-120, 0]);

  // Scroll indicator fades out as user begins scrolling
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const indicatorY = useTransform(scrollYProgress, [0, 0.15], [0, -12]);

  // Header smoothly fades out as grid expands to full screen focus
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.55], [1, 0.9, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.55], [0, -30]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-[280vh] bg-neutral-950 text-white selection:bg-blue-600 selection:text-white ${className}`}
      id="campaigns-showcase"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-[140px] pointer-events-none -z-10" />

        {/* Ambient Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-gradient-to-t from-blue-500/10 to-transparent blur-[120px] pointer-events-none -z-10" />

        {/* Section Header Overlay */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto pointer-events-none shrink-0"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 shadow-inner text-xs sm:text-sm font-semibold text-blue-400 mb-3 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span>{eyebrow}</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2 sm:mb-3">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed line-clamp-2 sm:line-clamp-none">
            {subtitle}
          </p>
        </motion.div>

        {/* 3D Perspective Gallery Viewport */}
        <div
          className="relative w-full flex-1 flex items-center justify-center my-2 sm:my-4"
          style={{
            perspective: "1100px",
            perspectiveOrigin: "50% 38%",
          }}
        >
          <motion.div
            style={{
              rotateX,
              scale,
              y: translateY,
              z: translateZ,
              transformStyle: "preserve-3d",
            }}
            className="w-full max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 p-2 sm:p-4 origin-center will-change-transform"
          >
            {campaigns.slice(0, 20).map((camp, idx) => {
              return (
                <motion.div
                  key={camp.id}
                  onMouseEnter={() => setActiveCard(camp.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 hover:border-blue-500/60 shadow-xl transition-all duration-300 cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Image Background */}
                  <Image
                    src={camp.imageUrl}
                    alt={camp.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={idx < 5}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-neutral-900/10 group-hover:from-neutral-950/98 transition-colors duration-300" />

                  {/* Top Platform Tag */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                    <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-neutral-200">
                      {camp.platform}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <FiExternalLink className="w-2.5 h-2.5 text-white" />
                    </span>
                  </div>

                  {/* Bottom Campaign Info & KPIs */}
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 flex flex-col justify-end z-10">
                    <span className="text-[10px] sm:text-[11px] font-medium text-blue-400 truncate mb-0.5">
                      {camp.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-blue-300 transition-colors">
                      {camp.title}
                    </h3>

                    {/* Metric Highlight Box */}
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="block text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider">
                          {camp.metricLabel}
                        </span>
                        <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono">
                          {camp.metric}
                        </span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <FiTrendingUp className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Subtle Border Glow on Hover */}
                  <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dynamic Scroll Indicator */}
        <motion.div
          style={{
            opacity: indicatorOpacity,
            y: indicatorY,
          }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none shrink-0"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800/80 shadow-md backdrop-blur-md">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-neutral-300">
              Scroll to explore campaigns
            </span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <FiArrowDown className="w-3.5 h-3.5 text-blue-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skiper32;
