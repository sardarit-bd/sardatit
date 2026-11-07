"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { galleryImages } from "@/data/gallery";
import FloatingLines from "@/components/ui/FloatingLines";

export function CompanyGallerySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "200px" });
  const duplicatedImages = [...galleryImages, ...galleryImages];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-20 lg:py-20 overflow-hidden text-white"
    >
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
      <div className="relative z-10">
        <div className="container">
          <SectionHeader
            tag={"Life at Sardar IT"}
            title1="Moments & Company Culture"
            title2=""
            pre={
              "Take a peek inside our company journey, everyday moments, vibrant workspace, and the awesome people behind Sardar IT."
            }
            isBgWhite={false}
            link={"/"}
            btn={"Book a call"}
          />
        </div>
        <div className="relative w-full overflow-hidden flex items-center py-4 mt-14">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-48 bg-linear-to-r from-black via-black/80 to-transparent z-20 pointer-events-none hidden" />
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
                className={`group relative shrink-0 overflow-hidden ${index % 2 !== 0 ? "w-70 sm:w-90 md:w-92.5 h-50 sm:h-62.5 md:h-130" : "w-70 sm:w-90 md:w-92.5 h-50 sm:h-62.5 md:h-70"} `}
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
