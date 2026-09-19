"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Search, Send, ShieldCheck, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./section";

/* ------------------------------------------------------------------ */
/* شريط الثقة: ثلاث ضمانات يقرأها المواطن قبل أن يضغط أي زر.          */
/* ------------------------------------------------------------------ */
const TRUST_ITEMS = [
  {
    icon: Lock,
    title: "تشفير كامل",
    text: "بياناتك ومرفقاتك مشفّرة من لحظة الإرسال.",
  },
  {
    icon: ShieldCheck,
    title: "هويتك محمية",
    text: "لا يطّلع على هويتك إلا من يعالج طلبك.",
  },
  {
    icon: Timer,
    title: "مهلة ملزمة",
    text: "لكل طلب سقف زمني معلن — والتأخير يُصعَّد تلقائياً.",
  },
];

const TITLE_WORDS = ["صوتك", "يصل.", "شكواك", "تُحلّ."];

/**
 * ختام v3: مقطع زمردي داكن يجمع شريط الثقة، وعنواناً ختامياً يتجمّع
 * كلمة كلمة عند التمرير، وزرّي الفعل الأساسيين. الخلفية gradient-mesh
 * مع أورورا ذهبية وزمردية من غلاف Section.
 */
export function ClosingCta() {
  return (
    <Section id="v3-closing" tone="emerald" aurora="both" spacing="loose">
      <div className="mx-auto max-w-3xl text-center">
        {/* شريط الثقة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-10 grid gap-3 sm:grid-cols-3"
        >
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-start backdrop-blur-sm transition-colors duration-300 hover:border-gold-400/40 hover:bg-white/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-300">
                <item.icon aria-hidden className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-display text-[13px] font-bold text-white">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-emerald-100/70">
                  {item.text}
                </span>
              </span>
            </div>
          ))}
        </motion.div>

        {/* العنوان الختامي — يتجمّع كلمة كلمة */}
        <h2 className="text-balance font-display text-3xl font-extrabold leading-[1.3] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
          {TITLE_WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.14, ease: "easeOut" }}
              className={
                i >= 2
                  ? "inline-block text-gradient-gold-animated"
                  : "inline-block"
              }
            >
              {word}
              {i < TITLE_WORDS.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-emerald-100/80 lg:text-base"
        >
          دقيقتان تفصلانك عن رقم مرجعي يجعل طلبك قضية رسمية تُتابَع حتى
          الإغلاق — لا رسالة تضيع في الأدراج.
        </motion.p>

        {/* زرّا الفعل */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.85, ease: "easeOut" }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            variant="gold"
            size="xl"
            className="group relative w-full sm:w-auto"
          >
            <Link href="/submit">
              {/* نبضة خفيفة حول الزر الأساسي */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-2xl bg-gold-400/40 blur-md animate-pulse"
              />
              <Send aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              قدّم شكواك الآن
            </Link>
          </Button>
          <Button
            asChild
            variant="outline-light"
            size="xl"
            className="w-full sm:w-auto"
          >
            <Link href="/track">
              <Search aria-hidden className="h-4 w-4" />
              تتبّع حالة طلبك
            </Link>
          </Button>
        </motion.div>

        {/* سطر الطمأنة الختامي */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-7 text-[11.5px] text-emerald-100/50"
        >
          بلا حسابات معقّدة · بلا طوابير · رقمك المرجعي يصلك فوراً
        </motion.p>
      </div>
    </Section>
  );
}
