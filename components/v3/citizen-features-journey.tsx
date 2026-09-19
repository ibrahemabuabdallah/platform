"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Activity, Lock, Sparkles, type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  label: string;
}

/** مميزات المنصة المعروضة بالتناوب داخل الـ Pill. */
const FEATURES: readonly Feature[] = [
  { icon: Lock, label: "جميع البيانات مشفّرة" },
  { icon: Sparkles, label: "تحليل وكلاء AI فائقة" },
  { icon: Activity, label: "متابعة تلقائية وتتبع الطلبات" },
];

/** مدة الدورة الكاملة لكل ميزة، وارتفاع الصف الواحد في نافذة التمرير. */
const CYCLE_MS = 3000;
const ROW_PX = 30;

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/**
 * ودجت المميزات — Pill ذهبي فاتح فيه نافذة تمرير عمودي تعرض الميزة
 * الحالية مع أيقونتها، تنزلق للأعلى في نهاية كل دورة انزلاقاً ناعماً،
 * مع نقاط تقدّم تتوسع نقطتها النشطة. العنصر الأول مكرر في نهاية المسار
 * ليكون الالتفاف سلساً. الحركة كلها على requestAnimationFrame تكتب
 * مباشرة في ref، ولا يتحدث React إلا عند تبدل الميزة.
 * في وضع تقليل الحركة: نص ثابت يتبدل فقط كل دورة.
 */
export function FeaturesTicker() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) {
      /* بلا حركة: تبديل النص فقط كل دورة */
      const timer = window.setInterval(
        () => setIndex((i) => (i + 1) % FEATURES.length),
        CYCLE_MS
      );
      return () => window.clearInterval(timer);
    }

    let raf = 0;
    const start = performance.now();
    let last = -1;

    const frame = (now: number) => {
      const t = now - start;
      const i = Math.floor(t / CYCLE_MS) % FEATURES.length;
      const p = (t % CYCLE_MS) / CYCLE_MS;
      if (i !== last) {
        last = i;
        setIndex(i);
      }

      /* الانزلاق يحدث في آخر 18% من الدورة فقط */
      const slide = easeInOutCubic(clamp01((p - 0.82) / 0.18));
      const track = trackRef.current;
      if (track) {
        track.style.transform = `translateY(${-(i + slide) * ROW_PX}px)`;
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const active = FEATURES[index];
  const ActiveIcon = active.icon;

  return (
    <section aria-labelledby="features-title" className="relative py-4 sm:py-5">
      <div className="container">
        <h2
          id="features-title"
          className="mb-3 flex items-center justify-center gap-2 font-display text-xs font-bold text-gold-700 sm:text-sm"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse-dot"
          />
          مميزات المنصة
        </h2>

        <div className="flex justify-center">
          <div
            dir="rtl"
            className="flex h-[50px] w-max max-w-full items-center gap-3 rounded-full border border-[#F0E6B9] bg-[#FFFDF5] px-[18px] shadow-[0_6px_18px_rgba(190,160,60,.14)]"
          >
            <span
              aria-hidden
              className="h-2 w-2 flex-none rounded-full bg-[#D9B93B] animate-pulse-dot"
            />

            {/* نافذة التمرير العمودي */}
            <div
              aria-hidden
              className="relative h-[30px] min-w-[230px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_25%,#000_75%,transparent)]"
            >
              {reduced ? (
                <div className="flex h-[30px] items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#3F3A2A]">
                  <ActiveIcon
                    className="h-4 w-4 flex-none text-[#B8952A]"
                    strokeWidth={2}
                  />
                  <span>{active.label}</span>
                </div>
              ) : (
                <div
                  ref={trackRef}
                  className="flex flex-col will-change-transform"
                >
                  {[...FEATURES, FEATURES[0]].map((f, i) => (
                    <div
                      key={`${f.label}-${i}`}
                      className="flex h-[30px] items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#3F3A2A]"
                    >
                      <f.icon
                        className="h-4 w-4 flex-none text-[#B8952A]"
                        strokeWidth={2}
                      />
                      <span>{f.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* نقاط التقدم */}
            <div aria-hidden className="flex flex-none gap-1">
              {FEATURES.map((f, k) => (
                <span
                  key={f.label}
                  className={`h-[5px] rounded-[3px] transition-all duration-500 ${
                    k === index ? "w-4 bg-[#D9B93B]" : "w-[5px] bg-[#E4DBB8]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* نص حي مخفي لقارئات الشاشة */}
      <span aria-live="polite" className="sr-only">
        {active.label}
      </span>
    </section>
  );
}
