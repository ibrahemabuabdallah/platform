"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import { cn, formatLocaleNumber } from "@/lib/utils";

export type OrbitHue = "emerald" | "amber" | "red" | "gold";

export interface OrbitNode {
  label: string;
  value: number;
  icon: LucideIcon;
  hue: OrbitHue;
  change: number;
  trend: "up" | "down";
  caption?: string;
}

interface StudioKpiOrbitProps {
  nodes: OrbitNode[];
}

const hueMap: Record<
  OrbitHue,
  {
    glow: string;
    sheen: string;
    text: string;
    iconRing: string;
    iconText: string;
    accent: string;
    spark: string;
  }
> = {
  emerald: {
    glow: "from-emerald-400/45 via-emerald-500/15 to-transparent",
    sheen: "from-emerald-400/15 via-transparent to-transparent",
    text: "text-emerald-200",
    iconRing: "border-emerald-400/40 bg-emerald-500/15",
    iconText: "text-emerald-200",
    accent: "text-emerald-300",
    spark: "bg-emerald-400",
  },
  amber: {
    glow: "from-amber-400/45 via-amber-500/15 to-transparent",
    sheen: "from-amber-400/15 via-transparent to-transparent",
    text: "text-amber-100",
    iconRing: "border-amber-400/40 bg-amber-500/15",
    iconText: "text-amber-200",
    accent: "text-amber-300",
    spark: "bg-amber-400",
  },
  red: {
    glow: "from-rose-400/45 via-rose-500/15 to-transparent",
    sheen: "from-rose-400/15 via-transparent to-transparent",
    text: "text-rose-100",
    iconRing: "border-rose-400/40 bg-rose-500/15",
    iconText: "text-rose-200",
    accent: "text-rose-300",
    spark: "bg-rose-400",
  },
  gold: {
    glow: "from-yellow-400/45 via-yellow-500/15 to-transparent",
    sheen: "from-yellow-400/15 via-transparent to-transparent",
    text: "text-yellow-100",
    iconRing: "border-yellow-400/40 bg-yellow-500/15",
    iconText: "text-yellow-200",
    accent: "text-yellow-300",
    spark: "bg-yellow-400",
  },
};

function useCounter(end: number, duration: number, start: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame: number;
    let begin: number | null = null;
    const tick = (t: number) => {
      if (begin === null) begin = t;
      const progress = Math.min((t - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.floor(end * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, start]);
  return n;
}

function MiniSpark({
  hue,
  active,
  reduced,
}: {
  hue: OrbitHue;
  active: boolean;
  reduced: boolean | null;
}) {
  const cls = hueMap[hue].spark;
  const bars = [0.35, 0.6, 0.45, 0.8, 0.55, 0.92, 0.7];
  return (
    <div className="flex items-end gap-0.5 h-7">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className={cn("w-1 rounded-full", cls, "opacity-80")}
          initial={reduced ? false : { scaleY: 0.2, opacity: 0 }}
          animate={
            active
              ? { scaleY: h, opacity: 0.85 }
              : reduced
                ? { scaleY: h, opacity: 0.85 }
                : { scaleY: 0.2, opacity: 0 }
          }
          style={{ height: `${h * 100}%`, transformOrigin: "bottom" }}
          transition={{
            duration: 0.55,
            delay: 0.15 + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}

function OrbitCard({ node, index }: { node: OrbitNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const rotateXSpring = useSpring(useTransform(yRaw, [-60, 60], [6, -6]), {
    stiffness: 220,
    damping: 18,
  });
  const rotateYSpring = useSpring(useTransform(xRaw, [-60, 60], [-6, 6]), {
    stiffness: 220,
    damping: 18,
  });
  const sheenX = useSpring(useTransform(xRaw, [-60, 60], [-30, 30]) as MotionValue<number>, {
    stiffness: 220,
    damping: 18,
  });
  const sheenY = useSpring(useTransform(yRaw, [-60, 60], [-30, 30]) as MotionValue<number>, {
    stiffness: 220,
    damping: 18,
  });

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const cx = event.clientX - rect.left - rect.width / 2;
    const cy = event.clientY - rect.top - rect.height / 2;
    xRaw.set(cx);
    yRaw.set(cy);
  };
  const onMouseLeave = () => {
    xRaw.set(0);
    yRaw.set(0);
    setHovered(false);
  };

  const counter = useCounter(node.value, 1800, inView);
  const hue = hueMap[node.hue];
  const Icon = node.icon;
  const TrendIcon = node.trend === "up" ? ArrowUp : ArrowDown;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative [transform-style:preserve-3d]"
      style={
        reduced
          ? undefined
          : { perspective: 1200 }
      }
    >
      {/* Outer glow */}
      <motion.div
        aria-hidden
        className={cn(
          "absolute -inset-4 rounded-[28px] bg-gradient-to-br blur-2xl pointer-events-none transition-opacity duration-500",
          hue.glow,
          hovered ? "opacity-90" : "opacity-30"
        )}
      />

      <motion.div
        className="relative rounded-2xl border border-white/10 bg-stone-950/60 backdrop-blur-md p-5 overflow-hidden"
        style={
          reduced
            ? undefined
            : { rotateX: rotateXSpring, rotateY: rotateYSpring, transformStyle: "preserve-3d" }
        }
      >
        {/* Top hairline */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-white/40 to-transparent" />

        {/* Cursor sheen */}
        {!reduced && (
          <motion.div
            aria-hidden
            className={cn(
              "absolute inset-0 pointer-events-none bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              hue.sheen
            )}
            style={{ x: sheenX, y: sheenY }}
          />
        )}

        {/* Inner ambient gradient */}
        <div
          aria-hidden
          className={cn(
            "absolute -bottom-16 -end-10 h-40 w-40 rounded-full blur-3xl opacity-40 pointer-events-none bg-gradient-to-br",
            hue.glow
          )}
        />

        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-display font-bold uppercase tracking-[0.16em] text-white/55">
              {node.label}
            </p>
            <p
              className={cn(
                "mt-2.5 font-display text-4xl md:text-[2.6rem] font-extrabold tracking-tight tabular-nums leading-none",
                hue.text
              )}
            >
              {formatLocaleNumber(counter)}
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <TrendIcon className={cn("h-3 w-3", hue.accent)} />
              <span className={cn("text-xs font-display font-bold", hue.accent)}>
                {formatLocaleNumber(Math.abs(node.change))}%
              </span>
              <span className="text-[10px] text-white/45">
                {node.caption ?? "آخر 7 أيام"}
              </span>
            </div>
          </div>
          <div
            className={cn(
              "shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl border",
              hue.iconRing,
              hue.iconText
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="relative mt-5 pt-4 border-t border-white/5">
          <MiniSpark hue={node.hue} active={inView} reduced={reduced} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function StudioKpiOrbit({ nodes }: StudioKpiOrbitProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {nodes.map((node, i) => (
        <OrbitCard key={node.label} node={node} index={i} />
      ))}
    </div>
  );
}
