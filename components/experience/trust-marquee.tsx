"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Award, Building2, Lock, Globe2, Crown } from "lucide-react";

const SEALS = [
  { label: "اعتماد رسمي حكومي", icon: Crown },
  { label: "حماية البيانات الشخصية", icon: Lock },
  { label: "ISO 27001 — أمن المعلومات", icon: ShieldCheck },
  { label: "43 فرع وطني نشط", icon: Building2 },
  { label: "تدقيق وزاري سنوي", icon: Award },
  { label: "متاح بالعربية والإنجليزية", icon: Globe2 },
];

export function TrustMarquee() {
  const reduce = useReducedMotion();
  const seals = [...SEALS, ...SEALS];

  return (
    <section
      data-experience-section="trust"
      className="relative bg-emerald-950 py-14 overflow-hidden border-y border-emerald-800/40"
    >
      <div className="absolute inset-0 grid-pattern-dark opacity-50 pointer-events-none" />

      <div className="container relative">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[11px] font-display font-bold text-gold-300">
            <ShieldCheck className="h-3 w-3" />
            موثوقية رسمية
          </span>
          <p className="mt-3 text-white/70 text-sm font-display">
            معتمدون من قِبل الجهات الرسمية ومحميون بأعلى معايير الأمان
          </p>
        </div>
      </div>

      <div className="relative">
        <svg
          aria-hidden
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
          className="absolute top-1/2 -translate-y-1/2 right-0 left-0 w-full h-20 pointer-events-none"
        >
          <defs>
            <linearGradient id="curve-trust" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c9a227" stopOpacity="0" />
              <stop offset="50%" stopColor="#e8c547" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 20 Q 50 5 100 20 T 200 20"
            fill="none"
            stroke="url(#curve-trust)"
            strokeWidth="0.6"
            strokeDasharray="2 3"
          />
        </svg>

        <div
          className="flex gap-3 px-4"
          style={{ width: "max-content" }}
        >
          <motion.div
            className="flex gap-3"
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          >
            {seals.map((s, i) => {
              const Icon = s.icon;
              const wave = i % 4;
              const offsetY =
                wave === 0 ? 0 : wave === 1 ? -8 : wave === 2 ? -4 : 6;
              return (
                <div
                  key={`${s.label}-${i}`}
                  style={{ transform: `translateY(${offsetY}px)` }}
                  className="group relative shrink-0"
                >
                  <div className="flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-gradient-to-br from-emerald-900/80 to-emerald-950/80 backdrop-blur px-4 py-2.5 transition-all duration-300 hover:border-gold-400 hover:scale-110 hover:shadow-gold-glow">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold-500/15 text-gold-300 group-hover:bg-gold-500 group-hover:text-stone-900 transition-colors">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs sm:text-sm font-display font-bold text-white whitespace-nowrap">
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
