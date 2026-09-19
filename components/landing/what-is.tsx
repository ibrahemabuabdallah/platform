import { ArrowLeft, Eye, Route, ScanSearch } from "lucide-react";
import Link from "next/link";

const values = [
  { icon: Eye, title: "شفافية قبل الوعود", text: "ترى المرحلة والمسؤول والزمن المتوقع بدل رسالة «قيد المتابعة»." },
  { icon: ScanSearch, title: "توجيه من أول مرة", text: "يساعد التصنيف الذكي على تقليل التحويلات ووصول الطلب إلى الاختصاص." },
  { icon: Route, title: "رحلة واحدة مترابطة", text: "من التسجيل إلى الميدان والإغلاق، كل خطوة في سجل واحد." },
];

export function WhatIs() {
  return (
    <section className="content-auto bg-white py-20 lg:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="civic-kicker">ليست صندوق شكاوى</span>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.15] text-emerald-950 sm:text-5xl">
              منصة تشغيل تبدأ من المواطن.
            </h2>
            <div className="emblem-rule mt-6 max-w-xs" aria-hidden>
              <span />
            </div>
            <p className="mt-5 max-w-xl text-base leading-8 text-stone-600">
              صُممت لتقليل الغموض بين إرسال الطلب وحدوث الإجراء، ولتعطي كل طرف صورة واضحة عمّا يجب أن يحدث بعد ذلك.
            </p>
            <Link href="#journey" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800">
              شاهد رحلة الطلب <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="divide-y divide-emerald-950/10 lg:col-span-7">
            {values.map((item, index) => (
              <article key={item.title} className="grid gap-4 py-7 first:pt-0 sm:grid-cols-[64px_1fr] lg:py-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950 text-gold-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-gold-700">0{index + 1}</span>
                  <h3 className="mt-2 font-display text-xl font-extrabold text-emerald-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
