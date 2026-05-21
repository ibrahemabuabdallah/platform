"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  Cpu,
  Droplet,
  Lightbulb,
  TrafficCone,
  Trash2,
  Trees,
  ArrowDown,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { TitleAccent } from "@/components/shared/title-accent";

const SAMPLE = "كسر في ماسورة المياه أمام البيت يهدر كميات كبيرة منذ يومين";

const CATEGORIES = [
  { id: "water", label: "مياه", icon: Droplet, color: "bg-blue-500", text: "text-blue-700", border: "border-blue-200", soft: "bg-blue-50" },
  { id: "power", label: "كهرباء", icon: Lightbulb, color: "bg-amber-500", text: "text-amber-700", border: "border-amber-200", soft: "bg-amber-50" },
  { id: "roads", label: "طرق", icon: TrafficCone, color: "bg-orange-500", text: "text-orange-700", border: "border-orange-200", soft: "bg-orange-50" },
  { id: "waste", label: "نفايات", icon: Trash2, color: "bg-stone-500", text: "text-stone-700", border: "border-stone-200", soft: "bg-stone-50" },
  { id: "env", label: "بيئة", icon: Trees, color: "bg-emerald-500", text: "text-emerald-700", border: "border-emerald-200", soft: "bg-emerald-50" },
];

const CONFIDENCE: Record<string, number> = {
  water: 96,
  power: 2,
  roads: 1,
  waste: 1,
  env: 0,
};

export function AITriageDemo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "thinking" | "result">(
    "idle",
  );

  useEffect(() => {
    if (!inView) {
      setTyped("");
      setPhase("idle");
      return;
    }
    if (reduce) {
      setTyped(SAMPLE);
      setPhase("result");
      return;
    }

    let cancelled = false;
    setPhase("typing");
    setTyped("");

    let i = 0;
    const typeTimer = setInterval(() => {
      if (cancelled) return;
      i += 1;
      setTyped(SAMPLE.slice(0, i));
      if (i >= SAMPLE.length) {
        clearInterval(typeTimer);
        setTimeout(() => {
          if (!cancelled) setPhase("thinking");
        }, 400);
        setTimeout(() => {
          if (!cancelled) setPhase("result");
        }, 1700);
      }
    }, 38);

    return () => {
      cancelled = true;
      clearInterval(typeTimer);
    };
  }, [inView, reduce]);

  const winner = "water";

  return (
    <section
      ref={ref}
      data-experience-section="ai"
      className="relative bg-stone-50 py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern-light opacity-40 pointer-events-none" />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-display font-bold text-violet-700">
            <Cpu className="h-3 w-3" />
            توجيه ذكي
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
            تكتب الشكوى بكلامك العادي
            <br />
            <TitleAccent variant="emerald">
              والمنصة تعرف الجهة المختصة
            </TitleAccent>
          </h2>
          <p className="mt-3 text-stone-600 leading-relaxed">
            محرّك تصنيف لغوي عربي مدرّب على آلاف الحالات الفعلية — يقرأ النص،
            يفهم النية، ويوجّه شكواك للمنسّق الصحيح في ثوانٍ.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center max-w-5xl mx-auto">
          <div className="rounded-3xl border border-stone-200 bg-white shadow-soft-lg overflow-hidden">
            <div className="flex items-center gap-2 border-b border-stone-100 bg-stone-50/60 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ms-2 text-[11px] font-mono text-stone-500">
                نموذج تقديم الشكوى
              </span>
            </div>

            <div className="p-5">
              <p className="text-[11px] font-display font-bold text-stone-500 uppercase tracking-widest mb-2">
                وصف الشكوى
              </p>
              <div className="min-h-[120px] rounded-xl border border-stone-200 bg-stone-50/40 p-4 text-stone-800 leading-relaxed font-sans text-base">
                {typed}
                {phase === "typing" && (
                  <motion.span
                    aria-hidden
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 bg-emerald-700 align-middle ms-0.5"
                  />
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-stone-500">
                  {typed.length} حرف
                </span>
                <AnimatePresence mode="wait">
                  {phase === "thinking" && (
                    <motion.div
                      key="thinking"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex items-center gap-2 text-xs font-display font-bold text-violet-700"
                    >
                      <AiSparkleIcon className="h-3 w-3 animate-pulse" />
                      <span>محرك التصنيف يعمل...</span>
                      <Dots />
                    </motion.div>
                  )}
                  {phase === "result" && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-xs font-display font-bold text-emerald-700"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>تم التوجيه</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="hidden lg:flex absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full items-center gap-2 text-violet-600">
              <div className="w-12 h-px bg-gradient-to-l from-violet-400 to-transparent" />
              <ArrowDown className="h-4 w-4 -rotate-90" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                const conf = CONFIDENCE[cat.id] ?? 0;
                const isWinner = cat.id === winner;
                return (
                  <motion.div
                    key={cat.id}
                    layout
                    className={`relative rounded-2xl border p-4 transition-all ${
                      isWinner && phase === "result"
                        ? `${cat.border} bg-white shadow-soft-md scale-[1.02]`
                        : `${cat.border} ${cat.soft} opacity-90`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-white ${cat.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`font-display font-extrabold text-sm ${cat.text}`}>
                          {cat.label}
                        </p>
                        <div className="mt-1.5 h-1.5 rounded-full bg-white overflow-hidden">
                          <motion.span
                            className={`block h-full ${cat.color}`}
                            initial={{ width: "0%" }}
                            animate={{
                              width: phase === "result" ? `${conf}%` : "0%",
                            }}
                            transition={{
                              duration: 0.9,
                              delay: 0.05 * i,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                      <span
                        className={`font-mono text-xs font-extrabold ${
                          phase === "result" ? cat.text : "text-stone-300"
                        }`}
                      >
                        {phase === "result" ? `${conf}%` : "0%"}
                      </span>
                    </div>

                    {isWinner && phase === "result" && !reduce && (
                      <motion.span
                        layoutId="ai-winner-badge"
                        className="absolute -top-2 -right-2 inline-flex items-center gap-1 rounded-full bg-emerald-700 text-white px-2 py-0.5 text-[10px] font-display font-bold shadow-emerald-glow"
                      >
                        <AiSparkleIcon className="h-2.5 w-2.5" />
                        الجهة المختصة
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence>
              {phase === "result" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 text-sm text-stone-700 leading-relaxed"
                >
                  <p className="font-display font-bold text-emerald-800">
                    تم التوجيه إلى: لجنة المياه والصرف الصحي · فرع {regionFromText()}
                  </p>
                  <p className="mt-1 text-xs text-stone-600">
                    SLA المقدّر: 4 ساعات للأولوية العالية · سيتم التواصل معك من
                    منسق الفرع.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dots() {
  return (
    <span className="inline-flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
          className="inline-block w-1 h-1 rounded-full bg-violet-600"
        />
      ))}
    </span>
  );
}

function regionFromText() {
  return "العاصمة";
}
