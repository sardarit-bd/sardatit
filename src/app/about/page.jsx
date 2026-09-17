import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Us — Global Software & Product Engineering",
  description:
    "Discover Sardar IT's mission, agile engineering methodology, core values, and global footprint delivering digital solutions across 60+ countries.",
  alternates: {
    canonical: "https://sardaritbd.com/about",
  },
  openGraph: {
    title: "About Us — Global Software & Product Engineering | Sardar IT",
    description:
      "Fueling Minds, Inspiring Innovations. Full-cycle product engineering, global delivery, and modern battle-tested technology.",
    url: "https://sardaritbd.com/about",
    images: [
      {
        url: "/image/galary/G2.JPG",
        width: 1200,
        height: 630,
        alt: "Sardar IT Team Collaboration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us — Global Software & Product Engineering | Sardar IT",
    description:
      "Fueling Minds, Inspiring Innovations. Full-cycle product engineering, global delivery, and modern battle-tested technology.",
    images: ["/image/galary/G2.JPG"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
