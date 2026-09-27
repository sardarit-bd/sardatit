"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { galleryImages } from "@/data/gallery";
import FloatingLines from "@/components/FloatingLines";

export function CompanyGallerySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "200px" });

  // 2x duplication for lightweight, seamless infinite loop
  const duplicatedImages = [...galleryImages, ...galleryImages];

  return (
    <section ref={sectionRef} className="relative w-full bg-black py-20 lg:py-20 overflow-hidden text-white">
      {/* Floating Lines Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <FloatingLines
          linesGradient={["#133BD4", "#1d4ed8", "#38bdf8", "#133BD4"]}
          lineCount={[4, 3, 4]}
          renderScale={0.8}
          antialias={false}
          backgroundColor="#000000"
          animationSpeed={1}
          interactive={true}
          parallax={true}
        />
      </div>

      {/* Existing Foreground Content */}
      <div className="relative z-10">
        <div className="container">
          <SectionHeader
            tag={"Life at Sardar IT"}
            title1="Moments & Company Culture"
            title2=""
            pre={"Take a peek inside our company journey, everyday moments, vibrant workspace, and the awesome people behind Sardar IT."}
            isBgWhite={false}
            link={'/'}
            btn={'Book a call'}
          />
        </div>

        {/* Infinite Marquee Container (Right to Left) */}
        <div className="relative w-full overflow-hidden flex items-center py-4 mt-14">
          {/* Left Gradient Fade Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none hidden" />

          {/* Moving Image Track */}
          <motion.div
            className="flex gap-6 sm:gap-8 shrink-0 items-center transform-gpu will-change-transform"
            animate={isInView ? { x: ["0%", "-50%"] } : undefined}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedImages.map((img, index) => (
              <div
                key={index}
                className={`group relative shrink-0 overflow-hidden ${index % 2 !== 0 ? "w-[280px] sm:w-[360px] md:w-[370px] h-[200px] sm:h-[250px] md:h-[520px]" : "w-[280px] sm:w-[360px] md:w-[370px] h-[200px] sm:h-[250px] md:h-[280px]"} `}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 370px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CompanyGallerySection;
