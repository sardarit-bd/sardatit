"use client";

import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function MarketingMacbookShowcase() {
  return (
    <section className="w-full max-w-full overflow-hidden py-0 bg-white text-neutral-950 relative">
      <div className="flex justify-center pt-4 sm:pt-8 mb-2 sm:mb-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 border border-neutral-200 text-neutral-700 tracking-wide uppercase font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Marketing Attribution
        </span>
      </div>

      <MacbookScroll
        title={
          <span className="text-neutral-950 font-black text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-center px-4 block">
            Real-Time Analytics & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500">
              High-ROAS Attribution Engine.
            </span>
          </span>
        }
        badge={
          <div className="h-12 w-12 -rotate-12 transform rounded-full bg-black text-white border border-neutral-800 flex items-center justify-center shadow-xl">
            <span className="text-[10px] font-black tracking-tighter text-center leading-none">
              SARDAR<br />IT
            </span>
          </div>
        }
        src="/image/services/marketing-dashboard.webp"
        showGradient={false}
      />
    </section>
  );
}
