import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  badge,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-border bg-white",
        className
      )}
    >
      <div className="grid-pattern-light absolute inset-0 opacity-50 pointer-events-none" />
      <div className="container relative py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            {badge && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-xs font-semibold text-emerald-700 font-display mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse-dot" />
                {badge}
              </span>
            )}
            <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900 leading-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm md:text-base text-stone-500 leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 flex-wrap">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
}
