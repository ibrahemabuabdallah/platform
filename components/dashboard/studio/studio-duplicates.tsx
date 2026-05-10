"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, Copy } from "lucide-react";
import { cases } from "@/data/cases";
import { cn } from "@/lib/utils";
import { StudioPanel } from "./studio-panel";

export function StudioDuplicates() {
  const reduced = useReducedMotion();
  const duplicates = cases
    .filter(
      (c) =>
        c.aiClassification.duplicateRisk > 30 ||
        c.aiClassification.potentialDuplicates.length > 0
    )
    .slice(0, 4);

  return (
    <StudioPanel
      icon={Copy}
      iconClass="border-violet-400/40 bg-violet-500/15 text-violet-200"
      eyebrow="تشابه مرتفع"
      title="قضايا مكررة محتملة"
      subtitle="مرشحة للدمج تلقائياً"
      contentClassName="px-0 pb-0"
    >
      <ul>
        {duplicates.map((c, i) => {
          const risk = c.aiClassification.duplicateRisk;
          const isHigh = risk > 60;
          return (
            <motion.li
              key={c.id}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/cases/${c.id}`}
                className="group flex items-start gap-4 px-5 py-3.5 hover:bg-violet-500/[0.06] transition-colors border-t border-white/5"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[11px] text-stone-400 mb-1">
                    {c.ref}
                  </p>
                  <p className="text-sm font-display font-semibold text-white/90 line-clamp-1 group-hover:text-violet-100 transition-colors">
                    {c.title}
                  </p>
                  {c.aiClassification.potentialDuplicates.length > 0 && (
                    <p className="text-[11px] text-stone-400 mt-1">
                      احتمال تكرار:{" "}
                      <span className="font-mono text-violet-300">
                        {c.aiClassification.potentialDuplicates[0]}
                      </span>
                    </p>
                  )}
                </div>
                <div className="text-center shrink-0">
                  <div
                    className={cn(
                      "font-display text-xl font-extrabold tabular-nums",
                      isHigh ? "text-rose-300" : "text-violet-300"
                    )}
                  >
                    {risk}%
                  </div>
                  <div className="text-[10px] text-stone-500 font-display">
                    تشابه
                  </div>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ul>
      <Link
        href="/cases"
        className="flex items-center justify-center gap-1 px-5 py-3 text-xs font-display font-semibold text-violet-300 hover:bg-violet-500/[0.08] border-t border-white/10 transition-colors"
      >
        مراجعة جميع المكررات
        <ChevronLeft className="h-3.5 w-3.5" />
      </Link>
    </StudioPanel>
  );
}
