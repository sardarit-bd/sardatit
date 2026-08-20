"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StatementCardProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

gsap.registerPlugin(ScrollTrigger);

export function StatementCard({
  number,
  title,
  description,
  className = "",
}: StatementCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.set(numberRef.current, { x: -120, opacity: 1 });
        gsap.set(contentRef.current, { opacity: 1, y: 40 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: 1,
          },
        });

        tl.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
        tl.to(
          numberRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            overwrite: "auto",
          },
          "-=1",
        );
        tl.to({}, { duration: 1 });
        tl.to([contentRef.current, numberRef.current], {
          y: -60,
          opacity: 1,
          duration: 1,
          ease: "power2.in",
          overwrite: "auto",
        });

        return () => tl.scrollTrigger?.kill();
      });

      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        gsap.set(numberRef.current, { x: -60, opacity: 0 });
        gsap.set(contentRef.current, { opacity: 0, y: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top top",
            end: "+=70%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: 1,
          },
        });

        tl.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
        tl.to(
          numberRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            overwrite: "auto",
          },
          "-=0.8",
        );
        tl.to({}, { duration: 0.8 });
        tl.to([contentRef.current, numberRef.current], {
          y: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
          overwrite: "auto",
        });

        return () => tl.scrollTrigger?.kill();
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(numberRef.current, { x: -24, opacity: 0 });
        gsap.set(contentRef.current, { opacity: 1, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top top",
            end: "+=20%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: 1,
          },
        });

        tl.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
        tl.to(
          numberRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            overwrite: "auto",
          },
          "-=0.5",
        );
        tl.to({}, { duration: 0.5 });
        tl.to([contentRef.current, numberRef.current], {
          y: -24,
          opacity: 1,
          duration: 0.6,
          ease: "power2.in",
          overwrite: "auto",
        });

        return () => tl.scrollTrigger?.kill();
      });
    }, cardRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === cardRef.current) st.kill();
      });
      ctx.revert();
    };
  }, []);

  return (
    <article
      ref={cardRef}
      style={{ zIndex: number, position: "relative" }}
      className={`relative mx-auto flex  w-full flex-col items-start gap-6  md:flex-row md:items-start md:gap-16  ${className}`}
    >
      <div className="relative shrink-0 flex justify-center items-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ebebeb 100%)",
          }}
        />
        <div
          className="relative text-[96px] font-black leading-none text-text/20 opacity-10 sm:text-[140px] md:text-[220px] lg:text-[50rem]"
          ref={numberRef}
        >
          {number}
        </div>
      </div>

      <div
        className="flex flex-1 flex-col items-center justify-center gap-6 pt-4 md:items-center md:gap-12 md:pt-8 lg:gap-8 lg:pt-12  h-screen border-b border-gray-200"
        ref={contentRef}
      >
        <h3 className="text-color-grey-11 text-2xl font-extrabold leading-[1.2] tracking-wide sm:text-3xl sm:leading-[1.15] lg:text-5xl lg:leading-[62.40px]">
          {title}
        </h3>

        <p className="text-base font-medium text-gray-500 animate-[word-reveal_0.8s_ease-out_forwards] md:text-lg lg:text-2xl">
          {description}
        </p>
      </div>
    </article>
  );
}
