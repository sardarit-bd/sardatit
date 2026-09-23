"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Boxes,
  Code2,
  Cpu,
  TrendingUp,
  Layers,
  Sparkles,
  Palette,
  Zap,
  Smartphone,
  Cloud,
  Workflow,
  Bot,
  ShieldCheck,
  Target,
  LineChart,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

interface DeliverableItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

interface ShowcaseCardData {
  id: string;
  slug: string;
  pillTag: string;
  pillIcon: React.ComponentType<{ className?: string }>;
  headlinePrefix: string;
  headlineGradient: string;
  gradientClass: string;
  description: string;
  deliverables: DeliverableItem[];
  ctaText: string;
  href: string;
  image: string;
  containerBg: string;
  containerShadow: string;
  glowPrimary: string;
  glowSecondary: string;
}

const SHOWCASE_CARDS: ShowcaseCardData[] = [
  {
    id: "brand-identity",
    slug: "brand-identity",
    pillTag: "PRODUCT DESIGN",
    pillIcon: Boxes,
    headlinePrefix: "Digital products people actually ",
    headlineGradient: "enjoy using",
    gradientClass: "from-blue-600 via-indigo-600 to-blue-700",
    description:
      "We turn complex ideas into clean, frictionless interfaces and scalable design systems that make your brand memorable from day one.",
    deliverables: [
      { name: "UI/UX Architecture", icon: Layers, iconColor: "text-blue-600" },
      { name: "Interactive Prototypes", icon: Sparkles, iconColor: "text-indigo-500" },
      { name: "Design Systems & Tokens", icon: Palette, iconColor: "text-blue-500" },
    ],
    ctaText: "Start a Project",
    href: "/services/brand-identity",
    image: "/image/project/CASA.webp",
    containerBg: "bg-gradient-to-br from-[#f0f6ff] via-[#e6f0fd] to-[#dbeafe]",
    containerShadow: "shadow-[0_20px_50px_rgba(37,99,235,0.06)]",
    glowPrimary: "bg-blue-400/25",
    glowSecondary: "bg-indigo-300/20",
  },
  {
    id: "web-mobile-development",
    slug: "web-mobile-development",
    pillTag: "FULL-STACK ENGINEERING",
    pillIcon: Code2,
    headlinePrefix: "Fast, resilient software built to ",
    headlineGradient: "handle real traffic",
    gradientClass: "from-emerald-600 via-teal-600 to-emerald-700",
    description:
      "No fragile spaghetti code. We engineer web and mobile apps focused on sub-second loads, rock-solid uptime, and clean maintainability.",
    deliverables: [
      { name: "Next.js & React Web Apps", icon: Zap, iconColor: "text-emerald-600" },
      { name: "Native iOS & Android", icon: Smartphone, iconColor: "text-teal-600" },
      { name: "Cloud & High-Throughput APIs", icon: Cloud, iconColor: "text-emerald-500" },
    ],
    ctaText: "Build With Us",
    href: "/services/web-mobile-development",
    image: "/image/services/mobile-dual-mockup.webp",
    containerBg: "bg-gradient-to-br from-[#f2fbf4] via-[#e6f7ea] to-[#d7f2dc]",
    containerShadow: "shadow-[0_20px_50px_rgba(16,185,129,0.06)]",
    glowPrimary: "bg-emerald-400/25",
    glowSecondary: "bg-teal-300/20",
  },
  {
    id: "ai-automation-solutions",
    slug: "ai-automation-solutions",
    pillTag: "SMART WORKFLOWS",
    pillIcon: Cpu,
    headlinePrefix: "Eliminate repetitive tasks with ",
    headlineGradient: "automation & AI",
    gradientClass: "from-amber-600 via-orange-500 to-amber-700",
    description:
      "Connect your CRMs, databases, and daily tools into seamless, self-hosted pipelines that save hundreds of team hours every month without extra SaaS fees.",
    deliverables: [
      { name: "Custom n8n & Webhooks", icon: Workflow, iconColor: "text-amber-600" },
      { name: "Fine-Tuned AI Assistants", icon: Bot, iconColor: "text-orange-500" },
      { name: "Secure Internal Tooling", icon: ShieldCheck, iconColor: "text-amber-500" },
    ],
    ctaText: "Automate Your Ops",
    href: "/services/ai-automation-solutions",
    image: "/image/services/isometric-ai-core.png",
    containerBg: "bg-gradient-to-br from-[#fffdf5] via-[#fef7db] to-[#fdeea8]",
    containerShadow: "shadow-[0_20px_50px_rgba(245,158,11,0.08)]",
    glowPrimary: "bg-amber-400/25",
    glowSecondary: "bg-orange-300/20",
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    pillTag: "PERFORMANCE & SEO",
    pillIcon: TrendingUp,
    headlinePrefix: "Measurable growth backed by ",
    headlineGradient: "clean data, not guesswork",
    gradientClass: "from-rose-600 via-red-500 to-orange-500",
    description:
      "High-intent organic search, performance engineering, and conversion rate audits built to bring qualified clients through your front door.",
    deliverables: [
      { name: "Technical SEO & Core Web Vitals", icon: Target, iconColor: "text-rose-600" },
      { name: "High-Conversion Funnels", icon: Sparkles, iconColor: "text-orange-500" },
      { name: "Real-Time Analytics & Tracking", icon: LineChart, iconColor: "text-rose-500" },
    ],
    ctaText: "Scale Your Reach",
    href: "/services/digital-marketing",
    image: "/image/services/digital-marketing.png",
    containerBg: "bg-gradient-to-br from-[#fff5f2] via-[#fee7e0] to-[#fcd3c7]",
    containerShadow: "shadow-[0_20px_50px_rgba(244,63,94,0.06)]",
    glowPrimary: "bg-rose-400/25",
    glowSecondary: "bg-orange-300/20",
  },
];

