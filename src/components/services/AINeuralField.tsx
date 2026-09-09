"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

/* ------------------------------------------------------------------ */
/*  Text -> Particle Sampling (Dense, Sharp & High-Legibility)        */
/* ------------------------------------------------------------------ */

const CANVAS_W = 1400;
const CANVAS_H = 420;
const WORLD_SCALE = 8.4 / CANVAS_W; // Well-proportioned framing within ellipse

function createSeededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** Determines a bold font size that fills the canvas prominently */
function fitSharedFontSize(words: string[]): number {
  if (typeof document === "undefined") return 220;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 220;
  const maxWidth = CANVAS_W * 0.88;
  let fontSize = 260;
  for (const word of words) {
    let size = fontSize;
    ctx.font = `900 ${size}px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    while (ctx.measureText(word).width > maxWidth && size > 30) {
      size -= 4;
      ctx.font = `900 ${size}px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    }
    fontSize = Math.min(fontSize, size);
  }
  return fontSize;
}

/**
 * Samples points densely so the letters look solid, sharp,
 * and bold across the center without fuzzy noise.
 */
function sampleTextPoints(text: string, count: number, fontSize: number): Float32Array {
  const positions = new Float32Array(count * 3);
  if (typeof document === "undefined") return positions;

  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return positions;

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${fontSize}px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.fillText(text, CANVAS_W / 2, CANVAS_H / 2);

  const { data } = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
  const rawCandidates: { x: number; y: number }[] = [];

  // Fine 2px sampling step for dense, solid letter coverage
  for (let y = 0; y < CANVAS_H; y += 2) {
    for (let x = 0; x < CANVAS_W; x += 2) {
      const alpha = data[(y * CANVAS_W + x) * 4 + 3];
      if (alpha > 125) {
        rawCandidates.push({ x, y });
      }
    }
  }

  let seed = 1337;
  for (let c = 0; c < text.length; c++) {
    seed = (seed * 31 + text.charCodeAt(c)) | 0;
  }
  const rng = createSeededRng(Math.abs(seed) + 1);

  for (let i = rawCandidates.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = rawCandidates[i];
    rawCandidates[i] = rawCandidates[j];
    rawCandidates[j] = temp;
  }

  const acceptedCount = Math.min(rawCandidates.length, count);
  for (let i = 0; i < count; i++) {
    const p = rawCandidates[i % acceptedCount];
    positions[i * 3] = (p.x - CANVAS_W / 2) * WORLD_SCALE;
    positions[i * 3 + 1] = -(p.y - CANVAS_H / 2) * WORLD_SCALE;
    // Planar z-depth keeps letterforms razor-sharp
    positions[i * 3 + 2] = (rng() - 0.5) * 0.02;
  }

  return positions;
}

function makeScatterCloud(count: number, spread = 8.5): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;
  }
  return positions;
}

