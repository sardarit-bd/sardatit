"use client";

import React, { useEffect, useRef } from "react";

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

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let points: GridPoint[][] = [];
    const ripples: Ripple[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isHovered: false,
    };

    const buildGrid = (w: number, h: number) => {
      width = w;
      height = h;
      cols = Math.ceil(width / gridSpacing) + 2;
      rows = Math.ceil(height / gridSpacing) + 2;

      const offsetX = (width - (cols - 1) * gridSpacing) / 2;
      const offsetY = (height - (rows - 1) * gridSpacing) / 2;

      points = [];
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const bx = offsetX + c * gridSpacing;
          const by = offsetY + r * gridSpacing;
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
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      buildGrid(rect.width, rect.height);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handlePointerLeave = () => {
      mouse.isHovered = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handlePointerDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      ripples.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.9,
        speed: 8.5,
        amplitude: 28,
        decay: 0.965,
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    handleResize();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("mouseleave", handlePointerLeave, { passive: true });
    window.addEventListener("click", handlePointerDown, { passive: true });

    // Physics Simulation & Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += ripple.speed;
        ripple.amplitude *= ripple.decay;

        if (ripple.radius > ripple.maxRadius || ripple.amplitude < 0.2) {
          ripples.splice(i, 1);
        }
      }

      // Update grid points with physics
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];

          // Mouse warp force (radial push away with smooth falloff)
          if (mouse.isHovered) {
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

          // Ripple shockwave influence
          for (let i = 0; i < ripples.length; i++) {
            const rip = ripples[i];
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

          // Spring return to origin
          const springX = (pt.baseX - pt.x) * springTension;
          const springY = (pt.baseY - pt.y) * springTension;

          pt.vx = (pt.vx + springX) * damping;
          pt.vy = (pt.vy + springY) * damping;

          pt.x += pt.vx;
          pt.y += pt.vy;
        }
      }

      // Draw Grid Lines
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];
          if (c === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.strokeStyle = lineColor;
        ctx.stroke();
      }

      // Vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = points[r][c];
          if (r === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.strokeStyle = lineColor;
        ctx.stroke();
      }

      // Draw Intersection Nodes & Glow on Displacement
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];
          const disp = Math.hypot(pt.x - pt.baseX, pt.y - pt.baseY);

          // Render crosshair / node dot
          if (disp > 1.2) {
            // Excited / active node
            const alpha = Math.min(disp / 15, 0.85);
            ctx.fillStyle = activeLineColor.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Resting subtle node
            ctx.fillStyle = nodeColor;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("click", handlePointerDown);
    };
  }, [
    gridSpacing,
    lineColor,
    activeLineColor,
    nodeColor,
    warpRadius,
    warpForce,
    springTension,
    damping,
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
