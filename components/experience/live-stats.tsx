"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Clock,
  TrendingUp,
  Building2,
} from "lucide-react";
import { formatLocaleNumber } from "@/lib/utils";
import { DepthTilt } from "./depth-tilt";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  hint: string;
}

const STATS: Stat[] = [
  {
    label: "قضية مُنجزة",
    value: 12480,
    icon: CheckCircle2,
    tone: "from-emerald-500 to-emerald-700",
    hint: "خلال آخر 12 شهراً",
  },
  {
    label: "متوسط الإغلاق",
    value: 36,
    suffix: " س",
    icon: Clock,
    tone: "from-blue-500 to-blue-700",
    hint: "ضمن SLA المعتمد",
  },
  {
    label: "معدل الرضا",
    value: 94,
    suffix: "%",
    icon: TrendingUp,
    tone: "from-gold-500 to-gold-600",
    hint: "تقييم بعد الإغلاق",
  },
  {
    label: "فرع نشط",
    value: 43,
    icon: Building2,
    tone: "from-violet-500 to-violet-700",
    hint: "على المستوى الوطني",
  },
];

const FEED = [
  "#1284 شكوى جديدة · العقبة · مياه",
  "#1101 أُغلقت · إربد · إنارة",
  "#1185 نزول ميداني · الكرك · طرق",
  "#1259 تصنيف ذكي · عمّان · بيئة",
  "#1234 تدخل مختص · الزرقاء · نفايات",
  "#1099 إغلاق موثّق · مادبا · مياه",
];

export function LiveStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
      ref={ref}
      data-experience-section="stats"
      className="relative bg-gradient-to-b from-stone-50 via-emerald-50/30 to-stone-50 py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern-light opacity-40 pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold-400/40 to-transparent"
      />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-display font-bold text-emerald-700 shadow-soft-sm">
            <Activity className="h-3 w-3" />
            أرقام حقيقية · بثّ مستمر
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
            المنصة بالأرقام
          </h2>
          <p className="mt-3 text-stone-600 leading-relaxed">
            مؤشرات الأداء الرئيسية تُحدَّث بشكل دوري — هذه ليست شعارات، هذا
            عمل ميداني موثّق.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {STATS.map((stat, i) => (
            <DepthTilt key={stat.label} className="rounded-3xl">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 shadow-soft-md group"
              >
                <div
                  aria-hidden
                  className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${stat.tone} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity`}
                />
                <div className="relative">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.tone} text-white shadow-soft-sm mb-4`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="font-display font-extrabold text-3xl lg:text-4xl text-stone-900 number-mono">
                    <CountUp value={stat.value} active={inView} />
                    {stat.suffix && (
                      <span className="text-emerald-700">{stat.suffix}</span>
                    )}
                  </div>
                  <p className="mt-2 font-display font-bold text-sm text-stone-700">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-[11px] text-stone-500">{stat.hint}</p>
                </div>
              </motion.div>
            </DepthTilt>
          ))}
        </div>

        <div className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-950 text-white">
            <div className="absolute inset-0 grid-pattern-dark opacity-50 pointer-events-none" />
            <div className="relative flex items-center gap-4 px-4 py-3">
              <span className="shrink-0 inline-flex items-center gap-2 rounded-full bg-emerald-800/60 px-3 py-1 text-[10px] font-display font-bold uppercase tracking-widest text-gold-300 border border-gold-500/30">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                مباشر
              </span>
              <div className="flex-1 overflow-hidden">
                <FeedTicker />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({ value, active }: { value: number; active: boolean }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce || !active ? value : 0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });
  const display = useTransform(spring, (v) =>
    formatLocaleNumber(Math.round(v)),
  );
  const [text, setText] = useState(() =>
    formatLocaleNumber(Math.round(mv.get())),
  );

  useEffect(() => {
    if (active && !reduce) mv.set(value);
    else if (reduce) mv.set(value);
  }, [active, reduce, value, mv]);

  useEffect(() => {
    return display.on("change", (v) => setText(v));
  }, [display]);

  return <span>{text}</span>;
}

function FeedTicker() {
  const reduce = useReducedMotion();
  const items = [...FEED, ...FEED];

  return (
    <div
      className="flex gap-8 whitespace-nowrap"
      style={{ width: "max-content" }}
    >
      <motion.div
        className="flex gap-8"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-xs font-display text-white/85 inline-flex items-center gap-2"
          >
            <span className="h-1 w-1 rounded-full bg-gold-400" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
