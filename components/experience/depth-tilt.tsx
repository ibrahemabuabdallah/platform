"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DepthTiltProps {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}

export function DepthTilt({
  children,
  className,
  max = 8,
  glare = true,
}: DepthTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const ry = (x - 0.5) * 2 * max;
    const rx = (0.5 - y) * 2 * max;
    setTilt({ rx, ry, gx: x * 100, gy: y * 100 });
  };

  const onLeave = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
      transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.5 }}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
      {glare && !reduce && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay opacity-60"
          style={{
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.35), transparent 45%)`,
            transition: "background 0.15s ease-out",
          }}
        />
      )}
    </motion.div>
  );
}
