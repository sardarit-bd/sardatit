// src/components/sections/ImpactStats.tsx
"use client";

import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { motion } from "framer-motion";

interface Stat {
  index: string;
  value: string;
  label: string;
}

// Row 1: 3 cards, Row 2: 2 cards — matches the layout below.
const statRows: Stat[][] = [
  [
    {
      index: "01",
      value: "98%",
      label: "client satisfaction in post-project reviews",
    },
    {
      index: "02",
      value: "1200+",
      label: "Projects Completed",
    },
    { index: "03", value: "4.9", label: "Average Review" },
    {
      index: "04",
      value: "5500+",
      label: "Clients Served",
    },
    {
      index: "05",
      value: "50+",
      label: "Employees",
    },
    {
      index: "06",
      value: "12+",
      label: "Country Served",
    },

  ]
];

export function ImpactStats() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6 md:px-12 flex flex-col gap-10">
        <div className="justify-center">
          <motion.span
            className="text-4xl md:text-5xl font-semibold leading-tight tracking-wide text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            The Best Services to Expand Your Business!
            <br className="hidden sm:block" /> Our services,
          </motion.span>
          <motion.span
            className="text-neutral-500 text-3xl font-extrabold leading-[1.15] tracking-wide sm:text-4xl sm:leading-[1.15] lg:text-5xl lg:leading-[62.40px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            that grow your success
          </motion.span>
        </div>

        <div className="flex flex-col gap-4 md:gap-5">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6  gap-3 md:gap-5">
            {statRows[0].map((stat) => (
              <motion.div
                key={stat.index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: Number(stat.index) * 0.05 }}
                // transition={{ duration: 0.5, delay: 0.5 }}
                className="w-full justify-center items-center "
              >
                <AnimatedStat
                  value={stat.value}
                  label={stat.label}
                  index={stat.index}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
