import CtaSection from "@/components/Cta";
import ClientFeedbackAccordion from "@/components/sections/ClientFeedbackAccordion";
import CompanyGallerySection from "@/components/sections/CompanyGallerySection";
import { ImpactStats } from "@/components/sections/ImpactStats";
import Projects from "@/components/sections/projects";
import Showreel from "@/components/Showreel";
import { ServiceShowcaseCard } from "@/components/WhyChooseUs";
import { Hero } from "../components/Hero";
import TrustedBy from "../components/TrustedBy";

export default function Home() {
  return (
    <main className="w-full text-text bg-white">
      <Hero />
      <Showreel />
      <TrustedBy />
      <ImpactStats />
      <Projects />
      <ServiceShowcaseCard />
      <ClientFeedbackAccordion />
      <CompanyGallerySection />
      <CtaSection />
    </main>
  );
}
