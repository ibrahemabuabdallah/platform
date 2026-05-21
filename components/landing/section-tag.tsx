import { cn } from "@/lib/utils";
import type { AppIcon } from "@/lib/icon-types";

interface SectionTagProps {
  icon?: AppIcon;
  children: React.ReactNode;
  variant?: "emerald" | "gold";
  className?: string;
}

export function SectionTag({
  icon: Icon,
  children,
  variant = "emerald",
  className,
}: SectionTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-display font-semibold",
        variant === "emerald" &&
          "bg-emerald-50 text-emerald-700 border-emerald-200/60",
        variant === "gold" && "bg-gold-50 text-gold-700 border-gold-200/60",
        className
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

interface SectionHeaderProps {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "right";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-12 lg:mb-14",
        align === "center" && "text-center mx-auto",
        className
      )}
    >
      {badge && <div className="mb-4">{badge}</div>}
      <h2
        className={cn(
          "font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight",
          tone === "light" ? "text-stone-900" : "text-white"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-sm sm:text-base leading-relaxed",
            tone === "light" ? "text-stone-500" : "text-white/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
