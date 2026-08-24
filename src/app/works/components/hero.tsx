"use client";

import React, { useEffect, useRef } from "react";

interface HeroProps {
  text?: string;
  videoSrc?: string;
}

export default function Hero({
  text = "WORKS",
  videoSrc = "/LLW_Credentials.mp4",
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const textEl = textRef.current;
    if (!video || !canvas || !textEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;

    video.play().catch((err) => {
      console.error("Video play() was blocked or failed:", err);
    });

    const drawFrame = () => {
      if (cancelled) return;

      if (video.videoWidth > 0) {
        if (canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        try {
          textEl.style.backgroundImage = `url(${canvas.toDataURL("image/jpeg", 0.85)})`;
        } catch (err) {
          console.error(
            "Canvas is tainted, likely a cross-origin video without CORS:",
            err,
          );
        }
      }

      if ("requestVideoFrameCallback" in video) {
        (video as any).requestVideoFrameCallback(drawFrame);
      } else {
        requestAnimationFrame(drawFrame);
      }
    };

    if ("requestVideoFrameCallback" in video) {
      (video as any).requestVideoFrameCallback(drawFrame);
    } else {
      requestAnimationFrame(drawFrame);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative h-[50vh] lg:h-[80vh] w-full bg-white overflow-hidden flex items-center justify-center container mx-auto ">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute w-px h-px opacity-0 pointer-events-none overflow-hidden"
        style={{ top: "-9999px", left: "-9999px" }}
        onError={(e) => console.error("Video failed to load:", e)}
      />
      <canvas ref={canvasRef} className="hidden" />

      <h1
        ref={textRef}
        className="text-[22vw] md:text-[18vw] font-black uppercase leading-none text-center"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {text}
      </h1>
    </section>
  );
}
