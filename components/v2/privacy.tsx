import { EyeOff, KeyRound, ShieldCheck, FileLock2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/v2/section";
import type { AppIcon } from "@/lib/icon-types";

interface Guarantee {
  icon: AppIcon;
  title: string;
  body: string;
}

const GUARANTEES: Guarantee[] = [
  {
    icon: ShieldCheck,
    title: "وصول مقيّد بصلاحية",
    body: "لا يطّلع على ملفك إلا المنسق المسؤول عنه، وكل اطّلاع مسجّل في سجل تدقيق لا يُمحى.",
  },
  {
    icon: EyeOff,
    title: "لا عرض للبيانات",
    body: "بياناتك الشخصية لا تظهر في اللوحات ولا التقارير — تبقى حكراً على المنسق المسؤول عن ملفك.",
  },
  {
    icon: FileLock2,
    title: "المرفقات تابعة للملف",
    body: "الصور والمستندات تبقى مرتبطة بالقضية وحدها، وتُستخدم لإثبات المشكلة لا لغير ذلك.",
  },
  {
    icon: KeyRound,
    title: "سجل لا يُمحى",
    body: "كل حدث في القضية موثّق بوقته وصاحبه، فلا يمكن تغيير ما جرى بعد حدوثه.",
  },
];

export function Privacy() {
  return (
    <Section tone="white">
      <SectionHeading
        title="أن تشتكي لا يعني أن تعرض بياناتك للجميع"
        lede="أكثر ما يمنع الناس من التقديم هو القلق على بياناتهم. هذه هي الضمانات التي تجعل التقديم آمناً — وهي مبنية في النظام لا موعودة في نصّ."
        align="center"
        className="mx-auto max-w-2xl text-center"
      />

      <div className="mx-auto grid max-w-4xl gap-px overflow-hidden rounded-3xl border border-stone-200/80 bg-stone-200/70 sm:grid-cols-2">
        {GUARANTEES.map((guarantee) => {
          const Icon = guarantee.icon;
          return (
            <div
              key={guarantee.title}
              className="bg-white p-5 lg:p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-700 ring-1 ring-gold-200/70">
                <Icon aria-hidden className="h-[18px] w-[18px]" />
              </span>
              <h3 className="mt-4 font-display text-[0.95rem] font-bold text-stone-900">
                {guarantee.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-stone-600">
                {guarantee.body}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
