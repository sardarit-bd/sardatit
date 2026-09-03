// components/ui/YouTubeBackground.tsx
"use client";

interface VideoTextCardProps {
  src: string; // full YouTube URL (youtu.be/... or youtube.com/watch?v=...)
  poster?: string;
  eyebrow?: string;
  title: string[]; // each entry = one line
  subtitle?: string;
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

export function VideoTextCard({
  src,
  eyebrow,
  title,
  subtitle,
  className = "",
}: VideoTextCardProps) {
  const videoId = extractYouTubeId(src);
  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&fs=0&iv_load_policy=3`;

  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <iframe
          src={embedSrc}
          title={title.join(" ")}
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 border-0"
        />
      </div>

      {/* dark shade so text stays readable over the video */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end gap-1 p-6 text-center text-white">
        {eyebrow && (
          <span className="text-xs font-medium uppercase tracking-wider text-white/80">
            {eyebrow}
          </span>
        )}
        <p className="text-lg font-semibold leading-tight">
          {title.map((line, i) => (
            <span key={i}>
              {line}
              {i < title.length - 1 && <br />}
            </span>
          ))}
        </p>
        {subtitle && <p className="text-xs text-white/80">{subtitle}</p>}
      </div>
    </div>
  );
}
