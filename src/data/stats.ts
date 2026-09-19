import { StatMetric } from "@/types/stats";

export const statsData: (StatMetric & { lottiePath?: string })[] = [
  {
    number: "99%",
    label: "Client Satisfaction",
    index: "01",
    lottiePath: "/lottie/stat-1.json",
  },
  {
    number: "500+",
    label: "Projects Completed",
    index: "02",
    lottiePath: "/lottie/stat-2.json",
  },
  {
    number: "60+",
    label: "Countries Served",
    index: "03",
    lottiePath: "/lottie/stat-3.json",
  },
  {
    number: "15+",
    label: "Active Platforms & Products",
    index: "04",
    lottiePath: "/lottie/stat-4.json",
  },
  {
    number: "50+",
    label: "Specialized Engineers & Team",
    index: "05",
    lottiePath: "/lottie/stat-5.json",
  },
];
