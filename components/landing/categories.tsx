"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb, Megaphone, Scale, Wrench } from "lucide-react";
import { SectionShell } from "./section-shell";
import { SectionHeader, SectionTag } from "./section-tag";

const categories = [
  { icon: Wrench, title: "خدمات يومية", text: "مياه، كهرباء، طرق، إنارة ونظافة", href: "/submit?type=service", meta: "الأكثر تقديمًا" },
  { icon: Scale, title: "قضايا قانونية", text: "حقوق، نزاعات، عقود وخدمات عدلية", href: "/submit?type=legal", meta: "مسار مختص" },
  { icon: Megaphone, title: "شأن عام", text: "مشاركة مدنية وملاحظات مجتمعية", href: "/submit?type=political", meta: "صوتك مسموع" },
  { icon: Lightbulb, title: "اقتراح تطوير", text: "فكرة لتحسين خدمة أو مكان أو إجراء", href: "/submit?type=suggestion", meta: "ابنِ الحل معنا" },
];

export function Categories() {
  return (
    <SectionShell id="categories" number="٠٣" label="ابدأ من هنا" tone="off-white" className="content-auto">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <SectionHeader
          align="right"
          className="mb-0 lg:col-span-4"
          badge={<SectionTag>اختيار أسرع</SectionTag>}
          title={<>ما نوع الطلب<br />الذي تريد تقديمه؟</>}
          description="اختر المسار الأقرب؛ سنساعدك على استكمال التفاصيل وتوجيهها للجهة الصحيحة."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
          {categories.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <Link
                href={item.href}
                className="civic-card emblem-frame group flex min-h-56 h-full flex-col p-6 transition duration-500 hover:-translate-y-1 hover:border-gold-500/35 focus-visible:outline-none"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950 text-gold-300">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold text-stone-400">{item.meta}</span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-extrabold text-emerald-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-extrabold text-emerald-800">
                  ابدأ الطلب
                  <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
