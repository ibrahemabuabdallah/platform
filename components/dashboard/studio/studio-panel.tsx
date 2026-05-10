"use client";

import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudioPanelProps {
  icon?: LucideIcon;
  iconClass?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function StudioPanel({
  icon: Icon,
  iconClass = "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
  eyebrow,
  title,
  subtitle,
  actions,
  children,
  className,
  contentClassName,
}: StudioPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-stone-950/60 backdrop-blur-md overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-white/30 to-transparent pointer-events-none" />

      <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
        <div className="flex items-start gap-3 min-w-0">
          {Icon && (
            <div
              className={cn(
                "shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl border",
                iconClass
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
          )}
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-[10px] font-display font-bold uppercase tracking-[0.18em] text-emerald-300/70 mb-0.5">
                {eyebrow}
              </p>
            )}
            <h3 className="font-display font-extrabold text-base text-white leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-stone-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      <div className={cn("px-5 pb-5", contentClassName)}>{children}</div>
    </div>
  );
}
