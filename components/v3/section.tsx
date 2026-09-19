import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "white" | "cream" | "emerald";
type AuroraVariant = "emerald" | "gold" | "both" | "none";

interface SectionProps {
  id?: string;
  tone?: Tone;
  aurora?: AuroraVariant;
  spacing?: "regular" | "tight" | "loose";
  className?: string;
  children: ReactNode;
}

/**
 * غلاف القسم لنسخة v3. خفيف عن قصد: يثبت الخلفية والإيقاع العمودي فقط،
 * ويترك التركيب الداخلي لما يُركّب لاحقاً داخل كل قسم.
 * النبرة emerald تستخدم الآن تدرجاً شبكياً زمردياً عميقاً مع وهج ذهبي،
 * ويمكن لأي قسم إضافة فقاعات أورورا متحركة عبر خاصية aurora.
 */
export function Section({
  id,
  tone = "white",
  aurora = "none",
  spacing = "regular",
  className,
  children,
}: SectionProps) {
  const isDark = tone === "emerald";

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        isDark && "gradient-mesh-dark text-white",
        spacing === "tight" && "py-14 lg:py-16",
        spacing === "regular" && "py-20 lg:py-24",
        spacing === "loose" && "py-24 lg:py-32",
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
      <div className="container relative">{children}</div>
    </section>
  );
}
