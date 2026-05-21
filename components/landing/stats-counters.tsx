"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  FileCheck,
  Percent,
  MapPin,
  Clock,
  Copy,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { formatLocaleNumber, cn } from "@/lib/utils";
import { SectionShell } from "./section-shell";
import { SectionTag, SectionHeader } from "./section-tag";
import { TitleAccent, TitleLineBreak } from "@/components/shared/title-accent";

type StatVariant = "hero" | "feature" | "metric";
type StatVisual = "sparkline" | "radial" | "dots" | "clock" | "stack";

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  variant: StatVariant;
  visual: StatVisual;
  span: string;
  trend?: string;
}

const stats: Stat[] = [
  {
    icon: FileCheck,
    value: 1247,
    label: "قضية مفتوحة ومتابعة",
    suffix: "+",
    variant: "hero",
    visual: "sparkline",
    span: "col-span-2 lg:col-span-3 lg:row-span-2",
    trend: "+12%",
  },
  {
    icon: Percent,
    value: 89,
    label: "نسبة الإغلاق الناجح",
    suffix: "%",
    variant: "feature",
    visual: "radial",
    span: "col-span-2 lg:col-span-3 lg:row-span-2",
  },
  {
    icon: MapPin,
    value: 312,
    label: "نزول ميداني هذا الشهر",
    variant: "metric",
    visual: "dots",
    span: "col-span-1 lg:col-span-2",
  },
  {
    icon: Clock,
    value: 2.3,
    label: "متوسط زمن المعالجة",
    decimals: 1,
    suffix: " يوم",
    variant: "metric",
    visual: "clock",
    span: "col-span-1 lg:col-span-2",
  },
  {
    icon: Copy,
    value: 47,
    label: "قضية مكررة تم اكتشافها",
    variant: "metric",
    visual: "stack",
    span: "col-span-2 lg:col-span-2",
  },
];

function Counter({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(value);
      return;
    }
    let start: number | null = null;
    const duration = 1800;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, inView, reduce]);

  return (
    <span ref={ref} lang="en" dir="ltr" className="inline-block">
      {decimals > 0
        ? count.toFixed(decimals)
        : formatLocaleNumber(Math.floor(count))}
    </span>
  );
}

