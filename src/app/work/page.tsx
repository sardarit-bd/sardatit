import Cta from "@/components/modules/cta/CtaSection";
import WorkProjectsGrid from "@/components/modules/projects/WorkProjectsGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Works & Case Studies | Sardar IT",
  description:
    "Explore Sardar IT's production case studies across clinical healthcare portals, luxury real estate platforms, autonomous AI workflows, and enterprise learning management systems.",
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

export default function WorkPage() {
  return (
    <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-24 md:pt-28">
      <WorkProjectsGrid />
      <Cta />
    </div>
  );
}
