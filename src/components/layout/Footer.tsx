import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";
import { footerData } from "@/data/navigation";
import type { SocialLink } from "@/types/navigation";
import TechText from "@/components/TechText";

const SOCIAL_ICON_MAP: Record<SocialLink["name"], React.ComponentType<{ className?: string }>> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
};

export default function Footer() {
  const { brand, cta, socialLinks, navColumns, secondaryColumns, contact } =
    footerData;

  return (
    <footer className="w-full min-h-[calc(100vh-5rem)] lg:h-[calc(100vh-5rem)] bg-[#111111] text-white flex flex-col justify-between overflow-hidden pt-8 pb-4 relative z-10">
      {/* Top Section: Navigation Columns & Company Details */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 shrink-0 pt-2">
        <div className="flex flex-col items-start justify-between gap-y-10 lg:flex-row lg:gap-x-12">
          {/* Brand Info & Socials */}
          <div className="flex basis-full flex-col items-start gap-y-6 lg:basis-1/4 lg:max-w-xs">
            <span className="font-sans text-2xl font-bold tracking-tight text-white">
              {brand.name}
            </span>

            <p className="max-w-70 text-sm leading-relaxed text-neutral-400">
              {brand.description}
            </p>

            <Link
              href={cta.href}
              className="group inline-flex items-center gap-x-3.5 bg-[#133BD4] hover:bg-[#0f2eb0] text-white rounded-full font-semibold px-6 py-3 transition-all duration-300 hover:scale-[1.02] shadow-md shadow-[#133BD4]/25"
            >
              <span>{cta.label}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#133BD4] transition-colors">
                <FiArrowDown className="h-3.5 w-3.5 animate-bounce translate-y-0.5" strokeWidth={2.5} />
              </span>
            </Link>

            <div className="flex flex-row items-center gap-x-6">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICON_MAP[social.name];
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center border border-neutral-800 text-white transition-colors hover:bg-white hover:text-black rotate-45 mt-2"
                  >
                    <Icon className="h-3.5 w-3.5 -rotate-45" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Links & Contact Columns */}
          <div className="flex w-full flex-1 flex-col gap-y-10">
            <div className="flex flex-row flex-wrap justify-between gap-x-12 gap-y-8">
              {navColumns.map((column) => (
                <FooterColumnBlock key={column.title} column={column} />
              ))}
            </div>

            <div className="flex flex-row flex-wrap justify-between gap-x-12 gap-y-8">
              {secondaryColumns.map((column) => (
                <FooterColumnBlock key={column.title} column={column} />
              ))}

              <div className="flex basis-full flex-col items-start gap-y-5 sm:basis-[45%] lg:basis-1/4">
                <div className="flex flex-col items-start gap-y-1">
                  <span className="text-sm text-neutral-400">
                    {contact.emailLabel}
                  </span>
                  <Link
                    href={`mailto:${contact.email}`}
                    className="text-sm font-semibold text-white transition-colors hover:text-blue-400"
                  >
                    {contact.email}
                  </Link>
                  <Link
                    href={`mailto:${contact.supportEmail}`}
                    className="text-sm font-semibold text-white transition-colors hover:text-blue-400"
                  >
                    {contact.supportEmail}
                  </Link>
                </div>

                <div className="flex flex-col items-start gap-y-1">
                  <span className="text-sm text-neutral-400">
                    {contact.phoneLabel}
                  </span>
                  <Link
                    href={contact.phoneHref}
                    className="flex items-center gap-x-2 text-sm font-semibold text-white transition-colors hover:text-blue-400"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <FaWhatsapp className="h-3 w-3" />
                    </span>
                    {contact.phone}
                  </Link>
                </div>

                <div className="flex flex-col items-start gap-y-1">
                  <span className="text-sm text-neutral-400">
                    {contact.addressLabel}
                  </span>
                  <span className="text-sm text-white">
                    {contact.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Copyright & Bottom Sub-Bar */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-800/70 pt-3 shrink-0">
        <p className="text-xs text-neutral-400">
          {footerData.copyright}
        </p>
        <div className="flex items-center gap-x-6 text-xs text-neutral-400">
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>

      {/* Bottom Section: Balanced Canvas TechText Component */}
      <div className="w-full flex-1 min-h-[160px] max-h-[260px] flex items-center justify-center overflow-hidden select-none relative">
        <TechText
          text="Sardar IT"
          fontSize={220}
          fontWeight={900}
          color="#133BD4"
          accentColor="#38bdf8"
          strokeWidth={1.5}
          dashLength={4}
          dashGap={2}
          sweep={true}
          draggable={true}
          selection={true}
          labels={true}
          className="w-full h-full"
        />
      </div>
    </footer>
  );
}

function FooterColumnBlock({
  column,
}: {
  column: { title: string; links: { label: string; href: string }[] };
}) {
  return (
    <div className="flex basis-full flex-col items-start sm:basis-[45%] lg:basis-1/4">
      <h3 className="mb-4 text-base font-semibold text-white">
        {column.title}
      </h3>
      <ul className="flex flex-col items-start">
        {column.links.map((link) => {
          const isExternal = link.href.startsWith("http");
          return (
            <li key={link.label} className="mb-3 last:mb-0">
              <Link
                href={link.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="block text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
