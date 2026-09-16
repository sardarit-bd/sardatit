import { ServiceItem } from "@/types/service";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "brand-identity",
    slug: "brand-identity",
    title: "Digital Product Design & Brand Systems",
    label: "Brand Identity",
    shortTitle: "Product & Brand",
    description:
      "Architecting intuitive digital experiences, design systems, and cohesive brand identities that resonate across global markets.",
    detailedDescription:
      "Create a trusted, global brand with our expert designs and strategies. We help improve your brand's visibility, credibility, and connection with customers both online and offline through cohesive design systems, modern typography, and meaningful brand stories.",
    features: [
      "Multi-Platform UI/UX & Design Systems",
      "Enterprise Brand Architecture & Positioning",
      "Interactive High-Fidelity Prototypes",
      "Design-to-Code Engineering Governance",
    ],
    deliverables: [
      "Multi-Platform Design Tokens (Tailwind, React, Flutter)",
      "Enterprise UI Component Libraries & Storybook Handoff",
      "Vector Logo Suite & Global Typography Hierarchy",
      "Design System Governance & Accessibility Standards (WCAG 2.1)",
    ],
    image: "/image/project/CASA.webp",
    fallbackImage: "/image/project/CASA.webp",
    imageSrc: "/image/project/CASA.webp",
    href: "/services/brand-identity",
    bgClass: "bg-white border border-neutral-200/80",
    color: "text-neutral-900",
    isBtnWhite: false,
    bthIsWhite: false,
    badgeTitle: "Brand Identity",
    stats: [
      { label: "Projects Delivered Globally", value: "500+" },
      { label: "Client Satisfaction Rate", value: "99%" },
      { label: "Countries Served", value: "60+" },
      { label: "Design System Adoption", value: "100%" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Discovery & Brand Architecture",
        description:
          "Uncovering brand pillars, user personas, target market dynamics, and competitive software positioning.",
      },
      {
        step: "02",
        title: "Design Tokens & Visual Exploration",
        description:
          "Defining typography scales, atomic color tokens, dark/light contrast ratios, and distinct brand geometry.",
      },
      {
        step: "03",
        title: "Component System & Prototyping",
        description:
          "Architecting modular UI kits in Figma, interactive micro-interactions, and multi-tenant design patterns.",
      },
      {
        step: "04",
        title: "Storybook & Production Handoff",
        description:
          "Delivering production-ready token JSONs, developer documentation, Storybook integration, and WCAG compliance audit.",
      },
    ],
  },
  {
    id: "web-mobile-development",
    slug: "web-mobile-development",
    title: "Enterprise Web & Mobile App Engineering",
    label: "Web and Mobile App Development",
    shortTitle: "Engineering",
    description:
      "Delivering robust, full-stack digital products engineered with modern frameworks to serve high-concurrency enterprise workloads.",
    detailedDescription:
      "We design and build high-performance web applications and mobile apps tailored for speed, scalability, and exceptional user experience. Utilizing modern stacks like Next.js, React, React Native, and robust cloud APIs, we transform vision into production-ready software.",
    features: [
      "Next.js, React & Modern Full-Stack",
      "iOS & Android Cross-Platform Apps",
      "Scalable SaaS & Cloud Microservices",
      "Real-Time APIs & High-Throughput Databases",
    ],
    deliverables: [
      "Full-Stack Web & Mobile Applications",
      "Scalable REST / GraphQL API Architecture",
      "CI/CD Pipeline & Cloud Deployment",
      "Comprehensive Code Documentation & Tests",
    ],
    image: "/image/services/web-performance.webp",
    fallbackImage: "/image/services/web-performance.webp",
    imageSrc: "/image/services/mobile-dual-mockup.webp",
    href: "/services/web-mobile-development",
    bgClass: "bg-[#0B1120]",
    color: "text-white",
    isBtnWhite: true,
    bthIsWhite: true,
    badgeTitle: "Web & Mobile Engineering",
    stats: [
      { label: "Projects Delivered Globally", value: "500+" },
      { label: "Countries Served", value: "60+" },
      { label: "Enterprise Uptime SLA", value: "99.99%" },
      { label: "Core Web Vitals Benchmark", value: "98/100" },
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
    title: "Intelligent Workflow Automation & AI Integration",
    label: "Workflow Automation & AI",
    shortTitle: "Automation",
    description:
      "Streamlining enterprise operations with self-hosted n8n pipelines, intelligent webhook workflows, and custom AI agent integrations across 60+ countries.",
    detailedDescription:
      "Eliminate repetitive manual tasks and eliminate per-task SaaS fees. We architect production-grade workflow automation using self-hosted n8n, Make, custom webhooks, and intelligent LLM agents that connect seamlessly with your CRM, ERP, and payment systems.",
    features: [
      "n8n Self-Hosted & Multi-Step Orchestration",
      "OpenAI & Anthropic API Workflow Integration",
      "Omnichannel AI Agents (WhatsApp, Web, CRM)",
      "Automated ERP, Courier & Payment Webhooks",
    ],
    deliverables: [
      "Self-Hosted n8n Workflow Infrastructure",
      "Custom Webhook & API Connectors",
      "Intelligent Document (OCR/PDF) Pipelines",
      "Full Workflow Blueprints & 100% IP Ownership",
    ],
    image: "/image/services/isometric-ai-core.png",
    fallbackImage: "/image/services/isometric-ai-core.png",
    imageSrc: "/image/services/isometric-ai-core.png",
    href: "/services/ai-automation-solutions",
    bgClass: "bg-[#133BD4]",
    color: "text-white",
    isBtnWhite: true,
    bthIsWhite: true,
    badgeTitle: "Workflow Automation & AI",
    stats: [
      { label: "Projects Delivered Globally", value: "500+" },
      { label: "Countries Served", value: "60+" },
      { label: "Manual Tasks Automated", value: "85%+" },
      { label: "Workflow Uptime SLA", value: "99.99%" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Process Audit & Workflow Architecture",
        description:
          "Mapping manual bottlenecks, API endpoints, and data flows to design high-ROI automation schemas.",
      },
      {
        step: "02",
        title: "Pipeline Engineering in n8n & Make",
        description:
          "Building resilient triggers, conditional branching logic, webhook listeners, and fail-safe retry mechanisms.",
      },
      {
        step: "03",
        title: "AI Prompting & Webhook Integration",
        description:
          "Connecting OpenAI/Claude APIs, document OCR parsing, and bi-directional CRM/ERP synchronization.",
      },
      {
        step: "04",
        title: "Production Deployment & Monitoring",
        description:
          "Self-hosting containerized n8n instances, webhook queue management, and real-time failure alerting.",
      },
    ],
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Growth & Global Marketing",
    label: "Digital Marketing and Growth",
    shortTitle: "Global Growth",
    description:
      "Scaling digital reach across 60+ countries through data-backed performance strategies, technical SEO, and conversion optimization.",
    detailedDescription:
      "Accelerate your business growth with targeted digital marketing, SEO, conversion rate optimization, and data-driven marketing campaigns. We align customer acquisition channels with compounding organic visibility to maximize your ROI.",
    features: [
      "Technical SEO & Organic Visibility",
      "Data-Driven Performance Marketing",
      "High-Conversion Funnel Optimization",
      "Omnichannel Analytics & Reporting",
    ],
    deliverables: [
      "SEO Technical Audit & Keyword Strategy",
      "Multi-Platform Ad Campaigns & Creative Sets",
      "Conversion Rate Optimization (CRO) Roadmaps",
      "Real-Time Analytics & Attribution Dashboards",
    ],
    image: "/image/services/digital-marketing.png",
    fallbackImage: "/image/services/digital-marketing.png",
    imageSrc: "/image/services/digital-marketing.png",
    href: "/services/digital-marketing",
    bgClass: "bg-[#F1F5F9]",
    color: "text-neutral-900",
    isBtnWhite: false,
    bthIsWhite: false,
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
