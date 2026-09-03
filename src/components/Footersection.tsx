"use client";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
const tokens = {
  "--color-white-solid": "#ffffff",
  "--color-white-10": "rgba(255, 255, 255, 0.1)",
  "--color-white-0": "rgba(255, 255, 255, 0)",
} as CSSProperties;

type FooterRow = {
  label: string;
  links: string[];
};

const FOOTER_ROWS: FooterRow[] = [
  { label: "Security", links: ["Security"] },
  { label: "Legal", links: ["Privacy"] },
  { label: "Contact", links: ["Support Form"] },
];

const SOCIAL_LINKS = ["Linkedin", "X"];

function Slash() {
  return (
    <div className="relative h-4 w-6">
      <span className="absolute left-2.5 -top-px font-['Roboto'] text-xs font-normal leading-4 text-(--color-white-solid) opacity-70">
        /
      </span>
    </div>
  );
}
interface TextClipLetterProps {
  letter: string;
  index: number;
  //   totalLetters: number;
}

function TextClipLetter({ letter, index }: TextClipLetterProps) {
  //   const positionPercent = (index / (totalLetters - 1)) * 100;

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="inline-block"
      //   style={{
      //     backgroundImage: `url(${teamCompositeImage})`,
      //     backgroundSize: "fit",
      //     backgroundPosition: `${positionPercent}% center`,
      //     WebkitBackgroundClip: "text",
      //     backgroundClip: "text",
      //     WebkitTextFillColor: "transparent",
      //     color: "transparent",
      //   }}
    >
      {letter}
    </motion.span>
  );
}
function FooterRowItem({ row }: { row: FooterRow }) {
  return (
    <div className="inline-flex w-full items-end justify-start gap-2.5 self-stretch">
      <span className="font-['Roboto'] text-base font-medium leading-4 text-(--color-white-solid)">
        {row.label}
      </span>

      <div
        className="h-0.5 flex-1"
        style={{
          background:
            "radial-gradient(circle, var(--color-white-10) 19%, var(--color-white-0) 19%)",
        }}
      />

      <div className="flex items-end justify-start">
        {row.links.map((link, i) => (
          <div key={link} className="flex items-end">
            <a
              href="#"
              className="font-['Roboto'] text-base font-normal leading-4 text-(--color-white-solid) opacity-70 hover:opacity-100"
            >
              {link}
            </a>
            {i < row.links.length - 1 && <Slash />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FooterSection() {
  const year = 2026;
  const word = "sardar it";
  return (
    <section
      className="w-full "
      style={{
        background: "linear-gradient(175deg, #203eec 0%, #00d4ff 100%)",
      }}
    >
      <footer
        style={tokens}
        className="mx-auto flex w-full container flex-col items-start justify-start
                  px-6 pb-16 sm:px-12 md:px-20 lg:px-28 lg:pb-40 "
      >
        <div className="flex w-full container flex-col items-start justify-start gap-16 md:gap-24">
          <div className="inline-flex w-full items-center justify-center pt-16 lg:pt-28">
            <div className="flex flex-1 flex-col items-start justify-start gap-5">
              {FOOTER_ROWS.map((row) => (
                <FooterRowItem key={row.label} row={row} />
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-start justify-center pt-8">
            <div className="relative  w-full self-stretch overflow-hidden">
              {/* <div className="absolute left-0 top-0 h-72 w-full" /> */}
              <h1 className="text-6xl font-semibold md:text-[16.5rem] leading-[1.1] uppercase text-white">
                {word.split("").map((letter, index) => (
                  <TextClipLetter key={index} letter={letter} index={index} />
                ))}
              </h1>
            </div>
          </div>

          <div className="inline-flex w-full flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center justify-start gap-6">
              <div className="flex items-center justify-start gap-1.5">
                <span className="font-['Roboto'] text-sm font-semibold leading-4 text-(--color-white-solid)">
                  Endex
                </span>
              </div>
              <span className="font-['Roboto'] text-xs font-normal leading-4 tracking-tight text-(--color-white-solid) opacity-70">
                Endex {year}. All Rights Reserved
              </span>
            </div>

            <div className="flex items-start justify-start">
              {SOCIAL_LINKS.map((social, i) => (
                <div key={social} className="flex items-stretch">
                  <a
                    href="#"
                    className="self-stretch font-['Roboto'] text-base font-normal leading-4 text-(--color-white-solid) opacity-70 hover:opacity-100"
                  >
                    {social}
                  </a>
                  {i < SOCIAL_LINKS.length - 1 && <Slash />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
