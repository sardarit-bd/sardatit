import Image from "next/image";
import Link from "next/link";
import { Kanit } from "next/font/google";
import { HiArrowUpRight } from "react-icons/hi2";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const HERO_BG = "/hero/bg.png";

const BLUE_GRADIENT =
  "bg-[linear-gradient(90deg,#001D79_0%,#003DFF_100%)] bg-clip-text text-transparent";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef5ff_55%,#f3f7ff_100%)]">
      <Image
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none -scale-x-310 object-cover object-top-left opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(360deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 100%)",
        }}
      />

      <div className="@container relative mx-auto flex w-full container flex-col px-5 pb-12 pt-28 sm:px-8 lg:block lg:aspect-1069/748 lg:px-0 lg:pb-0 lg:pt-0 ">
        <div
          className={`${kanit.className} order-1 text-xl font-medium text-[#242424] lg:absolute lg:left-[4.4%] lg:top-[20.5%] lg:text-[2.1cqw]`}
        >
          We Are Leading
        </div>
        <div
          className={`${kanit.className} ${BLUE_GRADIENT} order-2 mt-1 w-fit pb-[0.12em] text-[17vw] font-bold leading-[0.95] tracking-[-0.02em] sm:text-[15vw] lg:absolute lg:left-[4.4%] lg:top-[22.5%] lg:mt-0 lg:text-[15.6cqw]`}
        >
          Digital
        </div>
        <div
          className={`${kanit.className} ${BLUE_GRADIENT} relative z-20 order-3 ml-[12%] w-fit pb-[0.12em] text-[17vw] font-bold leading-[0.95] tracking-[-0.02em] sm:text-[15vw] lg:absolute lg:left-[31.5%] lg:top-[43.5%] lg:ml-0 lg:text-[15.6cqw]`}
        >
          Solutions
        </div>
        <p className="order-4 mt-6 max-w-md text-[15px] leading-[1.6] text-[#343434] lg:absolute lg:left-[55.4%] lg:top-[28.5%] lg:mt-0 lg:w-[30%] lg:max-w-none lg:text-[1.4cqw]">
          Sardar IT is a modern digital service solution agency dedicated to
          transforming ideas into powerful digital experiences.
        </p>
        <Link
          href="/services"
          className="order-5 mt-6  py-2 px-8 flex justify-center items-center gap-3 rounded-full bg-[#242424] pl-5 pr-1.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03] lg:absolute lg:left-[10.8%] lg:top-[53%] lg:mt-0"
        >
          Explore Services
          <span className="flex size-7.5 items-center justify-center rounded-full bg-white text-[#073FE8]">
            <HiArrowUpRight className="size-3.5" />
          </span>
        </Link>
        <div className="relative z-10 order-6 mt-10 aspect-video w-full overflow-hidden sm:aspect-2.5/1 lg:absolute lg:bottom-0 lg:left-[28.6%] lg:right-[4%] lg:top-[56.9%] lg:mt-0 lg:aspect-auto lg:w-auto">
          <Image
            src="/hero/hero.jpg"
            alt="The Sardar IT team working together in a modern office"
            fill
            priority
            sizes="(min-width: 1024px) 67vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-white/30"
          />
        </div>
      </div>
    </section>
  );
}