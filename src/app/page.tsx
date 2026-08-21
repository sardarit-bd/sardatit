import CtaSection from "@/components/Cta";
import Projects from "@/components/Projects";
// import BreakThingsCta from "@/components/sections/BreakThingsCta";
import { ImpactStats } from "@/components/sections/ImpactStats";
import Showreel from "@/components/Showreel";

import ClientFeedbackAccordion from "@/components/sections/ClientFeedbackAccordion";
import CompanyGallerySection from "@/components/sections/CompanyGallerySection";
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
      {/* <FoundersSection /> */}
      {/* <TeamSection /> */}
      {/* <AppShowcase /> */}
      <ClientFeedbackAccordion />
      <CompanyGallerySection />
      <CtaSection />

      {/* <FooterSection /> */}
      {/* <LogoTicker /> */}
    </main>
  );
}

