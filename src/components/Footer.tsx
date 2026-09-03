import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";
import { footerData, type SocialLink } from "../../src/_mock/footer";

const SOCIAL_ICON_MAP: Record<SocialLink["name"], React.ElementType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
};

export default function Footer() {
  const { brand, cta, socialLinks, navColumns, secondaryColumns, contact } =
    footerData;

  return (
    <footer className="w-full bg-text">
      <div className="container flex w-full max-w-360 flex-col gap-y-14 py-16 md:py-24">
        <div className="flex flex-col items-start justify-between gap-y-12 lg:flex-row lg:gap-x-12">
          <div className="flex basis-full flex-col items-start gap-y-6 lg:basis-1/4 lg:max-w-xs">
            <span className="font-sans text-2xl font-bold tracking-tight text-background">
              {brand.name}
            </span>

            <p className="max-w-70 text-sm leading-relaxed text-text-accent">
              {brand.description}
            </p>

            <Link
              href={cta.href}
              className="group flex items-center gap-x-4 bg-highlight py-2 px-4 text-md font-semibold text-text transition-transform hover:scale-[1.02]"
            >
              {cta.label}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-text text-highlight">
                <FiArrowDown className="h-4 w-4 animate-bounce translate-y-1" strokeWidth={2.5} />
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
                    className="flex h-9 w-9 items-center justify-center border border-(--border)/60 text-background transition-colors hover:bg-background hover:text-text rotate-45 mt-2"
                  >
                    <Icon className="h-3.5 w-3.5 -rotate-45" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col gap-y-12">
            <div className="flex flex-row flex-wrap justify-between gap-x-12 gap-y-10">
              {navColumns.map((column) => (
                <FooterColumnBlock key={column.title} column={column} />
              ))}
            </div>

            <div className="flex flex-row flex-wrap justify-between gap-x-12 gap-y-10">
              {secondaryColumns.map((column) => (
                <FooterColumnBlock key={column.title} column={column} />
              ))}

              <div className="flex basis-full flex-col items-start gap-y-6 sm:basis-[45%] lg:basis-1/4">
                <div className="flex flex-col items-start gap-y-1">
                  <span className="text-sm text-text-accent">
                    {contact.emailLabel}
                  </span>
                  <Link
                    href={`mailto:${contact.email}`}
                    className="text-sm font-semibold text-background transition-colors hover:text-highlight"
                  >
                    {contact.email}
                  </Link>
                </div>

                <div className="flex flex-col items-start gap-y-1">
                  <span className="text-sm text-text-accent">
                    {contact.phoneLabel}
                  </span>
                  <Link
                    href={contact.phoneHref}
                    className="flex items-center gap-x-2 text-sm font-semibold text-background transition-colors hover:text-highlight"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-background">
                      <FaWhatsapp className="h-3 w-3" />
                    </span>
                    {contact.phone}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      <h3 className="mb-4 text-base font-semibold text-background">
        {column.title}
      </h3>
      <ul className="flex flex-col items-start">
        {column.links.map((link) => (
          <li key={link.label} className="mb-3 last:mb-0">
            <Link
              href={link.href}
              className="block text-sm text-text-accent transition-colors hover:text-background"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
