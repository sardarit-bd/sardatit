"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeader from "./ui/SectionHeader";

const servicesData = [
  {
    id: 1,
    title: "Branding Identity",
    description:
      "Create a trusted, global brand with our expert designs and strategies. We help improve your brand's visibility, credibility, and connection with customers both online and offline.",
    features: [
      "Brand Strategy & Positioning",
      "Visual Identity & Logos",
      "Design Systems & Guidelines",
      "Marketing & Collateral Materials",
    ],
    bgClass: "bg-[#0F172A]",
    imageSrc: "/image/service/service1.avif",
  },
  {
    id: 2,
    title: "Web & Mobile App Development",
    description:
      "We design and build high-performance web applications and mobile apps tailored for speed, scalability, and exceptional user experience.",
    features: [
      "Next.js & React Web Apps",
      "iOS & Android Mobile Apps",
      "Custom Software Engineering",
      "API & Cloud Infrastructure",
    ],
    bgClass: "bg-[#133BD4]",
    imageSrc: "/image/service/service1.avif",
  },
  {
    id: 3,
    title: "AI & Automation Solutions",
    description:
      "Empower your business with cutting-edge AI integrations, workflow automation, and custom intelligent tools that save time and cut operational costs.",
    features: [
      "AI Workflow Automation",
      "Custom LLM Integrations",
      "Data Analytics & Insights",
      "Process Optimization",
    ],
    bgClass: "bg-[#18181B]",
    imageSrc: "/image/service/service1.avif",
  },
  {
    id: 4,
    title: "Digital Marketing & Growth",
    description:
      "Accelerate your business growth with targeted digital marketing, SEO, conversion rate optimization, and data-driven marketing campaigns.",
    features: [
      "Search Engine Optimization (SEO)",
      "Performance Marketing & Ads",
      "Social Media & Content Strategy",
      "Conversion Optimization",
    ],
    bgClass: "bg-[#090D16]",
    imageSrc: "/image/service/service1.avif",
  },
];

export function ServiceShowcaseCard() {
  return (
    <section className="flex flex-col gap-14 w-full items-center justify-center px-6 md:px-10 py-16">
      {/* Header section */}
      <div className="container">
        <SectionHeader tag={"What we do"} title1="Design and development" pre="" title2="services from one team." isBgWhite={true} link={'/'} btn={'See Our Services'} />
      </div>



      {/* React Bits Scroll Stack Cards Container */}
      <div className="w-full container mx-auto px-6 md:px-12 flex flex-col gap-8 md:gap-12 relative pb-20">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            style={{
              top: `calc(100px + ${index * 30}px)`,
            }}
            className="sticky w-full flex flex-col lg:flex-row overflow-hidden shadow-2xl transition-all duration-300"
          >
            {/* 2. Left hero panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex flex-1 flex-col justify-between gap-10 p-8 text-white lg:basis-[55%] lg:p-12 ${service.bgClass}`}
            >
              {/* Header + body */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-bold leading-tight lg:text-4xl">
                    {service.title}
                  </h3>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80">
                    0{index + 1} / 0{servicesData.length}
                  </span>
                </div>

                <p className="text-base font-medium text-white/80 lg:text-lg">
                  {service.description}
                </p>

                {/* 2-column feature list */}
                <div className="flex flex-row flex-wrap gap-y-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex w-1/2 flex-row items-start gap-2 pr-2"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                      />
                      <span className="text-sm font-medium leading-snug text-white lg:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="group w-fit inline-flex items-center gap-3 px-4 py-2.5 bg-white text-black font-semibold text-sm md:text-base hover:bg-[#133bd4] hover:text-white transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Start a Project</span>
                <span className="flex items-center justify-center size-7 rounded-full bg-black/10 text-black group-hover:bg-white group-hover:text-[#133bd4] transition-colors">
                  <FiArrowUpRight className="text-base transition-transform group-hover:rotate-45" />
                </span>
              </Link>
            </motion.div>

            {/* 3. Right panel — showcase image */}
            <div className="flex w-full flex-1 lg:w-7/12 lg:basis-[45%] min-h-[300px] lg:min-h-full">
              <img
                src={service.imageSrc}
                alt={`${service.title} showcase`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
