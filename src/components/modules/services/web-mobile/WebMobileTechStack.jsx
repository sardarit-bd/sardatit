"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLayers, FiSmartphone, FiServer, FiDatabase } from "react-icons/fi";

const TECH_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Architecture",
    icon: FiLayers,
    badge: "Turbopack & SSR",
    description: "Ultra-fast rendering, optimal SEO, and zero-latency state machines for modern web applications.",
    stack: [
      { name: "Next.js 16", tag: "App Router & RSC", highlight: true },
      { name: "React 19", tag: "Concurrent Actions" },
      { name: "TypeScript", tag: "Strict Type Safety" },
      { name: "Tailwind CSS v4", tag: "Zero Runtime Engine" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile App Engineering",
    icon: FiSmartphone,
    badge: "120 FPS Fluid",
    description: "Cross-platform and native mobile apps built for seamless offline storage and native hardware access.",
    stack: [
      { name: "Flutter", tag: "High-Performance Dart", highlight: true },
      { name: "React Native", tag: "Fabric & TurboModules" },
      { name: "iOS Swift", tag: "Native Apple Frameworks" },
      { name: "Android Kotlin", tag: "Jetpack Compose" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Microservices",
    icon: FiServer,
    badge: "Sub-40ms P99",
    description: "Event-driven asynchronous services capable of processing high-throughput transactions effortlessly.",
    stack: [
      { name: "Node.js & NestJS", tag: "Event-Driven Microservices", highlight: true },
      { name: "Python FastAPI", tag: "Async AI & Data APIs" },
      { name: "Go (Golang)", tag: "Ultra-Low Latency Systems" },
      { name: "GraphQL & REST", tag: "Type-Safe Contracts" },
    ],
  },
  {
    id: "cloud",
    title: "Data & Cloud Infrastructure",
    icon: FiDatabase,
    badge: "99.99% SLA",
    description: "Fault-tolerant data layers and containerized deployments orchestrated for zero unplanned downtime.",
    stack: [
      { name: "PostgreSQL", tag: "ACID Relational Core", highlight: true },
      { name: "Redis", tag: "In-Memory Caching & Streams" },
      { name: "Docker & K8s", tag: "Container Orchestration" },
      { name: "AWS & Cloudflare", tag: "Global Edge Deployment" },
    ],
  },
];

export default function WebMobileTechStack() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full py-24 sm:py-32 bg-[#FBFBFC] border-t border-neutral-200/80 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#133BD4] font-semibold mb-4">
            <span className="size-2 rounded-full bg-[#133BD4] shrink-0" aria-hidden="true" />
            <span>/ TECHNOLOGY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-[1.15] mb-6">
            Production-Tested Technology Stack
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            Selected for resilience, high concurrency, and long-term enterprise maintainability across web and mobile platforms.
          </p>
        </motion.div>

        {/* 4-Column Grid of Architecture Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-neutral-200 bg-white">
          {TECH_CATEGORIES.map((cat, idx) => {
            const IconComponent = cat.icon;
            const isActive = activeTab === idx;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                onMouseEnter={() => setActiveTab(idx)}
                className={`p-8 border-b lg:border-b-0 border-neutral-200 md:border-r last:border-r-0 transition-all duration-300 ease-out flex flex-col justify-between group/card relative ${
                  isActive
                    ? "bg-neutral-50/90 ring-1 ring-[#133BD4]/20 shadow-md -translate-y-1 z-10"
                    : "hover:bg-neutral-50/50 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:z-10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-11 rounded-xl bg-blue-50 text-[#133BD4] flex items-center justify-center font-semibold transition-transform duration-300 group-hover/card:scale-105">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 transition-colors duration-200 group-hover/card:bg-blue-100/70 group-hover/card:text-[#133BD4]">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-950 mb-3">{cat.title}</h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mb-6">{cat.description}</p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-neutral-100">
                  {cat.stack.map((item, sIdx) => (
                    <div
                      key={sIdx}
                      className="group/item flex items-center justify-between py-1.5 px-2.5 rounded bg-neutral-50 hover:bg-blue-50/60 border border-neutral-200/60 hover:border-blue-300/60 transition-all duration-200 text-xs cursor-default"
                    >
                      <span
                        className={`font-semibold transition-colors duration-200 ${
                          item.highlight
                            ? "text-[#133BD4] group-hover/item:text-blue-700"
                            : "text-neutral-800 group-hover/item:text-neutral-950"
                        }`}
                      >
                        {item.name}
                      </span>
                      <span className="text-[10px] text-neutral-500 group-hover/item:text-blue-600 font-mono transition-colors duration-200 px-1.5 py-0.5 rounded bg-transparent group-hover/item:bg-white group-hover/item:shadow-2xs">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
