'use client";';
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
interface ProjectCardProps {
  eyebrow: string;
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export default function ProjectCard({
  eyebrow,
  title,
  description,
  statValue,
  statLabel,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: ProjectCardProps) {
  return (
    <motion.div
      className="w-full bg-white border border-gray-200 flex flex-col-reverse md:flex-row justify-center items-stretch gap-8 overflow-hidden "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <div className="lg:w-1/2 flex flex-col justify-between items-start gap-6 pl-6 md:pl-10 py-8 md:py-10">
        <div className="flex flex-col items-start gap-1 w-full">
          <p className="text-xs font-medium text-muted">{eyebrow}</p>

          <h3 className="pt-3 text-3xl md:text-4xl font-extrabold leading-tight">
            {title}
          </h3>

          <p className="pt-4 text-base pr-2 md:text-lg text-gray-600 leading-relaxed">
            {description}
          </p>

          <div className="pt-6 flex items-end gap-3">
            <span
              className="text-3xl md:text-4xl font-extrabold leading-tight bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #203eec 0%, #00d4ff 100%)",
              }}
            >
              {statValue}
            </span>
            <span className="pb-1 text-sm font-semibold uppercase text-muted">
              {statLabel}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-sm border border-gray-200 text-xs font-semibold hover:bg-gray-50 transition duration-300"
          >
            {ctaLabel}
            <FiArrowRight size={12} />
          </a>
        </div>
      </div>

      <div className="relative w-full md:w-1/2 h-64 md:h-96 shrink-0 overflow-hidden">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>
    </motion.div>
  );
}
