"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface KineticGridProps {
  className?: string;
  gridSpacing?: number;
  lineColor?: string;
  activeLineColor?: string;
  nodeColor?: string;
  warpRadius?: number;
  warpForce?: number;
  springTension?: number;
  damping?: number;
}

interface GridPoint {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  amplitude: number;
  decay: number;
}

export default function KineticGrid({
  className = "",
  gridSpacing = 48,
  lineColor = "rgba(255, 255, 255, 0.08)",
  activeLineColor = "rgba(56, 189, 248, 0.22)",
  nodeColor = "rgba(56, 189, 248, 0.35)",
  warpRadius = 180,
  warpForce = 32,
  springTension = 0.06,
  damping = 0.88,
}: KineticGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const [effectiveGridSpacing, setEffectiveGridSpacing] = useState(gridSpacing);

  // Device-aware grid spacing scaling (increase spacing on low-end hardware)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const nav = navigator as unknown as {
      hardwareConcurrency?: number;
      deviceMemory?: number;
    };
    const isLowEnd =
      (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4);
    const isMobile = window.innerWidth < 768;

    if (isLowEnd || isMobile) {
      setEffectiveGridSpacing(Math.round(gridSpacing * 1.35));
    } else {
      setEffectiveGridSpacing(gridSpacing);
    }
  }, [gridSpacing]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isVisible = true;
    let isRunning = false;
    let isDisplaced = false;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let points: GridPoint[][] = [];
    const ripples: Ripple[] = [];
    let cachedRect = { left: 0, top: 0, width: 0, height: 0 };

    // Offscreen Canvas for resting grid cache
    let offscreenCanvas: HTMLCanvasElement | null = null;
    let offscreenCtx: CanvasRenderingContext2D | null = null;

    const mouse = {
      x: -9999,
      y: -9999,
      isHovered: false,
    };

    const buildGrid = (w: number, h: number, dpr: number) => {
      width = w;
      height = h;
      cols = Math.ceil(width / effectiveGridSpacing) + 2;
      rows = Math.ceil(height / effectiveGridSpacing) + 2;

      offsetX = (width - (cols - 1) * effectiveGridSpacing) / 2;
      offsetY = (height - (rows - 1) * effectiveGridSpacing) / 2;

      points = [];
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const bx = offsetX + c * effectiveGridSpacing;
          const by = offsetY + r * effectiveGridSpacing;
          points[r][c] = {
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
          };
        }
      }

      // Pre-render resting grid to offscreen canvas
      if (!offscreenCanvas) {
        offscreenCanvas = document.createElement("canvas");
      }
      offscreenCanvas.width = Math.floor(width * dpr);
      offscreenCanvas.height = Math.floor(height * dpr);
      offscreenCtx = offscreenCanvas.getContext("2d", { alpha: true });

      if (offscreenCtx) {
        offscreenCtx.resetTransform?.();
        offscreenCtx.scale(dpr, dpr);
        offscreenCtx.clearRect(0, 0, width, height);

        // Batch pre-render all resting lines
        const staticLinePath = new Path2D();
        for (let r = 0; r < rows; r++) {
          staticLinePath.moveTo(points[r][0].baseX, points[r][0].baseY);
          for (let c = 1; c < cols; c++) {
            staticLinePath.lineTo(points[r][c].baseX, points[r][c].baseY);
          }
        }
        for (let c = 0; c < cols; c++) {
          staticLinePath.moveTo(points[0][c].baseX, points[0][c].baseY);
          for (let r = 1; r < rows; r++) {
            staticLinePath.lineTo(points[r][c].baseX, points[r][c].baseY);
          }
        }
        offscreenCtx.lineWidth = 1;
        offscreenCtx.strokeStyle = lineColor;
        offscreenCtx.stroke(staticLinePath);

        // Batch pre-render all resting nodes
        const staticNodesPath = new Path2D();
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const pt = points[r][c];
            staticNodesPath.moveTo(pt.baseX + 1.2, pt.baseY);
            staticNodesPath.arc(pt.baseX, pt.baseY, 1.2, 0, Math.PI * 2);
          }
        }
        offscreenCtx.fillStyle = nodeColor;
        offscreenCtx.fill(staticNodesPath);
      }

      // Render the resting frame immediately
      ctx.clearRect(0, 0, width, height);
      if (offscreenCanvas) {
        ctx.drawImage(offscreenCanvas, 0, 0, width, height);
      }
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

      cachedRect = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
      };

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      buildGrid(rect.width, rect.height, dpr);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible || reducedMotion) return;
      const pageX = e.pageX ?? e.clientX + window.scrollX;
      const pageY = e.pageY ?? e.clientY + window.scrollY;
      mouse.x = pageX - cachedRect.left;
      mouse.y = pageY - cachedRect.top;
      mouse.isHovered = true;
      isDisplaced = true;
    };

    const handlePointerLeave = () => {
      mouse.isHovered = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (!isVisible || reducedMotion) return;
      const pageX = e.pageX ?? e.clientX + window.scrollX;
      const pageY = e.pageY ?? e.clientY + window.scrollY;
      const clickX = pageX - cachedRect.left;
      const clickY = pageY - cachedRect.top;

      ripples.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.9,
        speed: 8.5,
        amplitude: 28,
        decay: 0.965,
      });
      isDisplaced = true;
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    handleResize();

    // Physics Simulation & Render Function
    const render = () => {
      if (!isVisible) return;

      // Resting state fast-path: blit the cached offscreen canvas and idle
      if (!isDisplaced && !mouse.isHovered && ripples.length === 0) {
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Update active ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += ripple.speed;
        ripple.amplitude *= ripple.decay;

        if (ripple.radius > ripple.maxRadius || ripple.amplitude < 0.2) {
          ripples.splice(i, 1);
        }
      }

      // 1. Spatial Narrowing: Mouse warp force (only evaluate points within warpRadius)
      if (mouse.isHovered) {
        const minC = Math.max(0, Math.floor((mouse.x - warpRadius - offsetX) / effectiveGridSpacing));
        const maxC = Math.min(cols - 1, Math.ceil((mouse.x + warpRadius - offsetX) / effectiveGridSpacing));
        const minR = Math.max(0, Math.floor((mouse.y - warpRadius - offsetY) / effectiveGridSpacing));
        const maxR = Math.min(rows - 1, Math.ceil((mouse.y + warpRadius - offsetY) / effectiveGridSpacing));

        for (let r = minR; r <= maxR; r++) {
          for (let c = minC; c <= maxC; c++) {
            const pt = points[r][c];
            const dx = pt.x - mouse.x;
            const dy = pt.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < warpRadius && dist > 0.001) {
              const normalDist = dist / warpRadius;
              const force = (1 - normalDist) * (1 - normalDist) * warpForce;
              pt.vx += (dx / dist) * force * 0.18;
              pt.vy += (dy / dist) * force * 0.18;
            }
          }
        }
      }

      // 2. Spatial Narrowing: Ripple shockwaves (only evaluate points in ripple wave band)
      for (let i = 0; i < ripples.length; i++) {
        const rip = ripples[i];
        const outerRad = rip.radius + 60;
        const minC = Math.max(0, Math.floor((rip.x - outerRad - offsetX) / effectiveGridSpacing));
        const maxC = Math.min(cols - 1, Math.ceil((rip.x + outerRad - offsetX) / effectiveGridSpacing));
        const minR = Math.max(0, Math.floor((rip.y - outerRad - offsetY) / effectiveGridSpacing));
        const maxR = Math.min(rows - 1, Math.ceil((rip.y + outerRad - offsetY) / effectiveGridSpacing));

        for (let r = minR; r <= maxR; r++) {
          for (let c = minC; c <= maxC; c++) {
            const pt = points[r][c];
            const dx = pt.x - rip.x;
            const dy = pt.y - rip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const waveDist = Math.abs(dist - rip.radius);

            if (waveDist < 60 && dist > 0.001) {
              const waveFactor = Math.cos((waveDist / 60) * (Math.PI / 2));
              const push = waveFactor * rip.amplitude * 0.2;
              pt.vx += (dx / dist) * push;
              pt.vy += (dy / dist) * push;
            }
          }
        }
      }

      // 3. Spring Physics Integration & Displacement Measurement
      let maxDisplacement = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];

          const springX = (pt.baseX - pt.x) * springTension;
          const springY = (pt.baseY - pt.y) * springTension;

          pt.vx = (pt.vx + springX) * damping;
          pt.vy = (pt.vy + springY) * damping;

          pt.x += pt.vx;
          pt.y += pt.vy;

          const disp = Math.abs(pt.x - pt.baseX) + Math.abs(pt.y - pt.baseY);
          if (disp > maxDisplacement) maxDisplacement = disp;
        }
      }

      // Check if grid has fully settled back to rest
      if (!mouse.isHovered && ripples.length === 0 && maxDisplacement < 0.08) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const pt = points[r][c];
            pt.x = pt.baseX;
            pt.y = pt.baseY;
            pt.vx = 0;
            pt.vy = 0;
          }
        }
        isDisplaced = false;
        if (offscreenCanvas) {
          ctx.drawImage(offscreenCanvas, 0, 0, width, height);
        }
        return;
      }

      // 4. Batch Drawing: Draw ALL grid lines with a SINGLE Path2D stroke call
      ctx.lineWidth = 1;
      const linePath = new Path2D();

      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        linePath.moveTo(points[r][0].x, points[r][0].y);
        for (let c = 1; c < cols; c++) {
          linePath.lineTo(points[r][c].x, points[r][c].y);
        }
      }

      // Vertical lines
      for (let c = 0; c < cols; c++) {
        linePath.moveTo(points[0][c].x, points[0][c].y);
        for (let r = 1; r < rows; r++) {
          linePath.lineTo(points[r][c].x, points[r][c].y);
        }
      }

      ctx.strokeStyle = lineColor;
      ctx.stroke(linePath);

      // 5. Batch Drawing: Resting nodes into a single Path2D, active nodes separately
      const restingNodesPath = new Path2D();
      const activeNodes: { x: number; y: number; alpha: number }[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];
          const disp = Math.hypot(pt.x - pt.baseX, pt.y - pt.baseY);

          if (disp > 1.2) {
            const alpha = Math.min(disp / 15, 0.85);
            activeNodes.push({ x: pt.x, y: pt.y, alpha });
          } else {
            restingNodesPath.moveTo(pt.x + 1.2, pt.y);
            restingNodesPath.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
          }
        }
      }

      // Single fill call for all resting nodes
      ctx.fillStyle = nodeColor;
      ctx.fill(restingNodesPath);

      // Render the few active displaced nodes (typically < 20)
      for (let i = 0; i < activeNodes.length; i++) {
        const an = activeNodes[i];
        ctx.fillStyle = activeLineColor.replace(/[\d.]+\)$/, `${an.alpha})`);
        ctx.beginPath();
        ctx.arc(an.x, an.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Shared gsap.ticker integration (unified with LenisProvider)
    const tickerCb = () => {
      render();
    };

    const startLoop = () => {
      if (isRunning || !isVisible || reducedMotion) return;
      isRunning = true;
      gsap.ticker.add(tickerCb);
    };

    const stopLoop = () => {
      if (isRunning) {
        isRunning = false;
        gsap.ticker.remove(tickerCb);
      }
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting;
              if (isVisible) {
                startLoop();
              } else {
                stopLoop();
              }
            },
            { threshold: 0.05 }
          )
        : null;

    if (io) io.observe(container);

    if (!reducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      container.addEventListener("mouseleave", handlePointerLeave, { passive: true });
      window.addEventListener("click", handlePointerDown, { passive: true });
      startLoop();
    }

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      if (io) io.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("click", handlePointerDown);
    };
  }, [
    effectiveGridSpacing,
    lineColor,
    activeLineColor,
    nodeColor,
    warpRadius,
    warpForce,
    springTension,
    damping,
    reducedMotion,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ touchAction: "none" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block pointer-events-none"
      />
    </div>
  );
}

