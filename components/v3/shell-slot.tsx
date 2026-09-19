import { cn } from "@/lib/utils";
import { Section } from "./section";

interface ShellSlotProps {
  id: string;
  /** اسم القسم بالعربية حتى يسهل الإشارة له لاحقاً. */
  name: string;
  tone?: "white" | "cream" | "emerald";
  spacing?: "regular" | "tight" | "loose";
}

/**
 * فراغ قسم في هيكل v3: إطار واضح باسم القسم، جاهز لاستقبال الفكرة
 * التي تُركّب فيه لاحقاً. ليس محتوى نهائياً.
 */
export function ShellSlot({
  id,
  name,
  tone = "white",
  spacing = "regular",
}: ShellSlotProps) {
  const onDark = tone === "emerald";

  return (
    <Section id={id} tone={tone} spacing={spacing}>
      <div
        className={cn(
          "flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed px-6 py-16 text-center",
          onDark ? "border-white/30" : "border-emerald-700/25"
        )}
      >
        <p
          className={cn(
            "text-[11px] font-semibold tracking-[0.18em]",
            onDark ? "text-gold-400/90" : "text-gold-600"
          )}
        >
          {name}
        </p>
      </div>
    </Section>
  );
}
