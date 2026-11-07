import { CtaSection } from "@/modules/cta";
import { HomeReviewsAngledSlider } from "@/modules/testimonials";
import { CompanyGallerySection } from "@/modules/gallery";
import { LeadersChapterShowcase } from "@/modules/leadership";
import { ImpactStats } from "@/modules/stats";
import { ProjectsSection as Projects } from "@/modules/projects";
import { Showreel, TrustedBy } from "@/modules/home";
import Hero from "@/modules/home/components/Hero";
import { ServiceShowcaseCard } from "@/modules/services";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sardar IT — Enterprise Software Development & Digital Solutions",
  description:
    "Sardar IT engineers scalable web applications, mobile products, AI workflows, and bespoke brand design for global enterprises across 60+ countries.",
  alternates: {
    canonical: "https://sardaritbd.com",
  },
  openGraph: {
    title: "Sardar IT — Enterprise Software Development & Digital Solutions",
    description:
      "Engineered for global scale: full-stack web, mobile apps, brand systems, and autonomous AI integrations.",
    url: "https://sardaritbd.com",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Sardar IT Logo Mark",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="w-full text-text bg-white">
      <h1 className="sr-only">
        Sardar IT — Enterprise Software Development, AI Solutions &amp; Digital
        Products
      </h1>
      <Hero />
      <Showreel />
      <TrustedBy />
      <Projects />
      <ImpactStats />
      <ServiceShowcaseCard />
      <HomeReviewsAngledSlider />
      <LeadersChapterShowcase />
      <CompanyGallerySection />
      <CtaSection />
    </main>
  );
}
