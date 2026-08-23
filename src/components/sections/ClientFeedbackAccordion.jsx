"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FiArrowRight, FiStar } from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";


const testimonials = [
  {
    id: 1,
    index: "01",
    name: "Marcus Vance",
    role: "Head of Product",
    company: "Apex Global",
    avatar: "/image/leaders/Md-Ekramul-Hasan-Sales-Manager.webp",
    rating: 5,
    quote:
      "Sardar IT transformed our complex enterprise portal into a fast, intuitive web app. Their attention to UX detail and engineering speed were outstanding.",
    projectTag: "Enterprise Web App",
    metric: "+180% Engagement",
  },
  {
    id: 2,
    index: "02",
    name: "Sarah Jenkins",
    role: "CEO & Co-Founder",
    company: "TechFlow Inc",
    avatar: "/image/leaders/amena.webp",
    rating: 5,
    quote:
      "Working with Sardar IT felt like having an elite in-house engineering team. They delivered our Web3 dashboard ahead of schedule with zero compromises.",
    projectTag: "FinTech Platform",
    metric: "100k+ Active Users",
  },
  {
    id: 3,
    index: "03",
    name: "Hossain Mahmud",
    role: "Project Director",
    company: "CASA Logistics",
    avatar: "/image/leaders/Hossain-Mahmud-Project-Manager.webp",
    rating: 5,
    quote:
      "The custom software solution built by Sardar IT automated 70% of our daily operations. Truly a game-changer for our logistics pipeline.",
    projectTag: "Logistics Automation",
    metric: "70% Ops Time Saved",
  },
  {
    id: 4,
    index: "04",
    name: "Elena Rostova",
    role: "Chief Marketing Officer",
    company: "Luminar Digital",
    avatar: "/image/leaders/Medhi.webp",
    rating: 5,
    quote:
      "Their design team brought world-class aesthetic quality to our rebrand. Conversion rate jumped 45% within three weeks of launch!",
    projectTag: "Brand & UI/UX Design",
    metric: "+45% Conversion",
  },
  {
    id: 5,
    index: "05",
    name: "Sagor Hossein",
    role: "Managing Director",
    company: "Gulf Tech Solutions",
    avatar: "/image/leaders/sagor.webp",
    rating: 5,
    quote:
      "From technical consultation to deployment, Sardar IT demonstrated exceptional craftsmanship, transparency, and top-tier support.",
    projectTag: "Cloud Architecture",
    metric: "99.99% Uptime",
  },
];

export default function ClientFeedbackAccordion() {
  const [activeIndex, setActiveIndex] = useState < number > (0);

  return (
    <section className="w-full py-20 md:py-28 bg-[#F3F4F6] text-neutral-900 overflow-hidden relative">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#133bd4]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        <SectionHeader tag={"Client Testimonials"} title1=" What Our Clients Say About" pre="" title2="Working With Us" isBgWhite={true} link={'/'} btn={'See Client Feedback'} />


        {/* React Bits Accordion Gallery */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 w-full h-auto md:h-[500px] mt-14">
          {testimonials.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                layout
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className={`relative overflow-hidden cursor-pointer transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 border ${isActive
                  ? "md:flex-[3.5] bg-white border-neutral-200 shadow-xl shadow-slate-300/40"
                  : "md:flex-1 bg-white/60 hover:bg-white border-neutral-200/70"
                  }`}
              >
                {/* Active Panel Content */}
                {isActive ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex flex-col justify-between h-full w-full"
                  >
                    {/* Top Row: Index Badge & Rating */}
                    <div className="flex items-center justify-between w-full mb-6">
                      <span className="text-xs font-bold tracking-widest text-neutral-600 uppercase bg-neutral-100 px-3 py-1 border border-neutral-200">
                        /{item.index} — {item.projectTag}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 text-sm">
                        {[...Array(item.rating)].map((_, i) => (
                          <FiStar key={i} className="fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Quote Text */}
                    <div className="my-auto py-2">
                      <FaQuoteLeft className="text-3xl sm:text-4xl text-[#133bd4]/20 mb-4" />
                      <p className="text-lg sm:text-xl lg:text-2xl font-medium text-neutral-900 leading-relaxed tracking-wide italic">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Bottom Row: Client Info & Metric */}
                    <div className="flex items-end justify-between pt-6 border-t border-neutral-100 mt-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#133bd4]/40 shadow-sm">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-neutral-500">
                            {item.role}, <span className="text-[#133bd4] font-semibold">{item.company}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Inactive Condensed Panel */
                  <div className="flex flex-row md:flex-col justify-between items-center md:items-start h-full w-full py-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold tracking-wider text-neutral-400">
                        /{item.index}
                      </span>
                    </div>

                    {/* Vertical / Compact Title on Desktop */}
                    <div className="hidden md:flex flex-col items-start gap-3 my-auto">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-200">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="[writing-mode:vertical-lr] rotate-180 text-sm font-bold text-neutral-700 tracking-wider whitespace-nowrap uppercase">
                        {item.name} — <span className="text-neutral-400">{item.company}</span>
                      </div>
                    </div>

                    {/* Horizontal Title on Mobile */}
                    <div className="flex md:hidden items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-neutral-200">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-sm font-semibold text-neutral-800">
                        {item.name}
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 group-hover:text-black">
                      <FiArrowRight className="text-xs" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