/** Crisp circular sprite with anti-aliased edge for solid rendering under NormalBlending */
function useDotTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    // Solid circular core with smooth edge anti-aliasing
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.72, "rgba(255,255,255,1)");
    gradient.addColorStop(0.92, "rgba(255,255,255,0.7)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function easeInOutQuint(t: number): number {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

const WORDS = ["Sardar IT", "Innovation", "Future"];
export const HOLD_SECONDS = 6.0; // relaxed 6 seconds hold
export const TRANSITION_DURATION = 2.8; // fluid, leisurely 2.8s morphing

export interface ParticleMotionConfig {
  /** Controls how fast the cloth wave travels across the text (default: 1.8) */
  waveSpeed?: number;
  /** Controls the density of ripples across the letters (default: 0.9) */
  waveFrequency?: number;
  /** Controls the 3D folding depth on the Z-axis (default: 0.15) */
  waveAmplitudeZ?: number;
  /** Controls the vertical bobbing on the Y-axis (default: 0.035) */
  waveAmplitudeY?: number;
  /** Controls the overall group floating speed (default: 0.8) */
  floatSpeed?: number;
  /** Controls how far up and down the whole text group drifts (default: 0.08) */
  floatDistance?: number;
  /** Multiplier for 3D mouse parallax and natural tilting (default: 1.0) */
  tiltIntensity?: number;
}

export const DEFAULT_MOTION_CONFIG: Required<ParticleMotionConfig> = {
  waveSpeed: 1.8,
  waveFrequency: 0.9,
  waveAmplitudeZ: 0.15,
  waveAmplitudeY: 0.035,
  floatSpeed: 0.8,
  floatDistance: 0.08,
  tiltIntensity: 1.0,
};

interface ParticleFieldProps {
  count: number;
  hoverRef: React.RefObject<boolean>;
  onIndexChange?: (index: number, holdDuration?: number) => void;
  onTransitionStart?: () => void;
  motionConfig?: ParticleMotionConfig;
}

function ParticleField({
  count,
  hoverRef,
  onIndexChange,
  onTransitionStart,
  motionConfig,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const texture = useDotTexture();
  const pointer = useRef({ x: 0, y: 0 });

  const cfg = useMemo(
    () => ({
      ...DEFAULT_MOTION_CONFIG,
      ...motionConfig,
    }),
    [motionConfig]
  );
  const cfgRef = useRef(cfg);
  useEffect(() => {
    cfgRef.current = cfg;
  }, [cfg]);

  const onIndexChangeRef = useRef(onIndexChange);
  useEffect(() => {
    onIndexChangeRef.current = onIndexChange;
  }, [onIndexChange]);

  const onTransitionStartRef = useRef(onTransitionStart);
  useEffect(() => {
    onTransitionStartRef.current = onTransitionStart;
  }, [onTransitionStart]);

  useEffect(() => {
    onIndexChangeRef.current?.(0);
  }, []);

  const fontSize = useMemo(() => fitSharedFontSize(WORDS), []);
  const shapes = useMemo(
    () => WORDS.map((word) => sampleTextPoints(word, count, fontSize)),
    [count, fontSize]
  );
  const scatterCloud = useMemo(() => makeScatterCloud(count), [count]);

  // Gentle curving morph offsets
  const morphCurvatures = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.35;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    return arr;
  }, [count]);

  // Brand colors: Deep Royal Blue (#0052FF) + Radiant Coral (#FF3A00)
  const baseBlue = useMemo(() => new THREE.Color("#0052FF"), []);
  const highlightColor = useMemo(() => new THREE.Color("#FF3A00"), []);

  // Precomputed base colors with rich saturation and tonal contrast
  const baseColors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const tone = 0.9 + (Math.sin(i * 0.17) * 0.5 + 0.5) * 0.2;
      arr[i * 3] = Math.min(1, baseBlue.r * tone);
      arr[i * 3 + 1] = Math.min(1, baseBlue.g * tone);
      arr[i * 3 + 2] = Math.min(1, baseBlue.b * tone);
    }
    return arr;
  }, [count, baseBlue]);

  // Per-particle dynamic highlight array (for smooth proximity fading)
  const highlightArr = useRef(new Float32Array(count));

  // Buffer Geometry setup with dynamic position, color, and aScale attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(scatterCloud.slice(), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(baseColors.slice(), 3));
    const scales = new Float32Array(count).fill(1.0);
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return geo;
  }, [count, scatterCloud, baseColors]);

  // Shader hook for per-particle scale on proximity
  const onBeforeCompile = useMemo(() => {
    return (shader: THREE.WebGLProgramParametersWithUniforms) => {
      shader.vertexShader = `
        attribute float aScale;
        ${shader.vertexShader}
      `;
      shader.vertexShader = shader.vertexShader.replace(
        "gl_PointSize = size;",
        "gl_PointSize = size * aScale;"
      );
    };
  }, []);

  const currentIndexRef = useRef(0);
  const nextIndexRef = useRef(1);
  const transitionStartRef = useRef<number | null>(null);
  const holdStartRef = useRef<number | null>(null);
  const entranceDoneRef = useRef(false);

  // Entrance: assemble from scatter cloud into the first word
  useEffect(() => {
    const entrance = { t: 0 };
    const tween = gsap.to(entrance, {
      t: 1,
      duration: 2.2,
      delay: 0.1,
      ease: "power3.out",
      onUpdate: () => {
        const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        const target = shapes[0];
        for (let i = 0; i < arr.length; i++) {
          arr[i] = THREE.MathUtils.lerp(scatterCloud[i], target[i], entrance.t);
        }
        posAttr.needsUpdate = true;
      },
      onComplete: () => {
        entranceDoneRef.current = true;
        holdStartRef.current = null;
        onIndexChangeRef.current?.(0, HOLD_SECONDS);
      },
    });
    return () => {
      tween.kill();
    };
  }, [geometry, scatterCloud, shapes]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const hadHighlightsRef = useRef(false);

  useFrame((state, delta) => {
    if (!pointsRef.current || !groupRef.current || !entranceDoneRef.current) return;

    const elapsed = state.clock.getElapsedTime();

    // Word hold duration timer: hold each word for exactly HOLD_SECONDS
    if (transitionStartRef.current === null) {
      if (holdStartRef.current === null) {
        holdStartRef.current = elapsed;
      } else if (elapsed - holdStartRef.current >= HOLD_SECONDS) {
        transitionStartRef.current = elapsed;
        holdStartRef.current = null;
        onTransitionStartRef.current?.();
      }
    }

    let blend = 0;
    let morphArc = 0;
    const isTransitioning = transitionStartRef.current !== null;

    if (isTransitioning) {
      const rawT = (elapsed - transitionStartRef.current!) / TRANSITION_DURATION;
      const t = Math.min(Math.max(rawT, 0), 1);

      blend = easeInOutQuint(t);
      morphArc = Math.sin(Math.PI * blend);

      if (t >= 1) {
        currentIndexRef.current = nextIndexRef.current;
        nextIndexRef.current = (currentIndexRef.current + 1) % shapes.length;
        transitionStartRef.current = null;
        blend = 0;
        morphArc = 0;
        holdStartRef.current = elapsed;
        onIndexChangeRef.current?.(currentIndexRef.current, HOLD_SECONDS);
      }
    }

    const shapeCur = shapes[currentIndexRef.current];
    const shapeNext = shapes[nextIndexRef.current];
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    const colorAttr = geometry.getAttribute("color") as THREE.BufferAttribute;
    const colorArr = colorAttr.array as Float32Array;

    const scaleAttr = geometry.getAttribute("aScale") as THREE.BufferAttribute;
    const scaleArr = scaleAttr.array as Float32Array;

    // Convert pointer from normalized device coords to world units at Z=0
    const mouseWorldX = (pointer.current.x * state.viewport.width) / 2;
    const mouseWorldY = (pointer.current.y * state.viewport.height) / 2;
    const isHovered = hoverRef.current;
    const proximityRadius = 1.55;
    const proximityRadiusSq = proximityRadius * proximityRadius;

    const config = cfgRef.current;

    // Precomputed loop invariants based on customizable motion config
    const speed = config.waveSpeed;
    const freq = config.waveFrequency;
    const waveTime1 = elapsed * (speed * 1.5);
    const waveTime2 = elapsed * (speed * 2.2);
    const dampFactor = 1 - Math.exp(-8.5 * delta);
    const highlightR = highlightColor.r;
    const highlightG = highlightColor.g;
    const highlightB = highlightColor.b;
    const hArr = highlightArr.current;

    let hasActiveHighlights = false;

    // -----------------------------------------------------------------
    // 1. POSITION UPDATE: Dynamic Cloth Wave + Morphing (Fast Inline Math)
    // 2. HOVER UPDATE: Proximity Color Glow & Scale (Zero Displacement)
    // -----------------------------------------------------------------
    for (let i = 0; i < count; i++) {
      const ix = i * 3;

      // Base coordinate morphing (inline lerp for speed, 0 function call overhead)
      let baseX: number;
      let baseY: number;
      let baseZ: number;

      if (isTransitioning) {
        baseX = shapeCur[ix] + (shapeNext[ix] - shapeCur[ix]) * blend;
        baseY = shapeCur[ix + 1] + (shapeNext[ix + 1] - shapeCur[ix + 1]) * blend;
        baseZ = shapeCur[ix + 2] + (shapeNext[ix + 2] - shapeCur[ix + 2]) * blend;

        if (morphArc > 0.0001) {
          baseX += morphCurvatures[ix] * morphArc;
          baseY += morphCurvatures[ix + 1] * morphArc;
          baseZ += morphCurvatures[ix + 2] * morphArc;
        }
      } else {
        baseX = shapeCur[ix];
        baseY = shapeCur[ix + 1];
        baseZ = shapeCur[ix + 2];
      }

      // Traveling cloth wave phase & 3D folding displacements
      const phase1 = waveTime1 - baseX * freq + baseY * (freq * 0.25);
      const phase2 = waveTime2 - baseX * (freq * 1.5) - baseY * (freq * 0.35);

      const waveZ = Math.sin(phase1) * (config.waveAmplitudeZ * 0.78) + Math.sin(phase2) * (config.waveAmplitudeZ * 0.22);
      const waveY = Math.cos(phase1) * (config.waveAmplitudeY * 0.75) + Math.sin(phase2) * (config.waveAmplitudeY * 0.25);

      // Write position (100% stable: ZERO displacement from mouse)
      posArr[ix] = baseX;
      posArr[ix + 1] = baseY + waveY;
      posArr[ix + 2] = baseZ + waveZ;

      // Interactive Cursor Proximity Highlight
      let targetHighlight = 0;
      if (isHovered) {
        const dx = baseX - mouseWorldX;
        const dy = (baseY + waveY) - mouseWorldY;
        const dSq = dx * dx + dy * dy;
        if (dSq < proximityRadiusSq) {
          const dist = Math.sqrt(dSq);
          const ratio = 1 - dist / proximityRadius;
          targetHighlight = ratio * ratio * (3 - 2 * ratio);
        }
      }

      const prevH = hArr[i];
      const currentH = prevH + (targetHighlight - prevH) * dampFactor;
      hArr[i] = currentH;

      if (currentH > 0.001 || targetHighlight > 0.001) {
        hasActiveHighlights = true;
        colorArr[ix] = baseColors[ix] + (highlightR - baseColors[ix]) * currentH;
        colorArr[ix + 1] = baseColors[ix + 1] + (highlightG - baseColors[ix + 1]) * currentH;
        colorArr[ix + 2] = baseColors[ix + 2] + (highlightB - baseColors[ix + 2]) * currentH;
        scaleArr[i] = 1.0 + currentH * 0.40;
      } else if (prevH > 0.001) {
        colorArr[ix] = baseColors[ix];
        colorArr[ix + 1] = baseColors[ix + 1];
        colorArr[ix + 2] = baseColors[ix + 2];
        scaleArr[i] = 1.0;
      }
    }

    posAttr.needsUpdate = true;

    // Buffer upload optimization: only send color/scale to GPU when hover state changed
    if (hasActiveHighlights || hadHighlightsRef.current) {
      colorAttr.needsUpdate = true;
      scaleAttr.needsUpdate = true;
      hadHighlightsRef.current = hasActiveHighlights;
    }

    // Configurable group floating and mouse parallax tilt
    const floatY = Math.sin(elapsed * config.floatSpeed) * config.floatDistance;
    groupRef.current.position.y = floatY;

    const tilt = config.tiltIntensity;
    const targetRotX = (Math.sin(elapsed * (config.floatSpeed * 0.8)) * 0.02 + pointer.current.y * 0.04) * tilt;
    const targetRotY = (Math.cos(elapsed * (config.floatSpeed * 0.65)) * 0.025 + pointer.current.x * 0.06) * tilt;
    const targetRotZ = (Math.sin(elapsed * (config.floatSpeed * 0.5)) * 0.01) * tilt;

    const rotDamp = 1.8 * Math.max(config.floatSpeed, 0.5);
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      rotDamp,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      rotDamp,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetRotZ,
      rotDamp,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.046}
          vertexColors
          map={texture ?? undefined}
          transparent
          alphaTest={0.01}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.NormalBlending}
          onBeforeCompile={onBeforeCompile}
        />
      </points>
    </group>
  );
}