export function ServiceShowcaseCard() {
  return (
    <section className="flex flex-col gap-14 w-full items-center justify-center px-6 md:px-10 py-16">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader
          tag="What We Do"
          title="Software & Digital Solutions engineered for global scale."
          description="From idea to launch — empowering global businesses with next-generation architecture, intelligent workflows, and measurable ROI."
          ctaText="See Our Services"
          ctaLink="/services"
          theme="light"
        />
      </div>

      <div className="w-full container mx-auto px-6 md:px-12 flex flex-col gap-8 md:gap-12 relative pb-20">
        {SHOWCASE_CARDS.map((card, index) => {
          return (
            <div
              key={card.id}
              style={{
                top: `calc(100px + ${index * 30}px)`,
              }}
              className={`sticky w-full flex flex-col lg:flex-row items-center overflow-hidden transition-all duration-300 rounded-[32px] border border-white/80 ${card.containerBg} ${card.containerShadow} p-8 sm:p-12 gap-8 lg:gap-12 relative`}
            >
              {/* Soft inner ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/40 pointer-events-none rounded-[32px]" />

              {/* Left hero panel */}
              <motion.div
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-1 flex-col justify-between items-start z-10 w-full lg:basis-[52%]"
              >
                {/* Header + body */}
                <div className="flex flex-col items-start w-full">
                  {/* Top Category Pill */}
                  <div className="inline-flex items-center gap-2.5 bg-gradient-to-b from-white to-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_4px_14px_-2px_rgba(37,99,235,0.08)] text-[11px] font-bold tracking-wider text-slate-800 uppercase mb-6">
                    <card.pillIcon className="w-3.5 h-3.5 text-slate-800" />
                    <span>{card.pillTag}</span>
                  </div>

                  {/* Headline with Gradient Highlight */}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                    {card.headlinePrefix}
                    <span
                      className={`bg-gradient-to-r ${card.gradientClass} bg-clip-text text-transparent`}
                    >
                      {card.headlineGradient}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4 max-w-lg">
                    {card.description}
                  </p>

                  {/* Key Deliverable Feature Badges */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6">
                    {card.deliverables.map((item) => (
                      <span
                        key={item.name}
                        className="bg-gradient-to-b from-white via-white/95 to-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/95 shadow-[inset_0_1.5px_1.5px_0px_rgba(255,255,255,1),inset_0_-1px_1px_0px_rgba(203,213,225,0.3),0_8px_20px_-4px_rgba(37,99,235,0.1)] text-xs sm:text-[13px] font-semibold text-slate-800 inline-flex items-center gap-2.5 select-none transition-all duration-300 hover:scale-[1.02] cursor-default"
                      >
                        <item.icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
                        <span>{item.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary CTA Button */}
                <Link
                  href={card.href}
                  className="group inline-flex items-center gap-2.5 bg-gradient-to-b from-[#141b2b] to-[#070a11] text-white text-sm font-medium rounded-full px-6 py-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_24px_-6px_rgba(15,23,42,0.35)] hover:shadow-[0_16px_32px_-6px_rgba(15,23,42,0.45)] transition-all duration-300 active:scale-95 mt-8"
                >
                  <span>{card.ctaText}</span>
                  <span className="flex items-center justify-center size-5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>

              {/* Right Column: Mockup & Decorative Visual Layer */}
              <div className="relative flex w-full flex-1 lg:w-1/2 lg:basis-[48%] min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] items-center justify-center p-4 sm:p-8 overflow-hidden rounded-2xl">
                {/* Glowing ambient radial blurred lights */}
                <div
                  className={`absolute -top-10 -right-10 w-72 h-72 rounded-full ${card.glowPrimary} blur-3xl pointer-events-none opacity-80`}
                />
                <div
                  className={`absolute -bottom-10 -left-10 w-64 h-64 rounded-full ${card.glowSecondary} blur-3xl pointer-events-none opacity-70`}
                />

                {/* Translucent floating frosted glass panels */}
                <div className="absolute inset-2 sm:inset-4 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.03)] pointer-events-none" />

                {/* Subtle decorative corner dots */}
                <div className="absolute top-6 right-6 flex items-center gap-1.5 opacity-40 pointer-events-none z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                </div>

                {/* Floating device / project mockup with soft drop shadow */}
                <motion.div
                  whileHover={{ scale: 1.025, y: -4 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-10 w-full h-[260px] sm:h-[320px] lg:h-[360px] rounded-xl overflow-hidden shadow-[0_20px_45px_rgba(15,23,42,0.12)] border border-white/80"
                >
                  <Image
                    src={card.image}
                    alt={`${card.headlinePrefix}${card.headlineGradient} showcase`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                    priority={index < 2}
                  />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ServiceShowcaseCard;
