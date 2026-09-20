"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

/* ------------------------------------------------------------------ */
/*  Text -> Particle Sampling (Dense, Sharp & Dynamic Font Auto-Fit)  */
/* ------------------------------------------------------------------ */

const CANVAS_W = 1400;
const CANVAS_H = 420;
const WORLD_SCALE = 8.4 / CANVAS_W; // Maps 1400px canvas to 8.4 Three.js world units

function createSeededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Samples points densely so the letters look solid, sharp,
 * and bold across the center with dynamic font auto-fit (~78% target width).
 */
function sampleTextPoints(text: string, count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  if (typeof document === "undefined") return positions;

  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return positions;

  // Target text width is ~78% of the available canvas width
  const targetTextWidth = canvas.width * 0.78;

  // Initial probe font size
  let fontSize = 100;
  ctx.font = `900 ${fontSize}px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const textWidth = ctx.measureText(text).width;

  // Scale font size proportionally to hit exact target width
  if (textWidth > 0) {
    fontSize = Math.floor(fontSize * (targetTextWidth / textWidth));
  }

  // Ensure vertical height fits comfortably within canvas height with breathing room
  const maxHeight = Math.floor(canvas.height * 0.65);
  fontSize = Math.min(fontSize, maxHeight);

  // Apply the dynamically fitted font
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = `900 ${fontSize}px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Render precisely in the center
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const { data } = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
  const rawCandidates: { x: number; y: number }[] = [];

  // Fine 1.5px sampling step for ultra-dense, crisp letter coverage
  for (let y = 0; y < CANVAS_H; y += 1.5) {
    const rowOffset = Math.floor(y) * CANVAS_W;
    for (let x = 0; x < CANVAS_W; x += 1.5) {
      const alpha = data[(rowOffset + Math.floor(x)) * 4 + 3];
      if (alpha > 85) {
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
    positions[i * 3 + 2] = (rng() - 0.5) * 0.015;
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

/** Crisp circular sprite with anti-aliased edge for fine stardust rendering */
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
    // Crisp circular point with sharp edge anti-aliasing without heavy bloom bleeding
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.78, "rgba(255,255,255,1)");
    gradient.addColorStop(0.92, "rgba(240,249,255,0.85)");
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

  const shapes = useMemo(
    () => WORDS.map((word) => sampleTextPoints(word, count)),
    [count]
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

  // Active morph state machine
  const currentIndexRef = useRef(0);
  const nextIndexRef = useRef(1);

  // Geometry attributes
  const { geometry, baseColors, highlightColor, onBeforeCompile } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(scatterCloud);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    // Base resting palette: pure luminous white with crystal cyan/ice blue highlights
    const colors = new Float32Array(count * 3);
    const baseCols = new Float32Array(count * 3);
    const colorWhite = new THREE.Color("#ffffff");       // Pure luminous crisp white
    const colorIceBlue = new THREE.Color("#e0f2fe");     // Crystal ice blue highlight (sky-100)
    const colorCyanLight = new THREE.Color("#bae6fd");   // Subtle crystal cyan highlight (sky-200)

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      const col = rand > 0.35 ? colorWhite : rand > 0.15 ? colorIceBlue : colorCyanLight;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
      baseCols[i * 3] = col.r;
      baseCols[i * 3 + 1] = col.g;
      baseCols[i * 3 + 2] = col.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Smooth per-particle hover scale multiplier
    const scales = new Float32Array(count);
    scales.fill(1.0);
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    // Smooth per-particle alpha: 1.0 full brightness and opacity
    const alphas = new Float32Array(count);
    alphas.fill(1.0);
    geo.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));

    // Hover / Excited state near cursor: vibrant electric cyan/blue accent (#38bdf8 / #0ea5e9)
    const hlColor = new THREE.Color("#38bdf8"); // Tailwind sky-400

    // Hook aScale and aAlpha attributes into PointsMaterial shader
    const hook = (shader: THREE.WebGLProgramParametersWithUniforms) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `#include <common>
         attribute float aScale;
         attribute float aAlpha;
         varying float vAlpha;`
      );
      shader.vertexShader = shader.vertexShader.replace(
        "gl_PointSize = size;",
        `gl_PointSize = size * aScale;
         vAlpha = aAlpha;`
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
         varying float vAlpha;`
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
        "gl_FragColor = vec4( outgoingLight, diffuseColor.a * vAlpha );"
      );
    };

    return {
      geometry: geo,
      baseColors: baseCols,
      highlightColor: hlColor,
      onBeforeCompile: hook,
    };
  }, [count, scatterCloud]);

  // Track per-particle highlight factor [0..1] for smooth lerp back to base
  const highlightArr = useRef<Float32Array>(new Float32Array(count));
  useEffect(() => {
    highlightArr.current = new Float32Array(count);
  }, [count]);

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

    const alphaAttr = geometry.getAttribute("aAlpha") as THREE.BufferAttribute;
    const alphaArr = alphaAttr.array as Float32Array;

    // Direct, accurate cursor mapping via R3F state.pointer (bounded to canvas)
    const mouseWorldX = (state.pointer.x * state.viewport.width) / 2;
    const mouseWorldY = (state.pointer.y * state.viewport.height) / 2;
    const isHovered = hoverRef.current;
    const proximityRadius = 1.65;
    const proximityRadiusSq = proximityRadius * proximityRadius;

    const config = cfgRef.current;

    // Precomputed loop invariants
    const speed = config.waveSpeed;
    const freq = config.waveFrequency;
    const waveTime1 = elapsed * (speed * 1.5);
    const waveTime2 = elapsed * (speed * 2.2);
    const dampFactor = 1 - Math.exp(-9.0 * delta);
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

      // Base coordinate morphing
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

      // Write position (stable)
      posArr[ix] = baseX;
      posArr[ix + 1] = baseY + waveY;
      posArr[ix + 2] = baseZ + waveZ;

      // Hover color glow: smooth falloff within proximity radius
      let targetHighlight = 0;
      if (isHovered) {
        const dx = baseX - mouseWorldX;
        const dy = baseY - mouseWorldY;
        const distSq = dx * dx + dy * dy;
        if (distSq < proximityRadiusSq) {
          const normDist = Math.sqrt(distSq) / proximityRadius;
          // Smooth cubic hermite falloff: 1 at center -> 0 at edge
          targetHighlight = 1 - normDist * normDist * (3 - 2 * normDist);
        }
      }

      // Exponential damping for smooth highlight decay
      const prevH = hArr[i];
      const currentH = prevH + (targetHighlight - prevH) * dampFactor;
      hArr[i] = currentH;

      if (currentH > 0.001 || targetHighlight > 0.001) {
        hasActiveHighlights = true;
        // Smooth transition to electric cyan (#38bdf8) on cursor interaction
        colorArr[ix] = baseColors[ix] + (highlightR - baseColors[ix]) * currentH;
        colorArr[ix + 1] = baseColors[ix + 1] + (highlightG - baseColors[ix + 1]) * currentH;
        colorArr[ix + 2] = baseColors[ix + 2] + (highlightB - baseColors[ix + 2]) * currentH;
        scaleArr[i] = 1.0 + currentH * 0.35;
        alphaArr[i] = 1.0;
      } else if (prevH > 0.001) {
        colorArr[ix] = baseColors[ix];
        colorArr[ix + 1] = baseColors[ix + 1];
        colorArr[ix + 2] = baseColors[ix + 2];
        scaleArr[i] = 1.0;
        alphaArr[i] = 1.0;
      }
    }

    posAttr.needsUpdate = true;

    // Buffer upload optimization: only send color/scale/alpha to GPU when hover state changed
    if (hasActiveHighlights || hadHighlightsRef.current) {
      colorAttr.needsUpdate = true;
      scaleAttr.needsUpdate = true;
      alphaAttr.needsUpdate = true;
      hadHighlightsRef.current = hasActiveHighlights;
    }

    // Configurable group floating and mouse parallax tilt
    const floatY = Math.sin(elapsed * config.floatSpeed) * config.floatDistance;
    groupRef.current.position.y = floatY;

    const tilt = config.tiltIntensity;
    const targetRotX = (Math.sin(elapsed * (config.floatSpeed * 0.8)) * 0.02 + state.pointer.y * 0.04) * tilt;
    const targetRotY = (Math.cos(elapsed * (config.floatSpeed * 0.65)) * 0.025 + state.pointer.x * 0.06) * tilt;
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

    // Keep natural 1:1 scale (no artificial downscaling)
    groupRef.current.scale.set(1.0, 1.0, 1.0);
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.025}
          vertexColors
          map={texture ?? undefined}
          transparent
          opacity={1.0}
          alphaTest={0.005}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          onBeforeCompile={onBeforeCompile}
        />
      </points>
    </group>
  );
}

/**
 * CameraRig dynamically sets camera Z distance so that the 6.552-unit text
 * occupies approximately 75% to 82% (target ~78%) of the visible canvas width
 * across ANY screen size, leaving comfortable breathing padding without clipping.
 */
function CameraRig() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    // targetZ formula:
    // Visible world width = 2 * tan(45°/2) * Z * aspect = 0.828427 * Z * aspect
    // To make text world width (6.552) fill 78% of the visible width:
    // 6.552 / (0.828427 * Z * aspect) = 0.78  ==>  Z = 10.14 / aspect
    const zForTargetWidth = 10.14 / Math.max(aspect, 0.5);
    // Clamp to ensure bold, dominant presentation across ultrawide desktop down to narrow mobile screens
    const targetZ = Math.max(5.2, Math.min(zForTargetWidth, 10.2));
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
  const [particleCount, setParticleCount] = useState(6200);
  const hoverRef = useRef(false);

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      // High-density stardust particle count tailored for device classes
      setParticleCount(
        w < 640 ? 3000 : w < 1024 ? 4400 : 6200
      );
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
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
        dpr={[1, 2]}
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