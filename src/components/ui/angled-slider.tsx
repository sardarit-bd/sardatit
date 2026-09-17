"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface AngledSliderProps<T = any> {
  items: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  containerHeight?: string;
  cardWidth?: string;
  gap?: string;
  angle?: number;
  hoverScale?: number;
  className?: string;
}

export function AngledSlider<T = any>({
  items,
  renderItem,
  speed = 35,
  direction = "left",
  containerHeight = "520px",
  cardWidth = "360px",
  gap = "32px",
  angle = 18,
  className,
}: AngledSliderProps<T>) {
  const uniqueId = useId().replace(/:/g, "-");
  const animName = `angled-marquee-${uniqueId}`;

  // Ensure negative angle for signature right-facing isometric tilt
  const cardAngle = angle > 0 ? -angle : angle;
  const hoverAngle = Math.round(cardAngle * 0.55); // Level towards 0 on hover (e.g. -18deg -> -10deg)

  return (
    <div
      className={cn(
        "angled-slider-root relative w-full overflow-visible bg-transparent py-16 select-none",
        className
      )}
      style={{
        minHeight: containerHeight,
        perspective: "1200px",
        perspectiveOrigin: "center center",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ${animName} {
              0% {
                transform: translate3d(${direction === "left" ? "0" : "-50%"}, 0, 0);
              }
              100% {
                transform: translate3d(${direction === "left" ? "-50%" : "0"}, 0, 0);
              }
            }
            .${animName}-track {
              display: flex;
              align-items: center;
              width: max-content;
              animation: ${animName} ${speed}s linear infinite;
              transform-style: preserve-3d;
              will-change: transform;
              backface-visibility: hidden;
            }
            .angled-slider-root:hover .${animName}-track {
              animation-play-state: paused;
            }
            .${animName}-card {
              flex-shrink: 0;
              width: ${cardWidth};
              transform: rotateY(${cardAngle}deg) rotateZ(-2deg) translateZ(0);
              transform-style: preserve-3d;
              backface-visibility: hidden;
              will-change: transform;
              transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
            }
            .${animName}-card:hover {
              transform: rotateY(${hoverAngle}deg) rotateZ(0deg) translateY(-8px) scale(1.02) translateZ(40px) !important;
              z-index: 50;
              position: relative;
            }
          `,
        }}
      />

      {/* Hardware Accelerated Infinite Track */}
      <div className={`${animName}-track flex items-center`}>
        {/* Set 1 */}
        <div
          className="flex items-center shrink-0"
          style={{ gap, paddingRight: gap, transformStyle: "preserve-3d" }}
        >
          {items.map((item, index) => (
            <div
              key={`set1-${index}`}
              className={`${animName}-card`}
              style={{
                width: cardWidth,
                transformStyle: "preserve-3d",
              }}
            >
              {renderItem ? (
                renderItem(item, index)
              ) : (
                <div className="h-[380px] w-full rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-md">
                  {(item as any)?.title || "Review Card"}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Set 2 (Identical duplicate for seamless 100% infinite marquee loop) */}
        <div
          className="flex items-center shrink-0"
          style={{ gap, paddingRight: gap, transformStyle: "preserve-3d" }}
          aria-hidden="true"
        >
          {items.map((item, index) => (
            <div
              key={`set2-${index}`}
              className={`${animName}-card`}
              style={{
                width: cardWidth,
                transformStyle: "preserve-3d",
              }}
            >
              {renderItem ? (
                renderItem(item, index)
              ) : (
                <div className="h-[380px] w-full rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-md">
                  {(item as any)?.title || "Review Card"}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AngledSlider;
