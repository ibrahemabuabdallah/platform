"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Hash,
  UserCheck,
  MapPin,
  Hammer,
  CheckCircle2,
  GitBranch,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { SectionShell } from "./section-shell";
import { SectionTag, SectionHeader } from "./section-tag";

const steps = [
  { icon: FileText, title: "تقديم الطلب", desc: "نموذج بسيط في دقيقتين" },
  { icon: Hash, title: "رقم مرجعي فوري", desc: "تتبع طلبك بأي وقت" },
  {
    icon: AiSparkleIcon,
    title: "تصنيف وتوجيه",
    desc: "محرك ذكي يحدد الجهة المختصة",
  },
  { icon: UserCheck, title: "متابعة منسق الفرع", desc: "تواصل وجمع المعلومات" },
  {
    icon: MapPin,
    title: "نزول ميداني",
    desc: "معاينة وتوثيق المشكلة",
  },
  { icon: Hammer, title: "تدخل مختص", desc: "حل عملي عبر القنوات الرسمية" },
  { icon: CheckCircle2, title: "إغلاق وتوثيق", desc: "إخطار المواطن وحفظ السجل" },
];

export function JourneyTimeline() {
  return (
    <SectionShell number="03" label="رحلة القضية" tone="white" aurora="gold">
      <SectionHeader
        badge={<SectionTag icon={GitBranch}>كيف يعمل النظام</SectionTag>}
        title={
          <>
            من الشكوى إلى الحل
            <br className="hidden sm:block" />
            <span className="text-emerald-700">في 7 خطوات موثقة</span>
          </>
        }
        description="رحلة كل قضية مرئية بالكامل — لا بيروقراطية، لا غموض، فقط شفافية تامة من الإرسال حتى الإغلاق."
      />

      <div className="hidden lg:block">
        <div className="relative pt-2">
          <svg
            className="absolute top-12 right-0 left-0 w-full pointer-events-none"
            viewBox="0 0 1000 80"
            preserveAspectRatio="none"
            height="80"
          >
            <defs>
              <linearGradient id="curve-gold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#047857" stopOpacity="0.3" />
                <stop offset="20%" stopColor="#c9a227" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#e8c547" stopOpacity="0.85" />
                <stop offset="80%" stopColor="#c9a227" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M 60 40 Q 200 0, 360 40 T 660 40 T 940 40"
              fill="none"
              stroke="url(#curve-gold)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="6 8"
            />
          </svg>

          <div className="grid grid-cols-7 gap-4 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center relative"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-emerald-100 flex items-center justify-center shadow-soft-md hover:border-emerald-500 hover:shadow-emerald-glow transition-all">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-emerald-700" />
                    </div>
                  </div>
                  <div className="absolute -top-1 -end-1 w-7 h-7 bg-gradient-to-br from-emerald-700 to-emerald-800 text-white text-xs font-bold rounded-full flex items-center justify-center font-display border-2 border-white shadow-soft-sm">
                    {i + 1}
                  </div>
                </div>
                <h4 className="font-display font-bold text-sm text-stone-900 mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-stone-500 leading-snug">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="relative">
          <div className="absolute end-[47px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-200 via-gold-300 to-emerald-200" />
          <ul className="space-y-5">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-4 items-start"
              >
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-emerald-100 flex items-center justify-center shadow-soft-md">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-emerald-700" />
                    </div>
                  </div>
                  <div className="absolute -top-1 -end-1 w-7 h-7 bg-gradient-to-br from-emerald-700 to-emerald-800 text-white text-xs font-bold rounded-full flex items-center justify-center font-display border-2 border-white">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h4 className="font-display font-bold text-base text-stone-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
