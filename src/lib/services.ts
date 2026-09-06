import { ServiceItem } from "@/types/service";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "brand-identity",
    slug: "brand-identity",
    title: "Brand Identity",
    label: "Brand Identity",
    shortTitle: "Branding",
    description:
      "Creating compelling visual identity that reflects your brand values and resonates with your target audience.",
    detailedDescription:
      "Create a trusted, global brand with our expert designs and strategies. We help improve your brand's visibility, credibility, and connection with customers both online and offline through cohesive design systems, modern typography, and meaningful brand stories.",
    features: [
      "Brand Strategy & Positioning",
      "Visual Identity & Logos",
      "Design Systems & Guidelines",
      "Marketing & Collateral Materials",
    ],
    deliverables: [
      "Brand Guidelines & Token Kit",
      "Vector Logo Suite & Typography System",
      "Social Media & Marketing Collateral",
      "Color Hierarchy & Custom Iconography",
    ],
    image: "/image/project/CASA.webp",
    fallbackImage: "/image/service/service1.avif",
    imageSrc: "/image/service/service1.avif",
    href: "/services/brand-identity",
    bgClass: "bg-[#133BD4]",
    color: "text-white",
    Color: "text-white",
    bthIsWhite: true,
    badgeTitle: "Brand Identity",
    stats: [
      { label: "Brand Recall Boost", value: "+85%" },
      { label: "Identity Projects Delivered", value: "60+" },
      { label: "Design System Adoption", value: "100%" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Discovery & Archetype Definition",
        description:
          "Uncover brand pillars, target demographic motivations, and competitive positioning landscape.",
      },
      {
        step: "02",
        title: "Visual Conceptualization",
        description:
          "Exploring typography pairings, logo geometry, moodboards, and distinct aesthetic palettes.",
      },
      {
        step: "03",
        title: "Comprehensive System Design",
        description:
          "Establishing component tokens, iconography, stationery, and multi-channel digital applications.",
      },
      {
        step: "04",
        title: "Brand Guidelines Handoff",
        description:
          "Delivering export-ready design kits, guidelines, and production-ready vector assets.",
      },
    ],
  },
  {
    id: "web-mobile-development",
    slug: "web-mobile-development",
    title: "Web and Mobile App Development",
    label: "Web and Mobile App Development",
    shortTitle: "Development",
    description:
      "Crafting seamless and intuitive user experiences across web and mobile platforms.",
    detailedDescription:
      "We design and build high-performance web applications and mobile apps tailored for speed, scalability, and exceptional user experience. Utilizing modern stacks like Next.js, React, React Native, and robust cloud APIs, we transform vision into production-ready software.",
    features: [
      "Next.js & React Web Apps",
      "iOS & Android Mobile Apps",
      "Custom Software Engineering",
      "API & Cloud Infrastructure",
    ],
    deliverables: [
      "Full-Stack Web & Mobile Applications",
      "Scalable REST / GraphQL API Architecture",
      "CI/CD Pipeline & Cloud Deployment",
      "Comprehensive Code Documentation & Tests",
    ],
    image: "/image/project/HomeServiceProvider.webp",
    fallbackImage: "/image/project/HomeServiceProvider.webp",
    imageSrc:
      "https://cdn.prod.website-files.com/6655d16113e6966ef4eb1041/695660016e7fa600f1ded4cb_ai-web-ux-design.avif",
    href: "/services/web-mobile-development",
    bgClass: "bg-[#ffd500]",
    color: "text-black",
    Color: "text-black",
    bthIsWhite: false,
    badgeTitle: "Web & Mobile",
    stats: [
      { label: "Core Web Vitals Score", value: "98/100" },
      { label: "Products Shipped", value: "120+" },
      { label: "Uptime Reliability", value: "99.9%" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Architecture & Tech Stack Planning",
        description:
          "Defining scalable schemas, API contracts, state management, and modern framework choices.",
      },
      {
        step: "02",
        title: "Frontend & Backend Engineering",
        description:
          "Agile sprint execution building responsive components and high-throughput backend endpoints.",
      },
      {
        step: "03",
        title: "Performance Tuning & QA",
        description:
          "Auditing Core Web Vitals, automated unit testing, end-to-end testing, and security hardening.",
      },
      {
        step: "04",
        title: "Cloud Deployment & Monitoring",
        description:
          "Zero-downtime deployment setup, continuous integration, and real-time observability.",
      },
    ],
  },
  {
    id: "ai-automation-solutions",
    slug: "ai-automation-solutions",
    title: "AI and Automation Solutions",
    label: "AI and automation Solutions",
    shortTitle: "AI & Automation",
    description:
      "Leveraging artificial intelligence and automation to streamline operations and enhance efficiency.",
    detailedDescription:
      "Empower your business with cutting-edge AI integrations, workflow automation, and custom intelligent tools that save time, cut operational costs, and unlock predictive capabilities. From custom LLM fine-tuning to autonomous agent workflows.",
    features: [
      "AI Workflow Automation",
      "Custom LLM Integrations",
      "Data Analytics & Insights",
      "Process Optimization",
    ],
    deliverables: [
      "Custom AI Assistant & Agent Workflows",
      "Intelligent Document Processing Pipeline",
      "Automated Data ETL & Predictive Dashboards",
      "Enterprise AI Security & Governance Framework",
    ],
    image: "/image/project/MedEase.webp",
    fallbackImage: "/image/project/MedEase.webp",
    imageSrc:
      "https://cdn.prod.website-files.com/6655d16113e6966ef4eb1041/6956600b5336d6c6c37b5d0d_mvp-product-design-by-wavespace.avif",
    href: "/services/ai-automation-solutions",
    bgClass: "bg-[#ff531a]",
    color: "text-white",
    Color: "text-white",
    bthIsWhite: true,
    badgeTitle: "AI & Automation",
    stats: [
      { label: "Workflow Time Saved", value: "70%" },
      { label: "Automation Accuracy", value: "99.2%" },
      { label: "Average ROI Payback", value: "< 3 Mo" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Automation Audit & Feasibility",
        description:
          "Analyzing operational bottlenecks and identifying high-impact AI and automation opportunities.",
      },
      {
        step: "02",
        title: "Data Pipeline & Model Selection",
        description:
          "Curating domain data, configuring retrieval mechanisms (RAG), and selecting optimal models.",
      },
      {
        step: "03",
        title: "Integration & Safeguarding",
        description:
          "Connecting AI agents with CRM, ERP, and databases while implementing rigorous guardrails.",
      },
      {
        step: "04",
        title: "Deployment & Continuous Tuning",
        description:
          "Monitoring output accuracy, establishing escalation flows, and fine-tuning prompts continuously.",
      },
    ],
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing and Growth",
    label: "Digital Marketing and Growth",
    shortTitle: "Growth Marketing",
    description:
      "Driving measurable results through data-driven digital marketing strategies and optimization.",
    detailedDescription:
      "Accelerate your business growth with targeted digital marketing, SEO, conversion rate optimization, and data-driven marketing campaigns. We align customer acquisition channels with compounding organic visibility to maximize your ROI.",
    features: [
      "Search Engine Optimization (SEO)",
      "Performance Marketing & Ads",
      "Social Media & Content Strategy",
      "Conversion Optimization",
    ],
    deliverables: [
      "SEO Technical Audit & Keyword Strategy",
      "Multi-Platform Ad Campaigns & Creative Sets",
      "Conversion Rate Optimization (CRO) Roadmaps",
      "Real-Time Analytics & Attribution Dashboards",
    ],
    image: "/image/project/White_Cross_Clinic.webp",
    fallbackImage: "/image/project/White_Cross_Clinic.webp",
    imageSrc:
      "https://cdn.prod.website-files.com/6655d16113e6966ef4eb1041/69565fef09c6195a8eebdfd8_b2b-ui-ux-design.avif",
    href: "/services/digital-marketing",
    bgClass: "bg-[#0F172A]",
    color: "text-white",
    Color: "text-white",
    bthIsWhite: true,
    badgeTitle: "Digital Marketing",
    stats: [
      { label: "Average Conversion Growth", value: "2.5x" },
      { label: "Organic Traffic Increase", value: "+210%" },
      { label: "Ad ROAS Benchmark", value: "4.2x" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Market & Competitor Analysis",
        description:
          "Auditing existing funnel metrics, search intent keywords, and competitor ad creatives.",
      },
      {
        step: "02",
        title: "Strategy & Experiment Matrix",
        description:
          "Prioritizing high-leverage growth hypotheses across paid, organic, and retention funnels.",
      },
      {
        step: "03",
        title: "Campaign Launch & Creative Testing",
        description:
          "Deploying multivariate ad variants, conversion-focused landing pages, and SEO architecture.",
      },
      {
        step: "04",
        title: "Attribution & Scaled Optimization",
        description:
          "Doubling down on winning segments, refining unit economics, and scaling customer acquisition.",
      },
    ],
  },
];

/**
 * Retrieve all active services.
 */
export function getAllServices(): ServiceItem[] {
  return SERVICES_DATA;
}

/**
 * Retrieve a specific service by its slug.
 */
export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_DATA.find((service) => service.slug === slug);
}

/**
 * Helper to get adjacent services for navigation links.
 */
export function getAdjacentServices(currentSlug: string): {
  prev?: ServiceItem;
  next?: ServiceItem;
} {
  const index = SERVICES_DATA.findIndex((s) => s.slug === currentSlug);
  if (index === -1) return {};

  const prev = index > 0 ? SERVICES_DATA[index - 1] : SERVICES_DATA[SERVICES_DATA.length - 1];
  const next = index < SERVICES_DATA.length - 1 ? SERVICES_DATA[index + 1] : SERVICES_DATA[0];

  return { prev, next };
}
