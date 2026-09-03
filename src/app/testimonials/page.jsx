"use client";

import CtaSection from "@/components/Cta";
import ClientFeedbackAccordion from "@/components/sections/ClientFeedbackAccordion";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

const categories = [
  "All",
  "Enterprise Web App",
  "FinTech Platform",
  "Logistics Automation",
  "Brand & UI/UX Design",
  "Cloud Architecture",
];

const allTestimonials = [
  {
    id: 1,
    name: "Marcus Vance",
    role: "Head of Product",
    company: "Apex Global",
    avatar: "/image/leaders/Md-Ekramul-Hasan-Sales-Manager.webp",
    rating: 5,
    category: "Enterprise Web App",
    quote:
      "Sardar IT transformed our complex enterprise portal into a fast, intuitive web app. Their attention to UX detail and engineering speed were outstanding.",
    metric: "+180% Engagement",
    date: "August 2024",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "CEO & Co-Founder",
    company: "TechFlow Inc",
    avatar: "/image/leaders/amena.webp",
    rating: 5,
    category: "FinTech Platform",
    quote:
      "Working with Sardar IT felt like having an elite in-house engineering team. They delivered our Web3 dashboard ahead of schedule with zero compromises.",
    metric: "100k+ Active Users",
    date: "July 2024",
  },
  {
    id: 3,
    name: "Hossain Mahmud",
    role: "Project Director",
    company: "CASA Logistics",
    avatar: "/image/leaders/Hossain-Mahmud-Project-Manager.webp",
    rating: 5,
    category: "Logistics Automation",
    quote:
      "The custom software solution built by Sardar IT automated 70% of our daily operations. Truly a game-changer for our logistics pipeline.",
    metric: "70% Ops Time Saved",
    date: "May 2024",
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Chief Marketing Officer",
    company: "Luminar Digital",
    avatar: "/image/leaders/Medhi.webp",
    rating: 5,
    category: "Brand & UI/UX Design",
    quote:
      "Their design team brought world-class aesthetic quality to our rebrand. Conversion rate jumped 45% within three weeks of launch!",
    metric: "+45% Conversion",
    date: "June 2024",
  },
  {
    id: 5,
    name: "Sagor Hossein",
    role: "Managing Director",
    company: "Gulf Tech Solutions",
    avatar: "/image/leaders/sagor.webp",
    rating: 5,
    category: "Cloud Architecture",
    quote:
      "From technical consultation to deployment, Sardar IT demonstrated exceptional craftsmanship, transparency, and top-tier support.",
    metric: "99.99% Uptime",
    date: "April 2024",
  },
  {
    id: 6,
    name: "Md. Parvej Ahammed",
    role: "General Manager",
    company: "Nucleo Tech",
    avatar: "/image/leaders/Md.-Parvej-Ahammed.webp",
    rating: 5,
    category: "Enterprise Web App",
    quote:
      "Our multi-tenant SaaS application scaled effortlessly to 50k active users thanks to Sardar IT's clean architecture and cloud optimization.",
    metric: "50k+ Active Users",
    date: "January 2024",
  },
];

const platformRatings = [
  { platform: "Clutch", score: "4.9 / 5.0", reviews: "45+ Verified Reviews", badge: "Top B2B Company" },
  { platform: "GoodFirms", score: "5.0 / 5.0", reviews: "30+ Verified Reviews", badge: "Top Software Agency" },
  { platform: "Google Reviews", score: "5.0 / 5.0", reviews: "80+ Client Reviews", badge: "5 Star Business" },
  { platform: "Upwork", score: "100% Job Success", reviews: "Top Rated Plus", badge: "Top 1% Talent" },
];

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTestimonials =
    selectedCategory === "All"
      ? allTestimonials
      : allTestimonials.filter((item) => item.category === selectedCategory);

  return (
    <main className="w-full bg-white text-neutral-900 overflow-x-clip pt-16 md:pt-20">

      <ImpactStats />

      {/* Filterable Testimonials Grid Section */}
      <section className="w-full py-20 lg:py-24 bg-white">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${isSelected
                    ? "bg-[#133bd4] text-white shadow-md scale-105"
                    : "bg-[#F3F4F6] text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Testimonials Card Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#F8FAFC] hover:bg-white p-8 border border-neutral-200/80 hover:border-[#133bd4]/30 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Stars & Metric Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1 text-amber-400 text-lg">
                        {[...Array(item.rating)].map((_, i) => (
                          <FiStar key={i} className="fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-[#133bd4] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        {item.metric}
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
                    <div className="relative size-12 rounded-full overflow-hidden shrink-0 border border-neutral-300">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-neutral-950 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs font-medium text-neutral-500">
                        {item.role} • <span className="text-neutral-700 font-semibold">{item.company}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Interactive Accordion Section */}
      <ClientFeedbackAccordion />


      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
