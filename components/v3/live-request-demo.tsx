"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Loader2,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Section } from "./section";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* نصوص المشهد: شكوى واحدة واقعية تُكتب حياً ثم يظهر تأكيد الاستلام.   */
/* ------------------------------------------------------------------ */
const TITLE_TEXT = "تسرب مياه في شارع الأمير محمد";
const DESC_TEXT =
  "منذ ثلاثة أيام والمياه تتسرب من الأنبوب الرئيسي قرب مدخل الحي، والشارع أصبح خطراً على المشاة والسيارات.";
const DISTRICT_TEXT = "حي النزهة";
const GOVERNORATE_TEXT = "عمّان";
const FILE_NAME = "photo-of-leak.jpg";
const REF_NUMBER = "REF-2026-04871";

const TYPE_SPEED = 55;
const DESC_SPEED = 22;
const FIELD_PAUSE = 550;
const SUCCESS_HOLD = 4000;

/**
 * مراحل المشهد بالترتيب. كل مرحلة إما كتابة حرفية (title/description/
 * district) أو لقطة قصيرة (اختيار، مرفق، إرسال، نجاح).
 */
const PHASES = [
  "select-type",
  "title",
  "description",
  "location",
  "district",
  "attachment",
  "submit",
  "success",
  "hold",
] as const;
type Phase = (typeof PHASES)[number];

const phaseIndex = (p: Phase) => PHASES.indexOf(p);

/** مؤشر الكتابة الوامض بجانب الحرف الحالي. */
function Caret() {
  return (
    <span
      aria-hidden
      className="mx-0.5 inline-block h-[1.1em] w-[2px] animate-pulse rounded-full bg-emerald-600 align-middle"
    />
  );
}

/**
 * مشهد "كتابة حية" للقسم الأول في v3: نموذج شكوى مصغّر بنفس هوية
 * نموذج /submit يتعبّى ذاتياً حرفاً بحرف، ثم ينقلب لبطاقة نجاح برقم
 * مرجعي، ويعاد كحلقة. يعمل فقط وهو داخل الشاشة، ويحترم
 * prefers-reduced-motion بعرض النتيجة النهائية مباشرة.
 */
