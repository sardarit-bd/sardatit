import React from "react";
import { getServiceBySlug } from "@/lib/services";
import WebMobileHero from "@/components/modules/services/web-mobile/WebMobileHero";
import WebMobileTechStack from "@/components/modules/services/web-mobile/WebMobileTechStack";
import WebMobileMethodology from "@/components/modules/services/web-mobile/WebMobileMethodology";
import WebMobileDeliverables from "@/components/modules/services/web-mobile/WebMobileDeliverables";
import WebMobileAdjacentNav from "@/components/modules/services/web-mobile/WebMobileAdjacentNav";
import Cta from "@/components/modules/cta/CtaSection";

export const metadata = {
  title: "Enterprise Web & Mobile App Engineering | Sardar IT",
  description:
    "Delivering robust, full-stack digital products engineered with Next.js, React, Flutter, and cloud microservices for enterprise workloads across 60+ countries.",
  alternates: {
    canonical: "https://sardaritbd.com/services/web-mobile-development",
  },
  openGraph: {
    title: "Enterprise Web & Mobile App Engineering | Sardar IT",
    description:
      "Modern full-stack web and mobile engineering with 99.99% uptime SLA and Core Web Vitals 98/100 benchmark.",
    url: "https://sardaritbd.com/services/web-mobile-development",
    siteName: "Sardar IT",
    images: [
      {
        url: "/image/services/web-performance.webp",
        width: 1200,
        height: 630,
        alt: "Enterprise Web & Mobile Engineering - Sardar IT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Web & Mobile App Engineering | Sardar IT",
    description:
      "Modern full-stack web and mobile engineering with 99.99% uptime SLA and Core Web Vitals 98/100 benchmark.",
    images: ["/image/services/web-performance.webp"],
  },
};

export default function WebMobileDevelopmentPage() {
  const service = getServiceBySlug("web-mobile-development");

  return (
    <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-20 relative">
      {/* Ambient Glow Background Effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-sky-500/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

      {/* 1. Hero & KPI Metrics */}
      <WebMobileHero service={service} />

      {/* 2. Technology Stack Matrix */}
      <WebMobileTechStack />

      {/* 3. 4-Stage Engineering Lifecycle */}
      <WebMobileMethodology processSteps={service?.processSteps} />

      {/* 4. Production Deliverables */}
      <WebMobileDeliverables />

      {/* 6. Conversion CTA */}
      <div id="contact">
        <Cta />
      </div>
    </div>
  );
}
