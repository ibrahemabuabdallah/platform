"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import type { AppIcon } from "@/lib/icon-types";

interface StudioSectionProps {
  index?: number;
  icon?: AppIcon;
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function StudioSection({
  index = 0,
  icon: Icon,
  eyebrow,
  title,
  description,
  actions,
  children,
}: StudioSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="mb-5 flex items-end justify-between gap-3 flex-wrap">
        <div className="flex items-start gap-3 min-w-0">
          {Icon && (
            <div className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-300">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-[10px] font-display font-bold uppercase tracking-[0.18em] text-emerald-300/70 mb-1">
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-lg md:text-xl font-extrabold text-white leading-tight">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-xs md:text-sm text-stone-400 max-w-xl">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2 flex-wrap">{actions}</div>
        )}
      </div>

      <div className="relative">
        {/* Subtle accent line under section header */}
        <div
          aria-hidden
          className="absolute -top-3 inset-x-0 h-px bg-gradient-to-l from-transparent via-emerald-400/30 to-transparent"
        />
        {children}
      </div>
    </motion.section>
  );
}
