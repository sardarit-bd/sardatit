import CtaSection from "@/components/Cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Sardar IT",
  description:
    "Get in touch with Sardar IT. Tell us what you're building, improving, or trying to solve. We'll discuss your goals, recommend the right approach, and define next steps.",
};

export default function ContactPage() {
  return (
    <main className="w-full text-text bg-white pt-20 lg:pt-20">
      <CtaSection />
    </main>
  );
}
