"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface MorphCanvasProps {
  text?: string;
  density?: number;
  color?: string;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

function sampleTextPoints(
  text: string,
  width: number,
  height: number,
  step: number,
): Array<{ x: number; y: number }> {
  const off = document.createElement("canvas");
  off.width = width;
  off.height = height;
  const ctx = off.getContext("2d");
  if (!ctx) return [];

  const fontSize = Math.min(width / Math.max(text.length, 4), height) * 0.9;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${fontSize}px var(--font-plex-arabic), system-ui, sans-serif`;
  ctx.fillText(text, width / 2, height / 2);

  const pixels = ctx.getImageData(0, 0, width, height).data;
  const points: Array<{ x: number; y: number }> = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const idx = (y * width + x) * 4 + 3;
      if (pixels[idx] > 128) points.push({ x, y });
    }
  }
  return points;
}

export function MorphCanvas({
  text = "صوتك",
  density = 120,
  color = "#e8c547",
  className,
}: MorphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const isMobile = width < 640;
    const targetCount = isMobile ? Math.round(density * 0.5) : density;

    const points = sampleTextPoints(text, width, height, isMobile ? 9 : 7);
    const targets = Array.from({ length: targetCount }, (_, i) => {
      const p = points[i % Math.max(points.length, 1)] ?? {
        x: width / 2,
        y: height / 2,
      };
      return { x: p.x, y: p.y };
    });

    const particles: Particle[] = targets.map((t) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      tx: t.x,
      ty: t.y,
      vx: 0,
      vy: 0,
      r: 1.4 + Math.random() * 1.6,
      alpha: 0.4 + Math.random() * 0.6,
    }));

    let phase: "gather" | "orbit" = "gather";
    let phaseStart = performance.now();
    let mouseX = -9999;
    let mouseY = -9999;
    let visible = true;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && rafRef.current === null) loop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) visible = false;
      else {
        visible = true;
        if (rafRef.current === null) loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    const loop = () => {
      if (!visible) {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(loop);

      const now = performance.now();
      const elapsed = now - phaseStart;
      if (phase === "gather" && elapsed > 2400) {
        phase = "orbit";
        phaseStart = now;
      } else if (phase === "orbit" && elapsed > 5200) {
        phase = "gather";
        phaseStart = now;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let tx = p.tx;
        let ty = p.ty;

        if (phase === "orbit") {
          const angle = (i / particles.length) * Math.PI * 2 + now * 0.0004;
          const radius = 80 + (i % 5) * 14;
          tx = width / 2 + Math.cos(angle) * radius;
          ty = height / 2 + Math.sin(angle) * radius * 0.55;
        }

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 9000) {
          const force = (9000 - distSq) / 9000;
          p.vx -= (dx / Math.sqrt(distSq + 0.01)) * force * 0.6;
          p.vy -= (dy / Math.sqrt(distSq + 0.01)) * force * 0.6;
        }

        p.vx += (tx - p.x) * 0.045;
        p.vy += (ty - p.y) * 0.045;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    loop();

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      io.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [text, density, color, reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
