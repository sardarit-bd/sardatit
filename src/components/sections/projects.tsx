"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import ProjectCardVertical from "../ui/ProjectCardVertical";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <section id="selected-work" className="py-20 md:py-24 flex flex-col gap-12 bg-white text-neutral-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
          <div className="flex flex-col gap-4 max-w-3xl">
            {/* Eyebrow Label with Pulsing Dot Marker in Brand Accent */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-widest uppercase text-[#203eec]">
              <span className="size-2 rounded-full bg-[#203eec] shadow-[0_0_8px_rgba(32,62,236,0.5)] inline-block shrink-0 animate-pulse" />
              <span>/ SELECTED WORK &amp; CASE STUDIES</span>
            </div>

            {/* High-Contrast Near-Black Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]">
              Products we&apos;ve designed, built, and shipped.
            </h2>

            {/* Medium-Gray Readable Paragraph */}
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
              Explore selected case studies that showcase how we build scalable digital solutions from idea to launch.
            </p>
          </div>

          {/* Pill-Rounded Accent Button */}
          <div className="shrink-0">
            <Link
              href="/works"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#203eec] hover:bg-[#1832c7] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>All Case Studies</span>
              <span className="flex items-center justify-center size-6 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <FiArrowUpRight className="text-sm text-white" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCardVertical
              key={project.id}
              title={project.title}
              category={project.category}
              eyebrow={project.eyebrow}
              description={project.description}
              imageSrc={project.image}
              imageAlt={`${project.title} - ${project.eyebrow}`}
              tags={project.tags}
              ctaHref={project.link}
              ctaLabel={project.ctaLabel || "View Case Study"}
              statValue={project.statValue}
              statLabel={project.statLabel}
              priority={project.priority}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
