"use client";

import { motion } from "framer-motion";
import { Inbox, Users, ShieldCheck } from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { Card } from "@/components/ui/card";
import { SectionShell } from "./section-shell";
import { SectionTag, SectionHeader } from "./section-tag";

const features = [
  {
    num: "01",
    icon: Inbox,
    title: "استقبال ذكي",
    description:
      "نموذج تقديم بسيط في دقيقتين، بدون تسجيل دخول، مع دعم التقديم المجهول وكشف القضايا المكررة فور الاستلام.",
    color: "emerald" as const,
    accent: "emerald-100",
  },
  {
    num: "02",
    icon: AiSparkleIcon,
    title: "تصنيف وتوجيه آلي",
    description:
      "محرك تصنيف ذكي يحدد نوع القضية والأولوية ويوجهها للفرع أو اللجنة المختصة بنسبة ثقة أعلى من 90%، مع كشف فوري للتكرار وإسناد المنسق المناسب.",
    color: "gold" as const,
    accent: "gold-200",
    featured: true,
  },
  {
    num: "03",
    icon: Users,
    title: "تدخل ميداني فعلي",
    description:
      "منسق معتمد ينزل إلى الميدان، يوثّق القضية، ويتدخل عبر القنوات الرسمية لإغلاقها بنجاح.",
    color: "emerald" as const,
    accent: "emerald-100",
  },
];

export function WhatIs() {
  return (
    <SectionShell number="02" label="ما هي المنصة" tone="white" aurora="none">
      <SectionHeader
        badge={<SectionTag icon={ShieldCheck}>منظومة متكاملة</SectionTag>}
        title={
          <>
            منظومة متكاملة تربط
            <br className="hidden sm:block" />
            <span className="text-emerald-700">الصوت بالحل</span>
          </>
        }
        description="ليست مجرد نموذج استقبال — بل بنية رقمية كاملة تحوّل كل شكوى إلى رحلة موثقة من البداية للنهاية."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={feature.featured ? "lg:col-span-2 lg:row-span-1" : ""}
          >
            <Card
              className={`p-6 lg:p-7 h-full hover:shadow-soft-lg transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden ${
                feature.featured
                  ? "border-gold-200/60 bg-gradient-to-br from-white via-white to-gold-50/30"
                  : ""
              }`}
            >
              <div
                className={`absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${
                  feature.color === "emerald"
                    ? "bg-emerald-600"
                    : "bg-gold-500"
                }`}
              />

              <span
                aria-hidden
                className={`absolute top-4 left-4 font-display font-extrabold text-3xl lg:text-4xl select-none ${
                  feature.color === "emerald"
                    ? "text-emerald-100"
                    : "text-gold-200"
                } opacity-70`}
              >
                {feature.num}
              </span>

              <div className="relative">
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-5 ${
                    feature.color === "emerald"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gold-100 text-gold-700"
                  }`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3
                  className={`font-display font-bold text-stone-900 mb-2 ${
                    feature.featured ? "text-xl lg:text-2xl" : "text-lg"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-stone-600 leading-relaxed ${
                    feature.featured ? "text-sm lg:text-base" : "text-sm"
                  }`}
                >
                  {feature.description}
                </p>

                {feature.featured && (
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-100/70 border border-gold-200 px-3 py-1 text-[11px] font-display font-bold text-gold-800">
                    <AiSparkleIcon className="h-3 w-3" />
                    القلب الذكي للمنصة
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
