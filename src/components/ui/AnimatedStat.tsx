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
    // <div
    //   ref={ref}
    //   className="rounded-2xl bg-gray-100 bg-secondary p-6 text-left "
    // >
    //   {index && (
    //     <div className="mb-6 text-xs text-muted-foreground/70">/{index}</div>
    //   )}
    //   <div className="text-2xl font-semibold md:text-6xl">
    //     {animatedValue}
    //     {suffix}
    //   </div>
    //   <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    // </div>
    <div
      className="w-full h-96 relative bg-white border border-gray-200 overflow-hidden hover:scale-105 transition-all duration-300"
      ref={ref}
    >
      {index && (
        <div className="w-7 h-5 left-8 top-[31.99px] absolute justify-center text-zinc-500 text-xl font-medium leading-5">
          /{index}
        </div>
      )}
      <div className="w-40 h-20 left-8 top-[197.45px] absolute justify-center text-zinc-900 text-5xl font-semibold leading-[75.60px]">
        {animatedValue}
        {suffix}
      </div>
      <div className="lg:w-2/3 max-md:text-sm! h-14 left-8 top-[277.50px] absolute justify-center text-neutral-700 text-lg font-normal leading-7">
        {label}
      </div>
    </div>
  );
}
