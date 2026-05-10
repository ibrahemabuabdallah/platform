"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ChevronLeft } from "lucide-react";
import { branches } from "@/data/branches";
import { cases } from "@/data/cases";
import { PRIORITY_COLORS, PRIORITY_LABELS } from "@/lib/constants";
import { timeAgoAr, cn } from "@/lib/utils";
import { StudioPanel } from "./studio-panel";

export function StudioSlaPulse() {
  const reduced = useReducedMotion();
  const overdue = cases.filter((c) => c.slaStatus === "breached").slice(0, 5);

  return (
    <StudioPanel
      icon={AlertTriangle}
      iconClass="border-rose-400/40 bg-rose-500/15 text-rose-200"
      eyebrow="إنذار"
      title="متأخرة عن SLA"
      subtitle={`${overdue.length} قضية تجاوزت موعد الاستحقاق`}
      contentClassName="px-0 pb-0"
    >
      {overdue.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-stone-400">
          لا توجد قضايا متأخرة حالياً
        </div>
      ) : (
        <ul>
          {overdue.map((c, i) => {
            const branch = branches.find((b) => b.id === c.branchId);
            const priority = PRIORITY_COLORS[c.priority];
            return (
              <motion.li
                key={c.id}
                initial={reduced ? false : { opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/cases/${c.id}`}
                  className="group flex items-start gap-3 px-5 py-3.5 hover:bg-rose-500/[0.06] transition-colors border-t border-white/5"
                >
                  <div className="shrink-0 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-70 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap mb-1">
                      <span className="font-mono text-[11px] font-bold text-rose-300">
                        {c.ref}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        تأخر {timeAgoAr(c.dueAt).replace("منذ", "بـ")}
                      </span>
                    </div>
                    <p className="text-sm font-display font-semibold text-white/90 line-clamp-1 group-hover:text-rose-100 transition-colors">
                      {c.title}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 flex-wrap">
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
                      <span className="text-[10px] text-stone-400">
                        · {branch?.name.replace("فرع ", "")}
                      </span>
                    </div>
                  </div>
                  <ChevronLeft className="h-4 w-4 text-stone-600 mt-1 opacity-0 group-hover:opacity-100 group-hover:text-rose-200 transition-all" />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      )}

      <Link
        href="/cases?filter=breached"
        className="flex items-center justify-center gap-1 px-5 py-3 text-xs font-display font-semibold text-rose-300 hover:bg-rose-500/[0.08] border-t border-white/10 transition-colors"
      >
        عرض جميع المتأخرات
        <ChevronLeft className="h-3.5 w-3.5" />
      </Link>
    </StudioPanel>
  );
}
