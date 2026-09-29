"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StrategicCapabilities.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ServiceItem {
  id: string;
  titleLines: string[];
  description: string;
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    id: "seo",
    titleLines: ["Search Engine Optimization", "(SEO)"],
    description:
      "Specialized growth engineering and creative variants tailored to accelerate search engine optimization (seo).",
    icon: (
      <svg
        className={styles.iconSvg}
        viewBox="0 0 56 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Editorial Radar / Search Geometry */}
        <circle cx="24" cy="24" r="16" />
        <circle cx="24" cy="24" r="8" strokeDasharray="3 3" />
        <circle cx="24" cy="24" r="2.5" fill="#2563eb" stroke="none" />
        <line x1="36" y1="36" x2="48" y2="48" strokeWidth="2" />
        {/* Accent target markers */}
        <path d="M40 16h6m-3-3v6" stroke="#2563eb" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "performance-marketing",
    titleLines: ["Performance Marketing &", "Ads"],
    description:
      "Specialized growth engineering and creative variants tailored to accelerate performance marketing & ads.",
    icon: (
      <svg
        className={styles.iconSvg}
        viewBox="0 0 56 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* High-Impact Performance Trajectory Chart */}
        <path d="M10 46h36" />
        <rect x="12" y="38" width="5" height="8" fill="currentColor" stroke="none" opacity="0.3" />
        <rect x="22" y="30" width="5" height="16" fill="currentColor" stroke="none" opacity="0.3" />
        <rect x="32" y="22" width="5" height="24" fill="currentColor" stroke="none" opacity="0.3" />
        <path d="M14 36l10-12 8 8 16-18" strokeWidth="2" />
        <path d="M38 14h10v10" stroke="#2563eb" strokeWidth="2" />
        <circle cx="48" cy="14" r="3" fill="#2563eb" stroke="none" />
      </svg>
    ),
  },
  {
    id: "social-strategy",
    titleLines: ["Social Media & Content", "Strategy"],
    description:
      "Specialized growth engineering and creative variants tailored to accelerate social media & content strategy.",
    icon: (
      <svg
        className={styles.iconSvg}
        viewBox="0 0 56 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Editorial Content Network Nodes */}
        <circle cx="16" cy="20" r="5" />
        <circle cx="42" cy="16" r="6" />
        <circle cx="20" cy="40" r="4.5" />
        <circle cx="42" cy="38" r="5.5" />
        <line x1="21" y1="19" x2="36" y2="17" />
        <line x1="17.5" y1="25" x2="19.5" y2="35.5" />
        <line x1="24.5" y1="39.5" x2="36.5" y2="38.5" />
        <line x1="42" y1="22" x2="42" y2="32.5" />
        <line x1="20" y1="23" x2="38" y2="35" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="42" cy="16" r="2.5" fill="#2563eb" stroke="none" />
      </svg>
    ),
  },
  {
    id: "conversion-optimization",
    titleLines: ["Conversion Optimization"],
    description:
      "Specialized growth engineering and creative variants tailored to accelerate conversion optimization.",
    icon: (
      <svg
        className={styles.iconSvg}
        viewBox="0 0 56 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Precision CRO Funnel & Conversion Spark */}
        <path d="M12 14h32l-10 16v12l-8 4v-16L12 14z" />
        <path d="M29 20l-5 8h6l-3 9 7-10h-5l4-7z" fill="#2563eb" stroke="none" />
        <circle cx="28" cy="48" r="2" fill="#2563eb" stroke="none" />
      </svg>
    ),
  },
];

export default function StrategicCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current;
        if (!section) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });

        // 1. Eyebrow fade-up
        tl.from("[data-cap-eyebrow]", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        })
          // 2. Heading line reveal
          .from(
            "[data-cap-heading]",
            {
              y: 35,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power4.out",
            },
            "-=0.4"
          )
          // 3. Description fade-up
          .from(
            "[data-cap-desc]",
            {
              y: 20,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.5"
          )
          // 4. Top divider scaleX from 0 to 1
          .from(
            gridRef.current,
            {
              borderTopColor: "transparent",
              duration: 0.4,
            },
            "-=0.3"
          )
          // 5. Service columns fade-up with stagger
          .from(
            "[data-cap-item]",
            {
              y: 40,
              opacity: 0,
              stagger: 0.12,
              duration: 0.85,
              ease: "power3.out",
            },
            "-=0.3"
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="growth-solutions"
      className={styles.section}
      aria-labelledby="strategic-growth-title"
    >
      <div className={styles.inner}>
        {/* Section Header */}
        <div className={styles.header}>
          <span data-cap-eyebrow className={styles.eyebrow}>
            [ 02 // PERFORMANCE CORE ]
          </span>

          <h2 id="strategic-growth-title" className={styles.heading}>
            <span data-cap-heading className={styles.headingLine}>
              Strategic Growth
            </span>
            <span data-cap-heading className={styles.headingLine}>
              Capabilities
            </span>
          </h2>

          <p data-cap-desc className={styles.description}>
            Every channel is systematically tuned, continuously tested, and tied
            directly to qualified revenue.
          </p>
        </div>

        {/* 4-Column Editorial Feature Grid */}
        <div ref={gridRef} className={styles.servicesGrid}>
          {services.map((item) => (
            <div
              key={item.id}
              data-cap-item
              className={styles.serviceItem}
            >
              {/* Graphic Icon */}
              <div className={styles.iconWrap}>{item.icon}</div>

              {/* Title with natural editorial wrap */}
              <h3 className={styles.serviceTitle}>
                {item.titleLines.map((line, idx) => (
                  <span key={idx} className={styles.titleLine}>
                    {line}
                  </span>
                ))}
              </h3>

              {/* Exact Description */}
              <p className={styles.serviceDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
