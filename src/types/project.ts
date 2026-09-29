export type ProjectCategory =
  | "All"
  | "Web Development"
  | "Mobile App"
  | "AI Solutions"
  | "UI/UX Design"
  | "Full-Stack SaaS"
  | string;

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  eyebrow: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  liveUrl?: string;
  statValue: string;
  statLabel: string;
  ctaLabel?: string;
  priority?: boolean;
  year?: string;
  badgeCategory?: string;
  featured?: boolean;
  summary?: string;
  techStack?: string[];
  metrics?: {
    value: string;
    label: string;
  };
  deliverables?: string[];
  mockup?: string;
  screenshots?: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  category: string;
  timelines: string;
  liveUrl: string | null;
  services: string[];
  heroImage: string;
  about: string[];
  coverImage: string;
  objectives: string;
  requirements: string;
  solutions: string;
  macbookView?: string;
  mobileGrid?: string[];
  styleGuideText?: string;
  styleGuideGrid?: string[];
  styleBanner?: string;
  screensGrid?: string[];
  footerShowcase?: string;
  responsivenessText?: string;
  productGrid?: string[];
  illustrationsText?: string;
  illustrationBanner?: string;
  responsiveGrid?: string[];
  responsiveViewBanner?: string;
  macbookVersion?: string;
  heroImageAlt?: string;
  coverImageAlt?: string;
  macbookViewAlt?: string;
  screenshots?: string[];
}
