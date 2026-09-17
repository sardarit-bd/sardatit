import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ScrollToTop from "@/components/layout/ScrollToTop";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import LenisProvider from "@/components/layout/LenisProvider";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sardaritbd.com"),
  title: {
    default: "Sardar IT — Digital Services That Move Your Business Forward",
    template: "%s | Sardar IT",
  },
  description:
    "Sardar IT delivers end-to-end web development, software, branding, and digital marketing — one team, from idea to launch, with a client-first process.",
  keywords: [
    "Sardar IT",
    "Enterprise Software Engineering",
    "Next.js Development Agency",
    "React Native Mobile Apps",
    "AI Workflow Automation",
    "UI/UX Design Systems",
    "Brand Identity Design",
    "Performance Marketing",
    "Full-Stack Web Development",
  ],
  authors: [{ name: "Sardar IT", url: "https://sardaritbd.com" }],
  creator: "Sardar IT",
  publisher: "Sardar IT",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sardaritbd.com",
    siteName: "Sardar IT",
    title: "Sardar IT — Digital Services That Move Your Business Forward",
    description:
      "End-to-end web development, mobile apps, branding, and intelligent AI workflows engineered for global scale.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Sardar IT — Software & Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sardar IT — Digital Services That Move Your Business Forward",
    description:
      "End-to-end web development, mobile apps, branding, and intelligent AI workflows engineered for global scale.",
    images: ["/icon.png"],
    creator: "@sardarit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sardaritbd.com/#organization",
      name: "Sardar IT",
      url: "https://sardaritbd.com",
      logo: {
        "@type": "ImageObject",
        url: "https://sardaritbd.com/icon.png",
        caption: "Sardar IT Logo",
      },
      description:
        "Sardar IT is a premier digital engineering firm delivering enterprise software development, intelligent workflow automation, and UI/UX design systems across 60+ countries.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot- 30/A, Road-06, Rupnagar, Mirpur",
        addressLocality: "Dhaka",
        postalCode: "1216",
        addressCountry: "BD",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+880 1335-111701",
          contactType: "customer service",
          email: "info@sardarit.com",
          availableLanguage: ["English", "Bengali"],
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/sardarit",
        "https://clutch.co",
        "https://behance.net",
        "https://dribbble.com",
        "https://wa.me/8801335111701",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://sardaritbd.com/#service",
      name: "Sardar IT",
      url: "https://sardaritbd.com",
      image: "https://sardaritbd.com/icon.png",
      telephone: "+880 1335-111701",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot- 30/A, Road-06, Rupnagar, Mirpur",
        addressLocality: "Dhaka",
        postalCode: "1216",
        addressCountry: "BD",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Enterprise Digital & Engineering Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Enterprise Web & Mobile App Engineering",
              description:
                "High-concurrency full-stack digital products engineered with Next.js, React, Flutter, and cloud microservices.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Brand Identity & Digital Product Design",
              description:
                "Tokenized multi-platform design systems, UX architecture, and cohesive brand identities.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Intelligent Workflow Automation & AI Solutions",
              description:
                "Self-hosted n8n pipelines, webhook orchestration, and custom omnichannel AI agents.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Digital Marketing & Performance Growth",
              description:
                "Data-driven performance media, SEO, and conversion rate optimization tailored to scale revenue.",
            },
          },
        ],
      },
    },
  ],
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.className} antialiased`}>
        <ScrollToTop />
        <LenisProvider>
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
