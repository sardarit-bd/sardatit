"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface HyperTextProps {
  text: string;
  className?: string;
  autoLoopInterval?: number;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4";
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function HyperText({
  text,
  className = "",
  autoLoopInterval = 5500,
  as: Component = "span",
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loopTimeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMountedRef = useRef(true);

  const triggerScramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    let iteration = 0;
    const maxIterations = text.length;

    intervalRef.current = setInterval(() => {
      if (!isMountedRef.current) return;

      setDisplayText(() =>
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      iteration += 0.55;

      if (iteration >= maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (isMountedRef.current) {
          setDisplayText(text);
        }
      }
    }, 28);
  }, [text]);

  useEffect(() => {
    isMountedRef.current = true;
    triggerScramble();

    if (autoLoopInterval > 0) {
      const loop = setInterval(() => {
        if (isMountedRef.current) {
          triggerScramble();
        }
      }, autoLoopInterval);
      loopTimeoutRef.current = loop;
    }

    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (loopTimeoutRef.current) clearInterval(loopTimeoutRef.current);
    };
  }, [triggerScramble, autoLoopInterval]);

  return (
    <Component className={className} onMouseEnter={triggerScramble}>
      {displayText}
    </Component>
  );
}
