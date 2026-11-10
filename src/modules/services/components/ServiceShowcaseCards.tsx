"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
const BG_IMAGE = "image/bg-do.jpg";
const BG_POS_X = "50%";
const BG_POS_Y = "0%";
const BG_SIZE = "cover";
const BG_OPACITY = 0.05;
const FALLBACK_IMAGE = "/images/projects/casa-viva.webp";
interface ShowcaseCardData {
  id: string;
  slug: string;
  panelTitle: string;
  headlinePrefix: string;
  headlineGradient: string;
  description: string;
  href: string;
  images: string[];
}

const SHOWCASE_CARD: ShowcaseCardData = {
  id: "brand-identity",
  slug: "brand-identity",
  panelTitle: "Web Design & Mobile App Development",
  headlinePrefix: "Digital products people actually ",
  headlineGradient: "enjoy using",
  description:
    "We turn complex ideas into clean, frictionless interfaces and scalable design systems that make your brand memorable from day one.",
  href: "/services/brand-identity",
  images: [
    "/images/projects/CASA.webp",
    "/images/services/mobile-dual-mockup.webp",
    "/images/projects/medease.webp",
    "/images/services/showcase-default.webp",
  ],
};

export function ServiceShowcaseCard() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const getImage = (key: string, src: string) => {
    if (failedImages[key]) return FALLBACK_IMAGE;
    const raw = src || FALLBACK_IMAGE;
    return raw.startsWith("http") || raw.startsWith("/") ? raw : `/${raw}`;
  };
  const card = SHOWCASE_CARD;
  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-4 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-16 lg:px-0">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-[#133BD4]">
          <span
            className="inline-block size-1.5 shrink-0 rounded-full bg-[#133BD4]"
            aria-hidden="true"
          />
          <span>What We Do</span>
        </div>
        <h2 className="mt-4 text-3xl font-medium leading-[1.3] tracking-tight text-[#222] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] xl:leading-[1.4]">
          Software &amp; Digital Solutions
          <br className="hidden sm:block" /> Engineered For Global Scale
        </h2>
      </div>
      <div className="relative w-full overflow-hidden bg-[#000E27] pt-8 sm:pt-12 lg:pt-14">
        <div
          className="pointer-events-none absolute inset-0 select-none"
          style={{
            backgroundImage: `url(${BG_IMAGE})`,
            backgroundPosition: `${BG_POS_X} ${BG_POS_Y}`,
            backgroundSize: BG_SIZE,
            backgroundRepeat: "no-repeat",
            opacity: BG_OPACITY,
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-0">
          <div className="flex items-start justify-between gap-4 sm:gap-6 sm:px-9">
            <h3 className="max-w-[75%] text-[26px] font-medium leading-[1.3] tracking-tight text-white sm:max-w-2/3 sm:text-4xl md:max-w-2/4 md:text-5xl lg:text-[60px] lg:leading-[1.4]">
              {card.panelTitle}
            </h3>
            <span className="shrink-0 text-[22px] font-medium leading-[1.4] text-white sm:text-[28px] lg:text-[34px]">
              /01
            </span>
          </div>
          <div className="mt-6 rounded-t-2xl bg-linear-to-b from-[#0a3c8c] to-[#072f6e] px-5 pt-8 sm:mt-10 sm:px-9 sm:pt-10">
            <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-8">
              <p className="flex max-w-65 items-start gap-2 text-[15px] font-normal leading-normal text-white/90">
                <span aria-hidden="true">•</span>
                <span>
                  {card.headlinePrefix}
                  {card.headlineGradient}
                </span>
              </p>

              <Link
                href={card.href}
                className="inline-flex w-fit items-center gap-3 justify-self-start rounded-full bg-white py-1.5 pl-5 pr-1.5 text-[13px] font-medium text-black md:justify-self-center"
              >
                <span>View Details</span>
                <span className="flex size-7 items-center justify-center rounded-full bg-[#133BD4] text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>

              <p className="max-w-full text-xs font-normal leading-[1.7] text-white/90 sm:max-w-md md:max-w-62.5 md:justify-self-end">
                {card.description}
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-2 sm:mt-10 md:mt-13 md:grid-cols-4">
              {card.images.slice(0, 4).map((src, i) => {
                const key = `${card.id}-${i}`;
                return (
                  <div
                    key={key}
                    className="relative h-52 overflow-hidden rounded-t-md bg-white/5 sm:h-72 md:h-64 lg:h-80 xl:h-96"
                  >
                    <Image
                      src={getImage(key, src)}
                      alt={`${card.panelTitle} preview ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [key]: true }))
                      }
                      className="object-cover object-top"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceShowcaseCard;
