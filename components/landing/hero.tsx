"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Search, ShieldCheck } from "lucide-react";
import { HeroLiveCase } from "./hero-live-case";

const proof = [
  { value: "٤٣", label: "جهة قابلة للربط" },
  { value: "٢٫١", label: "يوم متوسط الحل" },
  { value: "١٬٢٤٧", label: "قضية أُغلقت هذا الشهر" },
];

export function Hero() {
  return (
    <section className="civic-surface relative overflow-hidden pb-16 pt-14 sm:pt-16 lg:min-h-[820px] lg:pb-24 lg:pt-20">
      <div aria-hidden className="civic-grid absolute inset-0" />
      <div aria-hidden className="emblem-pattern absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute -end-28 top-24 h-72 w-72 rounded-full bg-gold-400/12 blur-3xl" />

      <div className="container relative">
        {/* Document strip — official record header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-wrap items-center justify-between gap-3 border-y border-emerald-950/10 py-3 text-[11px] font-medium text-stone-500 lg:mb-14"
        >
          <span className="inline-flex items-center gap-2">
            <span className="official-seal h-7 w-7 text-[8px]">رسمي</span>
            وثيقة خدمة المواطنين
          </span>
          <span className="hidden items-center gap-3 font-mono tracking-wider sm:inline-flex">
            <span className="doc-number">NA-2026 / ٠٠١</span>
            <span aria-hidden className="text-gold-500">◆</span>
            <span>سجلّ مفتوح للجميع</span>
          </span>
        </motion.div>

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <span className="civic-kicker">
              <span className="h-2 w-2 rotate-45 bg-gold-500" />
              منصّة وطنية تجعل المتابعة مرئية
            </span>

            <h1 className="mt-7 max-w-3xl font-display text-[clamp(3.5rem,8vw,7.5rem)] font-extrabold leading-[.9] tracking-[-.045em] text-emerald-950">
              صوتك يتحوّل
              <span className="text-gold-engraved mt-2 block">إلى أثر.</span>
            </h1>

            <div className="emblem-rule mt-7 max-w-md" aria-hidden>
              <span />
            </div>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl sm:leading-9">
              قدّم شكواك أو مقترحك، وشاهد رحلته من الاستقبال الذكي إلى الفريق
              الميداني ثم الحل — بسجل واضح لا يتركك في الانتظار.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/submit"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-emerald-950 px-6 text-base font-extrabold text-white shadow-[0_18px_40px_-22px_rgba(2,44,34,.9)] transition duration-500 hover:bg-emerald-900 active:scale-[.98]"
              >
                قدّم شكوى الآن
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-emerald-950 transition-transform duration-500 group-hover:-translate-x-1">
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/track"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-emerald-950/15 bg-white/70 px-7 text-base font-bold text-emerald-950 transition duration-500 hover:bg-white"
              >
                <Search className="h-4 w-4" />
                تتبّع طلبك
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-stone-600">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                بيانات مشفّرة
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                رقم مرجعي فوري للتتبع
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.16 }}
            className="relative lg:col-span-5"
          >
            <div className="emblem-frame corner-marks absolute -inset-4 rounded-[2.25rem] bg-gold-100/25" aria-hidden />
            <HeroLiveCase />
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="emblem-frame mt-16 grid overflow-hidden rounded-[1.5rem] bg-white/85 shadow-[0_20px_60px_-45px_rgba(2,44,34,.45)] backdrop-blur sm:grid-cols-3 lg:mt-20"
          aria-label="سجل مؤشرات المنصة"
        >
          {proof.map((item, index) => (
            <div key={item.label} className="relative flex items-baseline gap-3 border-b border-emerald-950/8 px-6 py-5 last:border-b-0 sm:block sm:border-b-0 sm:border-s sm:first:border-s-0 lg:px-8">
              <span className="doc-number absolute end-4 top-3 text-[10px]">
                {["أ", "ب", "ج"][index]}
              </span>
              <dt className="text-sm text-stone-500 sm:mt-1">{item.label}</dt>
              <dd className="order-first font-display text-3xl font-extrabold text-emerald-900 sm:order-none sm:text-4xl">
                {item.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
