"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  Hash,
  UserCheck,
  MapPin,
  Hammer,
  CheckCircle2,
  GitBranch,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { TitleAccent } from "@/components/shared/title-accent";
import { useReducedMotion } from "framer-motion";

const STEPS = [
  {
    icon: FileText,
    title: "تقديم الطلب",
    desc: "نموذج بسيط في دقيقتين",
    detail: "يكفي وصف موجز ورقم تواصل اختياري — التقديم المجهول مدعوم بالكامل.",
  },
  {
    icon: Hash,
    title: "رقم مرجعي فوري",
    desc: "تتبع طلبك بأي وقت",
    detail: "نُصدر لك رقماً مرجعياً فور الإرسال يبقى صالحاً حتى الإغلاق.",
  },
  {
    icon: AiSparkleIcon,
    title: "تصنيف وتوجيه",
    desc: "محرك ذكي يحدد الجهة المختصة",
    detail: "نموذج لغوي مدرّب على آلاف الحالات يوجّه الشكوى للمنسق الصحيح.",
  },
  {
    icon: UserCheck,
    title: "متابعة منسق الفرع",
    desc: "تواصل وجمع المعلومات",
    detail: "منسق الفرع يفتح القناة معك ويستكمل التفاصيل قبل التحويل الميداني.",
  },
  {
    icon: MapPin,
    title: "نزول ميداني",
    desc: "معاينة وتوثيق المشكلة",
    detail: "فريق ميداني يصل خلال SLA المحدد، يلتقط الأدلة ويرفع تقريراً مرئياً.",
  },
  {
    icon: Hammer,
    title: "تدخل مختص",
    desc: "حل عملي عبر القنوات الرسمية",
    detail: "إحالة الحل للجهة المعنية مع متابعة لحظية لكل خطوة تنفيذية.",
  },
  {
    icon: CheckCircle2,
    title: "إغلاق وتوثيق",
    desc: "إخطار المواطن وحفظ السجل",
    detail: "إغلاق رسمي بإثبات وتوثيق ملف القضية كاملاً للمراجعة المستقبلية.",
  },
];

export function JourneyThread() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapModule.default ?? gsapModule.gsap ?? gsapModule;
      const ScrollTrigger = stModule.ScrollTrigger ?? stModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const track = trackRef.current;
      const path = pathRef.current;
      if (!section || !track || !path) return;

      const totalLen = path.getTotalLength();
      path.style.strokeDasharray = `${totalLen}`;
      path.style.strokeDashoffset = `${totalLen}`;

      const distance = track.scrollWidth - section.clientWidth + 80;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(distance, section.clientHeight)}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                STEPS.length - 1,
                Math.floor(self.progress * STEPS.length),
              );
              setActiveIdx(idx);
            },
          },
        });

        tl.to(track, { x: -distance, ease: "none" }, 0);
        tl.to(
          path,
          { strokeDashoffset: 0, ease: "none" },
          0,
        );
      }, section);

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", refresh);

      cleanup = () => {
        ctx.revert();
        window.removeEventListener("resize", refresh);
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      data-experience-section="journey"
      className="relative bg-gradient-to-b from-stone-50 via-emerald-50/30 to-stone-50 lg:h-screen lg:overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern-light opacity-40 pointer-events-none" />

      <div className="relative h-full lg:flex lg:flex-col">
        <div className="container pt-16 pb-8 lg:pt-12 lg:pb-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-display font-bold text-emerald-700 shadow-soft-sm">
              <GitBranch className="h-3 w-3" />
              قلب المنصة · رحلة الشكوى
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
              من الشكوى إلى الحل
              <TitleAccent variant="emerald">في 7 محطات موثّقة</TitleAccent>
            </h2>
            <p className="mt-3 text-stone-600 leading-relaxed max-w-2xl mx-auto">
              مرّر للأسفل ليتحرّك الخيط الذهبي عبر المراحل — كل محطة تُضاء حين
              تصل إليها شكواك.
            </p>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 items-center relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-mono text-[14rem] font-black text-emerald-900/[0.03] leading-none select-none">
              {String(activeIdx + 1).padStart(2, "0")}
            </span>
          </div>

          <div
            ref={trackRef}
            className="flex items-center gap-12 px-[10vw] will-change-transform"
            style={{ minWidth: "max-content" }}
          >
            <svg
              aria-hidden
              className="absolute top-1/2 right-0 -translate-y-[140px] pointer-events-none thread-glow"
              width="100%"
              height="280"
              viewBox="0 0 2400 280"
              preserveAspectRatio="none"
              style={{ minWidth: "100%" }}
            >
              <defs>
                <linearGradient id="thread-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c9a227" />
                  <stop offset="50%" stopColor="#e8c547" />
                  <stop offset="100%" stopColor="#c9a227" />
                </linearGradient>
              </defs>
              <path
                ref={pathRef}
                d="M 50 140 C 250 60, 450 220, 650 140 S 1050 60, 1250 140 S 1650 220, 1850 140 S 2250 60, 2350 140"
                fill="none"
                stroke="url(#thread-grad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const active = i <= activeIdx;
              return (
                <div
                  key={step.title}
                  className="relative shrink-0 w-[280px] flex flex-col items-center text-center"
                >
                  <div
                    className={`relative w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      active
                        ? "bg-white border-gold-400 shadow-gold-glow scale-110"
                        : "bg-white border-emerald-100 shadow-soft-md"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                        active
                          ? "bg-gradient-to-br from-emerald-700 to-emerald-800 text-white"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div
                      className={`absolute -top-2 -end-2 w-9 h-9 text-sm font-extrabold rounded-full flex items-center justify-center font-display border-2 transition-colors ${
                        active
                          ? "bg-gold-400 text-stone-900 border-white"
                          : "bg-emerald-700 text-white border-white"
                      }`}
                    >
                      {i + 1}
                    </div>
                  </div>

                  <h3
                    className={`mt-5 font-display font-extrabold text-lg transition-colors ${
                      active ? "text-stone-900" : "text-stone-700"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-emerald-700 font-display font-bold">
                    {step.desc}
                  </p>
                  <p
                    className={`mt-3 text-sm leading-relaxed transition-opacity ${
                      active ? "opacity-100 text-stone-600" : "opacity-50 text-stone-500"
                    }`}
                  >
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:hidden container pb-16">
          <ol className="relative pl-0">
            <span className="absolute end-[39px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-200 via-gold-300 to-emerald-200" />
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="flex gap-4 mb-6">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-gold-400 flex items-center justify-center shadow-gold-glow">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-800 text-white flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -end-1 w-7 h-7 bg-gold-400 text-stone-900 text-xs font-extrabold rounded-full flex items-center justify-center font-display border-2 border-white">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-display font-extrabold text-base text-stone-900">
                      {step.title}
                    </h4>
                    <p className="text-xs text-emerald-700 font-display font-bold mt-0.5">
                      {step.desc}
                    </p>
                    <p className="text-sm text-stone-600 leading-relaxed mt-2">
                      {step.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="hidden lg:block container pb-6">
          <div className="flex items-center justify-center gap-2">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i <= activeIdx ? "bg-gold-400 w-10" : "bg-emerald-200 w-5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
