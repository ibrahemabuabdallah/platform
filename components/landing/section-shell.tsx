import { cn } from "@/lib/utils";

type AuroraVariant = "emerald" | "gold" | "both" | "none";

interface SectionShellProps {
  number?: string;
  label?: string;
  tone?: "white" | "off-white";
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
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        tone === "white" && "bg-white",
        tone === "off-white" && "bg-stone-50/50",
        spacing === "regular" && "py-24 lg:py-28",
        spacing === "tight" && "py-16 lg:py-20",
        className
      )}
    >
      {(aurora === "emerald" || aurora === "both") && (
        <div
          aria-hidden
          className="aurora-soft-emerald absolute -top-40 right-[-10%] w-[55%] h-[60%] pointer-events-none"
        />
      )}
      {(aurora === "gold" || aurora === "both") && (
        <div
          aria-hidden
          className="aurora-soft-gold absolute -bottom-40 left-[-10%] w-[55%] h-[60%] pointer-events-none"
        />
      )}

      <div className="container relative">
        {(number || label) && (
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="gold-divider-dotted hidden sm:block w-12 lg:w-16" />
            {number && <span className="section-number">{number}</span>}
            {label && (
              <span className="text-xs font-display font-semibold text-emerald-700 tracking-wide">
                · {label}
              </span>
            )}
            <span className="gold-divider-dotted hidden sm:block w-12 lg:w-16" />
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
