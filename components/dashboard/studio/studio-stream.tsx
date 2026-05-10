"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { branches } from "@/data/branches";
import { cases } from "@/data/cases";
import {
  PRIORITY_COLORS,
  PRIORITY_LABELS,
  STATUS_COLORS,
  STATUS_LABELS,
} from "@/lib/constants";
import { timeAgoAr } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusGlow: Record<string, string> = {
  new: "shadow-[0_0_18px_-2px_rgba(96,165,250,0.65)]",
  classifying: "shadow-[0_0_18px_-2px_rgba(167,139,250,0.65)]",
  assigned: "shadow-[0_0_18px_-2px_rgba(34,211,238,0.65)]",
  in_progress: "shadow-[0_0_18px_-2px_rgba(251,191,36,0.65)]",
  field_visit: "shadow-[0_0_18px_-2px_rgba(251,146,60,0.7)]",
  intervention: "shadow-[0_0_18px_-2px_rgba(129,140,248,0.65)]",
  resolved: "shadow-[0_0_18px_-2px_rgba(52,211,153,0.65)]",
  closed: "shadow-none",
  escalated: "shadow-[0_0_18px_-2px_rgba(248,113,113,0.7)]",
};

export function StudioStream() {
  const reduced = useReducedMotion();
  const recent = [...cases]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 8);

  return (
    <div className="relative rounded-2xl border border-white/10 bg-stone-950/60 backdrop-blur-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-5 py-4 border-b border-white/10">
        <div>
          <p className="text-[10px] font-display font-bold uppercase tracking-[0.18em] text-emerald-300/70">
            البث الحي
          </p>
          <h3 className="font-display font-extrabold text-base text-white mt-0.5">
            تدفق القضايا
          </h3>
        </div>
        <Link
          href="/cases"
          className="inline-flex items-center gap-1 text-xs font-display font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
        >
          عرض الكل
          <ChevronLeft className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="relative">
        {/* Vertical rail */}
        <div className="absolute end-[2.1rem] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent pointer-events-none" />

        <ul className="relative">
          {recent.map((c, i) => {
            const branch = branches.find((b) => b.id === c.branchId);
            const status = STATUS_COLORS[c.status];
            const priority = PRIORITY_COLORS[c.priority];
            return (
              <motion.li
                key={c.id}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative"
              >
                <Link
                  href={`/cases/${c.id}`}
                  className="group flex items-start gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors border-b border-white/5 last:border-b-0"
                >
                  {/* Status node on rail */}
                  <div className="relative shrink-0 w-7 flex items-start justify-center pt-1.5">
                    <span
                      className={cn(
                        "relative z-10 inline-flex h-2.5 w-2.5 rounded-full ring-4 ring-stone-950",
                        status.dot,
                        statusGlow[c.status]
                      )}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap mb-1">
                      <span className="font-mono text-[11px] font-semibold text-emerald-300">
                        {c.ref}
                      </span>
                      <span className="text-[10px] text-stone-500">·</span>
                      <span className="text-[10px] text-stone-400 font-display">
                        {timeAgoAr(c.updatedAt)}
                      </span>
                      <span className="text-[10px] text-stone-500">·</span>
                      <span className="text-[10px] text-stone-400 font-display">
                        {branch?.name.replace("فرع ", "")}
                      </span>
                    </div>
                    <p className="text-sm font-display font-semibold text-white/90 group-hover:text-emerald-200 transition-colors line-clamp-1">
                      {c.title}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-display font-semibold",
                          status.bg,
                          status.text,
                          status.border
                        )}
                      >
                        <span className={cn("h-1 w-1 rounded-full", status.dot)} />
                        {STATUS_LABELS[c.status]}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-display font-bold",
                          priority.bg,
                          priority.text,
                          priority.border
                        )}
                      >
                        {PRIORITY_LABELS[c.priority]}
                      </span>
                    </div>
                  </div>

                  <ChevronLeft className="h-4 w-4 text-stone-600 mt-2 shrink-0 opacity-0 group-hover:opacity-100 group-hover:text-emerald-300 transition-all" />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
