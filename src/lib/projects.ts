export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "Web Development" | "Mobile App" | "AI Solutions";
  eyebrow: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  statValue: string;
  statLabel: string;
  ctaLabel?: string;
  priority?: boolean;
}

export const projects: Project[] = [
  {
    id: "casa-viva",
    slug: "casa-viva",
    title: "CASA VIVA",
    category: "Web Development",
    eyebrow: "Real Estate Platform",
    description:
      "A high-converting luxury real estate platform built with advanced property listings, smart search filters, interactive map exploration, and seamless inquiry management for buyers and agents.",
    image: "/images/projects/casa-viva.webp",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    link: "/works/casa-viva",
    statValue: "4+",
    statLabel: "services delivered",
    ctaLabel: "View Case Study",
    priority: true,
  },
  {
    id: "medease",
    slug: "medease",
    title: "MedEase",
    category: "AI Solutions",
    eyebrow: "Hospital Management System",
    description:
      "A secure, HIPAA-compliant hospital management platform featuring intelligent patient scheduling, electronic health records (EHR), and automated clinician workflows to cut administrative overhead.",
    image: "/images/projects/medease.webp",
    tags: ["Next.js", "Python", "FastAPI", "Docker", "PostgreSQL"],
    link: "/works/medease",
    statValue: "70%",
    statLabel: "admin time saved",
    ctaLabel: "View Case Study",
    priority: true,
  },
  {
    id: "white-cross-clinic",
    slug: "white-cross-clinic",
    title: "White Cross Clinic",
    category: "Web Development",
    eyebrow: "Medical Website",
    description:
      "A modern healthcare portal for specialized clinical practices, enabling direct patient booking, automated doctor dispatch, and digital consultation management with seamless accessibility.",
    image: "/images/projects/white-cross-clinic.webp",
    tags: ["React", "Next.js", "Tailwind CSS", "Node.js", "AWS"],
    link: "/works/white-cross-clinic",
    statValue: "98%",
    statLabel: "client satisfaction",
    ctaLabel: "View Case Study",
  },
  {
    id: "gulf-county",
    slug: "gulf-county",
    title: "Gulf County",
    category: "Mobile App",
    eyebrow: "Music & Cultural Platform",
    description:
      "An immersive cross-platform music streaming and cultural audio application featuring offline track caching, curated community playlists, and rich interactive audio visualizers.",
    image: "/images/projects/gulf-county.webp",
    tags: ["React Native", "Expo", "Node.js", "MongoDB", "AWS S3"],
    link: "/works/gulf-county",
    statValue: "100k+",
    statLabel: "streams served",
    ctaLabel: "View Case Study",
  },
  {
    id: "home-service-provider",
    slug: "home-service-provider",
    title: "Home Service Provider",
    category: "Web Development",
    eyebrow: "On-Demand Services Platform",
    description:
      "A comprehensive service booking marketplace connecting homeowners with verified technicians, complete with real-time job dispatch, rating systems, and instant checkout.",
    image: "/images/projects/home-service-provider.webp",
    tags: ["Next.js", "Node.js", "Express", "PostgreSQL", "Stripe"],
    link: "/works/home-service-provider",
    statValue: "3.5x",
    statLabel: "booking conversion",
    ctaLabel: "View Case Study",
  },
  {
    id: "asia-lms",
    slug: "asia-lms",
    title: "Asia LMS",
    category: "Web Development",
    eyebrow: "Learning Management System",
    description:
      "An intuitive LMS platform that simplifies online education through structured video courses, live progress tracking, interactive quizzes, and role-based student-teacher dashboards.",
    image: "/images/projects/asia-lms.webp",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Redis"],
    link: "/works/asia-lms",
    statValue: "10k+",
    statLabel: "active learners",
    ctaLabel: "View Case Study",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug || p.id === slug);
}
