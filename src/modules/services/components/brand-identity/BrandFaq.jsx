"use client";

import React from "react";
import { AceternityFaq } from "@/components/ui/AceternityFaq";

// Categorized FAQ Data
const FAQ_GROUPS = [
    {
        category: "Enterprise Deliverables & Architecture",
        items: [
            {
                q: "What makes Sardar IT's Brand Identity & Product Design different from graphic design agencies?",
                a: "We approach brand identity as an enterprise software system. Beyond logos and typography, we deliver multi-platform token kits (JSON, Tailwind, React, Flutter), component libraries, Storybook documentation, and WCAG 2.1 accessibility compliance to bridge the gap between design and production code.",
            },
            {
                q: "How does a unified design system accelerate our engineering velocity?",
                a: "Tokenized design systems eliminate redundant frontend code, reduce design debt, and enable engineering teams to ship features up to 40% faster with 100% brand consistency across web, iOS, and Android applications.",
            },
            {
                q: "Do we receive 100% intellectual property and code ownership?",
                a: "Yes. All design files, Figma libraries, vector suites, brand documentation, and code token repositories are 100% transferred to your enterprise upon project completion.",
            },
        ],
    },
    {
        category: "Process, Timeline & Collaboration",
        items: [
            {
                q: "How long does an enterprise brand and design system project take?",
                a: "Typical engagements run between 4 to 8 weeks depending on scope. An MVP brand identity kit takes 3-4 weeks, while an enterprise-wide multi-platform design system with Storybook integration typically spans 6-8 weeks.",
            },
            {
                q: "How does Sardar IT handle developer handoff?",
                a: "We collaborate directly with your development team via Figma, Storybook, and shared Slack channels. We provide tokenized design JSONs, responsive breakpoints, component states, and continuous QA reviews during the frontend implementation phase.",
            },
            {
                q: "Can Sardar IT also engineer the frontend and backend applications?",
                a: "Absolutely. As a full-cycle software engineering firm, our in-house developers can seamlessly transition design tokens into production-ready Next.js, React, Node.js, and Flutter codebases.",
            },
        ],
    },
];

export default function BrandFaq() {
    return (
        <section className="w-full py-20 md:py-28 relative overflow-hidden bg-white">
            <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100/80 border border-neutral-200/80 text-neutral-800 uppercase tracking-wider shadow-sm select-none font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        FAQ
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 text-center mt-4 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base sm:text-lg text-neutral-500 text-center max-w-xl mx-auto">
                        Everything you need to know about our enterprise Brand Identity & UI/UX design workflow.
                    </p>
                </div>

                <AceternityFaq groups={FAQ_GROUPS} />
            </div>
        </section>
    );
}
