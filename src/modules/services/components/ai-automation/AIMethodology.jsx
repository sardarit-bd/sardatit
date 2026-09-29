"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function AIMethodology({ processSteps = [] }) {
  const methodologyRef = useRef(null);

  const steps = processSteps.length > 0 ? processSteps : [
    {
      step: "01",
      title: "Process Audit & Workflow Architecture",
      description: "Mapping operational bottlenecks, API endpoints, and data flows to design high-ROI automation schemas.",
    },
    {
      step: "02",
      title: "Pipeline Engineering in n8n & Make",
      description: "Building resilient triggers, conditional branching logic, webhook listeners, and fail-safe retry mechanisms.",
    },
    {
      step: "03",
      title: "AI Prompting & Webhook Integration",
      description: "Connecting OpenAI/Claude APIs, document OCR parsing, and bi-directional CRM/ERP synchronization.",
    },
    {
      step: "04",
      title: "Production Deployment & Monitoring",
      description: "Self-hosting containerized n8n instances, webhook queue management, and real-time failure alerting.",
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions;

          gsap.from(".methodology-header-item", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: methodologyRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          if (isDesktop) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: ".methodology-grid",
                start: "top 75%",
                toggleActions: "play none none none",
              },
            });

            const cols = gsap.utils.toArray(".methodology-col");
            if (cols.length >= 4) {
              tl.from(cols[0], { x: -160, opacity: 0, duration: 1.7, ease: "power4.out" }, 0)
                .from([cols[1], cols[2]], { y: -120, opacity: 0, duration: 1.7, stagger: 0.1, ease: "power4.out" }, 0)
                .from(cols[3], { x: 160, opacity: 0, duration: 1.7, ease: "power4.out" }, 0);
            }
          }

          if (isMobile) {
            gsap.from(".methodology-col", {
              y: 50,
              opacity: 0,
              duration: 0.9,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".methodology-grid",
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }
        }
      );
    },
    { scope: methodologyRef }
  );

  return (
    <section ref={methodologyRef} className="w-full py-24 sm:py-32 bg-white border-t border-neutral-200/80 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl">
          <div className="methodology-header-item inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#133BD4] font-semibold mb-4">
            <span className="size-2 rounded-full bg-[#133BD4] shrink-0" aria-hidden="true" />
            <span>/ AUTOMATION DELIVERY FRAMEWORK</span>
          </div>
          <h2 className="methodology-header-item text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-[1.15] mb-6">
            How We Build Resilient Workflows
          </h2>
          <p className="methodology-header-item text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-16 lg:mb-24">
            A disciplined four-phase automation lifecycle engineered to eliminate manual bottlenecks, prevent data drops, and ensure fail-safe execution.
          </p>
        </div>

        <div className="methodology-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-neutral-200">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`methodology-col p-8 sm:p-10 border-neutral-200 sm:border-r last:border-r-0 hover:bg-neutral-50/60 transition-colors flex flex-col justify-between ${
                idx === 3 ? "border-b-0" : "border-b"
              } ${idx === 1 ? "sm:border-r-0 lg:border-r" : ""} ${
                idx < 2 ? "sm:border-b lg:border-b-0" : "sm:border-b-0"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-neutral-300">
                    {item.step}
                  </span>
                  <span className="size-2 rounded-full bg-[#133BD4]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-4 leading-snug">
                  {item.title}
                </h3>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed mt-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
