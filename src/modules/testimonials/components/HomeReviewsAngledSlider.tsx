"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsPatchCheckFill,
} from "react-icons/bs";
import { REVIEWS_DATA } from "@/data/testimonials";
import { ReviewItem } from "@/types/testimonial";

export type { ReviewItem };

type MarqueeItem = ReviewItem & { image?: string; avatar?: string };

function StarRating({
  rating,
  sizeClass = "text-sm",
  gapClass = "gap-0.5",
  starColor = "text-amber-400",
  showValue = true,
}: {
  rating: number;
  sizeClass?: string;
  gapClass?: string;
  starColor?: string;
  showValue?: boolean;
}) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    if (rating >= starNumber) {
      return (
        <BsStarFill
          key={index}
          className={`${starColor} shrink-0 ${sizeClass}`}
        />
      );
    } else if (rating >= starNumber - 0.5) {
      return (
        <BsStarHalf
          key={index}
          className={`${starColor} shrink-0 ${sizeClass}`}
        />
      );
    } else {
      return (
        <BsStar
          key={index}
          className={`text-neutral-300 shrink-0 ${sizeClass}`}
        />
      );
    }
  });

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className={`flex items-center ${gapClass}`}>{stars}</div>
      {showValue && (
        <span className="font-mono text-xs font-bold text-neutral-800 tracking-tight ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

const CARD_SIZE = "aspect-[318/400] h-[clamp(300px,24vw,400px)] shrink-0";



/* Left card: photo + gradient + identity */
function PhotoCard({ item }: { item: MarqueeItem }) {
  return (
    <div
      className={`${CARD_SIZE} relative overflow-hidden rounded-md bg-neutral-200 text-left`}
    >
      <Image
        src={item.image as string}
        alt={item.name}
        fill
        unoptimized
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(23, 71, 224, 0.5) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="flex items-center gap-1.5">
          <h4 className="truncate text-base font-semibold">{item.name}</h4>
          <BsPatchCheckFill
            className="size-3 shrink-0 text-white"
            title="Verified Client Review"
          />
        </div>
        <p className="truncate text-xs text-white/90">
          {item.role} · {item.company}
        </p>
      </div>
    </div>
  );
}

/* Right card: message + rating */
function MessageAvatar({ item }: { item: MarqueeItem }) {
  const src = item.avatar ?? item.image;
  if (src) {
    return (
      <span className="relative size-[18.87cqw] shrink-0 overflow-hidden rounded-full">
        <Image
          src={src}
          alt={item.name}
          fill
          unoptimized
          className="object-cover"
        />
      </span>
    );
  }
  return (
    <span className="flex size-[18.87cqw] shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-[6.29cqw] font-medium text-[#133BD4]">
      {item.name?.charAt(0)}
    </span>
  );
}

/* Right card — built from the Figma spec (318x400, scales with width) */
function MessageCard({ item }: { item: MarqueeItem }) {
  return (
    <div
      className={`${CARD_SIZE} border-[0.5px] border-[#96AFFF] bg-white text-left`}
    >
      <div className="@container size-full">
        <div className="flex size-full flex-col p-[9.12cqw]">
          {/* Header: avatar + name + designation */}
          <div className="flex items-center gap-[5.03cqw]">
            <MessageAvatar item={item} />
            <div className="flex min-w-0 flex-col gap-[1.26cqw]">
              <h4 className="truncate text-[6.29cqw] font-medium capitalize leading-[1.5] text-[#1E1E1E]">
                {item.name}
              </h4>
              <p className="truncate text-[4.4cqw] font-normal capitalize leading-[1.5] text-[#7B7B7B]">
                {item.role}
              </p>
            </div>
          </div>

          {/* Quote */}
          <p className="mt-[9.75cqw] line-clamp-5 text-[5.66cqw] font-normal leading-[1.6] text-[#1E1E1E]">
            &quot;{item.quote}&quot;
          </p>

          {/* Stars + flag, pinned to the bottom */}
          <div className="mt-auto flex items-center justify-between">
            <StarRating
              rating={item.rating}
              sizeClass="text-[7.55cqw]"
              gapClass="gap-[1.26cqw]"
              starColor="text-[#FFCE03]"
              showValue={false}
            />
            <span className="text-[7.55cqw] leading-none" title={item.country}>
              {item.flag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* One review = two separate-looking cards that move as one unit */
function ReviewPair({ item }: { item: MarqueeItem }) {
  return (
    <div className="flex shrink-0 gap-4">
      <PhotoCard item={item} />
      <MessageCard item={item} />
    </div>
  );
}

function Card({ item }: { item: MarqueeItem }) {
  return item.image ? <ReviewPair item={item} /> : <MessageCard item={item} />;
}





function fill(items: MarqueeItem[], min = 6) {
  if (items.length === 0) return items;
  const out = [...items];
  while (out.length < min) out.push(...items);
  return out;
}

function MarqueeRow({
  items,
  reverse = false,
  duration = 50,
  offset = false,
}: {
  items: MarqueeItem[];
  reverse?: boolean;
  duration?: number;
  offset?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      tweenRef.current = gsap.fromTo(
        el,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          duration,
          ease: "none",
          repeat: -1,
        }
      );
    }, el);

    return () => {
      ctx.revert();
      tweenRef.current = null;
    };
  }, [duration, reverse, items]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
      <div
        ref={trackRef}
        className={`flex w-max will-change-transform ${offset ? "ml-40" : ""}`}
      >
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 gap-4 pr-4"
            aria-hidden={group === 1}
          >
            {items.map((item, i) => (
              <Card key={`${group}-${i}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export interface HomeReviewsAngledSliderProps {
  showFeedbackButton?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function HomeReviewsAngledSlider({
  eyebrow = "CLIENT TESTIMONIAL",
  title = "What Our Clients Say About Working With Us",
  className = "",
}: HomeReviewsAngledSliderProps = {}) {
  const all = REVIEWS_DATA as MarqueeItem[];
  const mid = Math.ceil(all.length / 2);
  const firstHalf = all.slice(0, mid);
  const secondHalf = all.slice(mid);
  const row1 = fill(firstHalf);
  const row2 = fill(secondHalf.length ? secondHalf : [...firstHalf].reverse());

  return (
    <section
      className={`relative w-full overflow-hidden bg-linear-to-b from-white via-white to-[#EEF2FF] py-14 text-neutral-900 sm:py-20 ${className}`}
    >
      <div className="relative z-10 mx-auto mb-10 w-full max-w-350 px-4 text-center sm:mb-14 sm:px-8 lg:px-12">
        <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-[#133BD4]">
          <span className="size-1.5 shrink-0 rounded-full bg-[#133BD4]" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-[1.2] tracking-tight text-neutral-900 sm:text-4xl lg:text-6xl">
          {title}
        </h2>
      </div>

      <div className="relative flex flex-col gap-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent sm:w-32" />
        <MarqueeRow items={row1} duration={55} />
        <MarqueeRow items={row2} duration={65} reverse offset />
      </div>
    </section>
  );
}
export const TestimonialsSection = HomeReviewsAngledSlider;
export default HomeReviewsAngledSlider;