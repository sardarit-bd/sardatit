"use client";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
import { motion } from "framer-motion";

const founders = [
  {
    name: "Md. Mamunur Roshid",
    imageSrc: "/image/founders/Mamun.webp",
    facebookHref: "#",
    linkedinHref: "#",
  },
  {
    name: "Mst. Arju Akhter",
    imageSrc: "/image/founders/Arju.webp",
    facebookHref: "#",
    linkedinHref: "#",
  },
];

export function FoundersSection() {
  return (
    <section className="max-w-7xl  pt-5 mx-auto">
      <div className="mx-auto max-w-5xl text-center p-3">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="justify-center text-3xl lg:text-7xl"
        >
          Introducing the Visionary Leader Behind Sardar IT
        </motion.h1>

        <motion.p
          className="pt-4 text-sm md:text-base text-muted"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-semibold  text-text">Since 2021</span>, Sardar
          IT We believe Bangladesh's next generation of engineers, designers,
          and innovators can compete with — and lead — the best in the world.
          Our goal isn't just to serve clients from Dhaka; it's to make
          Bangladesh a recognized name in global technology, the same way other
          nations became known for manufacturing or finance. Every project we
          deliver, every student we train, and every career we help build is a
          step toward that future — a Bangladesh known not for outsourced labor,
          but for original innovation the world depends on.
        </motion.p>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 pt-12 md:flex-row md:items-start ">
        {founders.map((founder, index) => (
          <TeamMemberCard key={index} {...founder} />
        ))}
      </div>
    </section>
  );
}
