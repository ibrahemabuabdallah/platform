"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Tag,
  AlertCircle,
  Building2,
  Gauge,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { Card } from "@/components/ui/card";
import { SectionShell } from "./section-shell";
import { SectionTag, SectionHeader } from "./section-tag";

const sampleText =
  "في حي النزهة فيه تسرب مياه كبير من الشارع الرئيسي بجانب مدرسة النزهة، صار في غرق وقطع المرور، البلدية ما تدخلت من ثلاث أيام والوضع خطر على المارة والسيارات.";

const results = [
  {
    icon: Tag,
    label: "التصنيف المقترح",
    value: "خدمية - بنية تحتية",
    valueClass: "text-emerald-700",
    bg: "bg-emerald-50/70",
    iconColor: "text-emerald-600",
  },
  {
    icon: AlertCircle,
    label: "الأولوية",
    value: "عالية",
    valueClass: "text-orange-700",
    bg: "bg-orange-50/70",
    iconColor: "text-orange-600",
  },
  {
    icon: Building2,
    label: "الفرع المقترح",
    value: "فرع عمان الأول",
    valueClass: "text-stone-900",
    bg: "bg-stone-50/70",
    iconColor: "text-stone-700",
  },
  {
    icon: Gauge,
    label: "نسبة الثقة",
    value: "94%",
    valueClass: "text-violet-700",
    bg: "bg-violet-50/70",
    iconColor: "text-violet-600",
  },
  {
    icon: Copy,
    label: "تكرار محتمل",
    value: "12% (جديدة)",
    valueClass: "text-blue-700",
    bg: "bg-blue-50/70",
    iconColor: "text-blue-600",
  },
];

export function AIDemo() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let i = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          const tick = () => {
            if (i < sampleText.length) {
              setTyped(sampleText.slice(0, i + 1));
              i++;
              timeoutId = setTimeout(tick, 24);
            } else {
              setDone(true);
            }
          };
          tick();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const target = document.getElementById("ai-demo-section");
    if (target) observer.observe(target);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [done]);

  return (
    <SectionShell
      id="ai-demo-section"
      number="04"
      label="محرك التصنيف الذكي"
      tone="white"
      aurora="emerald"
    >
      <SectionHeader
        badge={<SectionTag icon={Cpu}>محرك التصنيف الذكي</SectionTag>}
        title={
          <>
            تصنيف فوري وتوجيه دقيق
            <br className="hidden sm:block" />
            <span className="text-emerald-700">قبل أن تكمل قراءة هذه الجملة</span>
          </>
        }
        description="بمجرد تقديم الشكوى، يحلّل النظام النص ويستخرج النوع والأولوية والجهة المختصة بدقة عالية."
      />

      <div className="grid lg:grid-cols-2 gap-6 items-stretch max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 h-full bg-white/80 backdrop-blur border border-emerald-100/80 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="text-xs text-stone-500 font-mono ms-2">
                complaint-input.txt
              </span>
            </div>
            <div className="bg-white rounded-xl border border-stone-200 p-5 min-h-[200px] relative shadow-soft-sm">
              <div className="text-xs font-display font-bold text-stone-400 mb-2">
                نص الشكوى المُقدَّمة من المواطن:
              </div>
              <p className="text-stone-800 leading-relaxed text-base">
                {typed}
                {!done && (
                  <span className="inline-block w-1 h-5 bg-emerald-600 animate-pulse ms-0.5 align-middle" />
                )}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 flex items-center gap-2 text-xs"
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-display font-semibold">
                <AiSparkleIcon className="h-3 w-3" />
                {done ? "اكتمل التحليل" : "جاري التحليل..."}
              </div>
              <span className="text-stone-400">
                {done && "خلال 0.4 ثانية"}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 1 : 0 }}
              transition={{ delay: 0.5 }}
              className="mt-3"
            >
              <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5 font-display font-semibold">
                <span>درجة ثقة المُحلّل</span>
                <span className="text-emerald-700 font-mono">94%</span>
              </div>
              <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: done ? "94%" : 0 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-l from-emerald-500 via-emerald-400 to-gold-400"
                />
              </div>
            </motion.div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 h-full relative overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -8 }}
              animate={{
                opacity: done ? 1 : 0,
                scale: done ? 1 : 0.85,
                y: done ? 0 : -8,
              }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="absolute -top-3 -end-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-3 py-1.5 shadow-soft-md text-xs font-display font-bold text-emerald-700 z-10"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              تم التحليل بنجاح
            </motion.div>

            <div className="flex items-center gap-2 mb-5">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-stone-900">
                  نتائج التصنيف الذكي
                </h3>
                <p className="text-xs text-stone-500">5 مؤشرات مستخرجة</p>
              </div>
            </div>

            <ul className="space-y-2.5">
              {results.map((r, i) => (
                <motion.li
                  key={r.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: done ? 1 : 0,
                    y: done ? 0 : 8,
                  }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`flex items-center justify-between gap-3 rounded-xl border border-stone-200/70 ${r.bg} p-3 backdrop-blur-sm`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                      <r.icon className={`h-4 w-4 ${r.iconColor}`} />
                    </div>
                    <span className="text-sm text-stone-700 font-medium">
                      {r.label}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-display font-bold ${r.valueClass}`}
                  >
                    {r.value}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 1 : 0 }}
              transition={{ delay: 0.9 }}
              className="mt-5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-800 leading-relaxed flex items-start gap-2"
            >
              <AiSparkleIcon className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <span>
                تم اقتراح فرع <strong>عمان الأول</strong> بناءً على الموقع
                الجغرافي وتصنيف القضية كـ <strong>بنية تحتية</strong>.
              </span>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </SectionShell>
  );
}
