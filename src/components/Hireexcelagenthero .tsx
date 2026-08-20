import type { ComponentPropsWithoutRef, CSSProperties } from "react";

const tokens = {
  "--color-white-solid": "#ffffff",
  "--color-white-1": "rgba(255, 255, 255, 0.01)",
  "--color-white-10": "rgba(255, 255, 255, 0.1)",
  "--color-black-solid": "#000000",
  "--color-spring-green-44": "#3ddc84",
  "--color-azure-5": "#0b1e3d",
  "--color-cyan-5": "rgba(34, 211, 238, 0.05)",
  "--color-cyan-9": "rgba(34, 211, 238, 0.09)",
  "--color-cyan-17": "rgba(34, 211, 238, 0.17)",
  "--color-cyan-51": "rgba(34, 211, 238, 0.51)",
  "--color-grey-94": "#efefef",
} as CSSProperties;

type HeroCtaButtonProps = ComponentPropsWithoutRef<"button"> & {
  label: string;
};

function HeroCtaButton({ label, className = "", ...rest }: HeroCtaButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center overflow-hidden bg-white px-4 pt-3.5 pb-4 outline outline-1 -outline-offset-1 outline-white ${className}`}
      {...rest}
    >
      <span className="text-center font-['Roboto'] text-base font-medium leading-5 text-[var(--color-azure-5)]">
        {label}
      </span>
    </button>
  );
}

const CELL_WIDTH = 128; // w-32
const CELL_HEIGHT = 36; // h-9
const COLUMN_GAP = 131.2;

const COLUMNS: { rows: number[] }[] = [
  { rows: [0, 1, 0, 0, 0] },
  { rows: [0, 1, 1, 0, 0, 0] },
  { rows: [0, 1, 0, 0, 0, 0] },
  { rows: [0, 0, 0, 0, 0, 0] },
  { rows: [0, 1, 1, 0, 0, 0] },
  { rows: [0, 0, 0, 0, 0, 0] },
  { rows: [0, 1, 0, 0, 0, 0] },
  { rows: [0, 1, 1, 0, 0, 0] },
  { rows: [0, 0, 0, 0, 0, 0] },
  { rows: [0, 0, 0, 0, 0, 0] },
];

function HeroGridBackdrop() {
  return (
    <div
      className="relative hidden h-36 w-[1312px] max-w-none overflow-hidden md:block"
      aria-hidden="true"
    >
      <div className="absolute left-0 top-0 h-[525px] w-[1312px] bg-[var(--color-black-solid)]" />
      <div
        className="absolute left-[169px] top-[-673.29px] h-[1459.73px] w-[1367.46px]"
        style={{
          background:
            "linear-gradient(220deg, var(--color-grey-94), var(--color-cyan-51) 20%, var(--color-cyan-9))",
        }}
      />
      <div
        className="absolute left-[-867px] top-[-651.22px] h-[1413.41px] w-[1413.41px]"
        style={{
          background:
            "linear-gradient(315deg, var(--color-grey-94), var(--color-cyan-51) 20%, var(--color-cyan-9))",
        }}
      />

      {COLUMNS.map((column, colIndex) => {
        const x = colIndex * COLUMN_GAP;
        return column.rows.map((highlighted, rowIndex) => {
          const y = rowIndex * CELL_HEIGHT - 35;
          return (
            <div
              key={`${colIndex}-${rowIndex}`}
              className={`absolute ${
                highlighted
                  ? "bg-[var(--color-cyan-5)]"
                  : "bg-[var(--color-white-1)] outline outline-[0.5px] -outline-offset-[0.25px] outline-[var(--color-cyan-17)]"
              }`}
              style={{
                left: x,
                top: y,
                width: CELL_WIDTH,
                height: CELL_HEIGHT,
              }}
            />
          );
        });
      })}
    </div>
  );
}

type HireExcelAgentHeroProps = {
  frameIndex?: string;
};

export default function HireExcelAgentHero({
  frameIndex = "9",
}: HireExcelAgentHeroProps) {
  return (
    <section
      style={tokens}
      className="relative mx-auto flex w-full max-w-[1314px] flex-col items-start justify-start
                 border-l border-r border-[var(--color-white-10)] bg-[var(--color-black-solid)]
                 px-4 pt-16 sm:px-6 md:pt-24 lg:pt-32"
    >
      <div className="absolute left-[-47px] top-0 hidden w-12 items-center justify-center pb-3.5 pt-3 lg:flex">
        <span className="text-center font-['IBM_Plex_Mono'] text-sm font-normal leading-5 tracking-tight text-white">
          {frameIndex}
        </span>
      </div>

      <div className="flex w-full flex-col items-center gap-12 sm:gap-16 md:gap-20">
        <div className="flex w-full max-w-[1089px] flex-col items-start justify-start gap-4">
          <p className="font-['IBM_Plex_Mono'] text-sm font-normal uppercase leading-5 tracking-tight text-[var(--color-spring-green-44)]">
            =Put Endex to work
          </p>

          <h1 className="font-['Roboto'] text-4xl font-normal leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[83.6px]">
            Hire your AI Excel Agent
          </h1>

          <div className="flex items-center justify-start gap-4 pt-4">
            <HeroCtaButton label="Enterprise" />
            <HeroCtaButton label="Join Waitlist" />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center overflow-hidden">
          <HeroGridBackdrop />
        </div>
      </div>
    </section>
  );
}
