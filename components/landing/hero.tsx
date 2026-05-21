"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowDown,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { Button } from "@/components/ui/button";
import { HeroLiveCase } from "./hero-live-case";

const TICKER_ITEMS = [
  "منصة رسمية معتمدة",
  "٤٣ فرع نشط على المستوى الوطني",
  "١٢ محافظة بتغطية كاملة",
  "متوسط زمن الحل ٢٫١ يوم",
  "تقديم مجهول مدعوم",
  "بيانات مشفّرة حسب معايير ISO 27001",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-cream">
      {/* Warm dot pattern (very subtle) */}
      <div
        aria-hidden
        className="absolute inset-0 dot-pattern-warm opacity-[0.35] pointer-events-none"
      />

      {/* Decorative aurora blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(232,197,71,0.18) 0%, rgba(232,197,71,0.06) 40%, rgba(232,197,71,0) 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/3 -right-32 w-[460px] h-[460px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(16,185,129,0.16) 0%, rgba(16,185,129,0.05) 40%, rgba(16,185,129,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Top ticker strip */}
      <div className="relative border-b border-gold-200/40 bg-gradient-to-l from-stone-50/80 via-white/60 to-stone-50/80 backdrop-blur-sm">
        <div className="container relative overflow-hidden">
          <div className="flex items-center gap-3 py-2 text-[11px] font-display">
            <span className="inline-flex items-center gap-1.5 shrink-0 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-emerald-700 font-bold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              مباشر
            </span>
            <div className="flex-1 overflow-hidden mask-fade-x">
              <div className="flex items-center gap-7 marquee-slow whitespace-nowrap text-stone-600">
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-7 shrink-0"
                  >
                    <span>{item}</span>
                    <span className="text-gold-500">◆</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container relative pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* RIGHT (in RTL = first column) — Editorial typography */}
          <div className="lg:col-span-7 order-1 text-right">
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3"
            >
              <span className="font-mono text-[11px] tracking-[0.3em] text-gold-700 font-bold">
                ٠٠١ —
              </span>
              <span className="font-display text-xs font-bold text-stone-600 tracking-wide">
                المنصّة الذكية لإدارة الشكاوى
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/60 backdrop-blur border border-gold-200/60 px-2 py-0.5 text-[10px] font-bold text-gold-700">
                <Sparkles className="h-2.5 w-2.5" />
                مدعومة بالذكاء الاصطناعي
              </span>
            </motion.div>

            {/* Editorial headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display font-extrabold leading-[0.95] tracking-tight text-balance"
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-emerald-950">
                صوتُك
              </span>
              <span className="relative inline-block mt-1">
                <span className="block text-7xl sm:text-8xl lg:text-9xl bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 bg-clip-text text-transparent">
                  يصِل
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  className="absolute -bottom-1 right-0 left-0 w-full h-2 text-gold-400"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,8 Q50,0 100,6 T200,4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Gold rule + bottom line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 flex items-center gap-4"
            >
              <span className="editorial-rule-gold flex-1 origin-right" />
              <span className="font-mono text-[10px] tracking-[0.25em] text-gold-700">
                AR · JO
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-700 leading-[1.15]"
            >
              شكواكَ تُحَلّ — من الاستقبال{" "}
              <br className="hidden sm:block" />
              حتى التدخّل الميداني.
            </motion.h2>

            {/* Sub paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl"
            >
              لا نَعِدُك بالمتابعة، بل نُريك القضية وهي تتحرّك. منصّة وطنية تربط
              المواطنين بمتّخذي القرار، وتوثّق رحلة كل قضية بشفافية كاملة.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Button
                asChild
                variant="gold"
                size="xl"
                className="w-full sm:w-auto group"
              >
                <Link href="/submit">
                  <AiSparkleIcon className="h-4 w-4" />
                  قدّم شكوى الآن
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="w-full sm:w-auto bg-white/70 backdrop-blur border-stone-200 hover:bg-white"
              >
                <Link href="/track">
                  <Search className="h-4 w-4" />
                  تتبّع طلبك
                </Link>
              </Button>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-500"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-600" />
                التقديم المجهول مدعوم
              </span>
              <span className="hidden sm:inline text-stone-300">•</span>
              <span>بيانات مشفّرة بالكامل</span>
              <span className="hidden sm:inline text-stone-300">•</span>
              <span className="font-mono tabular-nums">
                <span className="font-display font-bold text-emerald-700">
                  ١٬٢٤٧
                </span>{" "}
                قضية مغلقة هذا الشهر
              </span>
            </motion.div>
          </div>

          {/* LEFT (in RTL = second column) — Live case card */}
          <div className="lg:col-span-5 order-2 relative breathe-soft">
            <HeroLiveCase />
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-stone-400 pointer-events-none"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold-300/60 bg-white/70 backdrop-blur text-gold-600"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gold thread separator */}
      <div className="relative">
        <div className="editorial-rule-gold" />
      </div>
    </section>
  );
}
