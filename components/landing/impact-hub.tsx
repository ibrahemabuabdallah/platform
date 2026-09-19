"use client";

import { motion } from "framer-motion";
import { ArrowUpLeft, CheckCircle2, Clock3, MapPinned, Sparkles } from "lucide-react";
import { SectionShell } from "./section-shell";
import { SectionHeader, SectionTag } from "./section-tag";

const governorates = [
  { name: "عمّان", value: 92 },
  { name: "إربد", value: 76 },
  { name: "الزرقاء", value: 68 },
  { name: "الكرك", value: 54 },
];

const cases = [
  { title: "إصلاح إنارة شارع رئيسي", place: "عمّان", time: "١٫٨ يوم" },
  { title: "معالجة انقطاع مياه متكرر", place: "إربد", time: "٢٫٤ يوم" },
];

export function ImpactHub() {
  return (
    <SectionShell id="impact" number="٠٢" label="الأثر التشغيلي" tone="off-white" className="civic-surface">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeader
          align="right"
          className="mb-0"
          badge={<SectionTag variant="gold">بيانات يمكن فهمها</SectionTag>}
          title={<>الصورة كاملة،<br />من دون ضجيج.</>}
          description="مؤشرات مختصرة تكشف سرعة الاستجابة ومكان الضغط وما أُنجز فعليًا."
        />
        <p className="max-w-md text-sm leading-7 text-stone-500">
          آخر تحديث للمؤشرات: اليوم، ٠٧:٣٠ صباحًا
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="civic-card-dark emblem-frame-dark relative overflow-hidden rounded-[2rem] p-7 text-white lg:col-span-7 lg:min-h-[420px] lg:p-9"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-gold-300">
              <MapPinned className="h-4 w-4" />
              نبض المحافظات
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/65">مباشر</span>
          </div>
          <div className="mt-12 space-y-7">
            {governorates.map((item, index) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-bold">{item.name}</span>
                  <span className="font-mono text-gold-300">{item.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full origin-right rounded-full bg-gradient-to-l from-gold-400 to-emerald-400"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          <article className="civic-card p-6 lg:p-7">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-100 text-gold-800">
                <Clock3 className="h-5 w-5" />
              </div>
              <ArrowUpLeft className="h-5 w-5 text-emerald-700" />
            </div>
            <p className="mt-7 font-display text-5xl font-extrabold text-emerald-950">٨٧٪</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">من الطلبات تبدأ معالجتها ضمن زمن الاستجابة المحدد.</p>
          </article>

          <article className="civic-card p-6 lg:p-7">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
              <Sparkles className="h-4 w-4 text-gold-600" />
              أُغلقت مؤخرًا
            </div>
            <div className="mt-5 space-y-4">
              {cases.map((item) => (
                <div key={item.title} className="flex items-start gap-3 border-t border-emerald-950/8 pt-4 first:border-0 first:pt-0">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />
                  <div className="min-w-0">
                    <p className="font-bold text-emerald-950">{item.title}</p>
                    <p className="mt-1 text-xs text-stone-500">{item.place} · {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </SectionShell>
  );
}
