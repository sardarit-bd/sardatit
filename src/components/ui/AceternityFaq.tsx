"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  category?: string;
  items: FaqItem[];
}

interface AceternityFaqProps {
  groups?: FaqGroup[];
  items?: FaqItem[];
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025, // Quick, silky reveal for each word
      delayChildren: 0.1,     // Wait slightly for the box height to open
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)", y: 4 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export function AceternityFaq({ groups, items, className }: AceternityFaqProps) {
  const normalizedGroups: FaqGroup[] = groups || (items ? [{ items }] : []);
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggleItem = (id: string) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-12 py-8 overflow-hidden", className)}>
      {normalizedGroups.map((group, groupIdx) => (
        <div key={groupIdx} className="w-full">
          {group.category && (
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 mb-6 select-none">
              {group.category}
            </h3>
          )}

          <div className="flex flex-col space-y-2">
            {group.items.map((item, itemIdx) => {
              const id = `${groupIdx}-${itemIdx}`;
              const isOpen = openIndex === id;

              return (
                <div key={itemIdx} className="relative w-full">
                  {isOpen && (
                    <>
                      <div className="absolute top-0 -left-[100vw] -right-[100vw] border-t border-dashed border-neutral-300 pointer-events-none" />
                      <div className="absolute bottom-0 -left-[100vw] -right-[100vw] border-b border-dashed border-neutral-300 pointer-events-none" />
                    </>
                  )}

                  <motion.div
                    layout
                    transition={{
                      layout: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                    }}
                    className={cn(
                      "relative w-full transition-colors duration-300 select-none",
                      "pt-5 px-6",
                      isOpen
                        ? "border border-dashed border-neutral-300 bg-neutral-50/70 pb-6 md:pb-8"
                        : "border border-transparent hover:bg-neutral-50/50 pb-5"
                    )}
                  >
                    {isOpen && (
                      <>
                        <span className="absolute -top-2.5 -left-1.5 text-neutral-400 text-xs font-mono select-none pointer-events-none leading-none">
                          +
                        </span>
                        <span className="absolute -top-2.5 -right-1.5 text-neutral-400 text-xs font-mono select-none pointer-events-none leading-none">
                          +
                        </span>
                        <span className="absolute -bottom-2.5 -left-1.5 text-neutral-400 text-xs font-mono select-none pointer-events-none leading-none">
                          +
                        </span>
                        <span className="absolute -bottom-2.5 -right-1.5 text-neutral-400 text-xs font-mono select-none pointer-events-none leading-none">
                          +
                        </span>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleItem(id)}
                      className="w-full text-left cursor-pointer pr-12 block"
                    >
                      <span className="text-base md:text-lg font-medium text-neutral-900 group-hover:text-black transition-colors leading-snug block">
                        {item.q}
                      </span>
                    </button>

                    <div
                      onClick={() => toggleItem(id)}
                      className="absolute top-5 right-6 cursor-pointer text-neutral-400 hover:text-neutral-700 transition-colors"
                    >
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <Plus className="w-5 h-5 stroke-[1.5]" />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            transition: {
                              height: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                              opacity: { duration: 0.25, delay: 0.1 },
                            },
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            transition: {
                              height: { duration: 0.25, ease: [0.25, 1, 0.5, 1] },
                              opacity: { duration: 0.15 },
                            },
                          }}
                          className="overflow-hidden pr-12"
                        >
                          <motion.p
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="pt-4 text-sm md:text-base text-neutral-500 font-normal leading-relaxed flex flex-wrap gap-x-1"
                          >
                            {item.a.split(" ").map((word, i) => (
                              <motion.span
                                key={i}
                                variants={wordVariants}
                                className="inline-block"
                              >
                                {word}
                              </motion.span>
                            ))}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}