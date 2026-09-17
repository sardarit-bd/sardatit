import Cta from "@/components/modules/cta/CtaSection";
import Projects from "@/components/modules/projects/ProjectsSection";
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
    images: [{ url: "/image/project/CASA.webp", width: 1200, height: 630, alt: "Sardar IT Selected Works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Works & Case Studies | Sardar IT",
    description:
      "Explore production case studies across healthcare, real estate, audio streaming, and ed-tech platforms.",
    images: ["/image/project/CASA.webp"],
  },
};

export default function WorksPage() {
  return (
    <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-16 md:pt-20">
      <h1 className="sr-only">Selected Works &amp; Enterprise Case Studies — Sardar IT</h1>
      <Projects />
      <Cta />
    </div>
  );
}
