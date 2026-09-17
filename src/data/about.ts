import {
  Cpu,
  GitFork,
  Globe,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  FiCpu,
  FiLayers,
  FiMessageSquare,
  FiZap,
} from "react-icons/fi";
import { AboutAwardItem, AboutFeatureItem, AboutValueItem } from "@/types/about";

export const values: AboutValueItem[] = [
  {
    step: "01",
    icon: FiMessageSquare,
    title: "Transparent Communication",
    description:
      "We prioritize open dialogue, ensuring clients are informed at every turn. Our clear communication fosters trust and alignment, enriching collaboration.",
  },
  {
    step: "02",
    icon: FiLayers,
    title: "Precision Management",
    description:
      "Our meticulous planning and execution ensure project success. Deadlines are met, objectives achieved, and complexities managed seamlessly, guaranteeing client satisfaction.",
  },
  {
    step: "03",
    icon: FiCpu,
    title: "Meticulous Detail",
    description:
      "We obsess over details, perfecting design elements and codebase architecture to deliver exceptional outcomes. From aesthetics to functionality, our dedication shines.",
  },
  {
    step: "04",
    icon: FiZap,
    title: "Innovative Excellence",
    description:
      "We thrive on innovation, pushing creative and technical boundaries. By blending cutting-edge trends and strategic insights, we consistently deliver solutions at the forefront.",
  },
];

export const features: AboutFeatureItem[] = [
  {
    icon: Layers,
    title: "Full-Cycle Product Engineering",
    desc: "From discovery architecture and UI/UX design systems to enterprise full-stack software and cloud deployment.",
  },
  {
    icon: Globe,
    title: "Global Footprint Across 60+ Countries",
    desc: "Proven track record delivering scalable digital solutions worldwide with seamless agile timezone alignment.",
  },
  {
    icon: Cpu,
    title: "Modern Battle-Tested Tech Stack",
    desc: "High-throughput architectures built on Next.js, React, Node.js, Python, Flutter, Docker, and AWS.",
  },
  {
    icon: GitFork,
    title: "Transparent Sprints & Milestones",
    desc: "Sprint visibility through weekly live demo walkthroughs, continuous deployment, and direct git repository access.",
  },
  {
    icon: ShieldCheck,
    title: "100% IP & Source Code Ownership",
    desc: "Complete transfer of fully-documented repositories, design systems, and software IP to your enterprise on day one.",
  },
  {
    icon: Zap,
    title: "Enterprise Security & SLA Scalability",
    desc: "Strict data privacy guardrails, post-launch maintenance, 99.9% uptime architectures, and continuous performance tuning.",
  },
];

export const awards: AboutAwardItem[] = [
  {
    platform: "Clutch",
    badge: "Top B2B Service Provider",
    desc: "Recognized as a leading global software engineering and product design firm.",
    rating: "4.9/5 Rating",
  },
  {
    platform: "GoodFirms",
    badge: "Top Development Agency",
    desc: "Awarded for exceptional client satisfaction and end-to-end tech delivery.",
    rating: "5.0/5 Rating",
  },
  {
    platform: "Behance",
    badge: "Featured UI/UX Excellence",
    desc: "Honored multiple times for outstanding interaction design and digital products.",
    rating: "Top Creative Showcase",
  },
  {
    platform: "Dribbble",
    badge: "Best Trending Showcase",
    desc: "Consistently recognized among the top design and engineering agencies.",
    rating: "Pro Agency Badge",
  },
];
