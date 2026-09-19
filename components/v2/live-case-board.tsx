"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The single authored motion moment on the page: one real reference advancing
 * through the stages the platform actually runs. It replaces the habit of
 * decorating a hero with a static metric card — the mechanism is the proof.
 */

interface Stage {
  label: string;
  detail: string;
  /** Hours after intake, shown so the promise is concrete rather than vague. */
  at: string;
}

const STAGES: Stage[] = [
  { label: "استلام", detail: "رقم مرجعي فوري", at: "لحظة التقديم" },
  { label: "تصنيف", detail: "نوع الطلب وأولويته", at: "خلال دقائق" },
  { label: "توجيه للفرع", detail: "فرع عمان الأول", at: "خلال ساعة" },
  { label: "إسناد لمنسق", detail: "أحمد عبد الرحمن", at: "نفس اليوم" },
  { label: "نزول ميداني", detail: "معاينة وتوثيق بالصور", at: "خلال يومين" },
  { label: "إغلاق موثّق", detail: "تقرير نهائي للمواطن", at: "2.3 يوم وسطياً" },
];

const STEP_MS = 1400;

export function LiveCaseBoard() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(reduceMotion ? STAGES.length - 1 : 0);

  useEffect(() => {
    if (reduceMotion) {
      setActive(STAGES.length - 1);
      return;
    }
    const timer = setInterval(() => {
      setActive((current) =>
        current >= STAGES.length - 1 ? 0 : current + 1
      );
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="hero-card-glow relative rounded-3xl border border-stone-200/70 bg-white/90 p-5 backdrop-blur-sm sm:p-6">
      <div className="flex items-baseline justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <p className="text-[11px] font-display font-semibold text-stone-600">
            مسار شكوى حقيقية
          </p>
          <p className="mt-0.5 font-mono text-sm font-bold text-stone-900">
            REF-2026-00482
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-display font-semibold text-emerald-800 ring-1 ring-emerald-200/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse-dot" />
          تحت المتابعة
        </span>
      </div>

      <ol className="mt-4 space-y-0">
        {STAGES.map((stage, index) => {
          const isDone = index < active;
          const isCurrent = index === active;
          const isLast = index === STAGES.length - 1;

          return (
            <li key={stage.label} className="flex gap-3">
              {/* Rail */}
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500",
                    isDone &&
                      "border-emerald-700 bg-emerald-700 text-white",
                    isCurrent &&
                      "border-emerald-600 bg-white text-emerald-700 ring-4 ring-emerald-100",
                    !isDone &&
                      !isCurrent &&
                      "border-stone-200 bg-stone-50 text-stone-300"
                  )}
                >
                  {isDone ? (
                    <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
                  ) : isCurrent ? (
                    <Loader2
                      aria-hidden
                      className={cn(
                        "h-3.5 w-3.5",
                        !reduceMotion && "animate-spin"
                      )}
                    />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                </span>
                {!isLast && (
                  <span className="relative my-1 w-0.5 flex-1 overflow-hidden rounded-full bg-stone-200">
                    <motion.span
                      className="absolute inset-x-0 top-0 block bg-emerald-600"
                      initial={false}
                      animate={{ height: isDone ? "100%" : "0%" }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </span>
                )}
              </div>

              {/* Body */}
              <div
                className={cn(
                  "min-w-0 flex-1 pb-4 transition-opacity duration-500",
                  isDone || isCurrent ? "opacity-100" : "opacity-45"
                )}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <p
                    className={cn(
                      "font-display text-sm font-bold",
                      isCurrent ? "text-emerald-800" : "text-stone-900"
                    )}
                  >
                    {stage.label}
                  </p>
                  <p className="text-[11px] tabular-nums text-stone-600">
                    {stage.at}
                  </p>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-stone-600">
                  {stage.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
