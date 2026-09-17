import CtaSection from "@/components/modules/cta/CtaSection";
import HomeReviewsAngledSlider from "@/components/modules/home/HomeReviewsAngledSlider";
import CompanyGallerySection from "@/components/modules/gallery/CompanyGallerySection";
import LeadersChapterShowcase from "@/components/modules/leadership/LeadersChapterShowcase";
import { ImpactStats } from "@/components/modules/stats/ImpactStats";
import Projects from "@/components/modules/projects/ProjectsSection";
import Showreel from "@/components/modules/home/Showreel";
import { ServiceShowcaseCard } from "@/components/modules/services/ServiceShowcaseCards";
import AINeuralNetworkSection from "@/components/modules/services/AINeuralNetworkSection";
import TrustedBy from "@/components/modules/home/TrustedBy";

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
      <HomeReviewsAngledSlider />
      {/* Pinned Scroll-Chapter Showcase: Our Leaders (All 11 Leaders) */}
      <LeadersChapterShowcase />
      <CompanyGallerySection />
      <CtaSection />
    </main>
  );
}
