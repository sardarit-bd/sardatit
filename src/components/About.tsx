// components/sections/About.tsx
"use client";

import { SectionTitle } from "../components/ui/SectionTitle";
import { AnimatedStat } from "../components/ui/AnimatedStat";

const skills = [
  "AI Product Design",
  "Vibe Coding",
  "v0 by Vercel",
  "Prompt Engineering",
  "Midjourney/DALL-E",
  "ChatGPT/Claude",
  "Figma AI",
  "Design Systems",
  "Generative UI",
];

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "50+", label: "AI Projects" },
  { value: "30+", label: "Happy Clients" },
];

export function About() {
  return (
    <section
      id="about"
      className="py-20 border-border border-t-0 md:py-10 md:pb-32 md:pt-32"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div>
            <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              Bridging AI Technology & Human-Centered Design
            </SectionTitle>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              I&apos;m an AI Digital Product Designer specializing in vibe
              coding and generative design. I leverage cutting-edge AI tools
              like v0, Midjourney, and Claude to rapidly prototype and build
              production-ready experiences.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              My approach combines prompt engineering mastery, AI-powered design
              workflows, and deep understanding of LLMs to create products that
              feel intuitive and magical. I believe AI should amplify
              creativity, not replace it.
            </p>
          </div>

          {/* Right Content */}
          <div>
            {/* Skills */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-secondary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {stats.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
