"use client";

import SectionHeader from "../ui/SectionHeader";
import ProjectCardVertical from "../ui/ProjectCardVertical";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <section id="selected-work" className="py-20 md:py-24 flex flex-col gap-12 bg-white text-neutral-900">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader
          tag="Selected Work & Case Studies"
          title="Products we've designed, built, and shipped."
          description="Explore selected case studies that showcase how we build scalable digital solutions from idea to launch."
          ctaText="All Case Studies"
          ctaLink="/works"
          theme="light"
          className="pb-4"
        />
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
