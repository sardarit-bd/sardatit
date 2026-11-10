"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiChevronDown } from "react-icons/fi";

export interface OptionItem {
  label: string;
  value: string;
}

interface CustomSelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: (string | OptionItem)[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  variant?: "light" | "dark";
}

const STYLES = {
  light: {
    label: "text-sm font-semibold text-neutral-900 mb-1",
    trigger:
      "w-full bg-transparent border-b border-neutral-900/80 py-2 pr-8 text-left text-base focus:outline-none focus:border-black transition-colors cursor-pointer flex items-center justify-between group",
    selected: "text-neutral-900 font-medium",
    placeholder: "text-neutral-400",
    chevronWrap:
      "absolute right-1 top-1/2 -translate-y-1/2 text-neutral-600 group-hover:text-neutral-900 pointer-events-none",
    chevron: "text-lg",
    menu: "absolute left-0 top-full w-full z-50 mt-1 bg-white border border-neutral-200/90 shadow-2xl overflow-hidden py-1.5 focus:outline-none max-h-60 overflow-y-auto",
    option: "w-full text-left px-3.5 py-2.5 text-sm transition-colors flex items-center justify-between cursor-pointer",
    optionSelected: "bg-neutral-100 text-neutral-950 font-semibold",
    optionIdle:
      "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950",
    check: "text-blue-600 text-base shrink-0",
  },
  dark: {
    label:
      "mb-4 text-base font-medium leading-[1.3] text-white sm:mb-6 sm:text-xl",
    trigger:
      "w-full bg-transparent border-b border-white p-0 pb-3 pr-8 text-left text-base leading-[1.3] sm:text-lg focus:outline-none focus:border-[#285CFF] transition-colors cursor-pointer flex items-center justify-between",
    selected: "text-white font-normal",
    placeholder: "text-[#B1B1B1]",
    chevronWrap:
      "absolute right-0 top-0 flex h-[1.3em] items-center text-[#BFBFBF] pointer-events-none",
    chevron: "size-4",
    menu: "absolute left-0 top-full w-full z-50 mt-2 bg-[#0A0A0F] border border-white/15 shadow-2xl overflow-hidden py-1.5 focus:outline-none max-h-60 overflow-y-auto",
    option:
      "w-full text-left px-4 py-2.5 text-base transition-colors flex items-center justify-between cursor-pointer",
    optionSelected: "bg-white/10 text-white font-medium",
    optionIdle: "text-[#B1B1B1] hover:bg-white/5 hover:text-white",
    check: "text-[#285CFF] text-base shrink-0",
  },
} as const;

export default function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  required = false,
  className = "",
  variant = "light",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const s = STYLES[variant];

  // Normalize options to { label, value }
  const normalizedOptions: OptionItem[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation & accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = normalizedOptions.findIndex((opt) => opt.value === value);
        const nextIndex =
          currentIndex < normalizedOptions.length - 1 ? currentIndex + 1 : 0;
        onChange(normalizedOptions[nextIndex].value);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = normalizedOptions.findIndex((opt) => opt.value === value);
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : normalizedOptions.length - 1;
        onChange(normalizedOptions[prevIndex].value);
      }
    }
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={s.label}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {label}
        </label>
      )}

      {/* Hidden input for native form submission compatibility */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
          readOnly
        />
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={s.trigger}
      >
        <span
          className={`truncate block ${
            selectedOption ? s.selected : s.placeholder
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {variant === "dark" ? (
          <span className={s.chevronWrap}>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex"
            >
              <FiChevronDown className={s.chevron} />
            </motion.span>
          </span>
        ) : (
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={s.chevronWrap}
          >
            <FiChevronDown className={s.chevron} />
          </motion.span>
        )}
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            role="listbox"
            data-lenis-prevent
            className={s.menu}
          >
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`${s.option} ${
                    isSelected ? s.optionSelected : s.optionIdle
                  }`}
                >
                  <span className="truncate mr-2">{opt.label}</span>
                  {isSelected && <FiCheck className={s.check} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}