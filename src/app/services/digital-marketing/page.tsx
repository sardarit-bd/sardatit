import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import { getServiceBySlug, getAdjacentServices } from "@/lib/services";
import ServiceSplitView from "@/components/ServiceSplitView";
import Cta from "@/components/Cta";
import Skiper32 from "@/components/ui/skiper32";
import BauhausHero from "@/components/services/BauhausHero";
import StrategicCapabilities from "@/components/services/StrategicCapabilities";

export const metadata: Metadata = {
  title: "Digital Marketing & Growth | Sardar IT",
  description:
    "Data-driven performance marketing, SEO, paid media engineering, and conversion rate optimization tailored to scale revenue and maximize ROAS.",
  openGraph: {
    title: "Digital Marketing & Growth | Sardar IT",
    description:
      "Accelerate your business growth with targeted digital marketing, SEO, conversion rate optimization, and data-driven marketing campaigns.",
    images: ["/image/project/White_Cross_Clinic.webp"],
  },
};

export default function DigitalMarketingPage() {
  const service = getServiceBySlug("digital-marketing");
  const { prev, next } = getAdjacentServices("digital-marketing");

  if (!service) {
    return null;
  }

  return (
    <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-20">
      {/* -------------------- BREADCRUMB STRIP -------------------- */}
      <div className="w-full bg-white border-b border-neutral-100 py-3">
        <div className="container mx-auto px-6 md:px-14 lg:px-20 flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link
            href="/services/brand-identity"
            className="inline-flex items-center gap-1.5 hover:text-black transition-colors"
          >
            <FiArrowLeft className="w-3.5 h-3.5 text-blue-600" />
            <span>ALL SERVICES</span>
          </Link>
          <span>/</span>
          <span className="text-black font-bold uppercase tracking-wider">
            {service.title}
          </span>
        </div>
      </div>

      {/* -------------------- 1. DIGITAL MARKETING HERO (GSAP ANIMATED) -------------------- */}
      <BauhausHero />

      {/* -------------------- 2. STRATEGIC CAPABILITIES GRID -------------------- */}
      <StrategicCapabilities />

      {/* -------------------- 3. 3D PERSPECTIVE SCROLL GALLERY SHOWCASE (@skiper-ui/skiper32) -------------------- */}
      <Skiper32
        title="High-Impact Campaigns & Creative Showcase"
        subtitle="Explore our 3D perspective grid of real-world ad creatives, analytics attribution systems, and multi-channel scale experiments."
        eyebrow="Proprietary Growth Lab"
      />

      {/* -------------------- 4. TANGIBLE DELIVERABLES -------------------- */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-200">
          <div className="container mx-auto px-6 md:px-14 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <span className="text-xs uppercase tracking-widest font-mono text-blue-600 font-bold block mb-3">
                  [ 03 // VERIFIABLE OUTPUTS ]
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight mb-5">
                  Concrete Deliverables You Receive
                </h2>
                <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8">
                  Every campaign sprint is backed by verifiable ad accounts, production creative assets, and live BI dashboards.
                </p>
                <div className="inline-flex items-center gap-2.5 text-xs font-mono font-bold text-black bg-white px-4 py-2.5 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#111111]">
                  <FiCheck className="w-4 h-4 text-blue-600" />
                  <span>100% AD ACCOUNT & CREATIVE IP OWNERSHIP</span>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {service.deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-start gap-4"
                  >
                    <span className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">
                      0{dIdx + 1}
                    </span>
                    <div>
                      <h4 className="text-base font-black text-black">
                        {item}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1">
                        High-leverage marketing assets and documented benchmarks.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -------------------- 5. STRUCTURED PROCESS / STEPS -------------------- */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-6 md:px-14 lg:px-20">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="text-xs uppercase tracking-widest font-mono text-blue-600 font-bold block mb-3">
                [ 04 // METHODOLOGY ]
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight mb-4">
                How We Execute
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg">
                A predictable, transparent, and battle-tested growth framework from audit to scaling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-neutral-50 border border-neutral-200 relative overflow-hidden"
                >
                  <span className="text-4xl font-black text-neutral-200 font-mono block mb-4">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-black text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------- 6. EXPLORE ALL SERVICES SPLIT VIEW -------------------- */}
      <section className="py-20 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-6 md:px-14 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 font-bold block mb-2">
                COMPLETE SUITE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                Explore Our Other Services
              </h2>
            </div>
            <Link
              href="/services/brand-identity"
              className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-blue-600 transition-colors"
            >
              <span>View Services Overview</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ServiceSplitView
            initialServiceId={service.id}
            activeMode="hover"
            className="w-full"
          />
        </div>
      </section>

      {/* -------------------- 7. ADJACENT SERVICES FOOTER NAV -------------------- */}
      <div className="border-t border-neutral-200 bg-white py-8">
        <div className="container mx-auto px-6 md:px-14 lg:px-20 flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={`/services/${prev.slug}`}
              className="group flex items-center gap-3 text-neutral-600 hover:text-black transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                <FiArrowLeft className="w-4 h-4" />
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs text-neutral-400 block uppercase tracking-wider font-semibold font-mono">
                  PREVIOUS
                </span>
                <span className="text-sm font-bold text-black group-hover:text-blue-600 transition-colors">
                  {prev.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next && (
            <Link
              href={`/services/${next.slug}`}
              className="group flex items-center gap-3 text-neutral-600 hover:text-black transition-colors ml-auto"
            >
              <div className="text-right hidden sm:block">
                <span className="text-xs text-neutral-400 block uppercase tracking-wider font-semibold font-mono">
                  NEXT
                </span>
                <span className="text-sm font-bold text-black group-hover:text-blue-600 transition-colors">
                  {next.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                <FiArrowRight className="w-4 h-4" />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* -------------------- 8. CTA SECTION -------------------- */}
      <div id="contact">
        <Cta />
      </div>
    </div>
  );
}

