import {
  ClipboardCheck,
  Route,
  UserCheck,
  MapPin,
  FileCheck,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/v2/section";
import type { AppIcon } from "@/lib/icon-types";

interface Step {
  icon: AppIcon;
  title: string;
  body: string;
  /** What the citizen personally does or receives at this step. */
  yours: string;
}

const STEPS: Step[] = [
  {
    icon: ClipboardCheck,
    title: "تقدّم الطلب",
    body: "نموذج من خمس خطوات: نوع الطلب، الموقع، بياناتك إن أردت، المرفقات، ثم مراجعة.",
    yours: "تستلم رقماً مرجعياً فوراً",
  },
  {
    icon: Route,
    title: "يُصنَّف ويُوجَّه",
    body: "محرك التصنيف يحدّد نوع الطلب وأولويته، ويحوّله للفرع المختص بموقعك.",
    yours: "ترى اسم الفرع المسؤول",
  },
  {
    icon: UserCheck,
    title: "يُسنَد لمنسق",
    body: "منسق ميداني باسمه يتولّى الملف، ويبدأ عدّاد موعد الالتزام من لحظة الإسناد.",
    yours: "تعرف اسم من يتابع ملفك",
  },
  {
    icon: MapPin,
    title: "نزول ميداني",
    body: "معاينة على الأرض، توثيق بالصور، وتسجيل كل ملاحظة في سجل القضية.",
    yours: "تتابع الأحداث لحظة بلحظة",
  },
  {
    icon: FileCheck,
    title: "إغلاق موثّق",
    body: "لا تُغلق القضية إلا بتقرير نهائي يشرح ما تم، ويبقى السجل متاحاً لك.",
    yours: "تحصل على تقرير تستطيع الرجوع إليه",
  },
];

export function Journey() {
  return (
    <Section id="journey" tone="cream" glow="end">
      <SectionHeading
        title="من ضغطة الإرسال إلى الإغلاق الموثّق"
        lede="كل خطوة لها مسؤول ووقت معلوم، ولا شيء يحدث خلف ستار — هذه هي الرحلة كما تجري فعلاً."
      />

      <ol className="relative grid gap-px overflow-hidden rounded-3xl border border-stone-200/80 bg-stone-200/70 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <li
              key={step.title}
              className="group relative flex flex-col bg-white p-5 transition-colors duration-200 hover:bg-emerald-50/40 lg:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 transition-colors duration-200 group-hover:bg-emerald-100">
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                </span>
                <span className="font-mono text-[11px] tabular-nums text-gold-700">
                  {index + 1}
                  <span className="text-stone-600"> / {STEPS.length}</span>
                </span>
              </div>

              <h3 className="mt-4 font-display text-[0.95rem] font-bold leading-snug text-stone-900">
                {step.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-stone-600">
                {step.body}
              </p>

              <p className="mt-4 border-t border-dashed border-stone-200 pt-3 text-[11.5px] font-display font-semibold leading-snug text-emerald-800">
                {step.yours}
              </p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
