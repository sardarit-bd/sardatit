"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { SERVICES_DATA } from "@/data/services";
import SectionHeader from "@/components/ui/SectionHeader";

const servicesData = SERVICES_DATA;

export function ServiceShowcaseCard() {
  return (
    <section className="flex flex-col gap-14 w-full items-center justify-center px-6 md:px-10 py-16">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader
          tag="What We Do"
          title="Software & Digital Solutions engineered for global scale."
          description="From idea to launch — empowering global businesses with next-generation architecture, intelligent workflows, and measurable ROI."
          ctaText="See Our Services"
          ctaLink="/services"
          theme="light"
        />
      </div>

      <div className="w-full container mx-auto px-6 md:px-12 flex flex-col gap-8 md:gap-12 relative pb-20">
        {servicesData.map((service, index) => {
          const isDark = service.color === "text-white";
          const isBlue = service.bgClass?.includes("#133BD4");

          return (
            <div
              key={service.id}
              style={{
                top: `calc(100px + ${index * 30}px)`,
              }}
              className={`sticky w-full flex flex-col lg:flex-row overflow-hidden shadow-2xl transition-all duration-300 rounded-3xl ${
                !isDark ? "border border-neutral-200/80" : "border border-neutral-800"
              }`}
            >
              {/* Left hero panel */}
              <motion.div
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-1 flex-col justify-between gap-10 p-8 lg:basis-[55%] lg:p-12 ${service.bgClass} ${service.color || "text-neutral-900"}`}
              >
                {/* Header + body */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-3xl font-bold leading-tight lg:text-4xl ${
                        isDark ? "text-white" : "text-neutral-900"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <p
                    className={`text-base font-normal lg:text-lg leading-relaxed ${
                      isDark
                        ? isBlue
                          ? "text-blue-100"
                          : "text-neutral-300"
                        : "text-neutral-600"
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* 2-column feature list */}
                  <div className="flex flex-row flex-wrap gap-y-3">
                    {service.features.map((feature) => {
                      const featText =
                        typeof feature === "string" ? feature : feature.title;
                      return (
                        <div
                          key={featText}
                          className="flex w-full sm:w-1/2 flex-row items-center gap-2 pr-2"
                        >
                          <GoDotFill
                            className={`shrink-0 ${
                              isDark
                                ? isBlue
                                  ? "text-blue-200"
                                  : "text-[#133BD4]"
                                : "text-[#133BD4]"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium leading-snug lg:text-base ${
                              isDark
                                ? isBlue
                                  ? "text-white"
                                  : "text-neutral-200"
                                : "text-neutral-700"
                            }`}
                          >
                            {featText}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={service.href || "/contact"}
                  className={`group w-fit inline-flex items-center gap-3 px-5 py-3 rounded-full ${
                    (service.isBtnWhite ?? service.bthIsWhite)
                      ? "bg-white text-neutral-950 hover:bg-neutral-100"
                      : "bg-neutral-950 text-white hover:bg-neutral-800"
                  } font-semibold text-sm md:text-base transition-all duration-300 hover:scale-[1.02] shadow-sm`}
                >
                  <span>Start a Project</span>
                  <span
                    className={`flex items-center justify-center size-7 rounded-full ${
                      (service.isBtnWhite ?? service.bthIsWhite)
                        ? "bg-neutral-100 text-neutral-950"
                        : "bg-neutral-800 text-white"
                    } transition-all duration-300`}
                  >
                    <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </Link>
              </motion.div>

              {/* Right panel — showcase image with Next.js Image */}
              <div className="relative flex w-full flex-1 lg:w-7/12 lg:basis-[45%] min-h-[300px] lg:min-h-[420px] bg-neutral-100 overflow-hidden">
                <Image
                  src={
                    service.imageSrc ||
                    service.image ||
                    service.fallbackImage ||
                    "/image/project/CASA.webp"
                  }
                  alt={`${service.title} showcase`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority={index < 2}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ServiceShowcaseCard;
