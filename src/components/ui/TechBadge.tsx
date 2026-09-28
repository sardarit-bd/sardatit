import React from "react";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiPython,
  SiFastapi,
  SiDocker,
  SiRedis,
  SiMongodb,
  SiExpo,
  SiExpress,
  SiStripe,
  SiFigma,
  SiCloudinary,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbCode, TbShieldCheck } from "react-icons/tb";

export interface TechConfig {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

export function getTechConfig(name: string): TechConfig {
  const normalized = name.trim().toLowerCase();

  if (normalized.includes("next")) {
    return { icon: SiNextdotjs, color: "#111827" };
  }
  if (normalized.includes("typescript") || normalized === "ts") {
    return { icon: SiTypescript, color: "#3178C6" };
  }
  if (normalized.includes("tailwind")) {
    return { icon: SiTailwindcss, color: "#06B6D4" };
  }
  if (normalized.includes("node")) {
    return { icon: SiNodedotjs, color: "#5FA04E" };
  }
  if (normalized.includes("postgres") || normalized.includes("psql")) {
    return { icon: SiPostgresql, color: "#4169E1" };
  }
  if (normalized.includes("react native")) {
    return { icon: SiReact, color: "#61DAFB" };
  }
  if (normalized.includes("react")) {
    return { icon: SiReact, color: "#61DAFB" };
  }
  if (normalized.includes("fastapi")) {
    return { icon: SiFastapi, color: "#009688" };
  }
  if (normalized.includes("python")) {
    return { icon: SiPython, color: "#3776AB" };
  }
  if (normalized.includes("docker")) {
    return { icon: SiDocker, color: "#2496ED" };
  }
  if (normalized.includes("redis")) {
    return { icon: SiRedis, color: "#FF4438" };
  }
  if (
    normalized.includes("aws") ||
    normalized.includes("amazon") ||
    normalized.includes("s3")
  ) {
    return { icon: FaAws, color: "#FF9900" };
  }
  if (normalized.includes("mongo")) {
    return { icon: SiMongodb, color: "#47A248" };
  }
  if (normalized.includes("expo")) {
    return { icon: SiExpo, color: "#111827" };
  }
  if (normalized.includes("express")) {
    return { icon: SiExpress, color: "#111827" };
  }
  if (normalized.includes("stripe")) {
    return { icon: SiStripe, color: "#635BFF" };
  }
  if (
    normalized.includes("design system") ||
    normalized.includes("figma") ||
    normalized.includes("ui/ux")
  ) {
    return { icon: SiFigma, color: "#F24E1E" };
  }
  if (normalized.includes("cloudinary")) {
    return { icon: SiCloudinary, color: "#3448C5" };
  }
  if (normalized.includes("better auth") || normalized.includes("auth")) {
    return { icon: TbShieldCheck, color: "#111827" };
  }

  return { icon: TbCode, color: "#6B7280" };
}

export default function TechBadge({
  tech,
  className = "",
}: {
  tech: string;
  className?: string;
}) {
  const { icon: Icon, color } = getTechConfig(tech);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-700 bg-neutral-100/90 hover:bg-neutral-200/80 border border-neutral-200/60 rounded-md transition-colors ${className}`}
    >
      <Icon
        className="w-3.5 h-3.5 shrink-0"
        style={{ color }}
        aria-hidden="true"
      />
      <span>{tech}</span>
    </span>
  );
}
