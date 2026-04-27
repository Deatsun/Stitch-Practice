"use client";

import { useEffect, useRef } from "react";

type SmokeBlob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  angle: number;
  offset: number;
};

const blobs: SmokeBlob[] = Array.from({ length: 7 }, (_, index) => ({
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  radius: 95 + index * 24,
  hue: 95 + index * 22,
  angle: 0,
  offset: index * 0.8,
}));

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    speedX: 0,
    speedY: 0,
  });

  const blobsRef = useRef<SmokeBlob[]>(blobs.map((blob) => ({ ...blob })));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      mouseRef.current.x = centerX;
      mouseRef.current.y = centerY;
      mouseRef.current.lastX = centerX;
      mouseRef.current.lastY = centerY;

      blobsRef.current = blobsRef.current.map((blob) => ({
        ...blob,
        x: centerX,
        y: centerY,
      }));
    }

    function handleMouseMove(event: MouseEvent) {
      const mouse = mouseRef.current;

      mouse.speedX = event.clientX - mouse.lastX;
      mouse.speedY = event.clientY - mouse.lastY;

      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.lastX = event.clientX;
      mouse.lastY = event.clientY;
    }

    let animationFrame: number;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";

      const mouse = mouseRef.current;
      const speed = Math.min(
        Math.sqrt(mouse.speedX * mouse.speedX + mouse.speedY * mouse.speedY),
        70
      );

      const angle = Math.atan2(mouse.speedY, mouse.speedX || 0.001);

      blobsRef.current.forEach((blob, index) => {
        const delay = 0.055 - index * 0.004;
        const distanceBehind = index * 48 + speed * 4.5;

        const targetX =
          mouse.x - Math.cos(angle) * distanceBehind + Math.sin(index) * 16;
        const targetY =
          mouse.y - Math.sin(angle) * distanceBehind + Math.cos(index) * 16;

        blob.vx += (targetX - blob.x) * delay;
        blob.vy += (targetY - blob.y) * delay;

        blob.vx *= 0.82;
        blob.vy *= 0.82;

        blob.x += blob.vx;
        blob.y += blob.vy;

        blob.angle += 0.008 + index * 0.002;

        const stretch = 1.2 + speed / 18 + index * 0.08;
        const squeeze = 0.34 + index * 0.015;
        const alpha = 0.12 - index * 0.008;

        const radius = blob.radius + speed * 1.2;

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          radius
        );

        gradient.addColorStop(
          0,
          `hsla(${blob.hue}, 100%, 62%, ${alpha})`
        );
        gradient.addColorStop(
          0.35,
          `hsla(${blob.hue + 40}, 100%, 52%, ${alpha * 0.72})`
        );
        gradient.addColorStop(
          0.7,
          `hsla(${blob.hue + 90}, 100%, 45%, ${alpha * 0.35})`
        );
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.ellipse(
          blob.x,
          blob.y,
          radius * stretch,
          radius * squeeze,
          angle + Math.sin(blob.angle) * 0.45,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      mouse.speedX *= 0.88;
      mouse.speedY *= 0.88;

      animationFrame = requestAnimationFrame(animate);
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-80 mix-blend-screen"
    />
  );
}