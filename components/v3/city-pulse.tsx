"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  Building2,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { Section } from "./section";
import { formatLocaleNumber } from "@/lib/utils";
import { resolvedCases } from "@/data/resolved-cases";

/* ------------------------------------------------------------------ */
/* عدّادات النبض: مؤشرات حية تُعدّ تصاعدياً عند دخولها الشاشة.        */
/* ------------------------------------------------------------------ */
interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
  hint: string;
}

const STATS: Stat[] = [
  {
    label: "طلب استُلم اليوم",
    value: 128,
    icon: Activity,
    hint: "عبر كل المحافظات",
  },
  {
    label: "نسبة الإنجاز",
    value: 94,
    suffix: "%",
    icon: TrendingUp,
    hint: "خلال آخر 30 يوماً",
  },
  {
    label: "متوسط الاستجابة",
    value: 36,
    suffix: " س",
    icon: Clock,
    hint: "ضمن مهلة SLA المعتمدة",
  },
  {
    label: "منسّق ميداني نشط",
    value: 43,
    icon: Building2,
    hint: "على المستوى الوطني",
  },
];

/* ------------------------------------------------------------------ */
/* خريطة الأردن: نقاط نابضة حسب كثافة البلاغات في كل محافظة.          */
/* ------------------------------------------------------------------ */
interface GovernoratePoint {
  id: string;
  name: string;
  x: number;
  y: number;
  open: number;
  closed: number;
  intensity: number;
}

const POINTS: GovernoratePoint[] = [
  { id: "amman", name: "عمّان", x: 48, y: 38, open: 24, closed: 312, intensity: 1 },
  { id: "irbid", name: "إربد", x: 42, y: 18, open: 14, closed: 198, intensity: 0.85 },
  { id: "zarqa", name: "الزرقاء", x: 56, y: 36, open: 11, closed: 167, intensity: 0.78 },
  { id: "salt", name: "السلط", x: 42, y: 42, open: 6, closed: 88, intensity: 0.55 },
  { id: "madaba", name: "مادبا", x: 44, y: 52, open: 5, closed: 71, intensity: 0.45 },
  { id: "karak", name: "الكرك", x: 36, y: 60, open: 7, closed: 96, intensity: 0.6 },
  { id: "tafila", name: "الطفيلة", x: 32, y: 68, open: 3, closed: 52, intensity: 0.35 },
  { id: "maan", name: "معان", x: 36, y: 78, open: 4, closed: 66, intensity: 0.42 },
  { id: "aqaba", name: "العقبة", x: 30, y: 90, open: 9, closed: 124, intensity: 0.7 },
  { id: "mafraq", name: "المفرق", x: 64, y: 24, open: 5, closed: 78, intensity: 0.48 },
  { id: "jerash", name: "جرش", x: 46, y: 22, open: 4, closed: 64, intensity: 0.4 },
  { id: "ajloun", name: "عجلون", x: 38, y: 22, open: 3, closed: 49, intensity: 0.32 },
];

/**
 * القسم الثالث في v3: «نبض المدينة» — عدّادات حية، خريطة حرارية
 * تفاعلية للمحافظات، وشريط قصص نجاح متحرك. كلها تروي للمواطن أن
 * المنصة تعمل الآن، لا أنها وعد مستقبلي.
 */