function CameraRig() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    // Dynamically adjust camera Z distance for narrow mobile screens so long words like "Innovation" stay fully inside screen borders
    let targetZ = 5.4;
    if (aspect < 0.85) {
      targetZ = 8.6;
    } else if (aspect < 1.1) {
      targetZ = 7.5;
    } else if (aspect < 1.35) {
      targetZ = 6.6;
    } else if (aspect < 1.6) {
      targetZ = 5.9;
    }
    camera.position.set(0, 0, targetZ);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);
  return null;
}

export interface AINeuralFieldProps {
  className?: string;
  onIndexChange?: (index: number, holdDuration?: number) => void;
  onTransitionStart?: () => void;
  motionConfig?: ParticleMotionConfig;
}

export default function AINeuralField({
  className = "",
  onIndexChange,
  onTransitionStart,
  motionConfig,
}: AINeuralFieldProps) {
  const [particleCount, setParticleCount] = useState(3400);
  const hoverRef = useRef(false);

  useEffect(() => {
    const updateCount = () => {
      setParticleCount(
        window.innerWidth < 640 ? 1600 : window.innerWidth < 1024 ? 2500 : 3400
      );
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <div
      className={`${className} cursor-crosshair select-none bg-transparent w-full h-full`}
      style={{ contain: "layout paint size", transform: "translateZ(0)" }}
      onPointerEnter={() => {
        hoverRef.current = true;
      }}
      onPointerLeave={() => {
        hoverRef.current = false;
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ fov: 45, near: 0.1, far: 100 }}
      >
        <CameraRig />
        <ParticleField
          count={particleCount}
          hoverRef={hoverRef}
          onIndexChange={onIndexChange}
          onTransitionStart={onTransitionStart}
          motionConfig={motionConfig}
        />
      </Canvas>
    </div>
  );
}