import Link from "next/link";
import { ArrowLeft, Wrench, Scale, Landmark, Lightbulb } from "lucide-react";
import { Section, SectionHeading } from "@/components/v2/section";
import { cn } from "@/lib/utils";
import { CASE_TYPE_LABELS } from "@/lib/constants";
import type { AppIcon } from "@/lib/icon-types";
import type { CaseType } from "@/types";

interface Category {
  type: CaseType;
  icon: AppIcon;
  blurb: string;
  examples: string[];
  /** The service track carries most of the volume, so it leads the grid. */
  lead?: boolean;
}

const CATEGORIES: Category[] = [
  {
    type: "service",
    icon: Wrench,
    blurb:
      "كل ما يتعلق بالخدمة على الأرض: مياه، إنارة، طرق، نفايات، صرف صحي. هذه القضايا تُسنَد لمنسق ميداني وتنتهي بزيارة موثّقة.",
    examples: [
      "تسرب مياه من خط رئيسي",
      "أعمدة إنارة معطّلة",
      "حفرة في الشارع",
      "تراكم نفايات",
    ],
    lead: true,
  },
  {
    type: "legal",
    icon: Scale,
    blurb: "مسائل تحتاج رأياً أو إجراءً قانونياً، تُحوَّل للجهة المختصة.",
    examples: ["نزاع ملكية", "تظلّم إداري"],
  },
  {
    type: "political",
    icon: Landmark,
    blurb: "قضايا عامة تُرفع لمتخذي القرار عبر اللجان المختصة.",
    examples: ["مطلب خدمي للحي", "تمثيل في لجنة"],
  },
  {
    type: "suggestion",
    icon: Lightbulb,
    blurb: "فكرة لتحسين خدمة قائمة — تُدرس وتُرد عليها مثل أي طلب.",
    examples: ["تحسين مسار حافلة", "توسيع ساعات الخدمة"],
  },
];

export function Categories() {
  const [lead, ...rest] = CATEGORIES;
  const LeadIcon = lead.icon;

  return (
    <Section tone="cream">
      <SectionHeading
        title="أربعة مسارات، ولكل مسار جهة تنتظره"
        lede="اختيار المسار الصحيح في الخطوة الأولى هو ما يوفّر عليك الانتظار — لأنه يحدّد من يستلم الطلب."
        aside={
          <Link
            href="/v2/submit"
            className="group inline-flex items-center gap-2 font-display text-sm font-bold text-emerald-800 underline decoration-gold-400/60 decoration-2 underline-offset-[6px] transition-colors hover:text-emerald-900 hover:decoration-gold-500"
          >
            ابدأ بتقديم طلبك
            <ArrowLeft
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
            />
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-5">
        {/* Lead category */}
        <article className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-soft-sm lg:p-8">
          <div
            aria-hidden
            className="aurora-soft-emerald pointer-events-none absolute -top-32 end-[-20%] h-[90%] w-[70%]"
          />
          <div className="relative">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-emerald-glow">
              <LeadIcon aria-hidden className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-xl font-extrabold tracking-[-0.015em] text-stone-900 lg:text-2xl">
              {CASE_TYPE_LABELS[lead.type]}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600">
              {lead.blurb}
            </p>
          </div>
          <ul className="relative mt-6 flex flex-wrap gap-2">
            {lead.examples.map((example) => (
              <li
                key={example}
                className="rounded-lg bg-stone-100/90 px-2.5 py-1.5 text-[12px] text-stone-700"
              >
                {example}
              </li>
            ))}
          </ul>
        </article>

        {/* Remaining categories */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
          {rest.map((category) => {
            const Icon = category.icon;
            return (
              <article
                key={category.type}
                className={cn(
                  "flex gap-4 rounded-2xl border border-stone-200/80 bg-white/70 p-4 transition-colors duration-200 hover:border-emerald-200 hover:bg-white lg:p-5"
                )}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[0.95rem] font-bold text-stone-900">
                    {CASE_TYPE_LABELS[category.type]}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-stone-600">
                    {category.blurb}
                  </p>
                  <p className="mt-2 text-[11.5px] text-stone-600">
                    {category.examples.join(" · ")}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
