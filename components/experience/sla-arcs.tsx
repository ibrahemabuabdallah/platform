"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Clock, Zap, Flame, Activity, MoonStar } from "lucide-react";
import { TitleAccent } from "@/components/shared/title-accent";

interface Tier {
  label: string;
  value: number;
  unit: string;
  color: string;
  ring: string;
  bg: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}

const TIERS: Tier[] = [
  {
    label: "أولوية حرجة",
    value: 4,
    unit: "ساعات",
    color: "stroke-red-500",
    ring: "border-red-200",
    bg: "from-red-50 to-white",
    icon: Flame,
    desc: "تهديد مباشر لسلامة المواطن أو الممتلكات",
  },
  {
    label: "أولوية عالية",
    value: 24,
    unit: "ساعة",
    color: "stroke-orange-500",
    ring: "border-orange-200",
    bg: "from-orange-50 to-white",
    icon: Zap,
    desc: "تأثير واسع يستلزم تدخلاً عاجلاً",
  },
  {
    label: "أولوية متوسطة",
    value: 72,
    unit: "ساعة",
    color: "stroke-amber-500",
    ring: "border-amber-200",
    bg: "from-amber-50 to-white",
    icon: Activity,
    desc: "خدمة متعطّلة قابلة للتأخير المعقول",
  },
  {
    label: "أولوية منخفضة",
    value: 5,
    unit: "أيام",
    color: "stroke-stone-500",
    ring: "border-stone-200",
    bg: "from-stone-50 to-white",
    icon: MoonStar,
    desc: "تحسينات ومقترحات غير عاجلة",
  },
];

export function SLAArcs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      data-experience-section="sla"
      className="relative bg-stone-50 py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern-light opacity-40 pointer-events-none" />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-display font-bold text-emerald-700 shadow-soft-sm">
            <Clock className="h-3 w-3" />
            اتفاقية مستوى الخدمة
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
            وقت استجابة معلن مسبقاً
            <br />
            <TitleAccent variant="emerald">لكل نوع من الشكاوى</TitleAccent>
          </h2>
          <p className="mt-3 text-stone-600 leading-relaxed">
            نلتزم رسمياً بهذه المُدد — أي تجاوز يُسجّل في سجل التدقيق ويُحاسَب
            عليه.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TIERS.map((tier, i) => {
            const Icon = tier.icon;
            const radius = 52;
            const circumference = 2 * Math.PI * radius;
            const fillRatio = 1 - 0.15 * i;
            const offset = circumference * (1 - fillRatio);
            return (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-3xl border ${tier.ring} bg-gradient-to-br ${tier.bg} p-5 shadow-soft-md`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-soft-sm ${tier.color.replace(
                      "stroke-",
                      "text-",
                    )}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <div className="relative w-32 h-32 mx-auto">
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full -rotate-90"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="none"
                      stroke="rgba(0,0,0,0.06)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="none"
                      strokeWidth="8"
                      strokeLinecap="round"
                      className={tier.color}
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={
                        inView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }
                      }
                      transition={{ duration: reduce ? 0 : 1.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono font-extrabold text-3xl text-stone-900 number-mono">
                      {tier.value}
                    </span>
                    <span className="text-[11px] font-display font-bold text-stone-500">
                      {tier.unit}
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 font-display font-extrabold text-sm text-stone-900 text-center">
                  {tier.label}
                </h3>
                <p className="mt-1 text-[11px] text-stone-500 leading-snug text-center">
                  {tier.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
