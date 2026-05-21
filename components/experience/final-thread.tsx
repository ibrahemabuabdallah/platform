"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Search, ShieldCheck, Phone } from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { Button } from "@/components/ui/button";
import { TitleAccent, TitleLineBreak } from "@/components/shared/title-accent";
import { Magnetic } from "./magnetic";

export function FinalThread() {
  const reduce = useReducedMotion();

  return (
    <section
      data-experience-section="cta"
      className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 py-24 lg:py-32 overflow-hidden text-white"
    >
      <div className="absolute inset-0 grid-pattern-dark opacity-100 pointer-events-none" />

      <div
        aria-hidden
        className="absolute -top-40 right-1/3 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(232,197,71,0.55), transparent 70%)",
        }}
      />

      <svg
        aria-hidden
        viewBox="0 0 800 400"
        className="absolute inset-0 w-full h-full pointer-events-none thread-glow"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="final-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c9a227" stopOpacity="0" />
            <stop offset="50%" stopColor="#e8c547" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 50 Q 200 150 400 200 T 800 350"
          fill="none"
          stroke="url(#final-grad)"
          strokeWidth="2"
          strokeDasharray="6 8"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <motion.path
          d="M 800 100 Q 600 50 400 200 T 0 320"
          fill="none"
          stroke="url(#final-grad)"
          strokeWidth="2"
          strokeDasharray="6 8"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
        />
      </svg>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 text-xs sm:text-sm text-white/90 font-display font-medium"
          >
            <AiSparkleIcon className="h-3.5 w-3.5 text-gold-300" />
            ابدأ الآن — في أقل من دقيقتين
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1]"
          >
            صوتك يبدأ من هنا.
            <TitleLineBreak />
            <TitleAccent variant="gold-light">والحلّ يصلك حتى الباب.</TitleAccent>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed"
          >
            لا أوراق، لا طوابير، لا وسطاء — فقط شكواك ورقم مرجعي ومتابعة شفافة
            حتى الإغلاق.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
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
                  قدّم شكواك الآن
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
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold-400" />
              تقديم مجهول مدعوم
            </span>
            <span className="hidden sm:block h-1 w-1 rounded-full bg-white/30" />
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold-400" />
              مركز اتصال 24/7
            </span>
            <span className="hidden sm:block h-1 w-1 rounded-full bg-white/30" />
            <span className="flex items-center gap-2">
              <AiSparkleIcon className="h-4 w-4 text-gold-400" />
              تصنيف ذكي فوري
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
