import { Clock3, FileLock2, LockKeyhole, ShieldCheck } from "lucide-react";
import { SectionShell } from "./section-shell";
import { SectionHeader, SectionTag } from "./section-tag";

const guarantees = [
  { icon: LockKeyhole, title: "تشفير كامل", text: "تُحمى بياناتك أثناء الإرسال والحفظ." },
  { icon: FileLock2, title: "وصول مقيّد", text: "لا يطّلع على بياناتك إلا المنسق المسؤول عن ملفك." },
  { icon: Clock3, title: "زمن استجابة معلن", text: "لكل أولوية مدة واضحة ومسار تصعيد." },
  { icon: ShieldCheck, title: "سجل لا يُمحى", text: "كل انتقال في القضية محفوظ وقابل للمراجعة." },
];

export function TrustCommitment() {
  return (
    <SectionShell id="trust" number="٠٤" label="الثقة والالتزام" tone="white" className="content-auto">
      <div className="civic-card-dark emblem-frame-dark corner-marks overflow-hidden rounded-[2.25rem] p-7 text-white sm:p-10 lg:p-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeader
            align="right"
            tone="dark"
            className="mb-0 lg:col-span-5"
            badge={<SectionTag variant="gold" className="border-gold-300/25 bg-gold-400/10 text-gold-300">ثقتك ليست تفصيلًا</SectionTag>}
            title={<>خصوصيتك مصونة.<br />والوقت محسوب.</>}
            description="التزام واضح يجمع حماية البيانات بزمن معالجة يمكن متابعته."
          />
          <div className="grid gap-px overflow-hidden rounded-[1.75rem] bg-white/10 sm:grid-cols-2 lg:col-span-7">
            {guarantees.map((item) => (
              <article key={item.title} className="bg-emerald-950/75 p-6 lg:p-7">
                <item.icon className="h-6 w-6 text-gold-300" />
                <h3 className="mt-6 font-display text-lg font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/65">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
