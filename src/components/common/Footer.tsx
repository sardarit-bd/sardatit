import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin } from "react-icons/fi";
import { footerData } from "@/data/navigation";
import type { SocialLink } from "@/types/navigation";
import { Outfit } from "next/font/google";
const LOGO_SRC = "/images/logo.svg";
const outfit = Outfit({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});
const SOCIAL_ICON_MAP: Record<
  SocialLink["name"],
  React.ComponentType<{ className?: string }>
> = {
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};

type FooterLink = { label: string; href: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Web & Mobile Development", href: "#" },
      { label: "UX/UI & Brand Identity", href: "#" },
      { label: "AI & Workflow Automation", href: "#" },
      { label: "Digital Marketing & Growth", href: "#" },
      { label: "Digital Product", href: "#" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "#" },
      { label: "Portfolio", href: "#" },
      { label: "Our Team", href: "#" },
      { label: "Clients", href: "#" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Review",
    links: [
      { label: "Clutch", href: "#" },
      { label: "Behance", href: "#" },
      { label: "Dribbble", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

const BOTTOM_LINKS: FooterLink[] = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  const { socialLinks } = footerData;

  return (
    <footer className="relative w-full overflow-hidden bg-linear-to-b from-[#031A5E] via-[#020A2B] to-black text-white">
      <div className="mx-auto w-full max-w-360 px-6 sm:px-8 lg:px-12.75">
        <div className="grid grid-cols-1 gap-y-10 pt-14 sm:grid-cols-2 lg:grid-cols-[391fr_305fr_244fr_126fr] lg:gap-y-0 lg:pt-13">
          <div className="flex flex-col items-start">
            <Image
              src={LOGO_SRC}
              alt="Sardar IT"
              width={183}
              height={40}
              className="h-10 w-auto"
              priority={false}
            />

            <p className="mt-9 max-w-[270px] text-[15px] leading-[22px] text-white">
              We work with a passion for taking challenges and creating new ones
              in the Freelancing sector.
            </p>

            <div className="mt-6 flex items-center gap-x-3">
              <FiMail className="h-[18px] w-[18px] shrink-0" />
              <Link
                href="mailto:info@sardaritbd.com"
                className="text-[15px] font-medium"
              >
                info@sardaritbd.com
              </Link>
            </div>

            <div className="mt-6 flex items-start gap-x-3">
              <FiMapPin className="mt-[3px] h-[18px] w-[18px] shrink-0" />
              <span className="max-w-[230px] text-[15px] font-medium leading-[22px]">
                Plot- 30/A, Road-06, Rupnagar, Mirpur, Dhaka-1216
              </span>
            </div>

            <div className="mt-6 flex items-center gap-x-[13px]">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICON_MAP[social.name];
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[39px] w-[39px] items-center justify-center rounded-full bg-white text-[#133BD4] transition-transform duration-300 hover:scale-110"
                  >
                    <Icon className="h-[17px] w-[17px]" />
                  </Link>
                );
              })}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col items-start">
              <h3 className="text-base font-semibold leading-6 text-white">
                {column.title}
              </h3>
              <ul className="mt-5.5 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.label} className="mb-3.75 last:mb-0">
                    <Link
                      href={link.href}
                      className="block text-[15px] leading-6 text-white transition-opacity hover:opacity-70 w-full"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-[26px] lg:mt-[37px]">
          <div className="flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
            <div className="flex items-center gap-x-3 text-[15px] font-medium">
              <span
                aria-hidden="true"
                className="flex h-5 w-5 items-center justify-center rounded-full border border-white text-[11px] leading-none"
              >
                C
              </span>
              <p>Copyright 2023 SardarIT | All Rights Reserved</p>
            </div>

            <div className="flex flex-wrap items-center gap-x-[49px] gap-y-2 text-[15px] font-medium">
              {BOTTOM_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-opacity hover:opacity-70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ───────── Big faded wordmark ───────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none mt-10 w-full select-none overflow-hidden @container lg:mt-11"
      >
        <span
          className={`${outfit.className} block w-full whitespace-nowrap bg-[linear-gradient(180deg,#1747E0_0%,#010104_79.19%)] bg-clip-text text-center text-[17.44cqw] font-bold leading-none tracking-normal text-transparent`}
        >
          Sardar IT
        </span>
      </div>
    </footer>
  );
}
