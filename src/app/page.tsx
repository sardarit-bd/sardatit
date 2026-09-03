import CtaSection from "@/components/Cta";
import ClientFeedbackAccordion from "@/components/sections/ClientFeedbackAccordion";
import CompanyGallerySection from "@/components/sections/CompanyGallerySection";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { ImpactStats } from "@/components/sections/ImpactStats";
import Projects from "@/components/sections/projects";
import Showreel from "@/components/Showreel";
import TeamMembers from "@/components/team";
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
      {/* 7. FOUNDERS & EXECUTIVE LEADERSHIP (Pure White Theme) */}
      <section className="w-full bg-white py-12">
        <FoundersSection />
        <TeamMembers />
      </section>
      <CompanyGallerySection />
      <CtaSection />
    </main>
  );
}
