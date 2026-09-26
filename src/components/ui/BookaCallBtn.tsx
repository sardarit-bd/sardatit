"use client";

import React from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export interface BookaCallBtnProps {
  text?: string;
  variant?: "hero" | "scrolled" | "brand" | "white";
  isScrolled?: boolean;
  className?: string;
}

export const BookaCallBtn: React.FC<BookaCallBtnProps> = ({
  text = "Book a call",
  variant,
  isScrolled,
  className = "",
}) => {
  // Resolve effective variant:
  // If explicit variant is provided, use it.
  // Otherwise, if isScrolled is boolean: true -> "scrolled", false -> "hero".
  // Default fallback: "scrolled" (official brand blue).
  const resolvedVariant =
    variant ||
    (typeof isScrolled === "boolean"
      ? isScrolled
        ? "scrolled"
        : "hero"
      : "scrolled");

  const isHero = resolvedVariant === "hero" || resolvedVariant === "white";

  const baseStyles = isHero
    ? "bg-white text-neutral-950 font-semibold hover:bg-neutral-100 shadow-md shadow-black/10 border border-transparent"
    : "bg-[#133BD4] hover:bg-[#0f2eb0] text-white shadow-md shadow-[#133BD4]/20 border border-transparent";

  const badgeStyles = isHero
    ? "bg-neutral-950/10 text-neutral-950 group-hover:bg-[#133BD4] group-hover:text-white"
    : "bg-white/20 text-white group-hover:bg-white group-hover:text-[#133BD4]";

  return (
    <Link
      href="/contact"
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out cursor-pointer group hover:scale-[1.02] active:scale-[0.98] ${baseStyles} ${className}`}
    >
      <span>{text}</span>
      <span
        className={`flex items-center justify-center size-5 rounded-full transition-colors duration-200 ${badgeStyles}`}
      >
        <FiArrowUpRight className="text-xs transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </Link>
  );
};

export default BookaCallBtn;
