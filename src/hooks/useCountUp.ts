// useCountUp.ts
import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
}

export function useCountUp({ end, duration = 1500 }: UseCountUpOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);

        if (entry.isIntersecting) {
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(progress * end));
            if (progress < 1) {
              frameRef.current = requestAnimationFrame(animate);
            }
          };
          frameRef.current = requestAnimationFrame(animate);
        } else {
          // reset so it can replay next time it enters view
          setValue(0);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration]);

  return { ref, value };
}
