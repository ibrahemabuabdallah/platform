"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Clock,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { Button } from "@/components/ui/button";
import { SectionShell } from "./section-shell";

const reassurances = [
  { icon: Clock, label: "أقل من دقيقتين" },
  { icon: EyeOff, label: "تقديم مجهول" },
  { icon: ShieldCheck, label: "بدون تسجيل" },
];

export function FinalCTA() {
  return (
    <SectionShell
      number="11"
      label="ابدأ الآن"
      tone="white"
      aurora="both"
      spacing="regular"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border-2 border-emerald-200/70 bg-white p-8 sm:p-12 lg:p-16 text-center max-w-5xl mx-auto shadow-soft-lg"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center"
        >
          <Image
            src="/logo.png"
            alt=""
            width={520}
            height={520}
            className="object-contain"
          />
        </div>

        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(16,185,129,0.16) 0%, rgba(16,185,129,0) 70%)",
            filter: "blur(28px)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(232,197,71,0.20) 0%, rgba(201,162,39,0) 70%)",
            filter: "blur(28px)",
          }}
        />

        <div className="relative">
          <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
            {reassurances.map((r) => (
              <span
                key={r.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50/70 border border-emerald-100 px-3 py-1 text-xs font-display font-semibold text-emerald-800"
              >
                <r.icon className="h-3.5 w-3.5 text-emerald-700" />
                {r.label}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-gold-50 border border-gold-200 px-4 py-1.5 text-xs text-gold-800 font-display font-bold mb-5">
            <AiSparkleIcon className="h-3.5 w-3.5 text-gold-700" />
            صوتك يصنع فرقاً
          </span>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-5xl font-extrabold leading-tight text-balance text-emerald-900">
            ابدأ رحلتك الآن
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-l from-gold-600 via-gold-500 to-gold-700 bg-clip-text text-transparent">
              واجعل صوتك حلاً
            </span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            لا تتردد — كل شكوى نتلقاها تتحوّل إلى قضية موثقة وفريقنا الميداني
            مستعد للنزول لأي مكان في المملكة.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              variant="gold"
              size="xl"
              className="w-full sm:w-auto"
            >
              <Link href="/submit">
                <AiSparkleIcon className="h-4 w-4" />
                قدّم شكوى أو مقترح
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="w-full sm:w-auto border-emerald-300 text-emerald-800 hover:bg-emerald-50"
            >
              <Link href="/track">
                <Search className="h-4 w-4" />
                تتبع شكوى موجودة
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
