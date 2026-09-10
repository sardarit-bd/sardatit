"use client";

import { useCountUp } from "../../hooks/useCountUp";
import ElectricBorder from "./ElectricBorder";

interface AnimatedStatProps {
  value: string;
  label: string;
  index?: string;
  electric?: boolean;
  electricColor?: string;
  speed?: number;
  chaos?: number;
}

export function AnimatedStat({
  value,
  label,
  index,
  electric = false,
  electricColor = "#00d4ff",
  speed = 1,
  chaos = 0.12,
}: AnimatedStatProps) {
  const numericMatch = value.match(/[\d.]+/);
  const suffixMatch = value.replace(/[\d.]+/, "");
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const suffix = suffixMatch || "";

  const { ref, value: animatedValue } = useCountUp({ end: numericValue });

  const cardContent = (
    <div
      className={`w-full h-76 bg-white ${
        electric ? "rounded-2xl" : "border border-gray-200"
      } overflow-hidden transition-all duration-300 p-6 flex flex-col justify-between`}
      ref={ref}
    >
      <div className="w-full h-fit justify-center text-zinc-500 text-xl font-medium leading-5">
        /{index}
      </div>

      <div className="w-full h-fit">
        <div className="justify-center text-zinc-900 text-5xl font-semibold leading-[75.60px]">
          {animatedValue}
          {suffix}
        </div>
        <div className="w-full max-md:text-sm justify-center text-neutral-700 text-lg font-normal leading-7">
          {label}
        </div>
      </div>
    </div>
  );

  if (electric) {
    return (
      <ElectricBorder
        color={electricColor}
        speed={speed}
        chaos={chaos}
        borderRadius={16}
        className="w-full rounded-2xl"
      >
        {cardContent}
      </ElectricBorder>
    );
  }

  return cardContent;
}
