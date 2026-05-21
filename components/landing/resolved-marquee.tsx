"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Hash, Megaphone, Clock } from "lucide-react";
import { resolvedCases, type ResolvedCase } from "@/data/resolved-cases";
import { TitleAccent, TitleLineBreak } from "@/components/shared/title-accent";
import { SectionShell } from "./section-shell";
import { SectionTag, SectionHeader } from "./section-tag";

const categoryStyles: Record<
  ResolvedCase["category"],
  { bg: string; text: string }
> = {
  "خدمية": { bg: "bg-emerald-50", text: "text-emerald-700" },
  "قانونية": { bg: "bg-blue-50", text: "text-blue-700" },
  "سياسية": { bg: "bg-violet-50", text: "text-violet-700" },
  "اقتراح": { bg: "bg-gold-50", text: "text-gold-700" },
};

function CaseCard({ item }: { item: ResolvedCase }) {
  const style = categoryStyles[item.category];

  return (
    <div className="shrink-0 w-[300px] sm:w-[340px] rounded-2xl border border-stone-100 bg-white shadow-soft-md hover:shadow-soft-lg hover:-translate-y-0.5 transition-all p-5 mx-2.5">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-display font-bold ${style.bg} ${style.text}`}
        >
          {item.category}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-stone-400">
          <Hash className="h-3 w-3" />
          {item.ref}
        </span>
      </div>

      <h4 className="font-display font-bold text-sm text-stone-900 leading-snug mb-3 line-clamp-2 min-h-[40px]">
        {item.title}
      </h4>

      <div className="flex items-center justify-between gap-2 text-[11px] text-stone-500 mb-3">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3 text-emerald-600" />
          {item.district}
          <span className="text-stone-300">·</span>
          {item.governorate}
        </span>
        <span className="inline-flex items-center gap-1 text-stone-400">
          <Clock className="h-3 w-3" />
          {item.closedAt}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
        <span className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          تم الإغلاق
        </span>
        <span className="text-[11px] text-stone-500">
          حُلّت في{" "}
          <span className="font-display font-extrabold text-emerald-700 number-mono">
            {item.durationDays}
          </span>{" "}
          يوم
        </span>
      </div>
    </div>
  );
}

export function ResolvedMarquee() {
  const doubled = [...resolvedCases, ...resolvedCases];

  return (
    <SectionShell
      number="07"
      label="قصص نجاح"
      tone="white"
      aurora="emerald"
      className="!overflow-hidden"
    >
      <SectionHeader
        badge={
          <SectionTag icon={Megaphone} variant="gold">
            صوت وصل، شكوى حُلّت
          </SectionTag>
        }
        title={
          <>
            قضايا حقيقية
            <TitleLineBreak />
            <TitleAccent variant="emerald">أُغلقت بنجاح هذا الشهر</TitleAccent>
          </>
        }
        description="عيّنة من آخر القضايا التي وثّقها النظام وأغلقت رسمياً عبر قنوات التدخل الميداني."
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative -mx-4 sm:-mx-6 lg:-mx-8"
      >
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-transparent to-white pointer-events-none z-10" />
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-transparent to-white pointer-events-none z-10" />

        <div
          className="overflow-hidden"
          style={{ direction: "ltr" }}
        >
          <div
            className="flex marquee-curve hover:[animation-play-state:paused] py-4"
            style={{ direction: "rtl", width: "max-content" }}
          >
            {doubled.map((item, i) => (
              <CaseCard key={`${item.ref}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-stone-500">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/70 border border-emerald-100 text-emerald-700 font-display font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
          آخر تحديث: قبل دقائق
        </span>
        <span className="text-stone-400">
          · مرّر مؤشّر الفأرة لإيقاف الحركة
        </span>
      </div>
    </SectionShell>
  );
}
