"use client";

import { motion } from "framer-motion";

const features = [
  "Web & App Development",
  "Branding & Digital Marketing",
  "AI Automation Solutions",
  "IT Academy & Training",
];

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-2"
    >
      <path
        d="M3.33 8H12.67M12.67 8L8.67 4M12.67 8L8.67 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceShowcaseCard() {
  return (
    <section className="flex w-full items-center justify-center px-4 py-10 md:px-10">
      {/* 1. Outer container */}
      <div className="flex w-full container flex-col overflow-hidden rounded-3xl border border-border shadow-sm lg:flex-row">
        {/* 2. Left hero panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-1 flex-col justify-between gap-10 bg-primary p-8 text-white lg:basis-[55%] lg:p-12"
        >
          {/* Header + body */}
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold leading-tight lg:text-4xl">
              Branding Identity
            </h3>
            <p className="text-base font-medium text-primary-foreground/80 lg:text-lg">
              Create a trusted, global brand with our expert designs and
              strategies. We help improve your brand's visibility, credibility,
              and connection with customers both online and offline.
            </p>

            {/* 2-column feature list */}
            <div className="flex flex-row flex-wrap gap-y-3">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex w-1/2 flex-row items-start gap-2 pr-2"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-foreground"
                  />
                  <span className="text-sm font-medium leading-snug text-primary-foreground lg:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="flex w-fit flex-row items-center self-start rounded-full bg-card px-5 py-3 text-sm font-semibold text-card-foreground transition-transform hover:translate-x-0.5"
          >
            Start a project
            <ArrowIcon />
          </a>
        </motion.div>

        {/* 3. Right panel — single showcase image */}
        <div className="flex w-full flex-1 lg:w-7/12 lg:basis-[45%]">
          <img
            src="/image/service/service1.avif"
            alt="Sardar IT project showcase"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
