"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";

interface StudioShellProps {
  badge?: string;
  title: string;
  description?: string;
  children: ReactNode;
  pulseSlot?: ReactNode;
  classicHref?: string;
}

export function StudioShell({
  badge,
  title,
  description,
  children,
  pulseSlot,
  classicHref = "/dashboard",
}: StudioShellProps) {
  const reduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative bg-stone-950 text-stone-100 -mt-px">
      {/* Hero / command bar */}
      <section className="relative overflow-hidden border-b border-emerald-900/60">
        {/* Base radial gradient */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 80% at 70% 0%, rgba(4,120,87,0.45), transparent 60%), radial-gradient(50% 60% at 10% 100%, rgba(201,162,39,0.18), transparent 65%), linear-gradient(180deg, #052e1f 0%, #0a0a09 100%)",
          }}
        />

        {/* Aurora blobs */}
        {!reduced && (
          <>
            <motion.div
              aria-hidden
              className="absolute -top-32 end-[-8rem] h-[32rem] w-[32rem] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(16,185,129,0.55), transparent 70%)",
                filter: "blur(56px)",
                mixBlendMode: "screen",
              }}
              animate={{ x: [0, -40, 24, 0], y: [0, 28, -12, 0] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute -bottom-44 start-[-8rem] h-[28rem] w-[28rem] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(232,197,71,0.45), transparent 72%)",
                filter: "blur(56px)",
                mixBlendMode: "screen",
              }}
              animate={{ x: [0, 36, -18, 0], y: [0, -22, 14, 0] }}
              transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute top-1/2 start-1/3 h-72 w-72 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(125,211,252,0.18), transparent 70%)",
                filter: "blur(48px)",
                mixBlendMode: "screen",
              }}
              animate={{ x: [-20, 20, -10, -20], y: [-10, 18, -8, -10] }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 grid-pattern-dark opacity-70 pointer-events-none"
        />

        {/* Top hairline */}
        <div className="gold-line relative" />

        <div className="container relative py-10 lg:py-14">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0 flex-1">
              {badge && (
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-900/40 px-3 py-1 text-[11px] font-display font-semibold text-emerald-200 backdrop-blur"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  </span>
                  {badge}
                </motion.span>
              )}
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-4 font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-white"
              >
                {title}
              </motion.h1>
              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 }}
                  className="mt-3 max-w-2xl text-sm md:text-base text-emerald-100/75 leading-relaxed"
                >
                  {description}
                </motion.p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="shrink-0"
            >
              <Link
                href={classicHref}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 min-h-[40px] text-sm font-display font-semibold text-white/80 backdrop-blur transition-all hover:bg-white/10 hover:text-white"
              >
                <AiSparkleIcon className="h-4 w-4 text-gold-400" />
                العودة للوحة الكلاسيكية
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          {pulseSlot && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              {pulseSlot}
            </motion.div>
          )}
        </div>
      </section>

      {/* Body — keeps the dark surface but adds subtle aurora accents */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(80% 40% at 0% 0%, rgba(4,120,87,0.18), transparent 60%), radial-gradient(70% 35% at 100% 30%, rgba(201,162,39,0.10), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 grid-pattern-dark opacity-30 pointer-events-none"
        />
        <div className="container relative py-8 lg:py-10 space-y-10 lg:space-y-12">
          {children}
        </div>
      </div>
    </div>
    </MotionConfig>
  );
}
