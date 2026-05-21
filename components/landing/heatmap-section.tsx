"use client";

import { motion } from "framer-motion";
import { Map, TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Heatmap } from "@/components/shared/heatmap";
import { TitleAccent, TitleLineBreak } from "@/components/shared/title-accent";
import { SectionShell } from "./section-shell";
import { SectionTag, SectionHeader } from "./section-tag";

const insights = [
  {
    icon: TrendingUp,
    label: "أعلى كثافة",
    value: "العاصمة",
    sub: "287 قضية نشطة",
    color: "text-emerald-700",
    bg: "bg-emerald-50/70",
  },
  {
    icon: AlertCircle,
    label: "تحذير حراري",
    value: "حي الروضة",
    sub: "3 قضايا حرجة",
    color: "text-red-700",
    bg: "bg-red-50/70",
  },
  {
    icon: Map,
    label: "مناطق مشمولة",
    value: "32 منطقة",
    sub: "من أصل 47",
    color: "text-gold-700",
    bg: "bg-gold-50/70",
  },
];

export function HeatmapSection() {
  return (
    <SectionShell
      number="06"
      label="الكثافة الجغرافية"
      tone="off-white"
      aurora="none"
    >
      <SectionHeader
        badge={<SectionTag icon={Map}>الخريطة الحرارية</SectionTag>}
        title={
          <>
            تركّز القضايا
            <TitleLineBreak />
            <TitleAccent variant="emerald">حسب المناطق الجغرافية</TitleAccent>
          </>
        }
        description="عرض رمزي لتوزيع القضايا — كلما كان اللون أغمق، زادت الكثافة في تلك المنطقة."
      />

      <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-gold-200/70 via-gold-100 to-emerald-100/60">
            <Card className="p-6 rounded-[14px] border-0 bg-white">
              <div className="mb-5 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-display font-bold text-stone-900">
                    الكثافة الإقليمية
                  </h3>
                  <p className="text-xs text-stone-500">
                    البيانات تتحدث في الوقت الفعلي
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-display font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                  محدّث الآن
                </span>
              </div>
              <Heatmap />
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {insights.map((insight, i) => (
            <motion.div
              key={insight.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="p-5 bg-white/80 backdrop-blur border border-stone-100/80 hover:shadow-soft-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-3">
                  <div
                    className={`shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl ${insight.bg}`}
                  >
                    <insight.icon className={`h-5 w-5 ${insight.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-stone-500">{insight.label}</p>
                    <p
                      className={`font-display font-extrabold text-base ${insight.color} truncate`}
                    >
                      {insight.value}
                    </p>
                    <p className="text-[11px] text-stone-400">{insight.sub}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
