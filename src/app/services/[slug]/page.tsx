import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiLayers,
  FiShield,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import {
  getAllServices,
  getServiceBySlug,
  getAdjacentServices,
} from "@/lib/services";
import BookaCallBtn from "@/components/ui/BookaCallBtn";
import ServiceSplitView from "@/components/ServiceSplitView";
import Cta from "@/components/Cta";
import InteractiveFeatureShowcase from "@/components/services/InteractiveFeatureShowcase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices().filter(
    (s) => s.slug !== "brand-identity" && s.slug !== "digital-marketing"
  );
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Sardar IT",
    };
  }

  return {
    title: `${service.title} - Professional Services | Sardar IT`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Sardar IT`,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const { prev, next } = getAdjacentServices(slug);

  return (
    <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-24">
      {/* -------------------- 1. HERO SECTION -------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-white py-14 lg:py-20 border-b border-neutral-200/80">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumbs Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-500 mb-8">
            <Link
              href="/services/brand-identity"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
              <span>All Services</span>
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold truncate">
              {service.title}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-semibold mb-6 w-fit">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
                <span>{service.badgeTitle || "Core Practice"}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.15] mb-6">
                {service.title}
              </h1>

              {/* Detailed Description */}
              <p className="text-neutral-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl">
                {service.detailedDescription || service.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <BookaCallBtn />
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-neutral-100 transition-all cursor-pointer"
                >
                  <span>Request Proposal</span>
                  <FiArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Key Metric Badges */}
              {service.stats && service.stats.length > 0 && (
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
                  {service.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                        {stat.value}
                      </span>
                      <span className="text-xs sm:text-sm text-neutral-500 font-medium mt-0.5">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Visual Image Card */}
            <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 bg-neutral-900 group">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-1">
                  Featured Case Study
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 2. CORE CAPABILITIES & FEATURES -------------------- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider text-blue-600 font-bold block mb-2">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 mb-4">
              What We Deliver Under {service.shortTitle || service.title}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base">
              End-to-end expertise focused on business impact, speed to market, and flawless execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feature, idx) => {
              const featTitle =
                typeof feature === "string" ? feature : feature.title;
              const featDesc =
                typeof feature === "string" ? undefined : feature.description;

              const icons = [FiZap, FiLayers, FiShield, FiTrendingUp];
              const Icon = icons[idx % icons.length];

              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center text-lg mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      {featTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {featDesc ||
                        `Specialized engineering and design practices tailored to accelerate ${featTitle.toLowerCase()}.`}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-neutral-200/60 flex items-center text-xs font-semibold text-blue-600">
                    <span>Active Standard</span>
                    <FiCheck className="w-3.5 h-3.5 ml-auto text-emerald-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------- 2.5 INTERACTIVE FEATURE SHOWCASE -------------------- */}
      {service.slug === "web-mobile-development" && (
        <section className="py-16 lg:py-24 bg-neutral-50/80 text-neutral-900 relative overflow-hidden border-y border-neutral-200/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <InteractiveFeatureShowcase />
          </div>
        </section>
      )}

      {/* -------------------- 3. TANGIBLE DELIVERABLES -------------------- */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="py-16 bg-neutral-50 border-y border-neutral-200/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <span className="text-xs uppercase tracking-wider text-blue-600 font-bold block mb-2">
                  Transparent Outputs
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 mb-4">
                  Concrete Deliverables You Receive
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                  Every milestone is backed by tangible, production-ready assets and detailed documentation.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-white px-3.5 py-2 rounded-xl border border-neutral-200 shadow-sm">
                  <FiCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% IP Ownership & Full Source Handoff</span>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-sm flex items-start gap-3.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      {dIdx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-neutral-900">
                        {item}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Production-grade specifications and assets.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -------------------- 4. STRUCTURED PROCESS / STEPS -------------------- */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-wider text-blue-600 font-bold block mb-2">
                Proven Methodology
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 mb-4">
                How We Execute
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base">
                A predictable, transparent, and battle-tested workflow from kickoff to deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 relative overflow-hidden"
                >
                  <span className="text-4xl font-extrabold text-neutral-200 font-mono block mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------- 5. EXPLORE ALL SERVICES SPLIT VIEW -------------------- */}
      <section className="py-20 bg-neutral-50 border-t border-neutral-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-2">
                Complete Suite
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950">
                Explore Our Other Services
              </h2>
            </div>
            <Link
              href="/services/brand-identity"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
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

      {/* -------------------- 6. ADJACENT SERVICES FOOTER NAV -------------------- */}
      <div className="border-t border-neutral-200 bg-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={`/services/${prev.slug}`}
              className="group flex items-center gap-3 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-100 transition-colors">
                <FiArrowLeft className="w-4 h-4" />
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs text-neutral-400 block uppercase tracking-wider font-semibold">
                  Previous Service
                </span>
                <span className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
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
              className="group flex items-center gap-3 text-neutral-600 hover:text-neutral-900 transition-colors ml-auto"
            >
              <div className="text-right hidden sm:block">
                <span className="text-xs text-neutral-400 block uppercase tracking-wider font-semibold">
                  Next Service
                </span>
                <span className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                  {next.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-100 transition-colors">
                <FiArrowRight className="w-4 h-4" />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* -------------------- 7. CTA SECTION -------------------- */}
      <div id="contact">
        <Cta />
      </div>
    </div>
  );
}
