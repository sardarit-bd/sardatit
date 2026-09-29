"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { projects as baseProjects } from "@/data/projects";
import { Project } from "@/types/project";
import TechBadge from "@/components/ui/TechBadge";
import { getGlobalLenis } from "@/lib/lenis";

// Dedicated project list for the Work page portfolio grid (sourced from @/data/projects)
const allWorkProjects: Project[] = baseProjects;

const CATEGORIES = [
  "All",
  "Web Development",
  "Full-Stack SaaS",
  "Mobile Apps",
  "UI/UX Design",
  "AI Solutions",
] as const;

type CategoryFilter = (typeof CATEGORIES)[number];

const ITEMS_PER_PAGE = 6;

export default function WorkProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gridTopRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const filterMatches = (project: Project, filter: CategoryFilter): boolean => {
    if (filter === "All") return true;
    if (filter === "Web Development") {
      return (
        project.category === "Web Development" ||
        project.badgeCategory === "Full-Stack SaaS" ||
        project.category === "FinTech & EdTech Platform"
      );
    }
    if (filter === "Full-Stack SaaS") {
      return (
        project.badgeCategory === "Full-Stack SaaS" ||
        project.category === "Full-Stack SaaS" ||
        project.category === "FinTech & EdTech Platform"
      );
    }
    if (filter === "Mobile Apps") {
      return project.category === "Mobile App" || project.category === "Mobile Apps";
    }
    if (filter === "UI/UX Design") {
      return (
        project.category === "UI/UX Design" ||
        project.category === "Web Design" ||
        project.tags.some(
          (t) =>
            t.toLowerCase().includes("ui") ||
            t.toLowerCase().includes("ux") ||
            t.toLowerCase().includes("design")
        )
      );
    }
    return project.category.toLowerCase() === filter.toLowerCase();
  };

  const filteredProjects = useMemo(() => {
    return allWorkProjects.filter((p) => filterMatches(p, activeCategory));
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const topElement =
        document.getElementById("projects-grid-top") || gridTopRef.current;
      if (!topElement) return;

      const lenis = getGlobalLenis();
      if (lenis) {
        lenis.scrollTo(topElement, {
          offset: -80,
          immediate: false,
          duration: 0.9,
          lock: false,
        });
      } else {
        const topOffset =
          topElement.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: Math.max(0, topOffset),
          behavior: "smooth",
        });
      }
    }, 50);
  };

  const getPaginationItems = (): (number | "...")[] => {
    const items: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        items.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        items.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return items;
  };

  const getCategoryCount = (cat: CategoryFilter): number => {
    return allWorkProjects.filter((p) => filterMatches(p, cat)).length;
  };

  return (
    <section
      id="portfolio-grid"
      className="relative w-full bg-white text-neutral-900 pb-20 md:pb-28"
      aria-label="Selected Works & Case Studies Grid"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* =========================================================================
            1. HEADER & CATEGORY FILTER BAR
           ========================================================================= */}
        <div className="flex flex-col gap-6 md:gap-8 pb-10 md:pb-12 border-b border-neutral-200/80">
          {/* Eyebrow & Live Projects Count */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#133BD4] uppercase font-semibold flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-[#133BD4] inline-block shrink-0 animate-pulse"
                aria-hidden="true"
              />
              <span>/ SELECTED WORK &amp; CASE STUDIES</span>
            </div>
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              {allWorkProjects.length} Verified Production Cases
            </span>
          </div>

          {/* Section Title & Subtitle */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.1]">
              Selected Works &amp; Case Studies
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
              Explore Sardar IT’s battle-tested digital products across clinical healthcare
              portals, luxury real estate platforms, autonomous AI workflows, and enterprise
              learning systems.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="pt-2">
            <div
              role="tablist"
              aria-label="Filter case studies by discipline"
              className="flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const count = getCategoryCount(cat);

                return (
                  <button
                    key={cat}
                    role="tab"
                    id={`filter-tab-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    aria-selected={isActive}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`cursor-pointer inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 select-none ${
                      isActive
                        ? "bg-[#133BD4] text-white rounded-full px-5 py-2 shadow-sm"
                        : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full px-5 py-2 transition-colors"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold transition-colors ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-neutral-200/80 text-neutral-600 group-hover:bg-neutral-300"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            STATIC TOP ANCHOR FOR UNIFIED ASYNC SCROLL
           ========================================================================= */}
        <div id="projects-grid-top" ref={gridTopRef} className="scroll-mt-28" />

        {/* =========================================================================
            2. RESPONSIVE 2-COLUMN PROJECTS GRID
           ========================================================================= */}
        <div className="pt-10 md:pt-14">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {paginatedProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: Math.min(index * 0.05, 0.2),
                  }}
                  className="group relative flex flex-col justify-between bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-5 rounded-none overflow-hidden"
                >
                  {/* Balanced 4-Corner Tech Accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#133BD4] opacity-70 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all duration-300 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#133BD4] opacity-70 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all duration-300 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#133BD4] opacity-70 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all duration-300 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#133BD4] opacity-70 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all duration-300 pointer-events-none" />

                  {/* Top Media / Mockup Area */}
                  <div className="relative w-full aspect-[16/10] bg-[#eef2ff] overflow-hidden rounded-none border border-neutral-100 flex items-center justify-center p-3 sm:p-5">
                    <Link
                      href={project.link}
                      aria-label={`Open case study: ${project.title}`}
                      className="relative block w-full h-full"
                    >
                      <Image
                        src={project.mockup || project.image}
                        alt={`${project.title} - ${project.eyebrow || project.category}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                        priority={index < 2}
                        className="object-contain transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-sm"
                      />

                      {/* Overlays */}
                      {/* Top-Left: Category badge */}
                      <div className="absolute top-4 left-4 z-10 pointer-events-none">
                        <span className="px-3 py-1 bg-white/95 text-neutral-800 text-xs font-semibold border border-neutral-200/60 rounded-none shadow-xs">
                          {project.badgeCategory || project.category}
                        </span>
                      </div>

                      {/* Top-Right: Year badge with live status indicator */}
                      <div className="absolute top-4 right-4 z-10 pointer-events-none">
                        <span className="px-3 py-1 bg-neutral-950/85 text-white text-xs font-medium flex items-center gap-1.5 rounded-none backdrop-blur-xs">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{project.year || "2025"}</span>
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Card Body */}
                  <div className="pt-6 pb-2 flex flex-col gap-3 flex-grow">
                    {/* Category Subheading & Live Link */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#133BD4]">
                        {project.eyebrow || project.badgeCategory || project.category}
                      </span>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-medium text-neutral-400 hover:text-neutral-700 flex items-center gap-1 transition-colors"
                        >
                          <span>Live App</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-black text-neutral-900 tracking-tight hover:text-[#133BD4] transition-colors leading-tight">
                      <Link href={project.link}>{project.title}</Link>
                    </h2>

                    {/* Summary */}
                    <p className="text-sm leading-relaxed text-neutral-500 line-clamp-3">
                      {project.summary || project.description}
                    </p>

                    {/* Tech Stack Tags with Vector Icons */}
                    {(project.techStack || project.tags) && (project.techStack || project.tags).length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {(project.techStack || project.tags).map((tag) => (
                          <TechBadge key={tag} tech={tag} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer & Global Brand Button Reuse */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    {/* Metric Display (Left) */}
                    <div className="flex items-baseline">
                      <span className="text-2xl font-black text-neutral-950">
                        {project.metrics?.value || project.statValue}
                      </span>
                      <span className="text-[11px] font-semibold text-neutral-400 tracking-wider ml-2 uppercase">
                        {project.metrics?.label || project.statLabel}
                      </span>
                    </div>

                    {/* Action Button (Right) */}
                    <Link
                      href={project.link}
                      className="rounded-full bg-[#133BD4] text-white hover:bg-[#0e2ba3] shadow-sm px-6 py-2.5 text-xs font-bold flex items-center gap-2 transition-all duration-300 group/btn shrink-0"
                    >
                      <span>View Case Study</span>
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State Fallback (Graceful edge case) */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-neutral-50 rounded-none border border-dashed border-neutral-300">
              <p className="text-lg font-semibold text-neutral-700">
                No case studies found for &ldquo;{activeCategory}&rdquo;.
              </p>
              <p className="text-sm text-neutral-500 mt-2">
                Try selecting &ldquo;All&rdquo; to view all enterprise projects.
              </p>
              <button
                type="button"
                onClick={() => handleCategoryChange("All")}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#133BD4] text-white text-sm font-semibold shadow-sm hover:bg-[#0e2ba3] transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* =========================================================================
              3. PAGINATION CONTROLS
             ========================================================================= */}
          {totalPages > 1 && (
            <nav
              aria-label="Portfolio pagination"
              className="mt-16 flex items-center justify-center gap-2 sm:gap-3 select-none"
            >
              {/* Previous Page Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed bg-neutral-100 text-neutral-400 pointer-events-none"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 cursor-pointer shadow-xs active:scale-95"
                }`}
              >
                <FiChevronLeft className="text-base" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Page Number Indicators */}
              <div className="flex items-center gap-1.5">
                {getPaginationItems().map((item, idx) => {
                  if (item === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-10 h-10 flex items-center justify-center text-neutral-400 font-medium text-sm select-none"
                      >
                        ...
                      </span>
                    );
                  }

                  const isActive = item === currentPage;
                  return (
                    <button
                      key={`page-${item}`}
                      type="button"
                      onClick={() => handlePageChange(item)}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={`Go to page ${item}`}
                      className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#133BD4] text-white shadow-md active:scale-95"
                          : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 shadow-2xs active:scale-95"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              {/* Next Page Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 ${
                  currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed bg-neutral-100 text-neutral-400 pointer-events-none"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 cursor-pointer shadow-xs active:scale-95"
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <FiChevronRight className="text-base" />
              </button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