export function LiveRequestDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const [phaseIdx, setPhaseIdx] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [district, setDistrict] = useState("");

  const phase: Phase = PHASES[phaseIdx];
  const at = (p: Phase) => phaseIdx >= phaseIndex(p);
  const isSuccess = at("success");

  /* لا يعمل المشهد إلا وهو داخل الشاشة، ويتوقف مؤقتاً عند الخروج. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* حركة مخفّضة: نموذج معبّأ وشاشة نجاح مباشرة دون أي كتابة. */
  useEffect(() => {
    if (!reduced) return;
    setTitle(TITLE_TEXT);
    setDesc(DESC_TEXT);
    setDistrict(DISTRICT_TEXT);
    setPhaseIdx(phaseIndex("success"));
  }, [reduced]);

  /* محرك الكتابة: مؤقّت واحد متسلسل يقوده طور المشهد الحالي. */
  useEffect(() => {
    if (!inView || reduced) return;

    let t: number;
    const next = (delay: number) => {
      t = window.setTimeout(() => setPhaseIdx((i) => i + 1), delay);
    };

    switch (phase) {
      case "select-type":
        next(750);
        break;
      case "title":
        if (title.length < TITLE_TEXT.length) {
          t = window.setTimeout(
            () => setTitle(TITLE_TEXT.slice(0, title.length + 1)),
            TYPE_SPEED
          );
        } else {
          next(FIELD_PAUSE);
        }
        break;
      case "description":
        if (desc.length < DESC_TEXT.length) {
          t = window.setTimeout(
            () => setDesc(DESC_TEXT.slice(0, desc.length + 1)),
            DESC_SPEED
          );
        } else {
          next(FIELD_PAUSE);
        }
        break;
      case "location":
        next(650);
        break;
      case "district":
        if (district.length < DISTRICT_TEXT.length) {
          t = window.setTimeout(
            () => setDistrict(DISTRICT_TEXT.slice(0, district.length + 1)),
            TYPE_SPEED
          );
        } else {
          next(FIELD_PAUSE);
        }
        break;
      case "attachment":
        next(900);
        break;
      case "submit":
        next(1100);
        break;
      case "success":
        next(SUCCESS_HOLD);
        break;
      case "hold":
        t = window.setTimeout(() => {
          setTitle("");
          setDesc("");
          setDistrict("");
          setPhaseIdx(0);
        }, 400);
        break;
    }

    return () => window.clearTimeout(t);
  }, [inView, reduced, phase, phaseIdx, title, desc, district]);

  return (
    <Section
      id="v3-section-1"
      tone="white"
      aurora="gold"
      className="!pt-12 lg:!pt-16"
    >
      <div
        ref={rootRef}
        className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
      >
        {/* عمود النص التسويقي */}
        <div className="max-w-xl">
          <h2 className="text-balance font-display text-2xl font-extrabold leading-[1.25] tracking-[-0.02em] text-stone-900 sm:text-3xl lg:text-4xl">
            هكذا يُقدَّم طلبك،
            <span className="text-gradient-emerald-animated">
              {" "}
              خطوة بخطوة.
            </span>
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-stone-600 lg:text-base">
            شاهد كيف تُكتب شكوى حقيقية وتُرسل في أقل من دقيقتين، لتصل بعدها
            رقمك المرجعي وتبدأ رحلة المعالجة.
          </p>
        </div>

        {/* بطاقة النموذج المصغّر — عرض فقط، غير قابلة للتفاعل */}
        <Card
          aria-label="عرض توضيحي: نموذج شكوى يُعبَّأ تلقائياً"
          className="pointer-events-none select-none overflow-hidden p-5 sm:p-6 hero-card-glow"
        >
          <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-3">
            <p className="font-display text-sm font-bold text-stone-900">
              نموذج التقديم الإلكتروني
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
              <span
                aria-hidden
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-emerald-500",
                  !reduced && "animate-pulse"
                )}
              />
              عرض حي
            </span>
          </div>

          <div className="relative min-h-[380px]">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  aria-live="polite"
                  className="flex min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.1 }}
                    className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"
                  >
                    <Check
                      className="h-8 w-8 text-emerald-700"
                      strokeWidth={3}
                    />
                  </motion.div>
                  <p className="font-display text-lg font-bold text-stone-900">
                    تم استلام طلبك بنجاح
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    احفظ الرقم المرجعي للتتبع في أي وقت
                  </p>
                  <div className="mt-5 w-full max-w-xs rounded-2xl gradient-panel-emerald p-4">
                    <p className="mb-1 text-[11px] text-gold-300">
                      رقمك المرجعي
                    </p>
                    <p
                      dir="ltr"
                      className="number-mono font-display text-xl font-extrabold tracking-wider text-white"
                    >
                      {REF_NUMBER}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* نوع الطلب */}
                  <div>
                    <Label className="mb-2 block">نوع الطلب</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {["شكوى", "مقترح", "استفسار", "بلاغ"].map((label, i) => (
                        <div
                          key={label}
                          className={cn(
                            "rounded-xl border-2 p-2.5 text-center text-xs font-display font-bold transition-all duration-300 sm:text-sm",
                            at("title") && i === 0
                              ? "border-emerald-700 bg-emerald-50 text-emerald-700"
                              : "border-stone-200 bg-white text-stone-400"
                          )}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* عنوان مختصر */}
                  <div>
                    <Label className="mb-2 block">عنوان مختصر</Label>
                    <div className="flex h-11 w-full items-center rounded-xl border border-input bg-background px-4 text-sm text-stone-900">
                      {title}
                      {phase === "title" && <Caret />}
                    </div>
                  </div>

                  {/* وصف تفصيلي */}
                  <div>
                    <Label className="mb-2 block">وصف تفصيلي</Label>
                    <div className="min-h-[88px] w-full rounded-xl border border-input bg-background px-4 py-2 text-sm leading-relaxed text-stone-900">
                      {desc}
                      {phase === "description" && <Caret />}
                    </div>
                  </div>

                  {/* الموقع */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="mb-2 block">المحافظة</Label>
                      <div
                        className={cn(
                          "flex h-11 w-full items-center justify-between rounded-xl border bg-background px-4 text-sm transition-colors duration-300",
                          at("district")
                            ? "border-input text-stone-900"
                            : "border-input text-muted-foreground"
                        )}
                      >
                        <span>
                          {at("district") ? GOVERNORATE_TEXT : "اختر المحافظة"}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">الحي / المنطقة</Label>
                      <div className="flex h-11 w-full items-center rounded-xl border border-input bg-background px-4 text-sm text-stone-900">
                        {district}
                        {phase === "district" && <Caret />}
                      </div>
                    </div>
                  </div>

                  {/* المرفق */}
                  <div className="min-h-[52px]">
                    {at("attachment") && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3"
                      >
                        <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                          <Paperclip className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            dir="ltr"
                            className="truncate text-right text-sm font-medium text-stone-900"
                          >
                            {FILE_NAME}
                          </p>
                          <p className="text-[11px] text-stone-400">1.2 MB</p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* زر الإرسال */}
                  <Button
                    variant="gold"
                    size="lg"
                    tabIndex={-1}
                    className={cn(
                      "w-full transition-transform",
                      phase === "submit" && "scale-[0.98]"
                    )}
                  >
                    {phase === "submit" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>جارٍ الإرسال...</span>
                      </>
                    ) : (
                      <span>إرسال الطلب</span>
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </Section>
  );
}
