"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Fingerprint,
  KeySquare,
} from "lucide-react";

const POINTS = [
  {
    icon: EyeOff,
    title: "تقديم مجهول مدعوم",
    desc: "يمكنك تقديم الشكوى دون كشف اسمك أو رقمك — فقط الجهة المختصة ترى الموقع التقريبي.",
  },
  {
    icon: Lock,
    title: "تشفير end-to-end",
    desc: "البيانات الحساسة مشفّرة في النقل والتخزين، مع إدارة مفاتيح مركزية معتمدة.",
  },
  {
    icon: Fingerprint,
    title: "صلاحيات صارمة",
    desc: "كل من يطّلع على القضية مسجّل في سجل التدقيق — لا اطّلاع غير مصرّح.",
  },
  {
    icon: KeySquare,
    title: "حقّك بالمراجعة",
    desc: "تستطيع طلب نسخة من بياناتك أو حذفها وفق سياسة الخصوصية المعتمدة.",
  },
];

export function PrivacyVault() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-25, 0, 30]);
  const lockScale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1.05]);

  return (
    <section
      ref={ref}
      data-experience-section="privacy"
      className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 py-20 lg:py-28 overflow-hidden text-white"
    >
      <div className="absolute inset-0 grid-pattern-dark opacity-100 pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-32 left-1/4 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(232,197,71,0.4), transparent 70%)",
        }}
      />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[11px] font-display font-bold text-gold-300">
            <ShieldCheck className="h-3 w-3" />
            خصوصيتك أولوية
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            بياناتك في خزنة رقمية
            <br />
            <span className="bg-gradient-to-l from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent">
              لا يفتحها إلا من له الصلاحية
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-800 to-emerald-950 border-4 border-gold-500/40 shadow-[0_0_60px_rgba(232,197,71,0.25)]" />

              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-emerald-900 to-emerald-950 border border-gold-500/20" />

              <motion.div
                style={{ rotate: reduce ? 0 : rotate }}
                className="absolute inset-8 rounded-full"
              >
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold-500/30" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400"
                    style={{
                      transform: `translate(-50%,-50%) rotate(${i * 30}deg) translateY(-110px)`,
                    }}
                  />
                ))}
              </motion.div>

              <motion.div
                style={{ scale: reduce ? 1 : lockScale }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <div className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 text-emerald-950 shadow-gold-glow">
                    <Lock className="h-12 w-12" strokeWidth={2.5} />
                  </div>
                  <span
                    aria-hidden
                    className="absolute -inset-2 rounded-3xl border-2 border-gold-400/40 vault-tick"
                  />
                </div>
              </motion.div>

              <div className="absolute inset-0 rounded-full pointer-events-none">
                {[0, 90, 180, 270].map((deg) => (
                  <span
                    key={deg}
                    className="absolute top-1/2 left-1/2 h-3 w-1 -translate-x-1/2 -translate-y-1/2 rounded bg-gold-400"
                    style={{
                      transform: `translate(-50%,-50%) rotate(${deg}deg) translateY(-145px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-4">
              {POINTS.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl border border-gold-500/20 bg-emerald-900/40 backdrop-blur p-5 hover:border-gold-500/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-300 border border-gold-500/30">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display font-extrabold text-base text-white">
                        {p.title}
                      </h3>
                      <p className="text-sm text-white/70 mt-1 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
