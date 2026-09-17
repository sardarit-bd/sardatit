import CtaSection from "@/components/modules/cta/CtaSection";
import HomeReviewsAngledSlider from "@/components/modules/home/HomeReviewsAngledSlider";
import { ImpactStats } from "@/components/modules/stats/ImpactStats";

export const metadata = {
  title: "Client Testimonials & Enterprise Reviews",
  description:
    "Read verified client feedback and measurable impact metrics from global founders, CTOs, and product leaders partnering with Sardar IT.",
  alternates: {
    canonical: "https://sardaritbd.com/testimonials",
  },
  openGraph: {
    title: "Client Testimonials & Enterprise Reviews | Sardar IT",
    description:
      "Read verified client reviews and impact metrics from founders and CTOs across 60+ countries.",
    url: "https://sardaritbd.com/testimonials",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "Sardar IT Client Reviews" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials & Enterprise Reviews | Sardar IT",
    description:
      "Read verified client reviews and impact metrics from founders and CTOs across 60+ countries.",
    images: ["/icon.png"],
  },
};

export default function TestimonialsPage() {
  return (
    <main className="w-full bg-white text-neutral-900 overflow-x-clip pt-16 md:pt-20">
      <h1 className="sr-only">Client Testimonials &amp; Global Reviews — Sardar IT</h1>
      <ImpactStats />

      {/* Modern Client Reviews Angled Slider (Reused from Home Page) */}
      <HomeReviewsAngledSlider showFeedbackButton={false} />

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
