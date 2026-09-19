"use client";

import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SUBMIT_STEPS, SUBMIT_TOTAL_STEPS } from "@/hooks/use-submit-form";

interface SubmitStepperProps {
  step: number;
  maxVisitedStep: number;
  stepValidity: Record<number, boolean>;
  onStepSelect: (step: number) => void;
}

/**
 * The original stepper was decoration: it showed position but could not be used.
 * Here every step already seen is a real control, so correcting an earlier answer
 * costs one click instead of four taps on "back".
 */
export function SubmitStepper({
  step,
  maxVisitedStep,
  stepValidity,
  onStepSelect,
}: SubmitStepperProps) {
  const current = SUBMIT_STEPS[step - 1];

  return (
    <nav aria-label="خطوات النموذج">
      {/* Compact: one line of state plus a progress rail */}
      <div className="sm:hidden">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-sm font-bold text-stone-900">
            {current.title}
          </p>
          <p className="text-[11px] tabular-nums text-stone-600">
            الخطوة {step} من {SUBMIT_TOTAL_STEPS}
          </p>
        </div>
        <ol className="mt-3 flex items-center gap-1.5">
          {SUBMIT_STEPS.map((s) => {
            const isDone = s.num < step;
            const isCurrent = s.num === step;
            return (
              <li key={s.num} className="flex-1">
                <span className="sr-only">
                  {s.title}
                  {isCurrent ? " — الخطوة الحالية" : isDone ? " — مكتملة" : ""}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "block h-1.5 rounded-full transition-colors duration-300",
                    isDone && "bg-emerald-700",
                    isCurrent && "bg-emerald-500",
                    !isDone && !isCurrent && "bg-stone-200"
                  )}
                />
              </li>
            );
          })}
        </ol>
      </div>

      {/* Wide: the full path, with visited steps clickable */}
      <ol className="hidden sm:flex sm:items-start">
        {SUBMIT_STEPS.map((s, index) => {
          const isDone = s.num < step;
          const isCurrent = s.num === step;
          const reachable = s.num <= maxVisitedStep;
          const isIncomplete = reachable && !isCurrent && !stepValidity[s.num];

          return (
            <Fragment key={s.num}>
              {index > 0 && (
                <li
                  aria-hidden
                  className={cn(
                    "mx-1 mt-[19px] h-px min-w-4 flex-1 transition-colors duration-300",
                    s.num <= step ? "bg-emerald-600" : "bg-stone-200"
                  )}
                />
              )}
            <li
              className={cn(
                "flex w-[6.5rem] shrink-0 flex-col items-center gap-2 lg:w-[7.5rem]"
              )}
            >
              <button
                type="button"
                onClick={() => onStepSelect(s.num)}
                disabled={!reachable}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white font-display text-[13px] font-bold transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isDone &&
                    "border-emerald-700 bg-emerald-700 text-white hover:bg-emerald-800",
                  isCurrent &&
                    "border-emerald-700 text-emerald-700 ring-4 ring-emerald-100",
                  !isDone &&
                    !isCurrent &&
                    "border-stone-200 text-stone-400",
                  reachable && !isCurrent && "cursor-pointer",
                  !reachable && "cursor-not-allowed",
                  isIncomplete && "border-gold-500 text-gold-700"
                )}
              >
                {isDone ? (
                  <Check aria-hidden className="h-4 w-4" strokeWidth={3} />
                ) : (
                  s.num
                )}
                <span className="sr-only">
                  {reachable
                    ? `الانتقال إلى ${s.title}`
                    : `${s.title} — أكمل الخطوات السابقة أولاً`}
                </span>
              </button>

              <span
                aria-hidden
                className={cn(
                  "max-w-[7.5rem] text-center font-display text-[11.5px] font-semibold leading-tight transition-colors",
                  isCurrent ? "text-emerald-800" : "text-stone-600"
                )}
              >
                {s.title}
              </span>
            </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
