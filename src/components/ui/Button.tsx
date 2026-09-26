"use client";

import React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

/**
 * Standardized Sardar IT Design System Button Component
 * - Primary Brand Color: #133BD4 (hover #0f2eb0)
 * - Geometry: rounded-full
 */
export function Button({
  children,
  onClick,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-base sm:text-lg",
  };

  const variantStyles = {
    primary:
      "bg-[#133BD4] hover:bg-[#0f2eb0] text-white shadow-md shadow-[#133BD4]/25 hover:shadow-lg hover:shadow-[#133BD4]/35",
    secondary:
      "bg-neutral-900 hover:bg-black text-white shadow-md",
    outline:
      "border border-neutral-300 text-neutral-800 hover:border-[#133BD4]/60 hover:text-[#133BD4] hover:bg-blue-50/40",
    ghost:
      "text-neutral-700 hover:text-[#133BD4] hover:bg-blue-50/50",
  };

  const baseStyles = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {children}
    </button>
  );
}

export default Button;
