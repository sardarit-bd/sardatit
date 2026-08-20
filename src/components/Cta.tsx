"use client";

import { motion } from "framer-motion";

// const gradientTextStyle: React.CSSProperties = {
//   background: "linear-gradient(135deg, #203eec 0%, #00d4ff 100%)",
//   WebkitBackgroundClip: "text",
//   backgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   color: "transparent",
// };

export default function Cta() {
  return (
    <section className="relative mx-auto flex w-full container flex-col items-center justify-center overflow-hidden px-4 lg:py-32">
      <div className="flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          //   style={gradientTextStyle}
          className="text-6xl font-semibold md:text-[13.5rem] leading-[1.1] uppercase"
        >
          We are ready
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          //   style={gradientTextStyle}
          className="text-6xl font-semibold md:text-[14rem] leading-[1.1] uppercase"
        >
          are you?
        </motion.h2>
      </div>
    </section>
  );
}
