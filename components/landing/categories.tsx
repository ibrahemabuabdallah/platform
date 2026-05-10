"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wrench,
  Scale,
  Megaphone,
  Lightbulb,
  LayoutGrid,
  ArrowLeft,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { Card } from "@/components/ui/card";
import { SectionShell } from "./section-shell";
import { SectionTag, SectionHeader } from "./section-tag";

const categories = [
  {
    icon: Wrench,
    title: "خدمية",
    description: "كهرباء، ماء، طرق، إنارة، نفايات، صرف صحي",
    count: "542",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    accent: "bg-emerald-500",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    href: "/submit?type=service",
    featured: true,
  },
  {
    icon: Scale,
    title: "قانونية",
    description: "نزاعات حقوقية، استرداد حقوق، عقود، حضانة",
    count: "318",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    accent: "bg-blue-500",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    href: "/submit?type=legal",
  },
  {
    icon: Megaphone,
    title: "سياسية",
    description: "تمثيل، مواقف، حقوق مدنية، مشاركة مجتمعية",
    count: "178",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    accent: "bg-violet-500",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    href: "/submit?type=political",
  },
  {
    icon: Lightbulb,
    title: "اقتراحات",
    description: "أفكار تطوير الخدمات والبيئة والمجتمع",
    count: "209",
    iconBg: "bg-gold-100",
    iconColor: "text-gold-700",
    accent: "bg-gold-500",
    badgeBg: "bg-gold-50",
    badgeText: "text-gold-700",
    href: "/submit?type=suggestion",
  },
];

function MapScribble() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 200"
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
    >
      <defs>
        <pattern id="dots" patternUnits="userSpaceOnUse" width="14" height="14">
          <circle cx="2" cy="2" r="0.8" fill="#047857" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill="url(#dots)" />
      <path
        d="M 30 120 Q 80 60, 140 100 T 270 70"
        stroke="#047857"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="3 4"
      />
      <circle cx="50" cy="115" r="3" fill="#c9a227" />
      <circle cx="130" cy="100" r="3" fill="#047857" />
      <circle cx="220" cy="80" r="3" fill="#047857" />
      <circle cx="280" cy="65" r="3" fill="#c9a227" />
    </svg>
  );
}

export function Categories() {
  return (
    <SectionShell
      number="08"
      label="أنواع القضايا"
      tone="white"
      aurora="none"
    >
      <SectionHeader
        badge={<SectionTag icon={LayoutGrid}>أنواع القضايا</SectionTag>}
        title={
          <>
            كل مشكلتك تهمنا
            <br className="hidden sm:block" />
            <span className="text-emerald-700">من الخدمي إلى التشريعي</span>
          </>
        }
        description="نتعامل مع تنوّع كبير من القضايا، ولكل نوع لجنة مختصة وفريق ميداني مدرّب."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={cat.featured ? "lg:col-span-2 lg:row-span-2" : ""}
          >
            <Link
              href={cat.href}
              className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-2xl"
            >
              <Card
                className={`h-full hover:shadow-soft-lg hover:-translate-y-1 transition-all group relative overflow-hidden ${
                  cat.featured
                    ? "p-7 lg:p-9 bg-gradient-to-br from-emerald-50/40 via-white to-gold-50/30 border-emerald-200/50"
                    : "p-5 lg:p-6"
                }`}
              >
                <div
                  className={`absolute bottom-0 inset-x-0 h-1 ${cat.accent} scale-x-0 group-hover:scale-x-100 origin-[100%_50%] transition-transform`}
                />

                {cat.featured && <MapScribble />}

                {cat.featured && (
                  <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-gold-100 border border-gold-300 px-3 py-1 text-[11px] font-display font-bold text-gold-800 shadow-soft-sm">
                    <AiSparkleIcon className="h-3 w-3" />
                    الأكثر تقديماً
                  </span>
                )}

                <div className="relative">
                  <div
                    className={`inline-flex items-center justify-center rounded-2xl ${
                      cat.iconBg
                    } ${cat.iconColor} ${
                      cat.featured
                        ? "h-16 w-16 lg:h-20 lg:w-20 mb-6"
                        : "h-12 w-12 mb-4"
                    }`}
                  >
                    <cat.icon
                      className={cat.featured ? "h-8 w-8 lg:h-10 lg:w-10" : "h-6 w-6"}
                    />
                  </div>
                  <h3
                    className={`font-display font-bold text-stone-900 ${
                      cat.featured
                        ? "text-2xl lg:text-3xl mb-3"
                        : "text-base mb-1.5"
                    }`}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className={`text-stone-500 leading-relaxed ${
                      cat.featured
                        ? "text-sm lg:text-base mb-5 max-w-md"
                        : "text-xs mb-3 line-clamp-2"
                    }`}
                  >
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-display font-bold ${cat.badgeBg} ${cat.badgeText}`}
                    >
                      {cat.count} قضية مغلقة
                    </div>
                    {cat.featured && (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-display font-bold group-hover:gap-2 transition-all">
                        ابدأ التقديم
                        <ArrowLeft className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
