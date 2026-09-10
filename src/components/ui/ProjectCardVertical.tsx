"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export interface ProjectCardVerticalProps {
  title: string;
  category?: string;
  eyebrow?: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  tags?: string[];
  ctaHref: string;
  ctaLabel?: string;
  statValue?: string;
  statLabel?: string;
  priority?: boolean;
}

export default function ProjectCardVertical({
  title,
  category,
  eyebrow,
  description,
  imageSrc,
  imageAlt,
  tags = [],
  ctaHref,
  ctaLabel = "View Case Study",
  statValue,
  statLabel,
  priority = false,
}: ProjectCardVerticalProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 transition-all duration-300 hover:shadow-xl"
    >
      {/* Visual Mockup Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-200/60 dark:bg-neutral-800/60">
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Category Pill Over Mockup */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          {category && (
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-white/95 dark:bg-neutral-900/90 text-neutral-900 dark:text-white backdrop-blur-md shadow-sm border border-neutral-200/80 dark:border-neutral-700/80">
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 justify-between p-6 md:p-7 gap-6">
        <div className="flex flex-col items-start gap-2">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {eyebrow}
            </span>
          )}

          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <Link href={ctaHref} className="focus:outline-none focus:underline">
              {title}
            </Link>
          </h3>

          <p className="text-sm md:text-base font-normal text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
            {description}
          </p>

          {/* Tech Stack Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/70 dark:border-neutral-700/70 shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Stat Value & CTA Button */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200/80 dark:border-neutral-800 gap-4">
          {statValue ? (
            <div className="flex flex-col">
              <span
                className="text-2xl md:text-3xl font-extrabold leading-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #203eec 0%, #00d4ff 100%)",
                }}
              >
                {statValue}
              </span>
              {statLabel && (
                <span className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                  {statLabel}
                </span>
              )}
            </div>
          ) : (
            <div />
          )}

          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-900 dark:text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600 transition-all duration-200 shadow-2xs group/btn"
          >
            <span>{ctaLabel}</span>
            <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
