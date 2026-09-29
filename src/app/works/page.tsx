import { CtaSection as Cta } from "@/modules/cta";
import { WorkProjectsGrid } from "@/modules/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Works & Case Studies",
  description:
    "Explore Sardar IT's production case studies across clinical healthcare portals, luxury real estate platforms, and enterprise learning management systems.",
  alternates: {
    canonical: "https://sardaritbd.com/works",
  },
  openGraph: {
    title: "Selected Works & Case Studies | Sardar IT",
    description:
      "Explore production case studies across healthcare, real estate, audio streaming, and ed-tech platforms.",
    url: "https://sardaritbd.com/works",
    images: [{ url: "/images/projects/CASA.webp", width: 1200, height: 630, alt: "Sardar IT Selected Works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Works & Case Studies | Sardar IT",
    description:
      "Explore production case studies across healthcare, real estate, audio streaming, and ed-tech platforms.",
    images: ["/images/projects/CASA.webp"],
  },
};

export default function WorksPage() {
  return (
    <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-24 md:pt-28">
      <WorkProjectsGrid />
      <Cta />
    </div>
  );
}
