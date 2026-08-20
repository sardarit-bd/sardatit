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
    phoneLabel: string;
    phone: string;
    phoneHref: string;
  };
}

export const footerData: FooterData = {
  brand: {
    name: "wavespace",
    description:
      "Wavespace is a global UI/UX design agency that boosts brand value with user-friendly, effective designs for web, mobile, and SaaS platforms.",
  },
  cta: {
    label: "Company Deck",
    href: "#",
  },
  socialLinks: [
    { name: "facebook", href: "#" },
    { name: "instagram", href: "#" },
    { name: "linkedin", href: "#" },
    { name: "twitter", href: "#" },
  ],
  navColumns: [
    {
      title: "Design Services",
      links: [
        { label: "UI UX Design", href: "#" },
        { label: "Web Design", href: "#" },
        { label: "Mobile App Design", href: "#" },
        { label: "SaaS Design", href: "#" },
        { label: "Landing Page Design", href: "#" },
        { label: "Brand Identity Design", href: "#" },
      ],
    },
    {
      title: "Strategy & Research",
      links: [
        { label: "UX Research", href: "#" },
        { label: "UX Audit", href: "#" },
        { label: "UX Consultancy", href: "#" },
        { label: "Usability & User Testing", href: "#" },
        { label: "CRO Service", href: "#" },
      ],
    },
    {
      title: "Development Services",
      links: [
        { label: "MVP Development", href: "#" },
        { label: "Webflow Development", href: "#" },
        { label: "AI MVP Development", href: "#" },
        { label: "SaaS MVP Development", href: "#" },
        { label: "Web App MVP Development", href: "#" },
      ],
    },
  ],
  secondaryColumns: [
    {
      title: "Agency",
      links: [
        { label: "About Us", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Service", href: "#" },
        { label: "Blog", href: "#" },
        { label: "FAQs", href: "#" },
        { label: "Case Studies", href: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Clutch", href: "#" },
        { label: "Behance", href: "#" },
        { label: "Dribbble", href: "#" },
        { label: "Awwwards", href: "#" },
      ],
    },
  ],
  contact: {
    emailLabel: "Drop us a line",
    email: "hello@wavespace.agency",
    phoneLabel: "Call us",
    phone: "+1 628-265-7462",
    phoneHref: "tel:+16282657462",
  },
};
