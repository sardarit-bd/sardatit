"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  className?: string;
};

export function Button({
  children,
  onClick,
  href = "",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  if (onClick) {
    return (
      <button
        {...props}
        onClick={onClick}
        className={`inline-flex items-center gap-2 ${type == "button" ? "px-6 md:px-8! py-3.5" : "p-3.5 "}  text-sm md:text-lg! font-medium text-white 
         relative overflow-hidden ${className}`}
        style={{
          background: "linear-gradient(135deg, #203eec 0%, #00d4ff 100%)",
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.div
      initial={{ boxShadow: "0 4px 20px rgba(32, 62, 236, 0.3)" }}
      whileHover={{
        boxShadow:
          "0 8px 30px rgba(32, 62, 236, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)",
      }}
      transition={{ duration: 0.2 }}
      className="inline-block rounded-sm"
    >
      <Link
        href={href}
        className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white rounded-sm relative overflow-hidden bg-[linear-gradient(135deg,#203eec_0%,#00d4ff_100%)] ${className}`}
        // style={{
        //   background: "linear-gradient(135deg, #203eec 0%, #00d4ff 100%)",
        // }}
      >
        {children}
      </Link>
    </motion.div>
  );
}
