import { Section, SectionHeading } from "@/components/v2/section";
import { resolvedCases } from "@/data/resolved-cases";
import { formatNumber } from "@/lib/utils";

/**
 * The platform's own published figures, unchanged. Presented as one weighted
 * block plus the closed references behind them, so the numbers are read next to
 * the evidence rather than floating as a row of equal tiles.
 */
const HEADLINE = {
  value: 2.3,
  unit: "يوم",
  label: "متوسط زمن معالجة القضية من الاستلام حتى الإغلاق",
};

const FIGURES = [
  { value: 1247, suffix: "+", label: "قضية مفتوحة ومتابَعة" },
  { value: 89, suffix: "%", label: "نسبة الإغلاق الناجح" },
  { value: 312, suffix: "", label: "نزول ميداني هذا الشهر" },
  { value: 47, suffix: "", label: "قضية مكررة كُشفت آلياً" },
];

export function Proof() {
  const recent = resolvedCases.slice(0, 5);

  return (
    <Section tone="white" glow="start">
      <SectionHeading
        title="الأرقام التي تقيس الوعد"
        lede="لا تُحتسب القضية مغلقة إلا بتقرير نهائي، فهذه الأرقام تقيس إغلاقاً موثّقاً لا مجرد إنهاء للملف."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-6">
        {/* Weighted figure + supporting grid */}
        <div className="flex flex-col gap-5">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 lg:p-8">
            <div
              aria-hidden
              className="aurora-soft-gold pointer-events-none absolute -bottom-24 start-[-15%] h-[120%] w-[60%]"
            />
            <div className="relative">
              <p className="flex items-baseline gap-2">
                <span className="number-mono font-display text-[3.5rem] font-extrabold leading-none tracking-[-0.03em] text-emerald-800 lg:text-[4.5rem]">
                  {HEADLINE.value}
                </span>
                <span className="font-display text-xl font-bold text-emerald-700">
                  {HEADLINE.unit}
                </span>
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-700">
                {HEADLINE.label}
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-200/70">
            {FIGURES.map((figure) => (
              <div key={figure.label} className="bg-white p-4 lg:p-5">
                <dt className="sr-only">{figure.label}</dt>
                <dd>
                  <span className="number-mono font-display text-2xl font-extrabold tracking-[-0.02em] text-stone-900 lg:text-[1.75rem]">
                    {formatNumber(figure.value)}
                  </span>
                  <span className="font-display text-base font-bold text-gold-700">
                    {figure.suffix}
                  </span>
                  <span className="mt-1 block text-[12px] leading-snug text-stone-600">
                    {figure.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The closed references behind the figures */}
        <div className="flex flex-col rounded-3xl border border-stone-200/80 bg-[#faf7f2] p-5 lg:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-sm font-bold text-stone-900">
              أُغلقت مؤخراً
            </h3>
            <span className="text-[11px] text-stone-600">
              آخر {recent.length} قضايا موثّقة
            </span>
          </div>

          <ul className="mt-4 flex-1 divide-y divide-stone-200/80">
            {recent.map((item) => (
              <li
                key={item.ref}
                className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate font-display text-[13px] font-semibold text-stone-900">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-stone-600">
                    {item.district} · {item.governorate} · {item.closedAt}
                  </p>
                </div>
                <div className="shrink-0 text-end">
                  <p className="number-mono text-[11px] text-stone-600">
                    {item.ref}
                  </p>
                  <p className="mt-0.5 text-[11px] font-display font-semibold tabular-nums text-emerald-800">
                    {item.durationDays} يوم
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
