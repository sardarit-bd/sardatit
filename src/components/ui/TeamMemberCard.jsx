"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export function TeamMemberCard({
  member
}) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <div className="w-full flex justify-center items-center">
        <div
          className="relative aspect-square overflow-hidden h-full w-full"
        >
          <Image src={member?.imageSrc} alt={member?.name} height={362} width={326} className="object-cover" />
        </div>
      </div>

      <p className="pt-4 text-2xl font-semibold text-text  w-full text-left">
        {member?.name}
      </p>
      <span className="text-sm text-left text-gray-500 w-full">{member?.role}</span>
    </motion.div>
  );
}
