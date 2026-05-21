"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowLeft, Search, ShieldCheck } from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./magnetic";
import { OperationalTicker } from "./operational-ticker";

const MorphCanvas = dynamic(
  () => import("./morph-canvas").then((m) => m.MorphCanvas),
  { ssr: false },
);

const headlineWords = [
  "منصة",
  "ذكية",
  "لإدارة",
  "الشكاوى",
];

const goldLine = "من الاستقبال حتى التدخل الميداني";

const JORDAN_CITIES: Array<{ x: number; y: number; name: string }> = [
  { x: 38, y: 18, name: "إربد" },
  { x: 44, y: 30, name: "عمّان" },
  { x: 52, y: 38, name: "الزرقاء" },
  { x: 28, y: 48, name: "الكرك" },
  { x: 24, y: 70, name: "معان" },
  { x: 32, y: 88, name: "العقبة" },
  { x: 64, y: 28, name: "المفرق" },
];

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-10%"]);

  return (
    <section
      ref={ref}
      data-experience-section="hero"
      className="relative isolate min-h-[92vh] flex items-center overflow-hidden pt-12 lg:pt-20 pb-20 lg:pb-28"
    >
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 -z-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800" />
        <div className="absolute inset-0 grid-pattern-dark opacity-100 pointer-events-none" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 h-[640px] w-[640px] rounded-full opacity-60 blur-3xl aurora-blob aurora-blob-1" />
          <div className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl aurora-blob aurora-blob-2" />
          <div className="absolute -bottom-40 right-1/4 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl aurora-blob aurora-blob-3" />
        </div>

        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-gold-500/15" />
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full border border-gold-500/10" />
      </motion.div>

      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 right-0 -z-10 h-40 sm:h-56 w-full opacity-50"
      >
        <defs>
          <linearGradient id="jordan-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064e3b" stopOpacity="0" />
            <stop offset="100%" stopColor="#022c22" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <path
          d="M 10 95 Q 20 88 28 82 T 44 70 Q 50 64 56 66 T 70 56 Q 80 50 90 60 L 95 95 Z"
          fill="url(#jordan-fill)"
          stroke="rgba(232,197,71,0.25)"
          strokeWidth="0.2"
        />
        {JORDAN_CITIES.map((c, i) => (
          <g key={c.name}>
            <circle
              cx={c.x}
              cy={c.y + 50}
              r="0.55"
              fill="#e8c547"
              opacity="0.85"
            >
              {!reduce && (
                <animate
                  attributeName="r"
                  values="0.4;1.0;0.4"
                  dur={`${2.4 + (i % 4) * 0.4}s`}
                  repeatCount="indefinite"
                />
              )}
              {!reduce && (
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur={`${2.4 + (i % 4) * 0.4}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
            <circle
              cx={c.x}
              cy={c.y + 50}
              r="2"
              fill="none"
              stroke="#e8c547"
              strokeOpacity="0.3"
              strokeWidth="0.15"
            />
          </g>
        ))}
      </svg>

      <OperationalTicker />

      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 mx-auto pointer-events-none"
        style={{ y: fgY }}
      >
        <div className="relative w-full h-full max-w-3xl mx-auto">
          <MorphCanvas text="صوتك" density={140} className="absolute inset-0" />
        </div>
      </motion.div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 text-xs sm:text-sm text-white/90 font-display font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            <span>منصة رسمية معتمدة</span>
            <span className="text-white/40">·</span>
            <span>43 فرع نشط على المستوى الوطني</span>
          </motion.div>

          <h1 className="mt-6 font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white">
            <span className="inline-flex flex-wrap justify-center gap-x-3">
              {headlineWords.map((w, i) => (
                <motion.span
                  key={w + i}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <br className="hidden sm:block" />
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative inline-block mt-2 ms-3 sm:ms-0"
            >
              <span className="title-accent bg-gradient-to-l from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent">
                {goldLine}
              </span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute right-0 left-0 -bottom-1 h-1 origin-right bg-gradient-to-l from-gold-400/0 via-gold-400 to-gold-400/0 rounded-full"
              />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto"
          >
            صوتك يصل · شكواك تُحلّ — منصة تربط المواطنين بمتخذي القرار، وتوثق
            رحلة كل قضية من تسجيلها حتى إغلاقها بشفافية كاملة.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Magnetic>
              <Button
                asChild
                variant="gold"
                size="xl"
                className="w-full sm:w-auto shadow-gold-glow"
              >
                <Link href="/submit">
                  <AiSparkleIcon className="h-4 w-4" />
                  قدّم شكوى الآن
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                variant="outline-light"
                size="xl"
                className="w-full sm:w-auto"
              >
                <Link href="/track">
                  <Search className="h-4 w-4" />
                  تتبع طلبك
                </Link>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-8 flex items-center justify-center gap-3 text-xs text-white/60"
          >
            <ShieldCheck className="h-4 w-4 text-gold-400" />
            <span>التقديم المجهول مدعوم · بياناتك محمية بالكامل</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] font-display tracking-widest uppercase">
          تابع الرحلة
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.div
            initial={{ y: -40 }}
            animate={{ y: 40 }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
            className="absolute top-0 h-4 w-px bg-gold-400 shadow-[0_0_8px_rgba(232,197,71,0.7)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
