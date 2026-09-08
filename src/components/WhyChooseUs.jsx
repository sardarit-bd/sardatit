"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { SERVICES_DATA } from "@/lib/services";
import SectionHeader from "./ui/SectionHeader";

const servicesData = SERVICES_DATA;

export function ServiceShowcaseCard() {
  return (
    <section className="flex flex-col gap-14 w-full items-center justify-center px-6 md:px-10 py-16">
      <div className="container">
        <SectionHeader
          tag={"What we do"}
          title1="Design and development"
          pre=""
          title2="services from one team."
          isBgWhite={true}
          link={"/"}
          btn={"See Our Services"}
        />
      </div>

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
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex flex-1 flex-col justify-between gap-10 p-8 lg:basis-[55%] lg:p-12 ${service.bgClass} ${service?.Color}`}
            >
              {/* Header + body */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-bold leading-tight lg:text-4xl">
                    {service.title}
                  </h3>
                </div>

                <p className="text-base font-medium lg:text-lg">
                  {service.description}
                </p>

                {/* 2-column feature list */}
                <div className="flex flex-row flex-wrap gap-y-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex w-1/2 flex-row items-center gap-2 pr-2"
                    >
                      <GoDotFill className={`${service?.Color} rounded-full`} />
                      <span className="text-sm font-medium leading-snug lg:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className={`group w-fit inline-flex items-center gap-3 px-4 py-2.5 ${service.bthIsWhite ? "bg-white text-black" : "bg-black text-white"} font-semibold text-sm md:text-base transition-all duration-300 hover:scale-[1.02]`}
              >
                <span>Start a Project</span>
                <span className={`flex items-center justify-center size-7 rounded-full ${service.bthIsWhite ? "bg-black/10 text-black group-hover:bg-black/10 group-hover:text-black" : "bg-white text-black group-hover:bg-white group-hover:text-black"}  transition-all duration-300`}>
                  <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:rotate-45" />
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
