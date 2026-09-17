import { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/data/case-studies";
import { getAllServices } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sardaritbd.com";
  const now = new Date();

  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Primary Pillar Practices
    {
      url: `${baseUrl}/services/web-mobile-development`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/brand-identity`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/ai-automation-solutions`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/digital-marketing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Dynamic Case Studies Routes
  const caseStudyRoutes: MetadataRoute.Sitemap = Object.keys(CASE_STUDIES).map(
    (slug) => ({
      url: `${baseUrl}/works/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  // Dynamic Service Detail Routes (excluding the 4 primary pillar landing pages)
  const dedicatedServiceSlugs = new Set([
    "web-mobile-development",
    "brand-identity",
    "ai-automation-solutions",
    "digital-marketing",
  ]);

  const serviceRoutes: MetadataRoute.Sitemap = getAllServices()
    .filter((s) => !dedicatedServiceSlugs.has(s.slug))
    .map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...caseStudyRoutes, ...serviceRoutes];
}
