import React from "react";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { getAdjacentServices } from "@/lib/services";

export default function WebMobileAdjacentNav() {
  const { prev, next } = getAdjacentServices("web-mobile-development");

  return (
    <section className="w-full bg-[#FBFBFC] border-t border-neutral-200/80 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Previous Practice */}
          {prev && (
            <Link
              href={prev.href}
              className="group p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#133BD4]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-400 mb-6 group-hover:text-[#133BD4] transition-colors">
                <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Previous Practice</span>
              </div>
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 mb-3 inline-block">
                  {prev.badgeTitle || "Design & Brand"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 group-hover:text-[#133BD4] transition-colors">
                  {prev.title}
                </h3>
              </div>
            </Link>
          )}

          {/* Next Practice */}
          {next && (
            <Link
              href={next.href}
              className="group p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#133BD4]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-right md:text-left"
            >
              <div className="flex items-center justify-end md:justify-start gap-2 text-xs font-mono tracking-wider uppercase text-neutral-400 mb-6 group-hover:text-[#133BD4] transition-colors">
                <span className="order-1 md:order-2">Next Practice</span>
                <FiArrowRight className="w-4 h-4 order-2 md:order-1 transition-transform group-hover:translate-x-1" />
              </div>
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 mb-3 inline-block">
                  {next.badgeTitle || "AI & Automation"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 group-hover:text-[#133BD4] transition-colors">
                  {next.title}
                </h3>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
