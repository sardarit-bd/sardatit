"use client";

import React from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export interface SectionHeaderProps {
  tag?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  ctaText?: string;
  ctaLink?: string;
  theme?: "light" | "dark";
  className?: string;

  // Backwards-compatibility props
  title1?: React.ReactNode;
  title2?: React.ReactNode;
  pre?: React.ReactNode;
  link?: string;
  btn?: string;
  isBgWhite?: boolean;
  width?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  description,
  ctaText,
  ctaLink,
  theme,
  className = "",
  title1,
  title2,
  pre,
  link,
  btn,
  isBgWhite,
  width,
}) => {
  // Determine effective theme
  const effectiveTheme: "light" | "dark" =
    theme || (isBgWhite === false ? "dark" : "light");
  const isDark = effectiveTheme === "dark";

  // Determine effective CTA text & link
  const effectiveCtaText = ctaText || btn;
  const effectiveCtaLink = ctaLink || link;

  // Determine effective description
  const effectiveDescription = description !== undefined ? description : pre;

  // Determine effective title
  let effectiveTitle: React.ReactNode = title;
  if (!effectiveTitle && (title1 || title2)) {
    effectiveTitle = (
      <>
        {title1}
        {title2 && (
          <>
            {" "}
            <span className="inline-block">{title2}</span>
          </>
        )}
      </>
    );
  }

  // Format the tag cleanly (stripping any accidental leading bullets/slashes)
  const cleanTag = tag ? tag.replace(/^[•\s/]+/, "").trim().toUpperCase() : "";

  return (
    <div
      className={`w-full flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 ${
        isDark ? "dark" : ""
      } ${className}`}
    >
      <div className={`flex flex-col ${width || "max-w-3xl"}`}>
        {/* Eyebrow Tag: Dot indicator + uppercase monospace tag (• / CATEGORY_NAME) */}
        {cleanTag && (
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-500 font-semibold flex items-center gap-2">
            <span
              className="size-2 rounded-full bg-blue-500 inline-block shrink-0"
              aria-hidden="true"
            />
            <span className="sr-only">•</span>
            <span>/ {cleanTag}</span>
          </div>
        )}

        {/* Main Heading: Sentence/Title Case with unified tracking */}
        {effectiveTitle && (
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] ${
              cleanTag ? "mt-3" : ""
            } ${isDark ? "text-white" : "text-neutral-900"}`}
          >
            {effectiveTitle}
          </h2>
        )}

        {/* Subtitle / Description */}
        {effectiveDescription && (
          <p
            className={`text-base sm:text-lg ${
              width ? "max-w-none" : "max-w-2xl"
            } font-normal leading-relaxed mt-4 ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            {effectiveDescription}
          </p>
        )}
      </div>

      {/* Standardized Section Action Button */}
      {effectiveCtaText && effectiveCtaLink && (
        <div className="shrink-0 flex items-center md:self-end">
          <Link
            href={effectiveCtaLink}
            className={`group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm border transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-sm shrink-0 ${
              isDark
                ? "bg-white text-neutral-900 border-white hover:bg-neutral-100"
                : "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800"
            }`}
          >
            <span>{effectiveCtaText}</span>
            <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
