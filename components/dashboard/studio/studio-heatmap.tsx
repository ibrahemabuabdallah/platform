"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Map } from "lucide-react";
import { heatmapData } from "@/data/charts";
import { cn } from "@/lib/utils";
import { StudioPanel } from "./studio-panel";

const intensityClasses = [
  "bg-emerald-500/10",
  "bg-emerald-500/15",
  "bg-emerald-500/22",
  "bg-emerald-500/30",
  "bg-emerald-500/40",
  "bg-emerald-500/55",
  "bg-emerald-500/70",
  "bg-emerald-400/85",
  "bg-emerald-400",
  "bg-emerald-300",
];

export function StudioHeatmap() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<{
    region: string;
    level: number;
  } | null>(null);

  const cells = heatmapData.flat();

  return (
    <StudioPanel
      icon={Map}
      iconClass="border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
      eyebrow="جغرافيا"
      title="كثافة القضايا"
      subtitle="حسب المنطقة والمحافظة"
    >
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
        {cells.map((cell, idx) => (
          <motion.div
            key={idx}
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.012 }}
            onMouseEnter={() => setHovered(cell)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "aspect-square rounded-md cursor-pointer relative group transition-all hover:ring-2 hover:ring-gold-400/70 hover:ring-offset-1 hover:ring-offset-stone-950",
              intensityClasses[Math.min(cell.level, 9)]
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span
                className={cn(
                  "text-[10px] font-bold font-display",
                  cell.level > 6 ? "text-emerald-950" : "text-white"
                )}
              >
                {cell.level}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-1.5">
          <span className="font-display">أقل</span>
          <div className="flex gap-0.5">
            {[0, 2, 4, 6, 8].map((l) => (
              <div
                key={l}
                className={cn("h-3 w-3 rounded-sm", intensityClasses[l])}
              />
            ))}
          </div>
          <span className="font-display">أكثر</span>
        </div>
        {hovered && (
          <div className="text-xs font-display font-semibold text-emerald-300">
            {hovered.region}: {hovered.level} قضية
          </div>
        )}
      </div>
    </StudioPanel>
  );
}
