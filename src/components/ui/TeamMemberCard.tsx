"use client";

import Image from "next/image";
import { motion } from "framer-motion";
// import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

interface TeamMemberCardProps {
  name: string;
  imageSrc: string;
  facebookHref?: string;
  linkedinHref?: string;
}

export function TeamMemberCard({
  name,
  imageSrc,
  // facebookHref,
  // linkedinHref,
}: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex w-full flex-col items-center"
    >
      <div className="w-full rounded-2xl flex justify-center items-center p-3">
        <motion.div
          initial={{ rotate: 10 }}
          whileInView={{ rotate: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative aspect-square w-full overflow-hidden rounded-xl"
        >
          <Image src={imageSrc} alt={name} fill className="object-cover" />
        </motion.div>
      </div>

      <p className="pt-4 text-2xl font-semibold text-text  w-full text-center">
        {name}
      </p>

      {/* <div className="flex items-center gap-3 pt-2">
        {facebookHref && (
          <a
            href={facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on Facebook`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border/40 text-text hover:opacity-70 transition duration-300"
          >
            <FaFacebookF size={12} />
          </a>
        )}
        {linkedinHref && (
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border/40 text-text hover:opacity-70 transition duration-300"
          >
            <FaLinkedinIn size={12} />
          </a>
        )}
      </div> */}
    </motion.div>
  );
}
