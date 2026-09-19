"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="bg-white px-4 pb-5 pt-8 sm:px-6 lg:px-8 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="civic-card-dark emblem-frame-dark corner-marks relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] px-6 py-20 text-center text-white sm:px-10 lg:py-28"
      >
        <div aria-hidden className="emblem-pattern-dark absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-3xl">
          <span className="text-sm font-bold text-gold-300">خطوتك الأولى تستغرق دقائق</span>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl">
            لا تترك المشكلة
            <span className="text-gold-engraved block">بلا أثر.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            ابدأ طلبًا جديدًا أو تابع طلبك الحالي، وستبقى كل خطوة أمامك بوضوح.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/submit" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gold-400 px-7 font-extrabold text-emerald-950 transition hover:bg-gold-300">
              قدّم طلبك الآن
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950/10 transition-transform duration-500 group-hover:-translate-x-1">
                <ArrowLeft className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/track" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 font-bold text-white transition hover:bg-white/10">
              <Search className="h-4 w-4" />
              تتبّع طلبًا
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
