"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./DigitalFlowSection.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface PathDefinition {
  id: string;
  d: string;
  stroke: string;
  strokeWidth: number;
}

// ---------------------------------------------------------------------------
// 4 VISUAL ZONES (15 TOTAL ORGANIC BASE PATHS)
// Varied spacing, steepness, and compression towards right-middle
// ---------------------------------------------------------------------------

// ZONE 1 — TOP LEFT SWEEP (4 paths)
const ZONE_1_TOP: PathDefinition[] = [
  {
    id: "top-1",
    d: "M -150 55 C 280 40, 670 70, 1040 145 C 1320 205, 1510 330, 1690 390 C 1830 435, 1960 415, 2100 340",
    stroke: "rgba(255, 255, 255, 0.035)",
    strokeWidth: 1.8,
  },
  {
    id: "top-2",
    d: "M -150 80 C 300 58, 690 90, 1060 170 C 1330 230, 1525 345, 1700 400 C 1840 443, 1970 427, 2100 360",
    stroke: "rgba(255, 255, 255, 0.055)",
    strokeWidth: 2.0,
  },
  {
    id: "top-3",
    d: "M -150 110 C 310 82, 710 115, 1080 195 C 1340 255, 1540 360, 1710 410 C 1850 451, 1980 440, 2100 382",
    stroke: "rgba(255, 255, 255, 0.045)",
    strokeWidth: 1.6,
  },
  {
    id: "top-4",
    d: "M -150 145 C 325 110, 730 140, 1100 220 C 1350 280, 1555 375, 1720 420 C 1860 459, 1990 453, 2100 405",
    stroke: "rgba(255, 255, 255, 0.035)",
    strokeWidth: 1.8,
  },
];

// ZONE 2 — MID LEFT DEEP ARC (4 paths)
const ZONE_2_MID: PathDefinition[] = [
  {
    id: "mid-1",
    d: "M -180 420 C 180 470, 360 590, 650 625 C 980 665, 1210 545, 1430 505 C 1650 465, 1860 475, 2100 430",
    stroke: "rgba(255, 255, 255, 0.055)",
    strokeWidth: 2.0,
  },
  {
    id: "mid-2",
    d: "M -180 455 C 190 505, 380 620, 675 652 C 995 685, 1230 565, 1450 523 C 1670 485, 1875 493, 2100 450",
    stroke: "rgba(255, 255, 255, 0.035)",
    strokeWidth: 1.6,
  },
  {
    id: "mid-3",
    d: "M -180 492 C 205 540, 405 650, 700 680 C 1010 710, 1250 585, 1470 542 C 1690 503, 1890 512, 2100 470",
    stroke: "rgba(255, 255, 255, 0.05)",
    strokeWidth: 1.8,
  },
  {
    id: "mid-4",
    d: "M -180 532 C 220 575, 430 680, 730 710 C 1030 740, 1270 610, 1490 562 C 1710 523, 1905 532, 2100 490",
    stroke: "rgba(255, 255, 255, 0.025)",
    strokeWidth: 1.6,
  },
];

// ZONE 3 — LOWER LEFT RISE (3 paths)
const ZONE_3_LOWER: PathDefinition[] = [
  {
    id: "lower-1",
    d: "M -120 860 C 220 780, 420 650, 700 585 C 980 520, 1260 515, 1500 490 C 1740 465, 1940 420, 2100 390",
    stroke: "rgba(255, 255, 255, 0.04)",
    strokeWidth: 1.8,
  },
  {
    id: "lower-2",
    d: "M -80 895 C 250 815, 450 685, 735 615 C 1010 548, 1280 540, 1520 510 C 1760 480, 1950 438, 2100 410",
    stroke: "rgba(255, 255, 255, 0.055)",
    strokeWidth: 2.0,
  },
  {
    id: "lower-3",
    d: "M -40 930 C 280 850, 480 720, 770 645 C 1040 578, 1300 565, 1540 530 C 1780 500, 1960 455, 2100 430",
    stroke: "rgba(255, 255, 255, 0.03)",
    strokeWidth: 1.6,
  },
];

// ZONE 4 — TOP RIGHT DESCENDING FAN (4 paths)
const ZONE_4_FAN: PathDefinition[] = [
  {
    id: "fan-1",
    d: "M 1220 -120 C 1320 40, 1430 200, 1560 320 C 1670 420, 1790 445, 2100 420",
    stroke: "rgba(255, 255, 255, 0.035)",
    strokeWidth: 1.8,
  },
  {
    id: "fan-2",
    d: "M 1320 -120 C 1410 60, 1510 220, 1620 340 C 1725 435, 1835 458, 2100 440",
    stroke: "rgba(255, 255, 255, 0.055)",
    strokeWidth: 2.0,
  },
  {
    id: "fan-3",
    d: "M 1420 -120 C 1500 80, 1590 240, 1680 360 C 1780 450, 1880 470, 2100 460",
    stroke: "rgba(255, 255, 255, 0.03)",
    strokeWidth: 1.6,
  },
  {
    id: "fan-4",
    d: "M 1520 -120 C 1590 100, 1670 260, 1740 380 C 1835 465, 1925 485, 2100 480",
    stroke: "rgba(255, 255, 255, 0.05)",
    strokeWidth: 1.8,
  },
];

