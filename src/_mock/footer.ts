// footerData.ts
// Centralized content for the site Footer. Keeping copy, links, and
// contact details here means the Footer component stays purely
// presentational and new links/columns can be added without touching JSX.

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: "facebook" | "instagram" | "linkedin" | "twitter";
  href: string;
}

export interface FooterData {
  brand: {
    name: string;
    description: string;
  };
  cta: {
    label: string;
    href: string;
  };
  socialLinks: SocialLink[];
  navColumns: FooterColumn[];
  secondaryColumns: FooterColumn[];
  contact: {
    emailLabel: string;
    email: string;
    supportEmail: string;
    phoneLabel: string;
    phone: string;
    phoneHref: string;
    addressLabel: string;
    address: string;
  };
  copyright: string;
}

export const footerData: FooterData = {
  brand: {
    name: "Sardar IT",
    description:
      "Sardar IT is a software development company that boosts brand value with user-friendly, effective designs for web, mobile, and SaaS platforms.",
  },
  cta: {
    label: "Company Deck",
    href: "/contact",
  },
  socialLinks: [
    { name: "facebook", href: "https://facebook.com" },
    { name: "instagram", href: "https://instagram.com" },
    { name: "linkedin", href: "https://linkedin.com" },
    { name: "twitter", href: "https://twitter.com" },
  ],
  navColumns: [
    {
      title: "Services",
      links: [
        { label: "Web & Mobile Development", href: "/services/web-mobile-development" },
        { label: "UI/UX & Brand Identity", href: "/services/brand-identity" },
        { label: "AI & Workflow Automation", href: "/services/ai-automation-solutions" },
        { label: "Digital Marketing & Growth", href: "/services/digital-marketing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Case Studies & Insights", href: "/case-studies" },
        { label: "Our Methodology", href: "/about" },
        { label: "Frequently Asked Questions", href: "/faq" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
    {
      title: "Agency",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Services", href: "/services" },
        { label: "Selected Works", href: "/works" },
        { label: "Client Testimonials", href: "/testimonials" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ],
  secondaryColumns: [
    {
      title: "Recognitions & Portfolios",
      links: [
        { label: "Clutch", href: "https://clutch.co" },
        { label: "Behance", href: "https://behance.net" },
        { label: "Dribbble", href: "https://dribbble.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
      ],
    },
  ],
  contact: {
    emailLabel: "Drop us a line",
    email: "info@sardarit.com",
    supportEmail: "support@sardarit.com",
    phoneLabel: "Call or WhatsApp",
    phone: "+880 1700-XXXXXX",
    phoneHref: "https://wa.me/8801700000000",
    addressLabel: "Headquarters",
    address: "Dhaka, Bangladesh · Serving Clients Worldwide (60+ Countries)",
  },
  copyright: "© 2026 Sardar IT. All rights reserved.",
};
