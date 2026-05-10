"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileCheck,
  Percent,
  MapPin,
  Clock,
  Copy,
  TrendingUp,
} from "lucide-react";
import { formatLocaleNumber } from "@/lib/utils";
import { SectionShell } from "./section-shell";
import { SectionTag, SectionHeader } from "./section-tag";

const stats = [
  {
    icon: FileCheck,
    value: 1247,
    label: "قضية مفتوحة ومتابعة",
    suffix: "+",
  },
  {
    icon: Percent,
    value: 89,
    label: "نسبة الإغلاق الناجح",
    suffix: "%",
  },
  {
    icon: MapPin,
    value: 312,
    label: "نزول ميداني هذا الشهر",
  },
  {
    icon: Clock,
    value: 2.3,
    label: "يوم متوسط زمن المعالجة",
    decimals: 1,
    suffix: " يوم",
  },
  {
    icon: Copy,
    value: 47,
    label: "قضية مكررة تم اكتشافها",
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

  useEffect(() => {
    if (!inView) return;
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
  }, [value, inView]);

  return (
    <span ref={ref}>
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
            <br className="hidden sm:block" />
            <span className="text-emerald-700">وتصنع نتائج ملموسة</span>
          </>
        }
        description="إحصائيات حية تعكس أثر المنصة في حياة المواطنين على مستوى المملكة."
      />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative rounded-2xl border-2 border-emerald-100/60 bg-white/80 backdrop-blur p-5 lg:p-6 shadow-soft-md hover:shadow-soft-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="absolute -top-3 right-5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-50 border border-gold-200 text-gold-700 shadow-soft-sm">
              <stat.icon className="h-4 w-4" />
            </div>

            <div className="pt-3">
              <div className="font-display text-3xl lg:text-5xl font-extrabold text-emerald-700 leading-none number-mono">
                <Counter value={stat.value} decimals={stat.decimals ?? 0} />
                <span className="text-2xl lg:text-3xl text-emerald-600">
                  {stat.suffix}
                </span>
              </div>

              <div
                aria-hidden
                className="mt-3 h-px w-12 bg-gradient-to-l from-transparent via-gold-400/60 to-transparent"
              />

              <p className="mt-2.5 text-[11px] lg:text-sm text-stone-500 leading-snug font-display font-medium">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
