import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
interface ProjectCardVerticalProps {
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

export default function ProjectCardVertical({
  eyebrow,
  title,
  description,
  statValue,
  statLabel,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: ProjectCardVerticalProps) {
  return (
    <motion.div
      className="w-full bg-white flex flex-col overflow-hidden border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <div className="relative w-full h-56 md:h-96 overflow-hidden">
        <Image src={imageSrc} alt={imageAlt} width={1000} height={1000} className="object-cover object-center" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-6 md:px-7 py-8 md:py-10">
        <div className="flex flex-col items-start gap-1 max-w-sm">
          <p className="text-xs font-medium text-gray-500">{eyebrow}</p>

          <h3 className="pt-2 text-2xl md:text-3xl font-extrabold leading-tight">
            {title}
          </h3>

          <p className="pt-2.5 text-sm md:text-base font-medium text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
          <span
            className="text-3xl md:text-4xl font-extrabold leading-tight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #203eec 0%, #00d4ff 100%)",
            }}
          >
            {statValue}
          </span>
          <span className="text-sm font-semibold uppercase text-gray-500 md:text-right">
            {statLabel}
          </span>

          <div className="pt-3.5 ">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 text-xs font-semibold hover:bg-gray-50 transition duration-300"
            >
              {ctaLabel}
              <FiArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
