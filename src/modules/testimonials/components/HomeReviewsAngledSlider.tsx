"use client";
import Image from "next/image";
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

function StarRating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    if (rating >= starNumber) {
      return (
        <BsStarFill key={index} className="text-amber-400 shrink-0 text-sm" />
      );
    } else if (rating >= starNumber - 0.5) {
      return (
        <BsStarHalf key={index} className="text-amber-400 shrink-0 text-sm" />
      );
    } else {
      return (
        <BsStar key={index} className="text-neutral-300 shrink-0 text-sm" />
      );
    }
  });

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">{stars}</div>
      <span className="font-mono text-xs font-bold text-neutral-800 tracking-tight ml-0.5">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function Avatar({ item }: { item: MarqueeItem }) {
  if (item.avatar) {
    return (
      <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-neutral-200">
        <Image
          src={item.avatar}
          alt={item.name}
          fill
          unoptimized
          className="object-cover"
        />
      </span>
    );
  }
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-sm font-bold text-[#133BD4]">
      {item.name?.charAt(0)}
    </span>
  );
}

function TextCard({ item }: { item: MarqueeItem }) {
  return (
    <div className="flex h-52 w-72 shrink-0 flex-col justify-between rounded-md border border-blue-100 bg-white p-5 text-left sm:w-80">
      <div className="flex items-center gap-3">
        <Avatar item={item} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="truncate text-sm font-semibold text-neutral-900">
              {item.name}
            </h4>
            <BsPatchCheckFill
              className="size-3 shrink-0 text-[#133bd4]"
              title="Verified Client Review"
            />
          </div>
          <p className="truncate text-xs text-neutral-500">
            {item.role} · {item.company}
          </p>
        </div>
      </div>
      <p className="line-clamp-4 text-sm leading-relaxed text-neutral-700">
        &quot;{item.quote}&quot;
      </p>
      <div className="flex items-center justify-between">
        <StarRating rating={item.rating} />
        <span className="text-base leading-none" title={item.country}>
          {item.flag}
        </span>
      </div>
    </div>
  );
}

function PhotoCard({ item }: { item: MarqueeItem }) {
  return (
    <div className="relative h-52 w-72 shrink-0 overflow-hidden rounded-md bg-neutral-200 text-left sm:w-80">
      <Image
        src={item.image as string}
        alt={item.name}
        fill
        unoptimized
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#133BD4]/90 via-[#133BD4]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="mb-2 line-clamp-2 text-sm leading-snug">
          &quot;{item.quote}&quot;
        </p>
        <p className="truncate text-xs font-semibold">
          {item.name} · {item.company}
        </p>
      </div>
    </div>
  );
}

function Card({ item }: { item: MarqueeItem }) {
  return item.image ? <PhotoCard item={item} /> : <TextCard item={item} />;
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
  return (
    <div className="marquee-row relative w-full overflow-hidden">
      <div
        className={`marquee-track flex w-max ${offset ? "pl-40" : ""}`}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
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
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation-name: marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee-row:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

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