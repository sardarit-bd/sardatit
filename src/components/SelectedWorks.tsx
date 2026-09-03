// components/sections/SelectedWorks.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { SectionTitle } from "../components/ui/SectionTitle";

const works = [
  {
    id: 1,
    title: "AI Onboarding Assistant",
    category: "AI Product",
    description:
      "Building an intelligent onboarding flow powered by GPT-4 and natural conversations",
    image: "/image/hero1.jpg",
    tags: ["AI", "v0", "Next.js", "OpenAI"],
  },
  {
    id: 2,
    title: "AI Fashion Curator",
    category: "E-commerce AI",
    description:
      "Personalized style recommendations using computer vision and preference learning",
    image: "/image/hero2.jpg",
    tags: ["AI", "Machine Learning", "Midjourney"],
  },
  {
    id: 3,
    title: "Smart Task Manager",
    category: "Productivity AI",
    description:
      "AI-powered task prioritization and scheduling with natural language processing",
    image: "/image/hero1.jpg",
    tags: ["AI", "Claude", "Vibe Coding"],
  },
  {
    id: 4,
    title: "Crypto AI Analytics",
    category: "FinTech AI",
    description:
      "Real-time market insights and predictions powered by advanced AI models",
    image: "/image/hero2.jpg",
    tags: ["AI", "Data Viz", "GPT-4"],
  },
];

export function SelectedWorks() {
  return (
    <section id="works" className="py-20 md:py-10 md:pt-92 pb-4">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Selected work
          </SectionTitle>
          <Link
            href="#"
            className="hidden md:inline-flex items-center gap-2 text-sm text-white transition-colors bg-linear-to-r from-[#203eec] to-[#00d4ff] px-5 py-2.5 rounded-full"
          >
            View all works
            <FiArrowUpRight className="w-4 h-4 text-white" />
          </Link>
        </div>

        <div className="relative">
          {works.map((work, index) => (
            <div
              key={work.id}
              className="sticky isolate bg-background rounded-t-3xl"
              style={{
                top: `70px`,
                zIndex: index + 1,
              }}
            >
              <Link href="#" className="group block ">
                {/* hover transform now lives on this inner element only —
                    the sticky parent above never moves, so there's no gap
                    exposing the card underneath */}
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-background will-change-transform"
                >
                  <div className="group-hover:shadow-lg rounded-2xl md:rounded-3xl transition-shadow duration-300">
                    <div className="relative aspect-2/1 overflow-hidden rounded-t-2xl md:rounded-t-3xl">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-3 md:p-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold">
                            {work.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {work.description}
                          </p>
                        </div>
                        <FiArrowUpRight className="w-5 h-5 text-[#203eec] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {work.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-white text-foreground rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </div>
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-[#203eec] text-[#203eec] rounded-full hover:bg-muted transition-colors"
          >
            View all works
            <FiArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
