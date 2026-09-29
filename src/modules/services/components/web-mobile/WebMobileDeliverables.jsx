"use client";

import React, { useRef } from "react";
import { FiCode, FiFileText, FiCpu, FiShield } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const PRODUCTION_DELIVERABLES = [
  {
    icon: FiCode,
    title: "Production Source Repositories",
    sublabel: "100% IP Ownership & Clean Code",
    desc: "Fully documented Next.js, React, and mobile codebases with complete Git history, strict type systems, and modular component architecture.",
  },
  {
    icon: FiFileText,
    title: "Typed API & Schema Specs",
    sublabel: "OpenAPI 3.1 & Schema Contracts",
    desc: "Comprehensive OpenAPI/Swagger specs, typed GraphQL contracts, database migration scripts, and validated integration suites.",
  },
  {
    icon: FiCpu,
    title: "Containerized CI/CD Pipelines",
    sublabel: "Zero-Downtime Deployment",
    desc: "Hardened multi-stage Dockerfiles, GitHub Actions CI/CD automation, and cloud orchestration manifests for instant deployment.",
  },
  {
    icon: FiShield,
    title: "Observability & Enterprise SLAs",
    sublabel: "Telemetry & 99.99% Runbooks",
    desc: "Distributed APM monitoring, Core Web Vitals real-time telemetry, automated health alerts, and enterprise disaster recovery runbooks.",
  },
];

export default function WebMobileDeliverables() {
  const deliverablesRef = useRef(null);

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

          gsap.from(".deliverable-header-item", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: deliverablesRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          if (isDesktop) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: ".deliverable-grid",
                start: "top 75%",
                toggleActions: "play none none none",
              },
            });

            const cols = gsap.utils.toArray(".deliverable-col");
            if (cols.length >= 4) {
              tl.from(cols[0], { x: -160, opacity: 0, duration: 1.7, ease: "power4.out" }, 0)
                .from([cols[1], cols[2]], { y: -120, opacity: 0, duration: 1.7, stagger: 0.1, ease: "power4.out" }, 0)
                .from(cols[3], { x: 160, opacity: 0, duration: 1.7, ease: "power4.out" }, 0);
            }
          }

          if (isMobile) {
            gsap.from(".deliverable-col", {
              y: 50,
              opacity: 0,
              duration: 0.9,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".deliverable-grid",
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }
        }
      );
    },
    { scope: deliverablesRef }
  );

  return (
    <section ref={deliverablesRef} className="w-full py-24 sm:py-32 bg-white border-t border-neutral-200/80 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl">
          <div className="deliverable-header-item inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[#133BD4] font-semibold mb-4">
            <span className="size-2 rounded-full bg-[#133BD4] shrink-0" aria-hidden="true" />
            <span>/ PRODUCTION DELIVERABLES</span>
          </div>
          <h2 className="deliverable-header-item text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-[1.15] mb-6">
            Standard Deliverables in Every Engineering Contract
          </h2>
          <p className="deliverable-header-item text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-16 lg:mb-24">
            Production-ready codebases, cloud infrastructure scripts, and architecture blueprints transferred with full intellectual property ownership.
          </p>
        </div>

        <div className="deliverable-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-neutral-200">
          {PRODUCTION_DELIVERABLES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`deliverable-col p-8 sm:p-10 border-neutral-200 sm:border-r last:border-r-0 hover:bg-neutral-50/60 transition-colors flex flex-col justify-between ${
                  idx === 3 ? "border-b-0" : "border-b"
                } ${idx === 1 ? "sm:border-r-0 lg:border-r" : ""} ${
                  idx < 2 ? "sm:border-b lg:border-b-0" : "sm:border-b-0"
                }`}
              >
                <div>
                  <div className="size-10 rounded-xl bg-blue-50 text-[#133BD4] flex items-center justify-center font-semibold mb-8">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-[#133BD4] font-medium mb-4">
                    {item.sublabel}
                  </div>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mt-4">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
