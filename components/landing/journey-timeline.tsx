"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileText, MapPin, ScanSearch } from "lucide-react";
import { SectionShell } from "./section-shell";
import { SectionHeader, SectionTag } from "./section-tag";

const steps = [
  {
    icon: FileText,
    number: "٠١",
    title: "أرسل التفاصيل",
    description: "نموذج واضح يحفظ حقك ويمنحك رقمًا مرجعيًا فورًا.",
  },
  {
    icon: ScanSearch,
    number: "٠٢",
    title: "تصنيف ذكي",
    description: "تُقرأ القضية وتُصنّف وتُوجّه إلى الجهة الأقرب للاختصاص.",
  },
  {
    icon: MapPin,
    number: "٠٣",
    title: "تحرّك ميداني",
    description: "تظهر لك الجهة المسؤولة ومرحلة التنفيذ والزمن المتوقع.",
  },
  {
    icon: CheckCircle2,
    number: "٠٤",
    title: "حل موثّق",
    description: "لا تُغلق القضية قبل توثيق الإجراء وإتاحة النتيجة للمتابعة.",
  },
];

export function JourneyTimeline() {
  return (
    <SectionShell id="journey" number="٠١" label="رحلة الطلب" tone="white">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <SectionHeader
          align="right"
          className="mb-0 lg:col-span-4"
          badge={<SectionTag>من الصوت إلى الأثر</SectionTag>}
          title={<>أربع محطات.<br />مسار واحد واضح.</>}
          description="كل خطوة مصممة لتجيب عن السؤال الأهم: أين وصل طلبي الآن؟"
        />

        <ol className="relative grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {steps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}
              className="civic-card emblem-frame corner-marks group relative min-h-64 overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1 lg:p-7"
            >
              <span className="absolute end-5 top-4 font-mono text-5xl font-bold text-emerald-950/[.055]">
                {step.number}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950 text-gold-300">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-10 font-display text-2xl font-extrabold text-emerald-950">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-stone-600">
                {step.description}
              </p>
              <span className="absolute inset-x-6 bottom-0 h-1 origin-right scale-x-0 rounded-full bg-gold-400 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
