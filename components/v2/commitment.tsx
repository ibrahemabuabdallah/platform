import { Section, SectionHeading } from "@/components/v2/section";
import { PRIORITY_LABELS, SLA_HOURS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Priority } from "@/types";

/** Ordered from tightest commitment to loosest, matching how a citizen reads it. */
const ORDER: Priority[] = ["critical", "high", "medium", "low"];

const MEANING: Record<Priority, string> = {
  critical: "خطر مباشر على السلامة أو انقطاع خدمة أساسية",
  high: "تعطيل واضح لخدمة يومية يمسّ عدداً من السكان",
  medium: "مشكلة قائمة دون خطر فوري",
  low: "طلب تحسين أو مقترح يُدرس بالدور",
};

function describeHours(hours: number): string {
  if (hours < 24) return `${hours} ساعات`;
  const days = hours / 24;
  const rounded = Number.isInteger(days) ? days : days.toFixed(1);
  return `${rounded} ${days === 1 ? "يوم" : "أيام"}`;
}

export function Commitment() {
  return (
    <Section tone="cream" glow="start">
      <SectionHeading
        title="لكل أولوية موعد مكتوب، وعدّاد يعمل"
        lede="عند الإسناد يبدأ عدّاد الالتزام. إن اقترب الموعد دون إنجاز تُرفَع القضية تلقائياً، وإن تجاوزه تصبح متأخرة أمام الإدارة — لا أمام المواطن وحده."
      />

      <ul className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white">
        {ORDER.map((priority, index) => (
          <li
            key={priority}
            className={cn(
              "flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:gap-6 lg:px-7",
              index > 0 && "border-t border-stone-100"
            )}
          >
            {/* The duration carries the weight — it is what the citizen came for */}
            <p className="flex shrink-0 items-baseline gap-1.5 sm:w-32">
              <span className="number-mono font-display text-2xl font-extrabold leading-none tracking-[-0.02em] text-emerald-800 lg:text-[1.75rem]">
                {describeHours(SLA_HOURS[priority]).split(" ")[0]}
              </span>
              <span className="font-display text-[13px] font-bold text-emerald-700">
                {describeHours(SLA_HOURS[priority]).split(" ")[1]}
              </span>
            </p>

            <div className="min-w-0 flex-1">
              <h3 className="font-display text-[0.95rem] font-bold text-stone-900">
                أولوية {PRIORITY_LABELS[priority]}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-stone-600">
                {MEANING[priority]}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
