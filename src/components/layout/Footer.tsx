import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin } from "react-icons/fi";
import { MdOutlineCopyright } from "react-icons/md";
import { footerData } from "@/data/navigation";
import type { SocialLink } from "@/types/navigation";

const SOCIAL_ICON_MAP: Record<
  SocialLink["name"],
  React.ComponentType<{ className?: string }>
> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
};

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  const { brand, socialLinks, navColumns, secondaryColumns, contact } =
    footerData;
  const columns = [...navColumns, ...secondaryColumns];

  return (
    <footer className="relative z-10 w-full overflow-hidden bg-linear-to-b from-[#00214F] via-[#001235] to-[#00050F] pt-12 text-white sm:pt-14">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">
        {/* Top: brand + link columns */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-12">
          {/* Brand block */}
          <div className="flex flex-col items-start gap-6 lg:w-[34%] lg:max-w-sm">
            <Link href="/" aria-label={brand.name}>
              <Image
                src="/images/logo-white.png"
                alt={brand.name}
                width={180}
                height={48}
                className="h-10 w-auto"
              />
            </Link>

            <p className="max-w-[260px] text-sm leading-relaxed text-white">
              {brand.description}
            </p>

            <div className="flex flex-col gap-4 text-sm text-white">
              <Link
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 transition-colors hover:text-[#6C8DFF]"
              >
                <FiMail className="size-4 shrink-0" />
                <span>{contact.email}</span>
              </Link>
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 size-4 shrink-0" />
                <span className="max-w-[220px] leading-relaxed">
                  {contact.address}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICON_MAP[social.name];
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-8 items-center justify-center rounded-full bg-white text-[#1747E0] transition-colors hover:bg-[#1747E0] hover:text-white"
                  >
                    <Icon className="size-3.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-1 flex-wrap justify-between gap-x-12 gap-y-10 lg:max-w-[760px]">
            {columns.map((column) => (
              <FooterColumnBlock key={column.title} column={column} />
            ))}
          </div>
        </div>

        {/* Divider + copyright bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-5 text-sm text-white sm:flex-row sm:items-center">
          <p className="flex items-center gap-2">
            <MdOutlineCopyright className="size-5 shrink-0" />
            <span>{footerData.copyright}</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[#6C8DFF]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Big gradient wordmark */}
      <div
        aria-hidden="true"
        className="mt-6 select-none overflow-hidden text-center sm:mt-8"
      >
        <span className="block bg-linear-to-b from-[#1D3FBF] via-[#1D3FBF]/50 to-transparent bg-clip-text text-[clamp(4.5rem,18vw,17rem)] font-bold leading-[0.95] tracking-tight text-transparent">
          Sardar IT
        </span>
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
    <div className="flex min-w-[140px] flex-col items-start">
      <h3 className="mb-6 text-base font-semibold text-white">
        {column.title}
      </h3>
      <ul className="flex flex-col items-start gap-3">
        {column.links.map((link) => {
          const isExternal = link.href.startsWith("http");
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="block text-sm text-white transition-colors hover:text-[#6C8DFF]"
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