// components/sections/SelectedWorks.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "@/lib/projects";

export function SelectedWorks() {
  return (
    <section id="works" className="py-20 md:py-24 bg-white text-neutral-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="flex flex-col gap-4 max-w-3xl">
            {/* Eyebrow Label with Pulsing Dot Marker */}
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

          <Link
            href="/works"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#203eec] hover:bg-[#1832c7] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 shrink-0"
          >
            <span>All Case Studies</span>
            <span className="flex items-center justify-center size-6 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <FiArrowUpRight className="text-sm text-white" />
            </span>
          </Link>
        </div>

        <div className="relative space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="sticky isolate bg-background rounded-2xl md:rounded-3xl"
              style={{
                top: `${80 + index * 10}px`,
                zIndex: index + 1,
              }}
            >
              <Link href={project.link} className="group block">
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 transition-all duration-300 hover:shadow-xl will-change-transform"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    <div className="relative aspect-16/10 lg:col-span-7 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} mockup`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority={project.priority}
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/95 dark:bg-neutral-900/90 text-neutral-900 dark:text-white backdrop-blur-md shadow-sm border border-neutral-200/80 dark:border-neutral-700/80">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 lg:col-span-5 flex flex-col justify-between h-full gap-6">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          {project.eyebrow}
                        </span>
                        <div className="flex items-center justify-between gap-4 mt-1">
                          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </h3>
                          <FiArrowUpRight className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
                        </div>
                        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs font-medium bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-md border border-neutral-200/70 dark:border-neutral-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
                          <div>
                            <span className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                              {project.statValue}
                            </span>
                            <span className="text-xs text-neutral-500 block uppercase font-medium">
                              {project.statLabel}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                            View Case Study &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
