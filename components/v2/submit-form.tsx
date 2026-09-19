"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { SubmitStepper } from "@/components/v2/submit-stepper";
import { SubmitStepBody } from "@/components/v2/submit-steps";
import { SubmitSuccess } from "@/components/v2/submit-success";
import { SUBMIT_TOTAL_STEPS, useSubmitForm } from "@/hooks/use-submit-form";

const DRAFT_KEY = "sawtak:v2:submit-draft";

export function SubmitForm() {
  const reduceMotion = useReducedMotion();
  const form = useSubmitForm({ persistKey: DRAFT_KEY });

  const {
    step,
    canProceed,
    attemptedCurrentStep,
    isLastStep,
    isFirstStep,
    draftRestored,
    maxVisitedStep,
    stepValidity,
    goNext,
    goBack,
    goToStep,
    handleSubmit,
    copyRef,
    showSuccess,
    setShowSuccess,
    refNumber,
    reset,
  } = form;

  return (
    <>
      <PageHeader
        badge="تقديم شكوى أو مقترح"
        title="نموذج التقديم الإلكتروني"
        description="خمس خطوات قصيرة، وما تكتبه يُحفظ تلقائياً إن أغلقت الصفحة."
      />

      <div className="container max-w-3xl py-8 lg:py-12">
        {/* A restored draft is announced, with a way out of it */}
        {draftRestored && (
          <div
            role="status"
            className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold-200/70 bg-gold-50/60 px-4 py-3"
          >
            <p className="text-[12.5px] leading-relaxed text-stone-700">
              أكملنا من حيث توقفت — استعدنا ما كتبته سابقاً.
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-display text-[11.5px] font-semibold text-stone-700 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <RotateCcw aria-hidden className="h-3.5 w-3.5" />
              ابدأ من جديد
            </button>
          </div>
        )}

        <div className="rounded-2xl border border-border bg-white p-4 shadow-soft-sm sm:p-5 lg:p-6">
          <SubmitStepper
            step={step}
            maxVisitedStep={maxVisitedStep}
            stepValidity={stepValidity}
            onStepSelect={goToStep}
          />
        </div>

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (isLastStep) {
              handleSubmit();
            } else {
              goNext();
            }
          }}
          className="mt-5"
        >
          <div className="min-h-[26rem] rounded-2xl border border-border bg-white p-5 shadow-soft-sm lg:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                <SubmitStepBody form={form} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Actions stay reachable on a phone without hiding page content */}
          <div className="sticky bottom-0 z-10 mt-5 border-t border-stone-200/80 bg-white/95 py-3 backdrop-blur-sm sm:static sm:border-0 sm:bg-transparent sm:py-0 sm:backdrop-blur-none">
            <div className="flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={isFirstStep}
                onClick={goBack}
                className="flex-1 sm:flex-initial"
              >
                <ArrowRight aria-hidden className="h-4 w-4" />
                <span>السابق</span>
              </Button>

              {isLastStep ? (
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="flex-1 sm:flex-initial"
                >
                  <AiSparkleIcon aria-hidden className="h-4 w-4" />
                  <span>إرسال الطلب</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 sm:flex-initial"
                >
                  <span>التالي</span>
                  <ArrowLeft aria-hidden className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/*
              The gate is explained instead of only disabling the control: the
              button stays live, and pressing it reveals which answers are missing.
            */}
            <p
              aria-live="polite"
              className="mt-2 min-h-[1.125rem] text-center text-[11.5px] text-stone-600 sm:text-start"
            >
              {attemptedCurrentStep && !canProceed && !isLastStep
                ? "أكمل الحقول المطلوبة أعلاه للمتابعة."
                : `الخطوة ${step} من ${SUBMIT_TOTAL_STEPS}`}
            </p>
          </div>
        </form>
      </div>

      <SubmitSuccess
        open={showSuccess}
        onOpenChange={setShowSuccess}
        refNumber={refNumber}
        onCopy={copyRef}
      />
    </>
  );
}
