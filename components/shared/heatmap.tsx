"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { heatmapData } from "@/data/charts";

const intensityColors = [
  "bg-emerald-50",
  "bg-emerald-100",
  "bg-emerald-200",
  "bg-emerald-300",
  "bg-emerald-400",
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-emerald-700",
  "bg-emerald-800",
  "bg-emerald-900",
];

interface HeatmapProps {
  className?: string;
  compact?: boolean;
}

export function Heatmap({ className, compact = false }: HeatmapProps) {
  const [hovered, setHovered] = useState<{ region: string; level: number } | null>(
    null
  );

  const handleSelect = (cell: { region: string; level: number }) => {
    setHovered((prev) =>
      prev?.region === cell.region ? null : cell
    );
  };

  return (
    <div className={cn("relative", className)}>
      <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 sm:gap-2">
        {heatmapData.flat().map((cell, idx) => {
          const isSelected = hovered?.region === cell.region;
          return (
            <motion.button
              type="button"
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.015 }}
              onMouseEnter={() => setHovered(cell)}
              onMouseLeave={() =>
                setHovered((prev) =>
                  prev?.region === cell.region ? prev : prev
                )
              }
              onClick={() => handleSelect(cell)}
              aria-label={`${cell.region}: ${cell.level} قضية`}
              className={cn(
                "aspect-square min-h-[36px] sm:min-h-0 rounded-md transition-all relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-1",
                isSelected
                  ? "ring-2 ring-gold-500 ring-offset-1"
                  : "hover:ring-2 hover:ring-gold-500 hover:ring-offset-1",
                intensityColors[Math.min(cell.level, 9)],
                compact && "rounded-sm min-h-0"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity",
                  isSelected
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-bold font-display",
                    cell.level > 5 ? "text-white" : "text-emerald-900"
                  )}
                >
                  {cell.level}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {!compact && (
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <span>أقل</span>
            <div className="flex gap-0.5">
              {[0, 2, 4, 6, 8].map((l) => (
                <div
                  key={l}
                  className={cn("h-3 w-3 rounded-sm", intensityColors[l])}
                />
              ))}
            </div>
            <span>أكثر</span>
          </div>
          <div
            className="text-xs font-semibold text-emerald-700 min-h-[1rem]"
            aria-live="polite"
          >
            {hovered ? `${hovered.region}: ${hovered.level} قضية` : ""}
          </div>
        </div>
      )}
    </div>
  );
}
