"use client";

import { useEffect, useRef } from "react";

type WebGLFluidFn = (
  canvas: HTMLCanvasElement,
  config?: Record<string, unknown>
) => void;

export function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;

    async function init() {
      const fluidModule = await import("webgl-fluid");

      const WebGLFluid =
        ((fluidModule as { default?: WebGLFluidFn }).default ??
          (fluidModule as unknown)) as WebGLFluidFn;

      if (!mounted || typeof WebGLFluid !== "function") return;

      WebGLFluid(canvas, {
        SIM_RESOLUTION: 160,
        DYE_RESOLUTION: 1024,
        CAPTURE_RESOLUTION: 512,

        DENSITY_DISSIPATION: 0.92,
        VELOCITY_DISSIPATION: 0.045,

        PRESSURE: 0.62,
        PRESSURE_ITERATIONS: 32,

        CURL: 9,

        SPLAT_RADIUS: 0.34,
        SPLAT_FORCE: 22000,

        SHADING: true,

        COLORFUL: true,
        COLOR_UPDATE_SPEED: 6,

        PAUSED: false,
        TRANSPARENT: true,

        BACK_COLOR: { r: 0, g: 0, b: 0 },

        BLOOM: true,
        BLOOM_ITERATIONS: 8,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 1.25,
        BLOOM_THRESHOLD: 0.34,
        BLOOM_SOFT_KNEE: 0.82,

        SUNRAYS: false,
      });
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] h-screen w-screen opacity-85 mix-blend-screen"
    />
  );
}