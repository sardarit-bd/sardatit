"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./BauhausHero.module.css";

gsap.registerPlugin(useGSAP);

export default function BauhausHero() {
  const heroRef = useRef<HTMLElement>(null);
  const artworkRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // One-time initial entrance animation
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const mainTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Left Content entrance
        mainTl
          .from("[data-motif]", {
            scaleX: 0,
            transformOrigin: "left center",
            stagger: 0.07,
            duration: 0.8,
          }, 0)
          .from("[data-heading]", {
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 1.05,
            ease: "power4.out",
          }, 0.12)
          .from("[data-copy]", {
            y: 16,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
          }, 0.6)
          .from("[data-description]", {
            y: 20,
            opacity: 0,
            duration: 0.8,
          }, 0.9)
          .from("[data-cta]", {
            y: 16,
            opacity: 0,
            duration: 0.8,
          }, 1.1)
          // Artwork reveal once
          .from(artworkRef.current, {
            opacity: 0,
            x: 40,
            scale: 0.97,
            duration: 1.2,
            ease: "power4.out",
          }, 0.4)
          // 7+ Stat Block Sequence (animates once, then stays static)
          .from("[data-experience-stat]", {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }, 1.2);
      });

      return () => mm.revert();
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-labelledby="growth-heading"
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Left Column: Heading & Context */}
          <div className={styles.content}>
            <div className={styles.eyebrow}>
              <span className={styles.motif} aria-hidden="true">
                {[0, 1, 2, 3, 4].map((line) => (
                  <span data-motif key={line} />
                ))}
              </span>
              <span data-copy>Strategy meets momentum</span>
            </div>
            <h1 id="growth-heading" className={styles.heading}>
              <span className={styles.mask}>
                <span data-heading>Digital Marketing</span>
              </span>
              <span className={styles.mask}>
                <span data-heading>&amp; Growth</span>
              </span>
            </h1>
            <p data-description className={styles.description}>
              Turn attention into lasting impact. We connect strategy, creativity,
              and performance to help your brand grow with purpose.
            </p>
            <a data-cta className={styles.cta} href="#campaigns-showcase">
              <span>Explore Solutions</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 12h15M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
          </div>

          {/* Right Column: Hero Visual with integrated 7+ Stat */}
          <div className={styles.visual}>
            <div className={styles.heroVisual}>
              <Image
                ref={artworkRef}
                className={styles.artwork}
                src="/image/services/digital-marketing.png"
                alt="Digital Marketing and Growth Artwork"
                width={1254}
                height={1254}
                sizes="(max-width: 767px) 95vw, (max-width: 1200px) 50vw, 56vw"
                priority
                unoptimized
              />
              <div data-experience-stat className={styles.experienceStat}>
                <div className={styles.experienceNumber}>
                  <span className={styles.experienceValue}>
                    7
                  </span>
                  <span
                    className={styles.experiencePlus}
                  >
                    +
                  </span>
                </div>
                <div className={styles.experienceCopy}>
                  Building outstanding relation with development &amp; quality design
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info strip */}
        <div className={styles.footer}>
          <span data-copy>Built for your next chapter.</span>
          <span data-copy className={styles.disciplines}>
            Strategy / Creative / Performance
          </span>
          <a
            href="#campaigns-showcase"
            aria-label="Scroll to growth solutions"
          >
            Scroll to explore <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
