"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "../ui/SectionHeader";

const galleryImages = [
  {
    src: "/image/galary/G2.JPG",
    alt: "Sardar IT Team Event",
    title: "Team Celebration",
    category: "Culture",
  },
  {
    src: "/image/galary/G3.webp",
    alt: "Workspace Collaboration",
    title: "Collaborative Workspace",
    category: "Office",
  },
  {
    src: "/image/galary/G4.JPG",
    alt: "Innovation & Tech Discussion",
    title: "Brainstorming Session",
    category: "Innovation",
  },
  {
    src: "/image/galary/G5.JPG",
    alt: "Sardar IT Team Moment",
    title: "Team Outing",
    category: "Events",
  },
  {
    src: "/image/designer.png",
    alt: "Creative Designers at Work",
    title: "Design Studio",
    category: "Creativity",
  },
  {
    src: "/image/all_face.png",
    alt: "Sardar IT Family",
    title: "Our Brilliant Team",
    category: "People",
  },
  {
    src: "/image/hero.jpg",
    alt: "Sardar IT Life",
    title: "Daily Standups & Work",
    category: "Growth",
  },
];

export function CompanyGallerySection() {
  // Duplicate array to ensure smooth infinite loop
  const duplicatedImages = [...galleryImages, ...galleryImages, ...galleryImages];

  return (
    <section className="relative w-full bg-black py-20 lg:py-20 overflow-hidden text-white">

      <div className="container">
        <SectionHeader tag={"Life at Sardar IT"} title1="Moments & Company Culture" title2="" pre={"Take a peek inside our company journey, everyday moments, vibrant workspace, and the awesome people behind Sardar IT."} isBgWhite={false} link={'/'} btn={'Book a call'} />

      </div>

      {/* Infinite Marquee Container (Right to Left) */}
      <div className="relative w-full overflow-hidden flex items-center py-4 mt-14">
        {/* Left Gradient Fade Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none hidden" />

        {/* Moving Image Track */}
        <motion.div
          className="flex gap-6 sm:gap-8 shrink-0 items-center"
          animate={{ x: ["0%", "-33.333%"] }}
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
                sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 420px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CompanyGallerySection;
