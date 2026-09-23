"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { brands, brands1, brands2 } from "@/data/brands";
import { BrandLogo } from "@/types/brand";

const Row = ({
  items,
  direction,
  speed = 55,
  className = "",
}: {
  items: BrandLogo[];
  direction: "left" | "right";
  speed?: number;
  className?: string;
}) => (
  <div className="overflow-hidden w-full flex">
    <motion.div
      key={`${direction}-${speed}`}
      className={`flex gap-12 md:gap-16 items-center w-max flex-nowrap ${className}`}
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {[...items, ...items].map((brand, index) => (
        <div
          key={index}
          className="relative shrink-0 w-28 h-10 sm:w-36 sm:h-12 lg:w-44 lg:h-14 flex items-center justify-center cursor-pointer transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105"
        >
          <Image
            src={brand.src}
            alt={brand.name}
            fill
            sizes="(max-width: 768px) 112px, (max-width: 1200px) 144px, 176px"
            className="object-contain pointer-events-none"
          />
        </div>
      ))}
    </motion.div>
  </div>
);

export default function TrustedBy() {
  return (
    <section className="py-20 sm:py-24 md:py-32 overflow-hidden w-full relative bg-white border-y border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center">
          <p className="text-sm sm:text-base md:text-lg font-semibold tracking-[0.18em] text-neutral-800 uppercase text-center mb-10 md:mb-14">
            TRUSTED BY 250+ GLOBAL BRANDS
          </p>
        </div>

        <div
          className="relative flex flex-col gap-y-8 md:gap-y-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <Row items={brands} direction="left" speed={55} />
          <Row items={brands1} direction="right" speed={65} />
          <Row items={brands2} direction="left" speed={50} />
        </div>
      </div>
    </section>
  );
}
