"use client";

import { useEffect, useRef } from "react";

type WebGLFluidFn = (
  canvas: HTMLCanvasElement,
  config?: Record<string, unknown>
) => void;

function forwardClickToUnderlyingElement(event: MouseEvent, canvas: HTMLCanvasElement) {
  canvas.style.pointerEvents = "none";

  const target = document.elementFromPoint(event.clientX, event.clientY);

  canvas.style.pointerEvents = "auto";

  if (!target) return;

  const forwardedEvent = new MouseEvent(event.type, {
    bubbles: true,
    cancelable: true,
    clientX: event.clientX,
    clientY: event.clientY,
    button: event.button,
    buttons: event.buttons,
  });

  target.dispatchEvent(forwardedEvent);
}

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

        DENSITY_DISSIPATION: 1.22,
        VELOCITY_DISSIPATION: 0.14,

        PRESSURE: 0.62,
        PRESSURE_ITERATIONS: 40,

        CURL: 0.8,

        SPLAT_RADIUS: 0.095,
        SPLAT_FORCE: 8200,

        SHADING: true,
        COLORFUL: true,
        COLOR_UPDATE_SPEED: 2,

        PAUSED: false,
        TRANSPARENT: true,

        BACK_COLOR: { r: 0, g: 0, b: 0 },

        BLOOM: true,
        BLOOM_ITERATIONS: 6,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 0.7,
        BLOOM_THRESHOLD: 0.58,
        BLOOM_SOFT_KNEE: 0.78,

        SUNRAYS: false,
      });
    }

    function handleClick(event: MouseEvent) {
      forwardClickToUnderlyingElement(event, canvas);
    }

    function handleMouseDown(event: MouseEvent) {
      forwardClickToUnderlyingElement(event, canvas);
    }

    function handleMouseUp(event: MouseEvent) {
      forwardClickToUnderlyingElement(event, canvas);
    }

    init();

    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      mounted = false;

      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] h-screen w-screen opacity-55 mix-blend-screen"
    />
  );
}