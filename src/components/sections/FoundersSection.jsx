"use client";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
import SectionHeader from "../ui/SectionHeader";

const founders = [
  {
    id: "1",
    name: "Md. Mamunur Roshid",
    role: "Founder & Chief Executive Officer (CEO)",
    imageSrc: "/image/founders/Mamun.webp",
  },
  {
    id: "2",
    name: "Mst. Arju Akhter",
    role: "Chairman",
    imageSrc: "/image/founders/Arju.webp",
  },
];

export function FoundersSection() {
  return (
    <section className="container">


      <SectionHeader tag={"Our Leaders"} title1="Introducing the Visionary Leader Behind Sardar IT" pre="Since 2021, Sardar
          IT We believe Bangladesh's next generation of engineers, designers,
          and innovators can compete with — and lead — the best in the world.
          Our goal isn't just to serve clients from Dhaka; it's to make
          Bangladesh a recognized name in global technology, the same way other
          nations became known for manufacturing or finance. Every project we
          deliver, every student we train, and every career we help build is a
          step toward that future — a Bangladesh known not for outsourced labor,
          but for original innovation the world depends on." title2="" isBgWhite={true} width="max-w-7xl" />


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-12">
        {founders.map((founder, index) => (
          <TeamMemberCard key={index} member={founder} />
        ))}
      </div>
    </section>
  );
}
