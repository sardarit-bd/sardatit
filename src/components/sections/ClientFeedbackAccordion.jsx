"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiPlay, FiStar, FiVideo, FiX } from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";

const testimonials = [
  {
    id: 1,
    index: "01",
    name: "Marcus Vance",
    role: "Head of Product",
    company: "Apex Global",
    avatar: "/image/leaders/Md-Ekramul-Hasan-Sales-Manager.webp",
    rating: 5,
    quote:
      "Sardar IT transformed our complex enterprise portal into a fast, intuitive web app. Their attention to UX detail and engineering speed were outstanding.",
    projectTag: "Enterprise Web App",
    metric: "+180% Engagement",
    videoUrl: "https://designmonks.b-cdn.net/Client%20Testimonials/David_DM.mp4",
    videoPoster: "/image/leaders/Md-Ekramul-Hasan-Sales-Manager.webp",
    videoDuration: "1:20",
  },
  {
    id: 2,
    index: "02",
    name: "Sarah Jenkins",
    role: "CEO & Co-Founder",
    company: "TechFlow Inc",
    avatar: "/image/leaders/amena.webp",
    rating: 5,
    quote:
      "Working with Sardar IT felt like having an elite in-house engineering team. They delivered our Web3 dashboard ahead of schedule with zero compromises.",
    projectTag: "FinTech Platform",
    metric: "100k+ Active Users",
    videoUrl: "https://designmonks.b-cdn.net/Client%20Testimonials/Victor_DM.mp4",
    videoPoster: "/image/leaders/amena.webp",
    videoDuration: "0:55",
  },
  {
    id: 3,
    index: "03",
    name: "Hossain Mahmud",
    role: "Project Director",
    company: "CASA Logistics",
    avatar: "/image/leaders/Hossain-Mahmud-Project-Manager.webp",
    rating: 5,
    quote:
      "The custom software solution built by Sardar IT automated 70% of our daily operations. Truly a game-changer for our logistics pipeline.",
    projectTag: "Logistics Automation",
    metric: "70% Ops Time Saved",
    videoUrl: "https://designmonks.b-cdn.net/Client%20Testimonials/Armin_DM.mp4",
    videoPoster: "/image/leaders/Hossain-Mahmud-Project-Manager.webp",
    videoDuration: "1:45",
  },
  {
    id: 4,
    index: "04",
    name: "Elena Rostova",
    role: "Chief Marketing Officer",
    company: "Luminar Digital",
    avatar: "/image/leaders/Medhi.webp",
    rating: 5,
    quote:
      "Their design team brought world-class aesthetic quality to our rebrand. Conversion rate jumped 45% within three weeks of launch!",
    projectTag: "Brand & UI/UX Design",
    metric: "+45% Conversion",
    videoUrl: "https://designmonks.b-cdn.net/Client%20Testimonials/Anika_DM.mp4",
    videoPoster: "/image/leaders/Medhi.webp",
    videoDuration: "1:10",
  },
  {
    id: 5,
    index: "05",
    name: "Sagor Hossein",
    role: "Managing Director",
    company: "Gulf Tech Solutions",
    avatar: "/image/leaders/sagor.webp",
    rating: 5,
    quote:
      "From technical consultation to deployment, Sardar IT demonstrated exceptional craftsmanship, transparency, and top-tier support.",
    projectTag: "Cloud Architecture",
    metric: "99.99% Uptime",
    videoUrl: "https://designmonks.b-cdn.net/Client%20Testimonials/Austin_DM.mp4",
    videoPoster: "/image/leaders/sagor.webp",
    videoDuration: "2:05",
  },
  {
    id: 6,
    index: "06",
    name: "Tommy Lu",
    role: "Founder",
    company: "GoodGenes",
    avatar: "/image/leaders/amena.webp",
    rating: 5,
    quote:
      "Sardar IT did an amazing job bringing my brand to life. From initial concepts to launch, their execution was flawless.",
    projectTag: "E-Commerce Rebrand",
    metric: "3.5x Revenue Growth",
    videoUrl: "https://designmonks.b-cdn.net/Client%20Testimonials/Sofia_DM.mp4",
    videoPoster: "/image/leaders/amena.webp",
    videoDuration: "1:30",
  },
];

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}?autoplay=1&rel=0`;
    }
    if (parsed.searchParams.has("v")) {
      return `https://www.youtube-nocookie.com/embed/${parsed.searchParams.get("v")}?autoplay=1&rel=0`;
    }
    if (parsed.pathname.includes("/embed/")) {
      return url;
    }
  } catch {
    return null;
  }
  return null;
}

