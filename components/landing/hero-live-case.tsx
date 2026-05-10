"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  CheckCircle2,
  Inbox,
  Clock,
  ArrowDown,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { resolvedCases, type ResolvedCase } from "@/data/resolved-cases";

interface Stage {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  detail: (c: ResolvedCase) => string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  ringColor: string;
  timeOffset: (c: ResolvedCase) => string;
}

const STAGES: Stage[] = [
  {
    label: "استلام الشكوى",
    Icon: Inbox,
    detail: () => "تم استقبالها وحُفظت ضمن السجلّ الوطني",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    badgeBorder: "border-sky-200",
    ringColor: "ring-sky-200",
    timeOffset: () => "00:00:00",
  },
  {
    label: "تصنيف ذكي",
    Icon: () => <AiSparkleIcon className="h-4 w-4" />,
    detail: (c) => `صُنّفت بدقة 94% — ${c.category}`,
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    badgeBorder: "border-violet-200",
    ringColor: "ring-violet-200",
    timeOffset: () => "00:14:23",
  },
  {
    label: "إسناد ميداني",
    Icon: MapPin,
    detail: (c) => `أُسندت إلى فرع ${c.governorate}`,
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badgeBorder: "border-amber-200",
    ringColor: "ring-amber-200",
    timeOffset: () => "02:40:11",
  },
  {
    label: "مُغلقة بنجاح",
    Icon: CheckCircle2,
    detail: (c) => `حُلّت في ${c.durationDays.toFixed(1)} يوم`,
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    ringColor: "ring-emerald-200",
    timeOffset: () => "تم الإغلاق",
  },
];

// Pick three varied cases for the rotation
const FEATURED_REFS = ["REF-2025-04812", "REF-2025-04778", "REF-2025-04708"];

export function HeroLiveCase() {
  const reduce = useReducedMotion();

  const featured = useMemo(
    () =>
      FEATURED_REFS.map(
        (ref) => resolvedCases.find((c) => c.ref === ref) ?? resolvedCases[0]
      ),
    []
  );

  const [caseIndex, setCaseIndex] = useState(0);
  const [revealed, setRevealed] = useState(0);

  const current = featured[caseIndex];

  useEffect(() => {
    if (reduce) {
      setRevealed(STAGES.length);
      return;
    }

    if (revealed < STAGES.length) {
      const t = setTimeout(() => setRevealed((r) => r + 1), 1500);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setRevealed(0);
      setCaseIndex((i) => (i + 1) % featured.length);
    }, 3000);
    return () => clearTimeout(t);
  }, [revealed, featured.length, reduce]);

  return (
    <div className="relative w-full max-w-[440px] mx-auto lg:mx-0">
      {/* Decorative gold ring behind card */}
      <div
        aria-hidden
        className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-gold-300/15 via-gold-100/0 to-emerald-300/15 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -inset-px rounded-3xl bg-gradient-to-br from-gold-300/40 via-stone-200/40 to-emerald-300/40"
      />

      <motion.article
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl bg-white/95 backdrop-blur-md hero-card-glow overflow-hidden"
      >
        {/* Subtle gold corner accent */}
        <div
          aria-hidden
          className="absolute top-0 left-0 h-16 w-16 bg-gradient-to-br from-gold-400/25 to-transparent rounded-tl-3xl"
        />
        <div
          aria-hidden
          className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-emerald-300/15 to-transparent rounded-tr-3xl"
        />

        {/* Header */}
        <header className="relative px-5 pt-5 pb-4 border-b border-stone-100/80">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-display font-bold text-emerald-700 border border-emerald-100">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              قضية حيّة
            </span>
            <span className="font-mono text-[10px] tracking-wider text-stone-500">
              {current.ref}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.ref + "-title"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45 }}
              className="mt-3"
            >
              <h3 className="font-display text-base sm:text-lg font-extrabold text-stone-900 leading-snug">
                {current.title}
              </h3>
              <p className="mt-1.5 text-xs text-stone-500 inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-gold-500" />
                {current.district} · {current.governorate}
              </p>
            </motion.div>
          </AnimatePresence>
        </header>

        {/* Timeline */}
        <div className="relative px-5 pt-5 pb-5">
          {/* Vertical thread on the right (RTL) */}
          <div
            aria-hidden
            className="absolute top-6 bottom-6 right-[28px] w-[2px] gold-thread-vertical rounded-full"
          />

          <ul className="relative space-y-3.5">
            {STAGES.map((stage, idx) => {
              const isRevealed = idx < revealed;
              const isCurrent = idx === revealed - 1;
              const StageIcon = stage.Icon;

              return (
                <motion.li
                  key={`${current.ref}-${idx}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{
                    opacity: isRevealed ? 1 : 0.25,
                    x: isRevealed ? 0 : -16,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-start gap-3 pr-12"
                >
                  {/* Stage dot on the right */}
                  <div className="absolute right-0 top-1 flex h-7 w-7 items-center justify-center">
                    <motion.span
                      initial={false}
                      animate={
                        isCurrent && !reduce
                          ? { scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }
                          : { scale: 1, opacity: 0 }
                      }
                      transition={{
                        duration: 1.6,
                        repeat: isCurrent && !reduce ? Infinity : 0,
                      }}
                      className={`absolute h-7 w-7 rounded-full bg-gold-300/40`}
                    />
                    <span
                      className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                        isRevealed
                          ? "border-emerald-500 bg-white"
                          : "border-stone-200 bg-stone-50"
                      }`}
                    >
                      {isRevealed && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.35,
                            ease: "backOut",
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                        />
                      )}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-[11px] font-display font-bold ${stage.badgeBg} ${stage.badgeText} ${stage.badgeBorder}`}
                      >
                        <StageIcon className="h-3 w-3" />
                        {stage.label}
                      </span>
                      <span className="font-mono text-[10px] text-stone-400 tabular-nums">
                        {stage.timeOffset(current)}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-xs leading-relaxed transition-colors ${
                        isRevealed ? "text-stone-700" : "text-stone-400"
                      }`}
                    >
                      {stage.detail(current)}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Footer */}
        <footer className="relative px-5 pb-5 pt-4 border-t border-stone-100/80 bg-gradient-to-b from-stone-50/50 to-transparent">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-gold-500" />
              <span className="text-[11px] text-stone-500">
                دورة {caseIndex + 1} من {featured.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {featured.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === caseIndex
                      ? "w-6 bg-emerald-600"
                      : "w-1.5 bg-stone-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-[11px] text-stone-500 leading-relaxed">
            <span className="font-display font-bold text-emerald-700">
              ١٬٢٤٧ قضية
            </span>{" "}
            مغلقة هذا الشهر — لا وَعد، بل سجلّ مفتوح.
          </p>
        </footer>
      </motion.article>

      {/* Floating mini-stat below card (md+) */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="hidden md:flex absolute -bottom-5 right-6 items-center gap-2 rounded-2xl bg-stone-900 text-white px-4 py-2.5 shadow-soft-lg"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
            متوسط زمن الحل
          </div>
          <div className="font-display text-sm font-extrabold tabular-nums">
            ٢٫١ يوم
          </div>
        </div>
      </motion.div>

      {/* Floating arrow pointer (md+) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="hidden lg:flex absolute -top-3 -left-3 h-10 w-10 items-center justify-center rounded-full bg-white border border-gold-200 shadow-soft-md text-gold-600 rotate-45"
      >
        <ArrowDown className="h-4 w-4" />
      </motion.div>
    </div>
  );
}
