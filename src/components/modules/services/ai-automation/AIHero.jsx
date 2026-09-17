"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import BookaCallBtn from "@/components/ui/BookaCallBtn";
import WorkflowBeamsDemo from "./WorkflowBeamsDemo";

export default function AIHero({ service }) {
  const stats = service?.stats || [
    { label: "Projects Delivered Globally", value: "500+" },
    { label: "Countries Served", value: "60+" },
    { label: "Manual Tasks Automated", value: "85%+" },
    { label: "Workflow Uptime SLA", value: "99.99%" },
  ];

  return (
    <>
      <div className="bg-[#f8fafc] min-h-[calc(100dvh-80px)] flex flex-col justify-center py-10 lg:py-16 relative overflow-hidden">
        <section className="container mx-auto px-4 sm:px-6 lg:px-12 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column (col-span-6) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-semibold mb-6 w-fit">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#133BD4]" />
                </span>
                <span>{service?.badgeTitle || "Workflow Automation & AI"}</span>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500 font-mono text-xs">Production Grade</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.12] mb-6">
                Intelligent{" "}
                <span className="text-[#133BD4] inline-block">
                  Workflow Automation
                </span>{" "}
                & AI Systems
              </h1>

              {/* Sub-copy */}
              <p className="text-neutral-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
                Eliminate repetitive operational tasks with self-hosted n8n pipelines, intelligent webhook workflows, and custom AI agents. Achieve 100% data privacy with zero per-task SaaS fees across 60+ global markets.
              </p>

              {/* Dual Action CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <BookaCallBtn text="Book Automation Audit" />
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-neutral-100 transition-all cursor-pointer"
                >
                  <span>Explore Workflows</span>
                  <FiArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Frameless Clean Light Interactive Beams (col-span-6) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-6 relative w-full flex items-center justify-center"
            >
              <div className="relative w-full max-w-[560px]">
                <WorkflowBeamsDemo />
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* KPI METRICS BANNER */}
      <section className="w-full bg-[#0B1120] text-white py-12 border-y border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col border-l-2 border-[#133BD4] pl-4 sm:pl-6">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono mb-1">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-slate-400 font-medium leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