export function CityPulse() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.25, once: true });

  return (
    <Section id="v3-section-3" tone="white" aurora="gold">
      <div ref={rootRef}>
        {/* الترويسة */}
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-display font-bold text-emerald-700 shadow-soft-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            بثّ مباشر من الميدان
          </span>
          <h2 className="mt-4 text-balance font-display text-2xl font-extrabold leading-[1.25] tracking-[-0.02em] text-stone-900 sm:text-3xl lg:text-4xl">
            نبض مدينتك،
            <span className="text-gradient-emerald-animated"> لحظة بلحظة.</span>
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-stone-600 lg:text-base">
            هذه ليست شعارات — مؤشرات أداء تتحدّث مع كل دورة معالجة، وقصص
            نجاح موثّقة بأرقام مرجعية يمكنك التحقق منها.
          </p>
        </div>

        {/* العدّادات */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-5 shadow-soft-sm transition-shadow hover:shadow-soft-md"
            >
              <div
                aria-hidden
                className="absolute -top-12 -end-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500 to-gold-500 opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
              />
              <div className="relative">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-emerald-glow">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-3xl font-extrabold text-stone-900 number-mono lg:text-4xl">
                  <CountUp value={stat.value} active={inView} />
                  {stat.suffix && (
                    <span className="text-emerald-700">{stat.suffix}</span>
                  )}
                </div>
                <p className="mt-2 font-display text-sm font-bold text-stone-700">
                  {stat.label}
                </p>
                <p className="mt-1 text-[11px] text-stone-500">{stat.hint}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* الخريطة + قصص النجاح */}
        <div className="mt-10 grid items-stretch gap-6 lg:mt-12 lg:grid-cols-5">
          <HeatMap />
          <ResolvedMarquee />
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* عدّاد تصاعدي بنابض فيزيائي، يحترم prefers-reduced-motion.          */
/* ------------------------------------------------------------------ */
function CountUp({ value, active }: { value: number; active: boolean }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? value : 0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });
  const display = useTransform(spring, (v) =>
    formatLocaleNumber(Math.round(v))
  );
  const [text, setText] = useState(() =>
    formatLocaleNumber(reduce ? value : 0)
  );

  useEffect(() => {
    if (active || reduce) mv.set(value);
  }, [active, reduce, value, mv]);

  useEffect(() => display.on("change", (v) => setText(v)), [display]);

  return <span>{text}</span>;
}

