"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ShowcaseImageData = {
  id: string;
  src: string;
  alt: string;
};

const IMAGES: ShowcaseImageData[] = [
  {
    id: "img-1",
    src: "/image/galary/G2.jpg",
    alt: "Team discussing a project",
  },
  { id: "img-2", src: "/image/galary/G3.webp", alt: "Team collaborating" },
  { id: "img-3", src: "/image/galary/G4.jpg", alt: "Team reviewing designs" },
  { id: "img-4", src: "/image/galary/G5.jpg", alt: "Team planning" },
];

const SCATTER = [
  { x: -0.32, y: -0.24, rotate: -12 },
  { x: 0.3, y: -0.2, rotate: 9 },
  { x: -0.28, y: 0.26, rotate: 13 },
  { x: 0.3, y: 0.28, rotate: -8 },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}

function ShowcaseTile({
  image,
  index,
  isActive,
  reveal,
  onClick,
  containerSize,
}: {
  image: ShowcaseImageData;
  index: number;
  isActive: boolean;
  reveal: MotionValue<number>;
  onClick: () => void;
  containerSize: { width: number; height: number };
}) {
  const scatter = SCATTER[index % SCATTER.length];

  const margin = 16;
  const maxX = Math.max(containerSize.width / 2 - margin, 0);
  const maxY = Math.max(containerSize.height / 2 - margin, 0);

  const startX = clamp(scatter.x * containerSize.width, -maxX, maxX);
  const startY = clamp(scatter.y * containerSize.height, -maxY, maxY);

  const x = useTransform(reveal, [0, 1], [startX, 0]);
  const y = useTransform(reveal, [0, 1], [startY, 0]);
  const rotate = useTransform(reveal, [0, 1], [scatter.rotate, 0]);
  const entranceScale = useTransform(reveal, [0, 1], [isActive ? 0.2 : 0.5, 1]);

  return (
    <motion.button
      type="button"
      layoutId={image.id}
      layout
      onClick={onClick}
      style={{ x, y, rotate, scale: entranceScale }}
      transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.7 }}
      className={
        isActive
          ? "relative block h-48 w-full overflow-hidden rounded-2xl shadow-xl sm:h-64 sm:rounded-3xl md:h-96 lg:h-[32.5rem]"
          : "relative block h-24 w-28 overflow-hidden rounded-lg p-1 shadow-md opacity-90 transition-opacity hover:opacity-100 sm:h-28 sm:w-32 sm:rounded-xl md:h-24 md:w-40 lg:h-24 lg:w-50"
      }
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={
          isActive
            ? "(min-width: 1024px) 700px, (min-width: 640px) 90vw, 100vw"
            : "(min-width: 640px) 200px, 130px"
        }
        className="object-cover"
      />
    </motion.button>
  );
}

export function AppShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(IMAGES[0].id);
  const reveal = useMotionValue(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 1,
          onUpdate: (self) => reveal.set(self.progress),
        });

        return () => st.kill();
      });

      mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=80%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 1,
          onUpdate: (self) => reveal.set(self.progress),
        });

        return () => st.kill();
      });

      mm.add("(max-width: 639px)", () => {
        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=50%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 1,
          onUpdate: (self) => reveal.set(self.progress),
        });

        return () => st.kill();
      });
    }, containerRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill();
      });
      ctx.revert();
    };
  }, [reveal]);

  const active = IMAGES.find((img) => img.id === activeId)!;
  const others = IMAGES.filter((img) => img.id !== activeId);

  const [tilesWrapRef, tilesWrapSize] = useElementSize<HTMLDivElement>();

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden px-4 pb-10 sm:gap-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="flex w-full flex-col items-center justify-center text-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl"
      >
        <span className="font-semibold text-[#1B2023]">
          We’re passionate <br /> about websites
        </span>
      </motion.h2>

      <motion.p
        className="w-full max-w-xs pt-2 text-center text-sm font-normal leading-6 text-[#8A8D8F] sm:max-w-xl sm:pt-3 sm:text-base md:max-w-2xl md:text-lg lg:max-w-3xl lg:text-[20px] lg:leading-7"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        And we’re on a mission to empower everyone — individuals and
        organizations — to express their identity and grow their business
        online.
      </motion.p>

      <div
        ref={tilesWrapRef}
        className="flex w-full max-w-5xl flex-col items-center gap-4 sm:gap-6"
      >
        <ShowcaseTile
          key={active.id}
          image={active}
          index={IMAGES.findIndex((img) => img.id === active.id)}
          isActive
          reveal={reveal}
          onClick={() => {}}
          containerSize={tilesWrapSize}
        />

        <div className="grid grid-cols-3 items-center justify-items-center gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
          {others.map((img) => (
            <ShowcaseTile
              key={img.id}
              image={img}
              index={IMAGES.findIndex((x) => x.id === img.id)}
              isActive={false}
              reveal={reveal}
              onClick={() => setActiveId(img.id)}
              containerSize={tilesWrapSize}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
