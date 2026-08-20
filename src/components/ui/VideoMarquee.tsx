// components/ui/VideoMarquee.tsx
"use client";

interface MarqueeVideo {
  src: string; // full YouTube URL
  eyebrow?: string;
  title: string[];
  subtitle?: string;
}

interface VideoMarqueeProps {
  videos: MarqueeVideo[];
  className?: string;
}

function extractYouTubeId(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }
    if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v") as string;
    }
    const embedMatch = parsed.pathname.match(/\/embed\/([^/]+)/);
    if (embedMatch) return embedMatch[1];
    return "";
  } catch {
    return "";
  }
}

function MarqueeCard({ video }: { video: MarqueeVideo }) {
  const videoId = extractYouTubeId(video.src);
  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&fs=0&iv_load_policy=3`;

  return (
    <div className="relative aspect-[4/5] w-[220px] sm:w-[260px] md:w-[300px] shrink-0 overflow-hidden rounded-[2rem] bg-muted">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <iframe
          src={embedSrc}
          title={video.title.join(" ")}
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 border-0"
        />
      </div>

      {/* dark shade so text stays readable over the video */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end gap-1 p-5 text-center text-white">
        {video.eyebrow && (
          <span className="text-xs font-medium uppercase tracking-wider text-white/80">
            {video.eyebrow}
          </span>
        )}
        <p className="text-base font-semibold leading-tight">
          {video.title.map((line, i) => (
            <span key={i}>
              {line}
              {i < video.title.length - 1 && <br />}
            </span>
          ))}
        </p>
        {video.subtitle && (
          <p className="text-xs text-white/80">{video.subtitle}</p>
        )}
      </div>
    </div>
  );
}

export function VideoMarquee({ videos, className = "" }: VideoMarqueeProps) {
  // duplicate the list so the track can loop seamlessly at -50%
  const trackVideos = [...videos, ...videos];

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div className="flex w-max animate-marquee gap-4 md:gap-6">
        {trackVideos.map((video, i) => (
          <MarqueeCard key={i} video={video} />
        ))}
      </div>
    </div>
  );
}
