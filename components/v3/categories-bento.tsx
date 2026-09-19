"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Landmark,
  Lightbulb,
  Scale,
  Stamp,
  Wrench,
} from "lucide-react";
import { Section } from "./section";
import { CASE_TYPE_LABELS } from "@/lib/constants";
import { formatLocaleNumber } from "@/lib/utils";
import { resolvedCases } from "@/data/resolved-cases";
import type { AppIcon } from "@/lib/icon-types";
import type { CaseType } from "@/types";

interface Track {
  type: CaseType;
  icon: AppIcon;
  blurb: string;
  /** عدد القضايا المغلقة في هذا المسار — رقم تراكمي إرشادي. */
  resolved: number;
  /** متوسط زمن الإغلاق المعروض للمواطن. */
  avgClose: string;
  /** أمثلة موضوعية تظهر كرقائق داخل البطاقة. */
  topics: string[];
  /** البطاقة القائدة تحتل عرضاً مضاعفاً في الشبكة. */
  lead?: boolean;
}

const TRACKS: Track[] = [
  {
    type: "service",
    icon: Wrench,
    blurb:
      "كل ما يمسّ الخدمة على الأرض — يُسنَد لمنسّق ميداني وينتهي بزيارة موثّقة.",
    resolved: 8914,
    avgClose: "2.4 يوم",
    topics: ["مياه", "كهرباء", "طرق وأرصفة", "نظافة", "صرف صحي", "إنارة"],
    lead: true,
  },
  {
    type: "legal",
    icon: Scale,
    blurb: "مسائل تحتاج رأياً أو إجراءً قانونياً، تُحوَّل للجهة المختصة.",
    resolved: 1206,
    avgClose: "6 أيام",
    topics: ["نزاع ملكية", "تظلّم إداري"],
  },
  {
    type: "political",
    icon: Landmark,
    blurb: "قضايا عامة تُرفع لمتّخذي القرار عبر اللجان المختصة.",
    resolved: 843,
    avgClose: "9 أيام",
    topics: ["مطلب خدمي للحي", "تمثيل في لجنة"],
  },
  {
    type: "suggestion",
    icon: Lightbulb,
    blurb: "فكرة لتحسين خدمة قائمة — تُدرس ويُردّ عليها مثل أي طلب.",
    resolved: 1517,
    avgClose: "5 أيام",
    topics: ["تحسين مسار حافلة", "توسيع ساعات الخدمة"],
  },
];

/** آخر قضية محلولة في المسار — تُكشف عند المرور على البطاقة. */
function latestResolved(type: CaseType) {
  const label = CASE_TYPE_LABELS[type];
  return resolvedCases.find((c) => c.category === label);
}

const cardMotion = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.55, delay: i * 0.09, ease: "easeOut" as const },
});

/** رقم السجل بصيغة 01 / 02 ... بخط لاتيني ذهبي. */
function registryNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

/**
 * القسم الثاني في v3: «فئات الشكاوى» بطابع السجل الرسمي السيادي —
 * ترويسة بختم ذهبي وخطوط شعيرية، بطاقة قائدة زمردية عميقة بإطار ذهبي
 * متحرك (نفس لغة بطاقة الرقم المرجعي في العرض الحي)، وبطاقات ثانوية
 * مرقّمة كصفحات سجل. المحتوى والروابط والحركات كما هي.
 */
