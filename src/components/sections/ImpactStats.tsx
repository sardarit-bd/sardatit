// src/components/sections/ImpactStats.tsx
"use client";

import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";

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
      label: "Client Satisfaction",
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

        <SectionHeader tag={"Achivment"} title1="Achievements That Define" pre="" title2="Our Success" isBgWhite={false} />

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
