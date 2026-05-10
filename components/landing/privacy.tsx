"use client";

import { motion } from "framer-motion";
import { ShieldCheck, EyeOff, Lock, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionShell } from "./section-shell";
import { SectionTag, SectionHeader } from "./section-tag";

const items = [
  {
    icon: EyeOff,
    title: "تقديم مجهول الهوية",
    description:
      "تستطيع تقديم شكواك بدون اسم أو رقم هاتف، نحن نهتم بالقضية لا بهويتك.",
  },
  {
    icon: Lock,
    title: "تشفير كامل للبيانات",
    description:
      "بياناتك مُشفّرة عند النقل والتخزين بمعايير صناعية، ولا يصلها إلا المخوّلون.",
  },
  {
    icon: ShieldCheck,
    title: "صلاحيات صارمة",
    description:
      "نظام RBAC دقيق يحدد من يرى ماذا، مع سجل تدقيق كامل لكل عملية حساسة.",
  },
  {
    icon: Trash2,
    title: "حذف عند الإغلاق",
    description:
      "البيانات الشخصية تُحذف بعد إغلاق القضية بـ 90 يوماً وفقاً لسياسة الاحتفاظ.",
  },
];

const compliance = [
  { label: "ISO 27001", sub: "أمن المعلومات" },
  { label: "GDPR-Aligned", sub: "حماية البيانات" },
  { label: "End-to-End", sub: "تشفير تام" },
];

export function Privacy() {
  return (
    <SectionShell
      number="09"
      label="الخصوصية والشفافية"
      tone="white"
      aurora="emerald"
    >
      <SectionHeader
        badge={<SectionTag icon={ShieldCheck}>الخصوصية والشفافية</SectionTag>}
        title={
          <>
            بياناتك بأيدٍ أمينة
            <br className="hidden sm:block" />
            <span className="text-emerald-700">والشفافية أولوية مطلقة</span>
          </>
        }
        description="نحترم خصوصية المواطن ونلتزم بأعلى معايير الحماية وشفافية الإجراءات."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card className="p-5 lg:p-6 h-full bg-white/85 backdrop-blur border border-stone-100/80 hover:shadow-soft-md hover:-translate-y-0.5 transition-all relative overflow-hidden">
              <div className="absolute top-3 left-3 inline-flex h-6 w-6 items-center justify-center rounded-md bg-gold-50 border border-gold-200/70 text-gold-700">
                <Lock className="h-3 w-3" />
              </div>

              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mb-4">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-stone-900 mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 max-w-3xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-6 py-5 rounded-2xl border border-stone-100 bg-stone-50/40 backdrop-blur">
          <span className="text-xs font-display font-semibold text-stone-500 shrink-0">
            متوافق مع المعايير الدولية
          </span>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            {compliance.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 text-stone-600"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <div className="leading-tight">
                  <div className="text-xs font-display font-bold text-stone-800">
                    {c.label}
                  </div>
                  <div className="text-[10px] text-stone-400">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
