import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ScrollToTop from "@/components/layout/ScrollToTop";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import LenisProvider from "@/components/layout/LenisProvider";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Sardar IT — Digital Services That Move Your Business Forward",
  description:
    "Sardar IT delivers end-to-end web development, software, branding, and digital marketing — one team, from idea to launch, with a client-first process.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};
// asfasd
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${outfit.className} antialiased`}>
        <ScrollToTop />
        <LenisProvider>
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
