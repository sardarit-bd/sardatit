import { FooterData, NavItem } from "@/types/navigation";

export const headerNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "#", label: "Services", hasDropdown: true },
  { href: "/testimonials", label: "Testimonials" },
];

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
    { name: "facebook", href: "https://www.facebook.com/sardaritbd/" },
    { name: "instagram", href: "https://instagram.com" },
    { name: "linkedin", href: "https://www.linkedin.com/company/sardarit212021/" },
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
        { label: "LinkedIn", href: "https://www.linkedin.com/company/sardarit212021/" },
      ],
    },
  ],
  contact: {
    emailLabel: "Drop us a line",
    email: "info@sardarit.com",
    supportEmail: "support@sardarit.com",
    phoneLabel: "Call or WhatsApp",
    phone: "+880 1335-111701",
    phoneHref: "https://wa.me/8801335111701",
    addressLabel: "Headquarters",
    address: "Plot- 30/A, Road-06, Rupnagar, Mirpur, Dhaka-1216 Dhaka, Bangladesh",
  },
  copyright: `© ${new Date().getFullYear()} Sardar IT. All rights reserved.`,
};