/* ------------------------------------------------------------------ */
/* خريطة حرارية مبسطة: شكل الأردن + نقاط نابضة + لوحة تفاصيل.         */
/* ------------------------------------------------------------------ */
function HeatMap() {
  const [active, setActive] = useState<GovernoratePoint | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="relative rounded-3xl border border-emerald-100 bg-white p-4 shadow-soft-md lg:col-span-3 lg:p-5">
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="inline-flex items-center gap-2 font-display text-sm font-bold text-stone-900">
          <MapPin aria-hidden className="h-4 w-4 text-emerald-700" />
          خريطة التغطية الوطنية
        </p>
        <p className="text-[11px] text-stone-500">مرّر فوق أي محافظة</p>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-2">
        <svg
          viewBox="0 0 100 110"
          className="h-auto w-full"
          role="img"
          aria-label="خريطة الأردن الحرارية لكثافة البلاغات"
        >
          <defs>
            <linearGradient id="v3-map-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="100%" stopColor="#d1fae5" />
            </linearGradient>
            <radialGradient id="v3-pulse-grad">
              <stop offset="0%" stopColor="#e8c547" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
            </radialGradient>
          </defs>

          <path
            d="M 24 14 Q 32 8 42 12 Q 56 8 70 18 Q 80 24 76 34 Q 70 44 60 42 Q 56 50 50 50 Q 46 58 42 60 Q 38 70 38 80 Q 32 92 28 100 Q 26 104 24 100 Q 20 88 22 78 Q 18 68 20 58 Q 16 48 18 38 Q 16 26 24 14 Z"
            fill="url(#v3-map-fill)"
            stroke="#10b981"
            strokeWidth="0.4"
          />

          {POINTS.map((p) => {
            const isActive = active?.id === p.id;
            return (
              <g
                key={p.id}
                onMouseEnter={() => setActive(p)}
                onMouseLeave={() =>
                  setActive((prev) => (prev?.id === p.id ? null : prev))
                }
                onFocus={() => setActive(p)}
                onBlur={() => setActive(null)}
                className="cursor-pointer"
                tabIndex={0}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={1.4 + p.intensity * 1.5}
                  fill="url(#v3-pulse-grad)"
                  opacity={0.7}
                >
                  {!reduce && (
                    <animate
                      attributeName="r"
                      values={`${1 + p.intensity * 1.5};${2.2 + p.intensity * 1.8};${1 + p.intensity * 1.5}`}
                      dur={`${2 + p.intensity}s`}
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 1.4 : 0.9}
                  fill={isActive ? "#c9a227" : "#047857"}
                  stroke="#fff"
                  strokeWidth="0.25"
                  style={{ transition: "all 0.2s" }}
                />
                {isActive && (
                  <text
                    x={p.x}
                    y={p.y - 3}
                    textAnchor="middle"
                    fontSize="2.6"
                    fontWeight="700"
                    fill="#064e3b"
                    style={{ pointerEvents: "none" }}
                  >
                    {p.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* لوحة تفاصيل المحافظة */}
        <motion.div
          key={active?.id ?? "default"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-stone-200/80 bg-stone-50/60 p-5"
        >
          <p className="text-[11px] font-display font-bold text-stone-500">
            محافظة
          </p>
          <h3 className="mt-1 font-display text-xl font-extrabold text-stone-900">
            {active?.name ?? "اختر محافظة"}
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-stone-200 bg-white p-3">
              <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] font-display font-bold text-stone-500">
                <Activity aria-hidden className="h-3 w-3 text-gold-600" />
                مفتوحة
              </p>
              <p className="font-mono text-2xl font-extrabold text-gold-700 number-mono">
                {active ? formatLocaleNumber(active.open) : "—"}
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-3">
              <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] font-display font-bold text-stone-500">
                <CheckCircle2 aria-hidden className="h-3 w-3 text-emerald-600" />
                مغلقة
              </p>
              <p className="font-mono text-2xl font-extrabold text-emerald-700 number-mono">
                {active ? formatLocaleNumber(active.closed) : "—"}
              </p>
            </div>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-stone-500">
            البيانات إرشادية · تتحدّث مع كل دورة معالجة من الفروع المعتمدة.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* شريط قصص النجاح: بطاقات عمودية تنساب بلا توقف، تتوقف عند المرور.   */
/* ------------------------------------------------------------------ */
function ResolvedMarquee() {
  const items = [...resolvedCases, ...resolvedCases];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-soft-md lg:col-span-2">
      <div className="flex items-center justify-between border-b border-stone-100 px-5 py-3.5">
        <p className="inline-flex items-center gap-2 font-display text-sm font-bold text-stone-900">
          <CheckCircle2 aria-hidden className="h-4 w-4 text-emerald-700" />
          أُغلقت مؤخراً
        </p>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
          موثّقة بأرقام مرجعية
        </span>
      </div>

      {/* قناع تلاشي علوي وسفلي */}
      <div className="relative h-[340px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_8%,#000_92%,transparent)]">
        <div className="v3-resolved-scroll flex flex-col gap-3 px-4 py-3 hover:[animation-play-state:paused]">
          {items.map((c, i) => (
            <article
              key={`${c.ref}-${i}`}
              className="rounded-2xl border border-stone-200/70 bg-stone-50/50 p-4 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <div className="flex items-center justify-between gap-2">
                <p
                  dir="ltr"
                  className="font-mono text-[11px] font-bold tracking-wide text-emerald-700"
                >
                  {c.ref}
                </p>
                <span className="text-[10px] text-stone-400">{c.closedAt}</span>
              </div>
              <h4 className="mt-1.5 font-display text-[13px] font-bold leading-snug text-stone-900">
                {c.title}
              </h4>
              <p className="mt-1 text-[11px] text-stone-500">
                {c.district}، {c.governorate} · أُغلقت خلال{" "}
                <span className="number-mono font-semibold text-emerald-700">
                  {c.durationDays}
                </span>{" "}
                يوم
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
