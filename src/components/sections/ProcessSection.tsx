"use client";

import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

const projects = [
  {
    category: "E-commerce platform",
    title: "Kodezi",
    description:
      "We shipped Kodezi's website and product experience that markets, evolves, and grows modern codebases for developers.",
    metric: "$1.8M",
    metricLabel: "SEED FUNDED",
    metricColor: "text-yellow-600",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    imagePosition: "right",
    featured: true,
  },
  {
    category: "Fashion e-commerce",
    title: "Off-White",
    description:
      "We designed Off-White to provide a fast journey from homepage to checkout, creating a great ecommerce experience.",
    metric: "+28%",
    metricLabel: "CONVERSION UPLIFT",
    metricColor: "text-orange-600",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
    imagePosition: "top",
    featured: false,
  },
  {
    category: "SaaS platform",
    title: "Tourmated",
    description:
      "We partnered with Tourmated to redesign their web application for federations, clubs, and athletes.",
    metric: "+750k",
    metricLabel: "FUNDING RAISED",
    metricColor: "text-orange-600",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    imagePosition: "top",
    featured: false,
  },
  {
    category: "Audio app",
    title: "CallAi",
    description:
      "We designed CallAi from the ground up: a no-code platform that lets any business build AI voice agents, automate phone call workflows, and never miss a lead again.",
    metric: "40%",
    metricLabel: "DEV HANDOFF FASTER",
    metricColor: "text-red-600",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    imagePosition: "right",
    featured: true,
  },
  {
    category: "Smart mobility",
    title: "Rooda",
    description:
      "We built Rooda from scratch to solve urban transport issues by combining car rides, electric scooter rentals, a bus map.",
    metric: "+28%",
    metricLabel: "SAVES EACH RIDE",
    metricColor: "text-green-600",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
    imagePosition: "top",
    featured: false,
  },
  {
    category: "Accounting software",
    title: "Spacebook",
    description:
      "We designed Spacebook SaaS to make accounting tasks cleaner, faster, and easier to complete for a better user experience.",
    metric: "+35%",
    metricLabel: "HIGHER USER RETENTION",
    metricColor: "text-yellow-600",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
    imagePosition: "top",
    featured: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

function FeaturedCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="rounded-2xl bg-[#fefdf5] border border-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div
        className={`flex flex-col ${
          project.imagePosition === "right"
            ? "lg:flex-row"
            : "lg:flex-row-reverse"
        }`}
      >
        {/* Text Content */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <p className="text-sm font-medium text-gray-500 mb-2">
            {project.category}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {project.title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mb-6">
            <p
              className={`text-3xl sm:text-4xl font-bold ${project.metricColor} mb-1`}
            >
              {project.metric}
            </p>
            <p className="text-sm font-semibold text-gray-700">
              {project.metricLabel}
            </p>
          </div>

          <button className="flex items-center bg-blue-500 text  gap-2 text-white py-4 cursor-pointer hover:bg-blue-400 px-3 rounded-2xl font-semibold hover:gap-3 transition-all self-start">
            Read case study
          </button>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

function StandardCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="bg-[#fefdf5] rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <p className="text-sm font-medium text-gray-500 mb-2">
          {project.category}
        </p>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex items-start justify-between mb-4">
          <div>
            <p
              className={`text-2xl sm:text-3xl font-bold ${project.metricColor} mb-0.5`}
            >
              {project.metric}
            </p>
            <p className="text-xs font-semibold text-gray-700">
              {project.metricLabel}
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 text-gray-900 font-semibold text-sm hover:gap-3 transition-all">
          Read case study
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const standardProjects = projects.filter((p) => !p.featured);

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-12 gap-4"
        >
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">
              SELECTED WORK
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 max-w-xl">
              Products we've designed, built, and shipped.
            </h2>
          </div>
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 cursor-pointer transition-colors self-start md:self-auto">
            See all case studies →
          </button>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-6 sm:space-y-8">
          {featuredProjects.map((project, index) => (
            <FeaturedCard key={project.title} project={project} index={index} />
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {standardProjects.map((project, index) => (
              <StandardCard
                key={project.title}
                project={project}
                index={index + featuredProjects.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
