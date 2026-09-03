"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = "" }: SectionTitleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    const node = titleRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={titleRef}
      className={`overflow-visible text-4xl ${className} ${
        isVisible ? "section-title-animate" : "opacity-0"
      }`}
    >
      {children}
    </h2>
  );
}
