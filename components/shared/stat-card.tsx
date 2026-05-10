"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { LucideIcon, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, formatLocaleNumber } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  change?: number;
  trend?: "up" | "down" | "stable";
  decimals?: number;
  className?: string;
}

function useCounter(end: number, duration = 1500, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(end * eased);
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration, inView]);

  return {
    ref,
    value: decimals > 0 ? count.toFixed(decimals) : Math.floor(count),
  };
}

export function StatCard({
  label,
  value,
  prefix,
  suffix,
  icon: Icon,
  iconColor = "text-emerald-700",
  iconBg = "bg-emerald-50",
  change,
  trend,
  decimals = 0,
  className,
}: StatCardProps) {
  const counter = useCounter(value, 1600, decimals);

  const formatted =
    typeof counter.value === "number"
      ? formatLocaleNumber(counter.value)
      : counter.value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={cn(
          "p-5 hover:shadow-soft-md transition-all duration-300 hover:-translate-y-0.5",
          className
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-stone-500 mb-1.5 line-clamp-1">
              {label}
            </p>
            <div className="flex items-baseline gap-1">
              {prefix && (
                <span className="text-sm text-stone-400">{prefix}</span>
              )}
              <span
                ref={counter.ref}
                className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900"
              >
                {formatted}
              </span>
              {suffix && (
                <span className="text-sm font-semibold text-stone-500">
                  {suffix}
                </span>
              )}
            </div>
            {change !== undefined && trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend === "up" && (
                  <ArrowUp className="h-3 w-3 text-emerald-600" />
                )}
                {trend === "down" && (
                  <ArrowDown className="h-3 w-3 text-red-600" />
                )}
                {trend === "stable" && (
                  <Minus className="h-3 w-3 text-stone-400" />
                )}
                <span
                  className={cn(
                    "text-xs font-semibold",
                    trend === "up" && "text-emerald-700",
                    trend === "down" && "text-red-700",
                    trend === "stable" && "text-stone-500"
                  )}
                >
                  {formatLocaleNumber(Math.abs(change))}%
                </span>
                <span className="text-[11px] text-stone-400">
                  مقارنة بالفترة السابقة
                </span>
              </div>
            )}
          </div>
          {Icon && (
            <div
              className={cn(
                "shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl",
                iconBg
              )}
            >
              <Icon className={cn("h-5 w-5", iconColor)} />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
