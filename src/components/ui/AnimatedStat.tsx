"use client";

import { useCountUp } from "../../hooks/useCountUp";

interface AnimatedStatProps {
  value: string;
  label: string;
  index?: string;
}

export function AnimatedStat({ value, label, index }: AnimatedStatProps) {
  const numericMatch = value.match(/[\d.]+/);
  const suffixMatch = value.replace(/[\d.]+/, "");
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const suffix = suffixMatch || "";

  const { ref, value: animatedValue } = useCountUp({ end: numericValue });

  return (
    <div
      className="w-full h-76 bg-white border border-gray-200 overflow-hidden md:hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-between"
      ref={ref}
    >
      <div className="w-full h-fit justify-center text-zinc-500 text-xl font-medium leading-5">
        /{index}
      </div>

      <div className=" w-full h-fit">
        <div className="justify-center text-zinc-900 text-5xl font-semibold leading-[75.60px]">
          {animatedValue}
          {suffix}
        </div>
        <div className="w-full max-md:text-sm  justify-center text-neutral-700 text-lg font-normal leading-7">
          {label}
        </div>
      </div>
    </div>
  );
}