export function CategoriesBento() {
  const [lead, ...rest] = TRACKS;

  return (
    <Section id="v3-section-2" tone="cream" aurora="emerald">
      {/* الترويسة — أسلوب السجل الرسمي */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            {/* الختم الرسمي: دائرة ذهبية مزدوجة الإطار */}
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-500/60 bg-white shadow-soft-sm">
              <span
                aria-hidden
                className="absolute inset-[3px] rounded-full border border-gold-400/40"
              />
              <Stamp aria-hidden className="h-[18px] w-[18px] text-emerald-700" />
            </span>
            <span className="inline-flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-gold-line" />
              <span className="text-[11px] font-display font-bold tracking-[0.18em] text-gold-700">
                سجل المسارات الرسمية
              </span>
              <span aria-hidden className="h-px w-8 bg-gold-line" />
            </span>
          </div>
          <h2 className="mt-4 text-balance font-display text-2xl font-extrabold leading-[1.25] tracking-[-0.02em] text-stone-900 sm:text-3xl lg:text-4xl">
            أربعة مسارات،
            <span className="text-gradient-emerald-animated">
              {" "}
              ولكل مسار جهة تنتظره.
            </span>
          </h2>
          {/* فاصل ذهبي شعيري — إحساس الوثيقة الرسمية */}
          <span aria-hidden className="mt-4 block h-[2px] w-24 bg-gold-line" />
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-stone-600 lg:text-base">
            اختيار المسار الصحيح من الخطوة الأولى يوفّر عليك الانتظار — لأنه
            يحدّد من يستلم طلبك ويحاسب على إغلاقه.
          </p>
        </div>
        <Link
          href="/submit"
          className="group inline-flex items-center gap-2 font-display text-sm font-bold text-emerald-800 underline decoration-gold-400/60 decoration-2 underline-offset-[6px] transition-colors hover:text-emerald-900 hover:decoration-gold-500"
        >
          ابدأ بتقديم طلبك
          <ArrowLeft
            aria-hidden
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
          />
        </Link>
      </div>

      {/* شبكة Bento: وثيقة سيادية قائدة + صفحات سجل مرقّمة */}
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        <LeadTrackCard track={lead} index={0} />
        {rest.map((track, i) => (
          <RegistryTrackCard key={track.type} track={track} index={i + 1} />
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* البطاقة القائدة: «الوثيقة السيادية» — لوحة زمردية عميقة بإطار      */
/* ذهبي متحرك، نص أبيض، وسجل إنجاز برقم ذهبي كبير.                    */
/* ------------------------------------------------------------------ */
function LeadTrackCard({ track, index }: { track: Track; index: number }) {
  const Icon = track.icon;
  const resolved = latestResolved(track.type);

  return (
    <motion.div {...cardMotion(index)} className="lg:col-span-2">
      <Link
        href={`/submit?type=${track.type}`}
        className="card-border-gradient card-frame-featured group relative flex h-full flex-col overflow-hidden rounded-3xl gradient-panel-emerald p-6 shadow-soft-lg transition-transform duration-300 hover:-translate-y-1 lg:p-8"
      >
        {/* رقم السجل — مائي خلف المحتوى */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-4 end-4 select-none font-mono text-[7rem] font-extrabold leading-none text-white/[0.06]"
        >
          {registryNumber(index)}
        </span>

        <div className="relative flex items-start justify-between gap-4">
          {/* أيقونة بإطار دائري مزدوج ذهبي */}
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/50 bg-white/10 backdrop-blur-sm">
            <span
              aria-hidden
              className="absolute inset-[4px] rounded-full border border-gold-300/30"
            />
            <Icon aria-hidden className="h-6 w-6 text-gold-300" />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-white/10 px-3 py-1 text-[11px] font-semibold text-gold-200">
            <CheckCircle2 aria-hidden className="h-3 w-3" />
            المسار الأكثر نشاطاً
          </span>
        </div>

        <h3 className="relative mt-5 font-display text-2xl font-extrabold tracking-[-0.015em] text-white">
          {CASE_TYPE_LABELS[track.type]}
        </h3>
        <p className="relative mt-2 max-w-md text-sm leading-relaxed text-emerald-100/80">
          {track.blurb}
        </p>

        {/* الرقائق الموضوعية — زجاجية بحدود ذهبية */}
        <ul className="relative mt-5 flex flex-wrap gap-2">
          {track.topics.map((topic) => (
            <li
              key={topic}
              className="rounded-lg border border-gold-400/25 bg-white/10 px-2.5 py-1.5 text-[12px] text-emerald-50 transition-colors duration-300 group-hover:border-gold-300/50 group-hover:bg-white/15"
            >
              {topic}
            </li>
          ))}
        </ul>

        {/* سجل الإنجاز + متوسط الإغلاق */}
        <div className="relative mt-auto pt-6">
          <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-4">
            <div>
              <p className="font-mono text-3xl font-extrabold leading-none text-gold-300 number-mono lg:text-4xl">
                {formatLocaleNumber(track.resolved)}
              </p>
              <p className="mt-1.5 text-[11px] text-emerald-100/60">
                قضية مُغلقة في هذا المسار · متوسط الإغلاق{" "}
                <span className="font-display font-bold text-gold-200">
                  {track.avgClose}
                </span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 font-display text-[12px] font-bold text-gold-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
              قدّم في هذا المسار
              <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
            </span>
          </div>
          {resolved && (
            <p className="mt-3 max-h-0 overflow-hidden text-[11.5px] leading-relaxed text-emerald-100/60 opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
              آخر قصة نجاح: «{resolved.title}» — {resolved.district}،{" "}
              {resolved.governorate} · أُغلقت خلال{" "}
              <span className="number-mono">{resolved.durationDays}</span> يوم.
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* البطاقات الثانوية: «صفحات السجل» — ترقيم ذهبي، خط شعيري علوي،      */
/* وأيقونة بإطار دائري مزدوج زمردي/ذهبي.                              */
/* ------------------------------------------------------------------ */
function RegistryTrackCard({ track, index }: { track: Track; index: number }) {
  const Icon = track.icon;
  const resolved = latestResolved(track.type);

  return (
    <motion.div {...cardMotion(index)}>
      <Link
        href={`/submit?type=${track.type}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200/70 bg-white p-6 shadow-soft-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-soft-md"
      >
        {/* الخط الذهبي الشعيري العلوي */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] bg-gold-line opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="flex items-start justify-between gap-3">
          {/* أيقونة بإطار دائري مزدوج */}
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 transition-colors duration-300 group-hover:border-gold-400/50">
            <span
              aria-hidden
              className="absolute inset-[3px] rounded-full border border-emerald-100 transition-colors duration-300 group-hover:border-gold-300/40"
            />
            <Icon aria-hidden className="h-5 w-5 text-emerald-700" />
          </span>
          {/* رقم السجل */}
          <span className="font-mono text-sm font-extrabold tracking-widest text-gold-600/80">
            {registryNumber(index)}
          </span>
        </div>

        <h3 className="mt-4 font-display text-lg font-extrabold tracking-[-0.015em] text-stone-900">
          {CASE_TYPE_LABELS[track.type]}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-stone-600">
          {track.blurb}
        </p>

        {/* الرقائق الموضوعية */}
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {track.topics.map((topic) => (
            <li
              key={topic}
              className="rounded-md bg-stone-100/90 px-2 py-1 text-[11.5px] text-stone-600 transition-colors group-hover:bg-gold-50 group-hover:text-gold-800"
            >
              {topic}
            </li>
          ))}
        </ul>

        {/* سطر السجل الختامي */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-3 border-t border-stone-100 pt-3.5">
            <p className="text-[11.5px] text-stone-500">
              <span className="number-mono font-bold text-emerald-800">
                {formatLocaleNumber(track.resolved)}
              </span>{" "}
              قضية أُغلقت · {track.avgClose}
            </p>
            <ArrowLeft
              aria-hidden
              className="h-3.5 w-3.5 text-gold-600 opacity-0 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:opacity-100"
            />
          </div>
          {resolved && (
            <p className="mt-2 max-h-0 overflow-hidden text-[11px] leading-relaxed text-stone-500 opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
              «{resolved.title}» — {resolved.district}، {resolved.governorate}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
