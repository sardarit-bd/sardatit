import CtaSection from "@/components/Cta";
import ClientFeedbackAccordion from "@/components/sections/ClientFeedbackAccordion";
import CompanyGallerySection from "@/components/sections/CompanyGallerySection";
import LeadersChapterShowcase from "@/components/sections/LeadersChapterShowcase";
import { ImpactStats } from "@/components/sections/ImpactStats";
import Projects from "@/components/sections/projects";
import Showreel from "@/components/Showreel";
import { ServiceShowcaseCard } from "@/components/WhyChooseUs";
// import { Hero } from "../components/Hero";
import AINeuralNetworkSection from "@/components/services/AINeuralNetworkSection";
import TrustedBy from "../components/TrustedBy";

export default function Home() {
  return (
    <main className="w-full text-text bg-white">
      {/* Existing Hero Section preserved but commented out:
      <Hero />
      */}
      {/* Primary Hero Section: AI Neural Particle Banner */}
      <AINeuralNetworkSection />
      <Showreel />
      <TrustedBy />
      <ImpactStats />
      <Projects />
      <ServiceShowcaseCard />
      <ClientFeedbackAccordion />
      {/* Pinned Scroll-Chapter Showcase: Our Leaders (All 11 Leaders) */}
      <LeadersChapterShowcase />
      <CompanyGallerySection />
      <CtaSection />
    </main>
  );
}
