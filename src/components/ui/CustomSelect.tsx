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
}

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
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
          className="text-sm font-semibold text-neutral-900 mb-1"
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
        className="w-full bg-transparent border-b border-neutral-900/80 py-2 pr-8 text-left text-base focus:outline-none focus:border-black transition-colors cursor-pointer flex items-center justify-between group"
      >
        <span
          className={`truncate block ${
            selectedOption ? "text-neutral-900 font-medium" : "text-neutral-400"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-neutral-600 group-hover:text-neutral-900 pointer-events-none"
        >
          <FiChevronDown className="text-lg" />
        </motion.span>
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
            className="absolute left-0 top-full w-full z-50 mt-1 bg-white border border-neutral-200/90 shadow-2xl overflow-hidden py-1.5 focus:outline-none max-h-60 overflow-y-auto"
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
                  className={`w-full text-left px-3.5 py-2.5 text-sm transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-neutral-100 text-neutral-950 font-semibold"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                  }`}
                >
                  <span className="truncate mr-2">{opt.label}</span>
                  {isSelected && (
                    <FiCheck className="text-blue-600 text-base shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
