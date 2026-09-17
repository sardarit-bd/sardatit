"use client";

import React from "react";
import ServiceSplitView from "@/components/modules/services/ServiceSplitView";

export default function BrandCapabilities() {
    return (
        <section className="w-full py-24 sm:py-32 lg:py-36 bg-[#FBFBFC] border-t border-neutral-200/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                {/* Header with electric blue dot + uppercase tag */}
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-600 font-semibold mb-4">
                        <span className="size-2 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
                        <span>/ COMPLETE CAPABILITIES SUITE</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-[1.15] mb-6">
                        Explore All Specialized Practices
                    </h2>
                    <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-16 lg:mb-24">
                        Explore our full spectrum of specialized engineering, design, AI automation, and growth solutions.
                    </p>
                </div>

                <ServiceSplitView initialServiceId="brand-identity" activeMode="hover" />
            </div>
        </section>
    );
}
