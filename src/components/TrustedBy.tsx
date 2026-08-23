"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  { name: "Sequoia", src: "/logo/1.avif" },
  { name: "Kodezi", src: "/logo/2.avif" },
  { name: "Combinator", src: "/logo/3.avif" },
  { name: "HeyGen", src: "/logo/4.avif" },
  { name: "Recruitly", src: "/logo/5.avif" },
  { name: "techstars", src: "/logo/6.avif" },
  { name: "Delve", src: "/logo/7.avif" },
  { name: "Accepty", src: "/logo/8.avif" },
  { name: "Mavis", src: "/logo/9.avif" },
  { name: "Oppatravel", src: "/logo/10.avif" },
  { name: "Medical Student AI", src: "/logo/11.avif" },
  { name: "500 Global", src: "/logo/12.avif" },
  { name: "ZeroEssay", src: "/logo/13.avif" },
  { name: "Seedcamp", src: "/logo/14.avif" },
  { name: "Empresaa", src: "/logo/16.avif" },
  { name: "Andreessen Horowitz", src: "/logo/17.avif" },
  { name: "AI Partner", src: "/logo/18.avif" },
];

const brands1 = [
  { name: "Accepty", src: "/logo/8.avif" },
  { name: "Kodezi", src: "/logo/2.avif" },
  { name: "Mavis", src: "/logo/9.avif" },
  { name: "Combinator", src: "/logo/3.avif" },
  { name: "HeyGen", src: "/logo/4.avif" },
  { name: "Medical Student AI", src: "/logo/11.avif" },
  { name: "Recruitly", src: "/logo/5.avif" },
  { name: "AI Partner", src: "/logo/18.avif" },
  { name: "Delve", src: "/logo/7.avif" },
  { name: "techstars", src: "/logo/6.avif" },
  { name: "Oppatravel", src: "/logo/10.avif" },
  { name: "ZeroEssay", src: "/logo/13.avif" },
  { name: "500 Global", src: "/logo/12.avif" },
  { name: "Empresaa", src: "/logo/16.avif" },
  { name: "Seedcamp", src: "/logo/14.avif" },
  { name: "Sequoia", src: "/logo/1.avif" },

  { name: "Andreessen Horowitz", src: "/logo/17.avif" },

];

const Row = ({
  direction,
  speed = 250,
  className = "",
}: {
  direction: "left" | "right";
  speed?: number;
  className?: string;
}) => (
  <div className="overflow-hidden w-full flex">
    <motion.div
      key={`${direction}-${speed}`}
      className={`flex gap-10 sm:gap-14 lg:gap-18 items-center w-max flex-nowrap ${className}`}
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {[...brands, ...brands1].map((brand, index) => (
        <div
          key={index}
          className="relative shrink-0 w-28 h-10 sm:w-36 sm:h-12 lg:w-44 lg:h-14 flex items-center justify-center opacity-100 transition-all duration-300 cursor-pointer"
        >
          <Image
            src={brand.src}
            alt={brand.name}
            fill
            sizes="(max-width: 768px) 112px, (max-width: 1200px) 144px, 176px"
            className="object-contain"
          />
        </div>
      ))}
    </motion.div>
  </div>
);

export default function TrustedBy() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 overflow-hidden w-full relative bg-white border-y border-neutral-100">
      <div className="container mx-auto px-6 lg:px-8 mb-8 sm:mb-10 text-center">
        <p className="text-md md:text-lg font-semibold uppercase tracking-widest text-neutral-500 pb-14">
          TRUSTED BY 250+ GLOBAL BRANDS
        </p>
      </div>

      <div className="relative flex flex-col gap-8 sm:gap-10 overflow-hidden">
        <Row direction="left" speed={150} />
        <Row direction="right" speed={200} />
      </div>

      {/* Side Gradient Fade Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}
