"use client";

import React, { useRef } from "react";
import { FiUser } from "react-icons/fi";
import {
  SiGoogledrive,
  SiGoogledocs,
  SiWhatsapp,
  SiMessenger,
  SiN8N,
  SiFacebook,
} from "react-icons/si";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const NodeCircle = React.forwardRef(function NodeCircle(
  { className = "", children, label },
  ref
) {
  return (
    <div className="flex flex-col items-center gap-1.5 z-10">
      <div
        ref={ref}
        className={`flex size-11 sm:size-12 items-center justify-center rounded-full border border-neutral-200/90 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-110 hover:border-neutral-300 ${className}`}
      >
        {children}
      </div>
      {label && (
        <span className="text-[10px] font-mono font-medium text-neutral-500 select-none">
          {label}
        </span>
      )}
    </div>
  );
});

export default function WorkflowBeamsDemo() {
  const containerRef = useRef(null);
  const userRef = useRef(null);
  const coreRef = useRef(null);
  const gdriveRef = useRef(null);
  const gdocsRef = useRef(null);
  const whatsappRef = useRef(null);
  const messengerRef = useRef(null);
  const notionRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[360px] sm:h-[400px] w-full items-center justify-between overflow-hidden rounded-3xl px-4 sm:px-8 py-4"
    >
      {/* Column 1: Trigger / Event Source */}
      <div className="flex flex-col items-center justify-center">
        <NodeCircle ref={userRef} label="Event Hook">
          <FiUser className="size-5 text-neutral-800" />
        </NodeCircle>
      </div>

      {/* Column 2: Central n8n & Core Hub */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2 z-10">
          <div
            ref={coreRef}
            className="flex size-16 sm:size-20 items-center justify-center rounded-2xl border border-blue-600/30 bg-white ring-4 ring-blue-500/5 shadow-[0_4px_25px_-5px_rgba(37,99,235,0.12)] transition-transform duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center justify-center">
              <SiN8N className="size-7 sm:size-8 text-[#FF6D5A]" />
              <span className="text-[8px] font-mono font-bold tracking-wider text-blue-700 mt-0.5">
                AI CORE
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
            Orchestrator
          </span>
        </div>
      </div>

      {/* Column 3: Connected Output Target Apps */}
      <div className="flex flex-col items-center justify-between h-full py-2 gap-2 sm:gap-3">
        <NodeCircle ref={gdriveRef}>
          <SiGoogledrive className="size-5 text-[#34A853]" />
        </NodeCircle>
        <NodeCircle ref={gdocsRef}>
          <SiGoogledocs className="size-5 text-[#4285F4]" />
        </NodeCircle>
        <NodeCircle ref={whatsappRef}>
          <SiWhatsapp className="size-5 text-[#25D366]" />
        </NodeCircle>
        <NodeCircle ref={messengerRef}>
          <SiMessenger className="size-5 text-[#0084FF]" />
        </NodeCircle>
        <NodeCircle ref={notionRef}>
          <SiFacebook className="size-5 text-[#0084FF]" />
        </NodeCircle>
      </div>

      {/* Input Beam: User Event -> Core Hub */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={coreRef}
        duration={3}
        curvature={0}
        pathColor="#E5E7EB"
        pathOpacity={1}
        gradientStartColor="#93C5FD"
        gradientStopColor="#2563EB"
      />

      {/* Output Beams: Core Hub -> 5 Target Apps */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={coreRef}
        toRef={gdriveRef}
        duration={3.5}
        curvature={-48}
        pathColor="#E5E7EB"
        pathOpacity={1}
        gradientStartColor="#2563EB"
        gradientStopColor="#10B981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={coreRef}
        toRef={gdocsRef}
        duration={3.2}
        curvature={-24}
        pathColor="#E5E7EB"
        pathOpacity={1}
        gradientStartColor="#2563EB"
        gradientStopColor="#2563EB"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={coreRef}
        toRef={whatsappRef}
        duration={3.0}
        curvature={0}
        pathColor="#E5E7EB"
        pathOpacity={1}
        gradientStartColor="#2563EB"
        gradientStopColor="#22C55E"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={coreRef}
        toRef={messengerRef}
        duration={3.2}
        curvature={24}
        pathColor="#E5E7EB"
        pathOpacity={1}
        gradientStartColor="#2563EB"
        gradientStopColor="#2563EB"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={coreRef}
        toRef={notionRef}
        duration={3.5}
        curvature={48}
        pathColor="#E5E7EB"
        pathOpacity={1}
        gradientStartColor="#2563EB"
        gradientStopColor="#A855F7"
      />
    </div>
  );
}
