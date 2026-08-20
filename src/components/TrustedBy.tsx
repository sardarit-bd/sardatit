// src/components/TrustedBy.tsx
import Image from "next/image";

interface TrustedByLogo {
  name: string;
  src: string;
}

const logos: TrustedByLogo[] = [
  { name: "Sequoia", src: "/logo/1.avif" },
  { name: "Kodezi", src: "/logo/2.avif" },
  { name: "Combinator", src: "/logo/3.avif" },
  { name: "HeyGen", src: "/logo/4.avif" },
  { name: "Recruitly", src: "/logo/5.avif" },
  { name: "techstars", src: "/logo/6.avif" },
  { name: "Delve", src: "/logo/7.avif" },
  { name: "Dragonfly AI", src: "/logo/7.avif" },
  { name: "Accepty", src: "/logo/8.avif" },
  { name: "Mavis", src: "/logo/9.avif" },
  { name: "oppatravel", src: "/logo/10.avif" },
  { name: "Medical Student AI", src: "/logo/11.avif" },
  { name: "500", src: "/logo/12.avif" },
  { name: "ZeroEssay", src: "/logo/13.avif" },
  { name: "Seedcamp", src: "/logo/14.avif" },
  { name: "Luxora", src: "/logo/1.avif" },
  { name: "Empresaa", src: "/logo/16.avif" },
  { name: "andreessen horowitz", src: "/logo/17.avif" },
];

export function TrustedBy() {
  return (
    <section aria-label="Trusted by 550+ companies" className="py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center gap-10">
        <p className="text-xs font-semibold tracking-wide text-muted uppercase">
          / Trusted by 550+ companies
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6  w-full">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="relative flex items-center justify-center h-16 md:h-20 px-4"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="140px"
                className="object-contain p-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