// Subcomponent to handle individual card video play/pause on active state
function CardBackgroundVideo({ item, isActive }) {
  const videoRef = useRef(null);
  const ytEmbed = getYouTubeEmbedUrl(item.videoUrl);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {
          // Fallback if browser blocks unmuted audio before user interaction
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => { });
          }
        });
      } else {
        videoRef.current.muted = true;
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  if (ytEmbed) {
    return (
      <iframe
        src={`${ytEmbed}&controls=0&mute=${isActive ? 0 : 1}&loop=1&playlist=${ytEmbed.split('/embed/')[1]?.split('?')[0]}`}
        title={item.name}
        className="absolute inset-0 w-[140%] h-[140%] -top-[20%] -left-[20%] object-cover border-0 pointer-events-none"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={item.videoUrl}
      muted={!isActive}
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
    />
  );
}

export default function ClientFeedbackAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="w-full py-20 md:py-28 bg-[#F3F4F6] text-neutral-900 overflow-hidden relative">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#133bd4]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <SectionHeader
          tag={"Client Testimonials"}
          title1=" What Our Clients Say About"
          pre=""
          title2="Working With Us"
          isBgWhite={true}
          link={"/"}
          btn={"See Client Feedback"}
        />

        {/* 6 Full-Card Video Testimonial Accordion Gallery */}
        <div className="flex flex-col md:flex-row gap-3.5 w-full h-auto md:h-[580px] mt-14">
          {testimonials.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (isActive) {
                    setActiveVideo(item);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                layout
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className={`group relative overflow-hidden cursor-pointer transition-all duration-500 ${isActive
                  ? "md:flex-[2] h-[540px] md:h-full"
                  : "md:flex-1 h-[240px] md:h-full opacity-90 hover:opacity-100"
                  }`}
              >
                {/* Auto-Playing Background Video for Active Card, Paused for Inactive */}
                <CardBackgroundVideo item={item} isActive={isActive} />

                {/* Subtle overall dark tint */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />

                {/* Top Duration Badge & Index */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                  <span className="text-xs font-bold tracking-widest text-white/90 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    /{item.index}
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                    <FiVideo className="text-blue-400 text-xs" /> {item.videoDuration}
                  </span>
                </div>

                {/* Center Play Button (Matching Reference Image) */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div
                    className={`flex items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/50 shadow-2xl transition-transform duration-300 group-hover:scale-110 ${isActive ? "size-16 sm:size-20" : "size-12 sm:size-14"
                      }`}
                  >
                    <div
                      className={`rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg ${isActive ? "size-11 sm:size-13" : "size-8 sm:size-9"
                        }`}
                    >
                      <FiPlay className="text-lg sm:text-xl ml-0.5 fill-slate-900" />
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay - Full Typography (Matching Reference Image) */}
                {isActive ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute inset-x-0 bottom-0 pt-24 pb-7 px-6 sm:px-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end text-white z-20 pointer-events-none"
                  >
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
                      {[...Array(item.rating)].map((_, i) => (
                        <FiStar key={i} className="fill-amber-400" />
                      ))}
                    </div>

                    {/* Company / Brand Name */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 font-serif">
                      {item.company}
                    </h3>

                    {/* Quote Text */}
                    <p className="text-sm sm:text-base text-neutral-200 font-medium leading-relaxed line-clamp-3 mb-4 italic">
                      "{item.quote}"
                    </p>

                    {/* Client Name & Role */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/15">
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-300 font-normal mt-0.5">
                          {item.role} @ <span className="text-blue-300 font-medium">{item.company}</span>
                        </p>
                      </div>

                      <span className="text-xs font-semibold bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm transition-colors">
                        Full Screen
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  /* Inactive Condensed Bottom Overlay */
                  <div className="absolute inset-x-0 bottom-0 pt-16 pb-5 px-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end text-white z-20 pointer-events-none">
                    <div className="hidden md:flex flex-col items-start gap-1">
                      <h4 className="text-sm font-bold text-white truncate max-w-[110px]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-300 truncate max-w-[110px]">
                        {item.company}
                      </p>
                    </div>

                    <div className="flex md:hidden flex-col items-start gap-0.5">
                      <h4 className="text-sm font-bold text-white">{item.name}</h4>
                      <p className="text-xs text-neutral-300">{item.company}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Video Testimonial Modal (With Audio) */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/90">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-blue-500/40">
                    <Image
                      src={activeVideo.avatar}
                      alt={activeVideo.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {activeVideo.name}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {activeVideo.role} @{" "}
                      <span className="text-blue-400 font-medium">
                        {activeVideo.company}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveVideo(null)}
                  className="size-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors border border-neutral-700"
                  aria-label="Close modal"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                {getYouTubeEmbedUrl(activeVideo.videoUrl) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(activeVideo.videoUrl)}
                    title={`${activeVideo.name} Video Testimonial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <video
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    poster={activeVideo.videoPoster}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-neutral-950/95 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
                <span className="italic truncate max-w-md text-neutral-400">
                  "{activeVideo.quote}"
                </span>
                <span className="hidden sm:inline bg-neutral-800 text-neutral-200 font-semibold px-3 py-1 rounded-full border border-neutral-700">
                  {activeVideo.projectTag}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}



