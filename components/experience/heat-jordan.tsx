"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Map, Building2, Activity, CheckCircle2 } from "lucide-react";
import { TitleAccent } from "@/components/shared/title-accent";

interface BranchPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  open: number;
  closed: number;
  intensity: number;
}

const BRANCHES: BranchPoint[] = [
  { id: "amman", name: "عمّان", x: 48, y: 38, open: 24, closed: 312, intensity: 1 },
  { id: "irbid", name: "إربد", x: 42, y: 18, open: 14, closed: 198, intensity: 0.85 },
  { id: "zarqa", name: "الزرقاء", x: 56, y: 36, open: 11, closed: 167, intensity: 0.78 },
  { id: "salt", name: "السلط", x: 42, y: 42, open: 6, closed: 88, intensity: 0.55 },
  { id: "madaba", name: "مادبا", x: 44, y: 52, open: 5, closed: 71, intensity: 0.45 },
  { id: "karak", name: "الكرك", x: 36, y: 60, open: 7, closed: 96, intensity: 0.6 },
  { id: "tafila", name: "الطفيلة", x: 32, y: 68, open: 3, closed: 52, intensity: 0.35 },
  { id: "maan", name: "معان", x: 36, y: 78, open: 4, closed: 66, intensity: 0.42 },
  { id: "aqaba", name: "العقبة", x: 30, y: 90, open: 9, closed: 124, intensity: 0.7 },
  { id: "mafraq", name: "المفرق", x: 64, y: 24, open: 5, closed: 78, intensity: 0.48 },
  { id: "jerash", name: "جرش", x: 46, y: 22, open: 4, closed: 64, intensity: 0.4 },
  { id: "ajloun", name: "عجلون", x: 38, y: 22, open: 3, closed: 49, intensity: 0.32 },
];

export function HeatJordan() {
  const [active, setActive] = useState<BranchPoint | null>(null);
  const reduce = useReducedMotion();

  return (
    <section
      data-experience-section="heat"
      className="relative bg-gradient-to-b from-stone-50 to-emerald-950 py-20 lg:py-28 overflow-hidden"
    >
      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-display font-bold text-emerald-700 shadow-soft-sm">
            <Map className="h-3 w-3" />
            خريطة التغطية الوطنية
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
            43 فرع · 12 محافظة
            <br />
            <TitleAccent variant="emerald">تغطية وطنية شاملة</TitleAccent>
          </h2>
          <p className="mt-3 text-stone-600 leading-relaxed">
            مرّر فوق أي محافظة لتعرف عدد القضايا المفتوحة والمغلقة لحظياً.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-center">
          <div className="lg:col-span-3 relative rounded-3xl border border-emerald-200 bg-white p-4 shadow-soft-lg">
            <svg
              viewBox="0 0 100 110"
              className="w-full h-auto"
              role="img"
              aria-label="خريطة الأردن"
            >
              <defs>
                <linearGradient id="map-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ecfdf5" />
                  <stop offset="100%" stopColor="#d1fae5" />
                </linearGradient>
                <radialGradient id="pulse-grad">
                  <stop offset="0%" stopColor="#e8c547" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
                </radialGradient>
              </defs>

              <path
                d="M 24 14 Q 32 8 42 12 Q 56 8 70 18 Q 80 24 76 34 Q 70 44 60 42 Q 56 50 50 50 Q 46 58 42 60 Q 38 70 38 80 Q 32 92 28 100 Q 26 104 24 100 Q 20 88 22 78 Q 18 68 20 58 Q 16 48 18 38 Q 16 26 24 14 Z"
                fill="url(#map-fill)"
                stroke="#10b981"
                strokeWidth="0.4"
              />

              {BRANCHES.map((b) => {
                const isActive = active?.id === b.id;
                return (
                  <g
                    key={b.id}
                    onMouseEnter={() => setActive(b)}
                    onMouseLeave={() => setActive((prev) => (prev?.id === b.id ? null : prev))}
                    onFocus={() => setActive(b)}
                    onBlur={() => setActive(null)}
                    className="cursor-pointer"
                    tabIndex={0}
                  >
                    <circle
                      cx={b.x}
                      cy={b.y}
                      r={1.4 + b.intensity * 1.5}
                      fill="url(#pulse-grad)"
                      opacity={0.7}
                    >
                      {!reduce && (
                        <animate
                          attributeName="r"
                          values={`${1 + b.intensity * 1.5};${2.2 + b.intensity * 1.8};${1 + b.intensity * 1.5}`}
                          dur={`${2 + b.intensity}s`}
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>
                    <circle
                      cx={b.x}
                      cy={b.y}
                      r={isActive ? 1.4 : 0.9}
                      fill={isActive ? "#c9a227" : "#047857"}
                      stroke="#fff"
                      strokeWidth="0.25"
                      style={{ transition: "all 0.2s" }}
                    />
                    {isActive && (
                      <text
                        x={b.x}
                        y={b.y - 3}
                        textAnchor="middle"
                        fontSize="2.4"
                        fontWeight="700"
                        fill="#064e3b"
                        style={{ pointerEvents: "none" }}
                      >
                        {b.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-stone-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-700" />
                فرع نشط
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gold-500" />
                مفعّل الآن
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gold-300/60 ring-2 ring-gold-300/30" />
                نبضة بثّ مباشر
              </span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              key={active?.id ?? "default"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-soft-md"
            >
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-800 text-white shadow-emerald-glow">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] text-stone-500 font-display font-bold">
                    فرع
                  </p>
                  <h3 className="font-display font-extrabold text-xl text-stone-900">
                    {active?.name ?? "اختر محافظة"}
                  </h3>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-stone-200 bg-stone-50/40 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-3.5 w-3.5 text-amber-600" />
                    <span className="text-[11px] font-display font-bold text-stone-500">
                      مفتوحة
                    </span>
                  </div>
                  <p className="font-mono font-extrabold text-2xl text-amber-700 number-mono">
                    {active?.open ?? "—"}
                  </p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50/40 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-[11px] font-display font-bold text-stone-500">
                      مغلقة
                    </span>
                  </div>
                  <p className="font-mono font-extrabold text-2xl text-emerald-700 number-mono">
                    {active?.closed ?? "—"}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-xs text-stone-500 leading-relaxed">
                البيانات إرشادية · تتحدّث مع كل دورة معالجة من الفروع المعتمدة.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