// All 15 static paths combined
const ALL_BASE_PATHS: PathDefinition[] = [
  ...ZONE_1_TOP,
  ...ZONE_2_MID,
  ...ZONE_3_LOWER,
  ...ZONE_4_FAN,
];

// 7 exact spark channels as specified:
// top-2, top-4, mid-1, mid-3, lower-2, fan-2, fan-4
const SPARK_CHANNELS: PathDefinition[] = [
  ZONE_1_TOP[1], // top-2
  ZONE_1_TOP[3], // top-4
  ZONE_2_MID[0], // mid-1
  ZONE_2_MID[2], // mid-3
  ZONE_3_LOWER[1], // lower-2
  ZONE_4_FAN[1], // fan-2
  ZONE_4_FAN[3], // fan-4
];

export default function DigitalFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const id = useId().replace(/:/g, "");
  const glowId = `flow-glow-${id}`;
  const headingId = `flow-heading-${id}`;

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1200px)",
          tablet: "(min-width: 768px) and (max-width: 1199px)",
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduce) return;

          // Responsive spark count: 7 on desktop/tablet, 4 on mobile
          const count = context.conditions?.mobile ? 4 : 7;

          const paths = gsap.utils.toArray<SVGPathElement>(
            "[data-flow-spark]",
            sectionRef.current
          );

          const loops = paths.slice(0, count).map((path, idx) => {
            const length = path.getTotalLength();
            // Short visible spark: 20px–38px
            const dash = gsap.utils.random(20, 38);
            // Duration: 2.2s–4.8s
            const duration = gsap.utils.random(2.4, 4.6);
            // Staggered asynchronous delays: 0s–5s
            const delay = (idx * 0.85) % 4.5 + gsap.utils.random(0, 0.7);
            // Repeat delay: 1.2s–4s
            const repeatDelay = gsap.utils.random(1.2, 3.8);

            gsap.set(path, {
              strokeDasharray: `${dash} ${length}`,
              strokeDashoffset: length,
              opacity: 0,
            });

            return gsap
              .timeline({
                paused: true,
                repeat: -1,
                delay,
                repeatDelay,
              })
              .fromTo(
                path,
                { strokeDashoffset: length },
                {
                  strokeDashoffset: -dash,
                  duration,
                  ease: "none",
                  immediateRender: false,
                },
                0
              )
              .to(
                path,
                {
                  opacity: 0.95,
                  duration: duration * 0.12,
                  ease: "sine.out",
                },
                0
              )
              .to(
                path,
                {
                  opacity: 0,
                  duration: duration * 0.18,
                  ease: "sine.in",
                },
                duration * 0.82
              );
          });

          // Suspend animations offscreen & in inactive browser tabs
          let visible = false;
          const updatePlayback = () =>
            loops.forEach((loop) => loop.paused(!visible || document.hidden));

          const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            updatePlayback();
          });

          if (sectionRef.current) observer.observe(sectionRef.current);
          document.addEventListener("visibilitychange", updatePlayback);

          // Subtle text reveal
          gsap.from("[data-flow-reveal]", {
            y: 28,
            opacity: 0,
            duration: 1,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          });

          return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", updatePlayback);
          };
        }
      );

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={styles.flowSection}
      aria-labelledby={headingId}
    >
      <div className={styles.background} aria-hidden="true">
        <svg
          viewBox="0 0 1920 800"
          preserveAspectRatio="xMidYMid slice"
          className={styles.svg}
          fill="none"
        >
          <defs>
            {/* Subtle restrained glow filter */}
            <filter
              id={glowId}
              x="-40%"
              y="-80%"
              width="180%"
              height="260%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="2.5"
                result="blur"
              />
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="1.0"
                result="smallBlur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="smallBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 15 Static Base Paths across 4 visual zones */}
          {ALL_BASE_PATHS.map((route) => (
            <path
              key={`base-${route.id}`}
              d={route.d}
              className={styles.basePath}
              stroke={route.stroke}
              strokeWidth={route.strokeWidth}
            />
          ))}

          {/* 7 Spark Channels duplicating exact base curve geometry */}
          {SPARK_CHANNELS.map((route) => (
            <path
              key={`spark-${route.id}`}
              d={route.d}
              data-flow-spark
              className={styles.sparkPath}
              filter={`url(#${glowId})`}
            />
          ))}
        </svg>
      </div>

      <div className={styles.content}>
        <span data-flow-reveal className={styles.eyebrow}>
          DIGITAL MOMENTUM
        </span>
        <h2 id={headingId} data-flow-reveal className={styles.heading}>
          Growth moves when
          <br />
          every signal connects.
        </h2>
        <p data-flow-reveal className={styles.description}>
          Strategy, media, content, and conversion working as one connected system.
        </p>
      </div>
    </section>
  );
}
