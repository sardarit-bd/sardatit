import { CASE_STUDIES } from "@/data/case-studies";
import { getProjectBySlug } from "@/lib/projects";
import WorksSlugClient from "./WorksSlugClient";

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawSlug = typeof resolvedParams?.slug === "string" ? resolvedParams.slug : "recharge-iv";
  const slugKey = rawSlug.toLowerCase();
  const fallbackProject = getProjectBySlug(slugKey);
  const data = CASE_STUDIES[slugKey] || {
    title: fallbackProject?.title || rawSlug.replace(/-/g, " ").toUpperCase(),
    company: fallbackProject?.eyebrow || "Sardar IT Case Study",
    heroDescription: fallbackProject?.title
      ? `Explore the ${fallbackProject.title} case study by Sardar IT.`
      : "Explore our case study and digital engineering achievements.",
    heroImage: "/images/og-default.png",
  };

  const title = `${data.title} | Case Study | Sardar IT`;
  const description = (
    data.heroDescription ||
    `Discover how Sardar IT engineered high-performance digital solutions for ${data.company}.`
  ).slice(0, 155);
  const canonicalUrl = `https://sardaritbd.com/works/${slugKey}`;
  const ogImage = data.heroImage || "https://sardaritbd.com/logo.png";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Sardar IT",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${data.title} Case Study Preview`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function WorksSlugPage() {
  return <WorksSlugClient />;
}
