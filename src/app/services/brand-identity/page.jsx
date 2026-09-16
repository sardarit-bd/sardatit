import React from "react";
import { getServiceBySlug } from "@/lib/services";
import BrandHero from "@/components/brand-identity/BrandHero";
import BrandMethodology from "@/components/brand-identity/BrandMethodology";
import BrandDeliverables from "@/components/brand-identity/BrandDeliverables";
import BrandCapabilities from "@/components/brand-identity/BrandCapabilities";
import BrandSpecializedPractices from "@/components/brand-identity/BrandSpecializedPractices";
import BrandSectorsShowcase from "@/components/brand-identity/BrandSectorsShowcase";
import BrandFaq from "@/components/brand-identity/BrandFaq";
import Cta from "@/components/Cta";

export const metadata = {
    title: "Brand Identity & Digital Product Design | Sardar IT",
    description:
        "Architecting intuitive digital experiences, tokenized design systems, and cohesive brand identities that scale globally across 60+ countries.",
};

export default function BrandIdentityPage() {
    const service = getServiceBySlug("brand-identity");

    return (
        <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-20 relative">
            {/* Background Ambient Glow Effects */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

            {/* 1. Hero & Metrics */}
            <BrandHero service={service} />

            {/* 2. Engineering Methodology */}
            <BrandMethodology processSteps={service?.processSteps} />

            {/* 3. Production Deliverables */}
            <BrandDeliverables />

            {/* 4. Complete Capabilities Suite */}
            <BrandCapabilities />

            {/* 5. Specialized Design Practices */}
            <BrandSpecializedPractices />

            {/* 6. Industries & Sectors Showcase */}
            <BrandSectorsShowcase />

            {/* 7. Frequently Asked Questions */}
            <BrandFaq />

            {/* 8. Conversion CTA */}
            <div id="contact">
                <Cta />
            </div>
        </div>
    );
}
