"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";
const FALLBACK_IMAGE = "/images/projects/casa-viva.webp";
const featuredIds = ["medease", "casa-viva", "retirement-waypoint"];
const featuredProjects: Project[] = featuredIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is Project => Boolean(p));

interface FeaturedCardProps {
  project: Project;
  wide?: boolean;
  priority?: boolean;
}

function FeaturedCard({
  project,
  wide = false,
  priority = false,
}: FeaturedCardProps) {
  const [hasError, setHasError] = useState(false);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const raw = project.mockup || project.image || FALLBACK_IMAGE;
  const normalized =
    raw.startsWith("http") || raw.startsWith("/") ? raw : `/${raw}`;
  const src = hasError ? FALLBACK_IMAGE : normalized;
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bubble = bubbleRef.current;
    if (!bubble) return;
    const rect = e.currentTarget.getBoundingClientRect();
    bubble.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0) translate(-50%, -50%)`;
  };

  return (
    <Link
      href={project.link}
      className={`group block ${wide ? "md:col-span-2" : ""}`}
    >
      <div
        onMouseMove={handleMove}
        className={`relative w-full overflow-hidden rounded-md bg-neutral-900 ${
          wide ? "aspect-16/11 md:aspect-524/233" : "aspect-256/209"
        }`}
      >
        <Image
          src={src}
          alt={`${project.title} - ${project.eyebrow}`}
          fill
          sizes={
            wide
              ? "(max-width: 1350px) 100vw, 1350px"
              : "(max-width: 768px) 100vw, 50vw"
          }
          priority={priority}
          onError={() => setHasError(true)}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        <span className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
          {project.category}
        </span>

        <span
          ref={bubbleRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 hidden size-20 flex-col items-center justify-center gap-0.5 rounded-full border border-white/30 bg-white/25 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 md:flex"
        >
          <FiArrowUpRight className="text-lg" />
          Details
        </span>
      </div>

      <h3 className="mt-4 text-base font-medium leading-snug tracking-normal text-white sm:text-lg">
        {project.title} - {project.eyebrow}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-xs font-normal leading-relaxed text-neutral-400 sm:text-sm">
        {project.description}
      </p>
    </Link>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="selected-work"
      className="relative w-full scroll-mt-28 bg-black py-14 text-white lg:py-24"
      aria-label="Selected Work and Case Studies Chapter Showcase"
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.08em] text-white">
              <span
                className="inline-block size-1.5 shrink-0 rounded-full bg-white"
                aria-hidden="true"
              />
              <span>Featured Works &amp; Case Studies</span>
            </div>
            <h2 className="mt-5 text-3xl font-medium leading-[1.3] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Featured Work &amp; Real-World
              <br className="hidden sm:block" /> Case Studies
            </h2>
          </div>

          <Link
            href="/services"
            className="group/btn inline-flex w-fit items-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all duration-300 hover:bg-neutral-200"
          >
            <span>Explore Services</span>
            <span className="flex size-8 items-center justify-center rounded-full bg-[#133BD4] text-white">
              <FiArrowUpRight className="text-base transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </span>
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 md:mt-12 md:grid-cols-2 md:gap-x-6 lg:mt-14">
          {featuredProjects.map((project, index) => (
            <FeaturedCard
              key={project.id}
              project={project}
              wide={index === 2}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