export function StatsCounters() {
  return (
    <SectionShell
      number="05"
      label="أرقام تصنع الفرق"
      tone="white"
      aurora="gold"
    >
      <SectionHeader
        badge={
          <SectionTag icon={TrendingUp} variant="gold">
            <span>أرقام تصنع الفرق</span>
          </SectionTag>
        }
        title={
          <>
            منصة تعمل بالأرقام
            <TitleLineBreak />
            <TitleAccent variant="emerald">وتصنع نتائج ملموسة</TitleAccent>
          </>
        }
        description="إحصائيات حية تعكس أثر المنصة في حياة المواطنين على مستوى المملكة."
      />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5 lg:auto-rows-[170px]">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </SectionShell>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const isHero = stat.variant === "hero";
  const isFeature = stat.variant === "feature";
  const isLarge = isHero || isFeature;
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border p-5 lg:p-6 transition-all duration-300",
        "hover:-translate-y-0.5",
        isHero &&
          "border-emerald-200/70 bg-white hero-card-glow",
        isFeature &&
          "border-emerald-100/80 bg-white shadow-soft-md hover:shadow-soft-lg",
        !isLarge &&
          "border-emerald-100/70 bg-white/85 backdrop-blur shadow-soft-md hover:shadow-soft-lg",
        stat.span
      )}
    >
      {isHero && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 hero-cream opacity-60 pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -top-24 -left-16 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.10) 0%, rgba(16,185,129,0) 70%)",
              filter: "blur(20px)",
            }}
          />
        </>
      )}

      {isFeature && (
        <div
          aria-hidden
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(232,197,71,0.10) 0%, rgba(232,197,71,0) 70%)",
            filter: "blur(20px)",
          }}
        />
      )}

      <div
        aria-hidden
        className="absolute top-0 left-6 right-6 h-px gold-divider"
      />

      <div className="relative h-full flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "inline-flex items-center justify-center rounded-xl border bg-gold-50 border-gold-200/70 text-gold-700 shadow-soft-sm",
              isLarge ? "h-11 w-11" : "h-9 w-9"
            )}
          >
            <Icon className={cn(isLarge ? "h-5 w-5" : "h-4 w-4")} />
          </div>

          {isHero && stat.trend && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 text-[11px] font-display font-bold text-emerald-700">
              <ArrowUpRight className="h-3 w-3" />
              <span lang="en" dir="ltr" className="number-mono">
                {stat.trend}
              </span>
            </span>
          )}

          {isFeature && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 text-[11px] font-display font-bold text-emerald-700">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              نسبة نجاح ممتازة
            </span>
          )}
        </div>

        <div
          className={cn(
            "flex-1 flex flex-col justify-end",
            isLarge ? "mt-6" : "mt-4"
          )}
        >
          <div className="relative">
            <Visual kind={stat.visual} isLarge={isLarge} />

            <div
              dir="ltr"
              className={cn(
                "relative font-display font-extrabold text-emerald-700 leading-none number-mono tracking-tight",
                isHero && "text-5xl sm:text-6xl lg:text-7xl",
                isFeature && "text-5xl sm:text-6xl lg:text-7xl",
                !isLarge && "text-4xl lg:text-5xl"
              )}
            >
              <Counter value={stat.value} decimals={stat.decimals ?? 0} />
              {stat.suffix && (
                <span
                  className={cn(
                    "text-emerald-600/90 font-bold",
                    isLarge ? "text-3xl lg:text-4xl" : "text-2xl lg:text-3xl"
                  )}
                >
                  {stat.suffix}
                </span>
              )}
            </div>
          </div>

          <div
            aria-hidden
            className={cn(
              "gold-divider-dotted mt-4",
              isLarge ? "w-20" : "w-12"
            )}
          />

          <p
            className={cn(
              "mt-2.5 text-stone-500 leading-snug font-display font-medium",
              isLarge ? "text-sm lg:text-base" : "text-xs lg:text-sm"
            )}
          >
            {stat.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Visual({
  kind,
  isLarge,
}: {
  kind: StatVisual;
  isLarge: boolean;
}) {
  const reduce = useReducedMotion();

  if (kind === "sparkline") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 220 60"
        preserveAspectRatio="none"
        className="absolute -top-2 left-0 w-full h-12 opacity-70 pointer-events-none"
      >
        <defs>
          <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sparkLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#c9a227" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#047857" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M 0 48 L 24 42 L 48 44 L 72 36 L 96 38 L 120 28 L 144 30 L 168 20 L 192 22 L 220 8 L 220 60 L 0 60 Z"
          fill="url(#sparkFill)"
        />
        <path
          d="M 0 48 L 24 42 L 48 44 L 72 36 L 96 38 L 120 28 L 144 30 L 168 20 L 192 22 L 220 8"
          fill="none"
          stroke="url(#sparkLine)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={reduce ? undefined : 460}
          style={
            reduce
              ? undefined
              : {
                  animation: "sparkDraw 2.4s ease-out forwards",
                  strokeDashoffset: 460,
                }
          }
        />
        <circle cx="220" cy="8" r="2.5" fill="#047857" />
        <style>{`
          @keyframes sparkDraw {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>
    );
  }

  if (kind === "radial") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 120 60"
        className={cn(
          "absolute pointer-events-none opacity-90",
          isLarge
            ? "-top-1 left-2 w-32 h-16"
            : "-top-2 left-0 w-24 h-12"
        )}
      >
        <defs>
          <linearGradient id="arcGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <path
          d="M 10 55 A 50 50 0 0 1 110 55"
          fill="none"
          stroke="#ecfdf5"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 10 55 A 50 50 0 0 1 110 55"
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="157"
          strokeDashoffset={reduce ? "17" : "157"}
          style={
            reduce
              ? undefined
              : {
                  animation: "arcFill 1.8s ease-out forwards",
                }
          }
        />
        <style>{`
          @keyframes arcFill {
            to { stroke-dashoffset: 17; }
          }
        `}</style>
      </svg>
    );
  }

  if (kind === "dots") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 100 60"
        className="absolute -top-3 left-0 w-24 h-14 opacity-60 pointer-events-none"
      >
        {[
          { x: 14, y: 18, r: 2.4, d: 0 },
          { x: 28, y: 30, r: 1.8, d: 0.3 },
          { x: 44, y: 14, r: 2, d: 0.6 },
          { x: 60, y: 28, r: 2.6, d: 0.2 },
          { x: 76, y: 18, r: 1.6, d: 0.8 },
          { x: 90, y: 32, r: 2, d: 0.5 },
          { x: 22, y: 44, r: 1.6, d: 0.9 },
          { x: 52, y: 46, r: 2, d: 0.4 },
          { x: 80, y: 44, r: 1.8, d: 0.7 },
        ].map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="#10b981"
            opacity="0.7"
          >
            {!reduce && (
              <animate
                attributeName="opacity"
                values="0.3;0.9;0.3"
                dur={`${2 + i * 0.15}s`}
                begin={`${p.d}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </svg>
    );
  }

  if (kind === "clock") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 60 60"
        className="absolute -top-3 left-0 w-14 h-14 opacity-70 pointer-events-none"
      >
        <circle
          cx="30"
          cy="30"
          r="22"
          fill="none"
          stroke="#ecfdf5"
          strokeWidth="3"
        />
        <path
          d="M 30 8 A 22 22 0 0 1 49 38"
          fill="none"
          stroke="#c9a227"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="80"
          strokeDashoffset={reduce ? "0" : "80"}
          style={
            reduce
              ? undefined
              : {
                  animation: "clockArc 1.6s ease-out 0.3s forwards",
                }
          }
        />
        <circle cx="30" cy="30" r="2" fill="#047857" />
        <line
          x1="30"
          y1="30"
          x2="30"
          y2="16"
          stroke="#047857"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="30"
          y1="30"
          x2="42"
          y2="30"
          stroke="#10b981"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <style>{`
          @keyframes clockArc {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>
    );
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 60 60"
      className="absolute -top-2 left-0 w-14 h-14 opacity-50 pointer-events-none"
    >
      <rect
        x="14"
        y="20"
        width="22"
        height="26"
        rx="3"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.4"
        opacity="0.45"
      />
      <rect
        x="20"
        y="14"
        width="22"
        height="26"
        rx="3"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.4"
        opacity="0.7"
      />
      <rect
        x="26"
        y="8"
        width="22"
        height="26"
        rx="3"
        fill="#ecfdf5"
        stroke="#c9a227"
        strokeWidth="1.6"
      />
    </svg>
  );
}
