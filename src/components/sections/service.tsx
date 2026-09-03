// components/sections/awards.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { SectionTitle } from "../ui/SectionTitle";

interface Award {
  title: string;
  year: string;
  organization: string;
  link: string;
}

const awards: Award[] = [
  {
    title: "Best AI Design Implementation",
    year: "2024",
    organization: "AI Design Awards",
    link: "#",
  },
  {
    title: "Innovation in Generative UI",
    year: "2024",
    organization: "v0 Showcase",
    link: "#",
  },
  {
    title: "Excellence in AI UX",
    year: "2023",
    organization: "UX AI Conference",
    link: "#",
  },
  {
    title: "Top AI Product Designer",
    year: "2023",
    organization: "Product Hunt",
    link: "#",
  },
  {
    title: "Outstanding Prompt Engineering",
    year: "2023",
    organization: "OpenAI Community",
    link: "#",
  },
  {
    title: "Vibe Coding Pioneer",
    year: "2022",
    organization: "Vercel Community",
    link: "#",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Awards() {
  return (
    <section
      id="awards"
      className="py-20 md:py-32 border-border border-t-0 md:pt-0 md:pb-0"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-12 md:mb-16">
          Awards & Recognition
        </SectionTitle>

        <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {awards.map((award, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href={award.link}
                className="group flex items-center justify-between p-5 md:p-6 border border-border rounded-2xl hover:bg-secondary/50 transition-all hover:border-foreground/20"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl md:text-2xl">
                      {award.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {award.organization}
                    </p>
                  </div>
                  {/* <span className="text-sm text-muted-foreground font-medium">
                    {award.year}
                  </span> */}
                </div>

                <FiArrowUpRight
                  className="w-8 h-8 md:w-10 md:h-10 ml-6 text-primary transition-all group-hover:translate-x-1"
                  strokeWidth={1}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
