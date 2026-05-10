"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, Filter, MapPin, Tag } from "lucide-react";
import { branches } from "@/data/branches";
import { CASE_TYPE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CaseType } from "@/types";

interface ChipProps {
  icon: typeof Filter;
  label: string;
  options: string[];
}

function FilterChip({ icon: Icon, label, options }: ChipProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-display font-semibold transition-all",
          open
            ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-100 shadow-[0_0_24px_-6px_rgba(16,185,129,0.5)]"
            : "border-white/10 bg-white/5 text-white/80 hover:border-emerald-400/40 hover:text-white"
        )}
      >
        <Icon className="h-3.5 w-3.5 text-emerald-300" />
        <span className="text-stone-400 text-[10px] uppercase tracking-wider">
          {label}
        </span>
        <span>·</span>
        <span>{selected}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 mt-2 min-w-[10rem] rounded-xl border border-white/10 bg-stone-950/95 backdrop-blur-md p-1 shadow-soft-lg"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center rounded-lg px-3 py-2 text-xs font-display font-semibold transition-colors",
                  opt === selected
                    ? "bg-emerald-500/15 text-emerald-200"
                    : "text-white/75 hover:bg-white/5 hover:text-white"
                )}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function StudioFilters() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="inline-flex items-center gap-1.5 px-2 me-1">
        <Filter className="h-3.5 w-3.5 text-emerald-300" />
        <span className="text-[10px] font-display font-bold uppercase tracking-[0.18em] text-emerald-300/70">
          مرشحات
        </span>
      </div>
      <FilterChip
        icon={MapPin}
        label="فرع"
        options={["الكل", ...branches.map((b) => b.name.replace("فرع ", ""))]}
      />
      <FilterChip
        icon={Tag}
        label="نوع"
        options={[
          "الكل",
          ...(Object.keys(CASE_TYPE_LABELS) as CaseType[]).map(
            (t) => CASE_TYPE_LABELS[t]
          ),
        ]}
      />
      <FilterChip
        icon={Calendar}
        label="فترة"
        options={["اليوم", "هذا الأسبوع", "هذا الشهر", "هذا الربع", "هذا العام"]}
      />
    </div>
  );
}
