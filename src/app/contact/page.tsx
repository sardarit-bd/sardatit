import CtaSection from "@/components/modules/cta/CtaSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Next Project",
  description:
    "Get in touch with Sardar IT. Tell us what you're building, improving, or scaling. We'll architect the roadmap, assemble specialists, and engineer measurable results.",
  alternates: {
    canonical: "https://sardaritbd.com/contact",
  },
  openGraph: {
    title: "Contact Us | Sardar IT",
    description:
      "Discuss your software engineering, UI/UX design, or AI automation project with Sardar IT's technical leadership.",
    url: "https://sardaritbd.com/contact",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "Contact Sardar IT" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Sardar IT",
    description:
      "Discuss your software engineering, UI/UX design, or AI automation project with Sardar IT's technical leadership.",
    images: ["/icon.png"],
  },
};

export default function ContactPage() {
  return (
    <main className="w-full text-text bg-white pt-20 lg:pt-20">
      <h1 className="sr-only">Contact Sardar IT — Enterprise Software &amp; Digital Solutions</h1>
      <CtaSection />
    </main>
  );
}
