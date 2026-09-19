import { cn } from "@/lib/utils";

type AuroraVariant = "emerald" | "gold" | "both" | "none";
type SectionTone = "white" | "off-white" | "dark-mesh";

interface SectionShellProps {
  number?: string;
  label?: string;
  tone?: SectionTone;
  aurora?: AuroraVariant;
  spacing?: "regular" | "tight";
  divider?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionShell({
  number,
  label,
  tone = "white",
  aurora = "none",
  spacing = "regular",
  divider = false,
  id,
  className,
  children,
}: SectionShellProps) {
  const isDark = tone === "dark-mesh";

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        tone === "white" && "bg-white",
        tone === "off-white" && "bg-stone-50/50",
        isDark && "gradient-mesh-dark",
        spacing === "regular" && "py-20 lg:py-28",
        spacing === "tight" && "py-14 lg:py-20",
        className
      )}
    >
      {(aurora === "emerald" || aurora === "both") && (
        <div
          aria-hidden
          className={cn(
            "absolute -top-40 right-[-10%] w-[55%] h-[60%] pointer-events-none",
            isDark ? "aurora-section-emerald-dark" : "aurora-section-emerald"
          )}
        />
      )}
      {(aurora === "gold" || aurora === "both") && (
        <div
          aria-hidden
          className={cn(
            "absolute -bottom-40 left-[-10%] w-[55%] h-[60%] pointer-events-none",
            isDark ? "aurora-section-gold-dark" : "aurora-section-gold"
          )}
        />
      )}

      <div className="container relative">
        {(number || label) && (
          <div className="mb-10 flex items-center gap-4 lg:mb-12">
            {number && (
              <span
                className={cn(
                  "font-mono text-4xl font-bold tracking-tight lg:text-5xl",
                  isDark ? "text-gold-400/40" : "text-emerald-950/10"
                )}
                aria-hidden
              >
                {number}
              </span>
            )}
            <div className="flex flex-1 items-center gap-4">
              {label && (
                <span
                  className={cn(
                    "shrink-0 text-xs font-display font-bold tracking-wide",
                    isDark ? "text-gold-300" : "text-emerald-800"
                  )}
                >
                  {label}
                </span>
              )}
              <span
                aria-hidden
                className={cn(
                  "h-px flex-1",
                  isDark
                    ? "bg-gradient-to-l from-gold-400/40 to-transparent"
                    : "bg-gradient-to-l from-gold-500/45 to-transparent"
                )}
              />
              <span
                aria-hidden
                className="h-1.5 w-1.5 rotate-45 bg-gold-500/70"
              />
            </div>
          </div>
        )}

        {children}
      </div>

      {divider && (
        <div className="container relative mt-20 lg:mt-24">
          <div className="gold-divider" />
        </div>
      )}
    </section>
  );
}
