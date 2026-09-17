"use client";

import React, { useState } from "react";
import { FiGitPullRequest, FiCpu, FiShare2, FiServer } from "react-icons/fi";

const AUTOMATION_TIERS = [
  {
    id: "orchestration",
    title: "Workflow Orchestration",
    icon: FiGitPullRequest,
    badge: "Zero SaaS Task Fees",
    description: "Multi-step visual workflows, self-hosted execution engines, and automated error-handling pipelines.",
    stack: [
      { name: "n8n (Self-Hosted)", tag: "Private Server Deployment", highlight: true },
      { name: "Make.com", tag: "Complex Visual Pipelines" },
      { name: "Zapier Enterprise", tag: "Rapid Prototyping" },
      { name: "Custom Node.js Scripts", tag: "Custom Execution Logic" },
    ],
  },
  {
    id: "intelligence",
    title: "AI APIs & Intelligence",
    icon: FiCpu,
    badge: "Multimodal AI",
    description: "Direct integration with frontier LLMs for intelligent classification, summarization, and OCR extraction.",
    stack: [
      { name: "OpenAI GPT-4o", tag: "Structured JSON Workflows", highlight: true },
      { name: "Claude 3.5 Sonnet", tag: "Long-Context Reasoning" },
      { name: "Gemini 1.5 Pro", tag: "Document & Media Parsing" },
      { name: "Whisper & Vision OCR", tag: "Voice & PDF Data Pipelines" },
    ],
  },
  {
    id: "connectors",
    title: "Business & CRM Connectors",
    icon: FiShare2,
    badge: "Omnichannel Sync",
    description: "Two-way automated synchronization between enterprise CRMs, communication channels, and billing suites.",
    stack: [
      { name: "HubSpot & Salesforce", tag: "Lead & Deal Automation", highlight: true },
      { name: "WhatsApp Business API", tag: "Automated Customer Chat" },
      { name: "Stripe & Shopify", tag: "Order & Payment Webhooks" },
      { name: "Slack & Teams", tag: "Internal Alert Notifications" },
    ],
  },
  {
    id: "infrastructure",
    title: "Data & Cloud Infrastructure",
    icon: FiServer,
    badge: "99.99% Reliability",
    description: "Fault-tolerant webhook queueing, containerized runners, and secure private cloud environments.",
    stack: [
      { name: "Webhooks & REST APIs", tag: "Real-Time Event Triggers", highlight: true },
      { name: "PostgreSQL", tag: "Audit & Execution Logs" },
      { name: "Redis", tag: "Queue & Rate-Limit Cache" },
      { name: "Docker & AWS Cloud", tag: "Zero-Downtime Server Setup" },
    ],
  },
];

export default function AITechStack() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full py-24 sm:py-32 bg-[#FBFBFC] border-t border-neutral-200/80 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#133BD4] font-semibold mb-4">
            <span className="size-2 rounded-full bg-[#133BD4] shrink-0" aria-hidden="true" />
            <span>/ AUTOMATION STACK MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-[1.15] mb-6">
            Production Automation & AI Integration Stack
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            Enterprise orchestration engines, frontier AI APIs, and seamless webhook connectors deployed to eliminate manual tasks with zero per-run SaaS fees.
          </p>
        </div>

        {/* 4-Column Grid of Architecture Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-neutral-200 bg-white">
          {AUTOMATION_TIERS.map((cat, idx) => {
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
