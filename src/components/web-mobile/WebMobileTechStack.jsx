"use client";

import React, { useState } from "react";
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
        <div className="max-w-3xl mb-16">
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
        </div>

        {/* 4-Column Grid of Architecture Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-neutral-200 bg-white">
          {TECH_CATEGORIES.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveTab(idx)}
                className={`p-8 border-b lg:border-b-0 border-neutral-200 md:border-r last:border-r-0 transition-colors flex flex-col justify-between ${
                  activeTab === idx ? "bg-neutral-50/80 ring-1 ring-[#133BD4]/20" : "hover:bg-neutral-50/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-11 rounded-xl bg-blue-50 text-[#133BD4] flex items-center justify-center font-semibold">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded bg-neutral-100 text-neutral-700">
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
                      className="flex items-center justify-between py-1.5 px-2.5 rounded bg-neutral-50 border border-neutral-200/60 text-xs"
                    >
                      <span className={`font-semibold ${item.highlight ? "text-[#133BD4]" : "text-neutral-800"}`}>
                        {item.name}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">{item.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
