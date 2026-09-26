import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/services/brand-design",
        destination: "/services/brand-identity",
        permanent: true,
      },
      {
        source: "/services/product-design",
        destination: "/services/brand-identity",
        permanent: true,
      },
      {
        source: "/services/motion-graphics",
        destination: "/services/brand-identity",
        permanent: true,
      },
      {
        source: "/services/ui-ux-design",
        destination: "/services/brand-identity",
        permanent: true,
      },
      {
        source: "/services/consulting",
        destination: "/services/brand-identity",
        permanent: true,
      },
      {
        source: "/services/saas-design",
        destination: "/services/web-mobile-development",
        permanent: true,
      },
      {
        source: "/services/app-design",
        destination: "/services/web-mobile-development",
        permanent: true,
      },
      {
        source: "/services/web-development",
        destination: "/services/web-mobile-development",
        permanent: true,
      },
      {
        source: "/services/enterprise-engineering",
        destination: "/services/web-mobile-development",
        permanent: true,
      },
      {
        source: "/services/engineering",
        destination: "/services/web-mobile-development",
        permanent: true,
      },
      {
        source: "/services/workflow-automation",
        destination: "/services/ai-automation-solutions",
        permanent: true,
      },
      {
        source: "/services/automation",
        destination: "/services/ai-automation-solutions",
        permanent: true,
      },
      {
        source: "/services/ai-integration",
        destination: "/services/ai-automation-solutions",
        permanent: true,
      },
      {
        source: "/services/growth-marketing",
        destination: "/services/digital-marketing",
        permanent: true,
      },
      {
        source: "/services/growth",
        destination: "/services/digital-marketing",
        permanent: true,
      },
      {
        source: "/services/mvp-development",
        destination: "/services/web-mobile-development",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

