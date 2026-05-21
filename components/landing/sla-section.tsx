"use client";

import { motion } from "framer-motion";
import {
  Clock,
  AlertTriangle,
  ArrowUpFromLine,
  Bell,
  CheckCircle2,
} from "lucide-react";
import { SectionShell } from "./section-shell";
import { SectionTag, SectionHeader } from "./section-tag";
import { TitleAccent, TitleLineBreak } from "@/components/shared/title-accent";

const slaLevels = [
  {
    priority: "حرجة",
    time: "4 ساعات",
    response: "استجابة فورية",
    escalation: "تصعيد بعد 6 ساعات",
    dot: "bg-red-500",
    chip: "bg-red-50 text-red-700 border-red-200",
    soft: "bg-red-100",
  },
  {
    priority: "عالية",
    time: "24 ساعة",
    response: "خلال يوم عمل",
    escalation: "تصعيد بعد 36 ساعة",
    dot: "bg-orange-500",
    chip: "bg-orange-50 text-orange-700 border-orange-200",
    soft: "bg-orange-100",
  },
  {
    priority: "متوسطة",
    time: "72 ساعة",
    response: "خلال 3 أيام عمل",
    escalation: "تصعيد بعد 5 أيام",
    dot: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700 border-amber-200",
    soft: "bg-amber-100",
  },
  {
    priority: "منخفضة",
    time: "5 أيام",
    response: "خلال أسبوع عمل",
    escalation: "تصعيد بعد أسبوع",
    dot: "bg-stone-500",
    chip: "bg-stone-50 text-stone-700 border-stone-200",
    soft: "bg-stone-100",
  },
];

const escalationFlow = [
  {
    title: "تجاوز SLA المحدد",
    actor: "REF-2025-04812 · أولوية عالية",
    time: "00:00",
    state: "trigger",
  },
  {
    title: "إخطار مدير الفرع",
    actor: "فرع عمان الأول",
    time: "00:02",
    state: "active",
  },
  {
    title: "تحويل إلى اللجنة المركزية",
    actor: "لجنة الخدمات",
    time: "00:08",
    state: "pending",
  },
];

export function SLASection() {
  return (
    <SectionShell
      number="10"
      label="SLA والتصعيد"
      tone="white"
      aurora="none"
    >
      <SectionHeader
        badge={<SectionTag icon={Clock}>مستوى الخدمة والتصعيد</SectionTag>}
        title={
          <>
            لكل قضية موعد استجابة
            <TitleLineBreak />
            <TitleAccent variant="emerald">ومسار تصعيد واضح</TitleAccent>
          </>
        }
        description="نلتزم بمعايير زمنية صارمة لكل أولوية، مع آلية تصعيد آلية في حال التأخر."
      />

      <div className="max-w-6xl mx-auto">
        <div className="hidden md:block relative pt-6 pb-2 px-4">
          <div className="absolute top-[44px] left-[8%] right-[8%] h-1 rounded-full bg-gradient-to-l from-stone-200 via-amber-200 via-orange-200 to-red-200" />

          <div className="grid grid-cols-4 gap-4 relative">
            {slaLevels.map((sla, i) => (
              <motion.div
                key={sla.priority}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-5">
                  <div
                    className={`absolute inset-0 ${sla.soft} rounded-full opacity-50 blur-md`}
                  />
                  <div
                    className={`relative w-7 h-7 rounded-full ${sla.dot} ring-4 ring-white shadow-soft-md`}
                  />
                </div>

                <span
                  className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-display font-bold mb-3 ${sla.chip}`}
                >
                  أولوية {sla.priority}
                </span>

                <div className="font-display text-xl lg:text-2xl font-extrabold text-stone-900 mb-1 number-mono">
                  {sla.time}
                </div>
                <p className="text-xs text-stone-500 leading-relaxed mb-3 max-w-[160px]">
                  {sla.response}
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] text-stone-400">
                  <ArrowUpFromLine className="h-2.5 w-2.5" />
                  {sla.escalation}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:hidden space-y-3">
          {slaLevels.map((sla, i) => (
            <motion.div
              key={sla.priority}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 p-4 rounded-xl border border-stone-100 bg-white shadow-soft-sm"
            >
              <div className={`shrink-0 w-3 h-3 rounded-full ${sla.dot}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-display font-bold ${sla.chip}`}
                  >
                    {sla.priority}
                  </span>
                  <span className="font-display font-extrabold text-base text-stone-900 number-mono">
                    {sla.time}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">{sla.response}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <div className="rounded-2xl border-2 border-emerald-200/50 bg-gradient-to-br from-emerald-50/40 via-white to-gold-50/30 overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="p-6 sm:p-7 sm:max-w-sm sm:border-l border-stone-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-soft-sm border border-gold-100">
                    <AlertTriangle className="h-4 w-4 text-gold-600" />
                  </div>
                  <h4 className="font-display font-bold text-base text-stone-900">
                    آلية تصعيد آلية
                  </h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  في حال تجاوز SLA، يتم تصعيد القضية تلقائياً إلى مدير الفرع، ثم
                  إلى اللجنة المركزية، مع إخطار المنسق وإشعار صاحب الشكوى.
                </p>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-stone-200 text-[11px] text-stone-600 font-display font-semibold">
                  <Bell className="h-3 w-3 text-gold-600" />
                  <span>إشعارات مباشرة</span>
                </div>
              </div>

              <div className="flex-1 bg-white p-5 sm:p-6 border-t sm:border-t-0 border-stone-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-display font-bold text-stone-500 uppercase tracking-wide">
                    سيناريو تصعيد حي
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-display font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                    LIVE
                  </span>
                </div>

                <ul className="space-y-3">
                  {escalationFlow.map((step, i) => (
                    <motion.li
                      key={step.title}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full text-white text-[10px] font-display font-bold ${
                          step.state === "trigger"
                            ? "bg-red-500"
                            : step.state === "active"
                            ? "bg-amber-500"
                            : "bg-stone-300"
                        }`}
                      >
                        {step.state === "trigger" ? (
                          <AlertTriangle className="h-3.5 w-3.5" />
                        ) : step.state === "active" ? (
                          <Clock className="h-3.5 w-3.5" />
                        ) : (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-display font-bold text-stone-900 truncate">
                            {step.title}
                          </p>
                          <p className="text-[11px] text-stone-500 truncate">
                            {step.actor}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-stone-400 shrink-0">
                          {step.time}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
