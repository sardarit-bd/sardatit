"use client";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
import { LEADERS_DATA } from "@/data/leaders";
import SectionHeader from "../ui/SectionHeader";

export function FoundersSection() {
  const founders = LEADERS_DATA.filter((m) => m.groupId === "founders");

  return (
    <section className="container">
      <SectionHeader
        tag="Our Leaders"
        title1="Introducing the Visionary Leader Behind Sardar IT"
        pre="Since 2021 at Sardar IT, we believe Bangladesh's next generation of engineers, designers, and innovators can compete with — and lead — the best in the world. Our goal isn't just to serve clients from Dhaka; it's to make Bangladesh a recognized name in global technology, the same way other nations became known for manufacturing or finance. Every project we deliver, every student we train, and every career we help build is a step toward that future — a Bangladesh known not for outsourced labor, but for original innovation the world depends on."
        title2=""
        isBgWhite={true}
        width="max-w-7xl"
      />

      <div className="mt-12">
        <h2 className="text-xl font-semibold">
          Founders & Executive Leadership
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {founders.map((founder) => (
          <TeamMemberCard key={founder.id} member={founder} />
        ))}
      </div>
    </section>
  );
}
