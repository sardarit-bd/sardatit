// components/ui/ImageTextCard.tsx
"use client";

import Image from "next/image";

interface ImageTextCardProps {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function ImageTextCard({
  image,
  eyebrow,
  title,
  subtitle,
  className = "",
}: ImageTextCardProps) {
  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] ${className}`}
    >
      <Image src={image} alt={title} fill className="object-cover" />
      {/* dark shade for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-end gap-1 p-6 text-center text-white">
        {eyebrow && (
          <span className="text-xs font-medium uppercase tracking-wider text-white/80">
            {eyebrow}
          </span>
        )}
        <p className="text-lg font-semibold leading-tight">{title}</p>
        {subtitle && <p className="text-xs text-white/80">{subtitle}</p>}
      </div>
    </div>
  );
}
