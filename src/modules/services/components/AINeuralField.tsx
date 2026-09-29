"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
  visibleRef: React.RefObject<boolean>;
  reducedMotion: boolean;
  onIndexChange?: (index: number, holdDuration?: number) => void;
  onTransitionStart?: () => void;
  motionConfig?: ParticleMotionConfig;
}

function ParticleField({
  count,
  hoverRef,
  visibleRef,
  reducedMotion,
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

  // Shader Uniforms Ref
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uBlend: { value: 0 },
    uMorphArc: { value: 0 },
    uMouseWorld: { value: new THREE.Vector2(-9999, -9999) },
    uHoverActive: { value: 0 },
    uWaveSpeed: { value: DEFAULT_MOTION_CONFIG.waveSpeed },
    uWaveFrequency: { value: DEFAULT_MOTION_CONFIG.waveFrequency },
    uWaveAmplitudeZ: { value: DEFAULT_MOTION_CONFIG.waveAmplitudeZ },
    uWaveAmplitudeY: { value: DEFAULT_MOTION_CONFIG.waveAmplitudeY },
    uReducedMotion: { value: 0 },
  });

  const activeShaderRef = useRef<THREE.WebGLProgramParametersWithUniforms | null>(null);

  // Geometry attributes & OnBeforeCompile Shader Extension
  const { geometry, onBeforeCompile } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(scatterCloud);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    // Target shape for GPU vertex morphing
    const targetPos = new Float32Array(shapes[0]);
    geo.setAttribute("aTargetPosition", new THREE.BufferAttribute(targetPos, 3));

    // Curvature displacement for GPU morph arching
    geo.setAttribute(
      "aMorphCurvature",
      new THREE.BufferAttribute(new Float32Array(morphCurvatures), 3)
    );

    // Base resting palette: pure luminous white with crystal cyan/ice blue highlights
    const colors = new Float32Array(count * 3);
    const colorWhite = new THREE.Color("#ffffff");       // Pure luminous crisp white
    const colorIceBlue = new THREE.Color("#e0f2fe");     // Crystal ice blue highlight (sky-100)
    const colorCyanLight = new THREE.Color("#bae6fd");   // Subtle crystal cyan highlight (sky-200)

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      const col = rand > 0.35 ? colorWhite : rand > 0.15 ? colorIceBlue : colorCyanLight;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Hook custom uniforms and GPU cloth wave + morphing into PointsMaterial
    const hook = (shader: THREE.WebGLProgramParametersWithUniforms) => {
      // Connect our persistent uniforms
      Object.assign(shader.uniforms, uniformsRef.current);
      activeShaderRef.current = shader;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `#include <common>
         uniform float uTime;
         uniform float uBlend;
         uniform float uMorphArc;
         uniform vec2 uMouseWorld;
         uniform float uHoverActive;
         uniform float uWaveSpeed;
         uniform float uWaveFrequency;
         uniform float uWaveAmplitudeZ;
         uniform float uWaveAmplitudeY;
         uniform float uReducedMotion;

         attribute vec3 aTargetPosition;
         attribute vec3 aMorphCurvature;
        `
      );

      // Reimplement morph blend, cloth wave math, and hover proximity in vertex shader
      shader.vertexShader = shader.vertexShader.replace(
        "#include <color_vertex>",
        `
         vec3 basePos = mix(position, aTargetPosition, uBlend);
         if (uMorphArc > 0.0001) {
           basePos += aMorphCurvature * uMorphArc;
         }

         if (uReducedMotion < 0.5) {
           float waveTime1 = uTime * (uWaveSpeed * 1.5);
           float waveTime2 = uTime * (uWaveSpeed * 2.2);

           float phase1 = waveTime1 - basePos.x * uWaveFrequency + basePos.y * (uWaveFrequency * 0.25);
           float phase2 = waveTime2 - basePos.x * (uWaveFrequency * 1.5) - basePos.y * (uWaveFrequency * 0.35);

           float waveZ = sin(phase1) * (uWaveAmplitudeZ * 0.78) + sin(phase2) * (uWaveAmplitudeZ * 0.22);
           float waveY = cos(phase1) * (uWaveAmplitudeY * 0.75) + sin(phase2) * (uWaveAmplitudeY * 0.25);

           basePos.y += waveY;
           basePos.z += waveZ;
         }

         float h = 0.0;
         if (uHoverActive > 0.001 && uReducedMotion < 0.5) {
           float dx = basePos.x - uMouseWorld.x;
           float dy = basePos.y - uMouseWorld.y;
           float distSq = dx * dx + dy * dy;
           float proximityRadius = 1.65;
           float proximityRadiusSq = 2.7225;
           if (distSq < proximityRadiusSq) {
             float normDist = sqrt(distSq) / proximityRadius;
             h = (1.0 - normDist * normDist * (3.0 - 2.0 * normDist)) * uHoverActive;
           }
         }

         #if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
           vColor = vec4( 1.0 );
         #endif

         #ifdef USE_COLOR
           vec3 highlightColor = vec3(0.2196078, 0.7411765, 0.972549); // Electric Cyan #38bdf8
           vColor.rgb = mix(color, highlightColor, h);
         #endif
        `
      );

      // Pass the computed basePos into the transformation pipeline
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `vec3 transformed = basePos;`
      );

      // Dynamic hover scale in vertex shader
      shader.vertexShader = shader.vertexShader.replace(
        "gl_PointSize = size;",
        `gl_PointSize = size * (1.0 + h * 0.35);`
      );
    };

    return {
      geometry: geo,
      onBeforeCompile: hook,
    };
  }, [count, scatterCloud, shapes, morphCurvatures]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  const transitionStartRef = useRef<number | null>(null);
  const holdStartRef = useRef<number | null>(null);
  const entranceDoneRef = useRef(false);
  const hoverStrengthRef = useRef(0);

  // Entrance: assemble from scatter cloud into the first word
  useEffect(() => {
    if (reducedMotion) {
      entranceDoneRef.current = true;
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      (posAttr.array as Float32Array).set(shapes[0]);
      posAttr.needsUpdate = true;
      const targetAttr = geometry.getAttribute("aTargetPosition") as THREE.BufferAttribute;
      if (targetAttr) {
        (targetAttr.array as Float32Array).set(shapes[1]);
        targetAttr.needsUpdate = true;
      }
      onIndexChangeRef.current?.(0, HOLD_SECONDS);
      return;
    }

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

        // Base is now shape 0, next target is shape 1
        const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
        (posAttr.array as Float32Array).set(shapes[0]);
        posAttr.needsUpdate = true;

        const targetAttr = geometry.getAttribute("aTargetPosition") as THREE.BufferAttribute;
        if (targetAttr) {
          (targetAttr.array as Float32Array).set(shapes[1]);
          targetAttr.needsUpdate = true;
        }

        onIndexChangeRef.current?.(0, HOLD_SECONDS);
      },
    });

    return () => {
      tween.kill();
    };
  }, [geometry, scatterCloud, shapes, reducedMotion]);

  useFrame((state, delta) => {
    if (!visibleRef.current) return;
    if (!pointsRef.current || !groupRef.current || !entranceDoneRef.current) return;

    const elapsed = state.clock.getElapsedTime();
    const config = cfgRef.current;
    const u = uniformsRef.current;

    // Reduced motion handling: lock to word 0 and disable transitions/wave
    if (reducedMotion) {
      u.uReducedMotion.value = 1.0;
      u.uBlend.value = 0;
      u.uMorphArc.value = 0;
      u.uHoverActive.value = 0;
      return;
    }

    u.uReducedMotion.value = 0.0;

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

        // Upload the new pair of shapes to the GPU buffer attributes ONCE on transition finish
        const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
        (posAttr.array as Float32Array).set(shapes[currentIndexRef.current]);
        posAttr.needsUpdate = true;

        const targetAttr = geometry.getAttribute("aTargetPosition") as THREE.BufferAttribute;
        if (targetAttr) {
          (targetAttr.array as Float32Array).set(shapes[nextIndexRef.current]);
          targetAttr.needsUpdate = true;
        }

        onIndexChangeRef.current?.(currentIndexRef.current, HOLD_SECONDS);
      }
    }

    // Direct, accurate cursor mapping via R3F state.pointer (bounded to canvas)
    const mouseWorldX = (state.pointer.x * state.viewport.width) / 2;
    const mouseWorldY = (state.pointer.y * state.viewport.height) / 2;
    const isHovered = hoverRef.current;

    // Smooth hover damping
    const targetHover = isHovered ? 1.0 : 0.0;
    const dampFactor = 1 - Math.exp(-9.0 * delta);
    hoverStrengthRef.current += (targetHover - hoverStrengthRef.current) * dampFactor;

    // Pass small uniforms to GPU (ZERO per-particle CPU loop!)
    u.uTime.value = elapsed;
    u.uBlend.value = blend;
    u.uMorphArc.value = morphArc;
    u.uMouseWorld.value.set(mouseWorldX, mouseWorldY);
    u.uHoverActive.value = hoverStrengthRef.current;
    u.uWaveSpeed.value = config.waveSpeed;
    u.uWaveFrequency.value = config.waveFrequency;
    u.uWaveAmplitudeZ.value = config.waveAmplitudeZ;
    u.uWaveAmplitudeY.value = config.waveAmplitudeY;

    // Group floating and mouse parallax tilt (only 3 numbers, lightweight)
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

    // Keep natural 1:1 scale
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
    const targetZ = Math.max(5.2, Math.min(zForTargetWidth, 12.8));
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
  const [particleCount, setParticleCount] = useState(5400);
  const [isVisible, setIsVisible] = useState(true);
  const hoverRef = useRef(false);
  const visibleRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Device-aware intensity scaling & mobile detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    const nav = navigator as unknown as {
      hardwareConcurrency?: number;
      deviceMemory?: number;
    };
    const isLowEnd =
      (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4);

    if (isMobile || isLowEnd) {
      setParticleCount(2400);
    } else {
      setParticleCount(5400);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        visibleRef.current = visible;
        setIsVisible(visible);
      },
      { rootMargin: "100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
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
        frameloop={isVisible ? "always" : "demand"}
        dpr={[1, 1.25]}
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
          visibleRef={visibleRef}
          reducedMotion={reducedMotion}
          onIndexChange={onIndexChange}
          onTransitionStart={onTransitionStart}
          motionConfig={motionConfig}
        />
      </Canvas>
    </div>
  );
}