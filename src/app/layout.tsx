import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../styles/globals.css";
import LenisProvider from "../components/LenisProvider";

export const metadata: Metadata = {
  title: "Sardar IT — Digital Services That Move Your Business Forward",
  description:
    "Sardar IT delivers end-to-end web development, software, branding, and digital marketing — one team, from idea to launch, with a client-first process.",
};

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
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
