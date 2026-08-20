import CtaSection from "@/components/Cta";
import Footer from "@/components/Footer";
import LogoTicker from "@/components/LogoTicker";
import Projects from "@/components/Projects";
import { AppShowcase } from "@/components/sections/AppShowcase";
// import BreakThingsCta from "@/components/sections/BreakThingsCta";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { ImpactStats } from "@/components/sections/ImpactStats";
import Showreel from "@/components/Showreel";

import { ServiceShowcaseCard } from "@/components/WhyChooseUs";
import Header from "../components/Header";
import { Hero } from "../components/Hero";
import { TrustedBy } from "../components/TrustedBy";

export default function Home() {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden text-text bg-white">
      <Header />
      <Hero />
      <Showreel />
      <TrustedBy />
      <LogoTicker />
      <ImpactStats />
      <Projects />
      <ServiceShowcaseCard />
      <FoundersSection />
      {/* <TeamSection /> */}
      <AppShowcase />
      <CtaSection />

      {/* <FooterSection /> */}
      {/* <LogoTicker /> */}
      <Footer />
    </main>
  );
}
