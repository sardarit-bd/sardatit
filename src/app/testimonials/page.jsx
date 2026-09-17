"use client";

import CtaSection from "@/components/modules/cta/CtaSection";
import HomeReviewsAngledSlider from "@/components/modules/home/HomeReviewsAngledSlider";
import { ImpactStats } from "@/components/modules/stats/ImpactStats";

export default function TestimonialsPage() {
  return (
    <main className="w-full bg-white text-neutral-900 overflow-x-clip pt-16 md:pt-20">
      <ImpactStats />

      {/* Modern Client Reviews Angled Slider (Reused from Home Page) */}
      <HomeReviewsAngledSlider showFeedbackButton={false} />

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
