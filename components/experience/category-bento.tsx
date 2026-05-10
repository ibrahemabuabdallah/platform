"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Droplet,
  Lightbulb,
  TrafficCone,
  Trash2,
  Trees,
  Wrench,
  Building2,
  Wifi,
  Layers,
} from "lucide-react";
import { DepthTilt } from "./depth-tilt";

interface Cat {
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  span: string;
  tone: string;
  iconColor: string;
  border: string;
  art: "drip" | "spark" | "signal" | "grow" | "pulse";
}

const CATS: Cat[] = [
  {
    label: "المياه",
    desc: "كسور · انقطاع · ضعف ضغط",
    icon: Droplet,
    span: "lg:col-span-2 lg:row-span-2",
    tone: "from-blue-50 to-blue-100/40",
    iconColor: "bg-blue-500 text-white",
    border: "border-blue-200",
    art: "drip",
  },
  {
    label: "الكهرباء",
    desc: "أعطال شبكة · إنارة شوارع",
    icon: Lightbulb,
    span: "lg:col-span-2",
    tone: "from-amber-50 to-amber-100/40",
    iconColor: "bg-amber-500 text-white",
    border: "border-amber-200",
    art: "spark",
  },
  {
    label: "الطرق",
    desc: "حفر · إشارات · لافتات",
    icon: TrafficCone,
    span: "lg:col-span-2",
    tone: "from-orange-50 to-orange-100/40",
    iconColor: "bg-orange-500 text-white",
    border: "border-orange-200",
    art: "signal",
  },
  {
    label: "النفايات",
    desc: "حاويات · جمع · فرز",
    icon: Trash2,
    span: "lg:col-span-2",
    tone: "from-stone-50 to-stone-100/40",
    iconColor: "bg-stone-600 text-white",
    border: "border-stone-200",
    art: "pulse",
  },
  {
    label: "البيئة",
    desc: "تلوّث · ضوضاء · مساحات خضراء",
    icon: Trees,
    span: "lg:col-span-2",
    tone: "from-emerald-50 to-emerald-100/40",
    iconColor: "bg-emerald-600 text-white",
    border: "border-emerald-200",
    art: "grow",
  },
  {
    label: "البلديات",
    desc: "تراخيص · خدمات بلدية",
    icon: Building2,
    span: "lg:col-span-2",
    tone: "from-violet-50 to-violet-100/40",
    iconColor: "bg-violet-500 text-white",
    border: "border-violet-200",
    art: "pulse",
  },
  {
    label: "الاتصالات",
    desc: "شبكة · إنترنت · أبراج",
    icon: Wifi,
    span: "lg:col-span-2",
    tone: "from-cyan-50 to-cyan-100/40",
    iconColor: "bg-cyan-500 text-white",
    border: "border-cyan-200",
    art: "signal",
  },
  {
    label: "خدمات أخرى",
    desc: "بنية تحتية متنوّعة",
    icon: Wrench,
    span: "lg:col-span-2",
    tone: "from-rose-50 to-rose-100/40",
    iconColor: "bg-rose-500 text-white",
    border: "border-rose-200",
    art: "spark",
  },
];

export function CategoryBento() {
  return (
    <section
      data-experience-section="categories"
      className="relative bg-stone-50 py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern-light opacity-40 pointer-events-none" />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-display font-bold text-emerald-700 shadow-soft-sm">
            <Layers className="h-3 w-3" />
            تغطي كل ما يهمّ المواطن
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
            8 محاور خدمية
            <br />
            <span className="text-emerald-700">برعاية متخصصين</span>
          </h2>
          <p className="mt-3 text-stone-600 leading-relaxed">
            كل محور يديره فريق مختص وتسانده لجنة فنية لضمان الحلّ الصحيح.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-[160px] lg:auto-rows-[140px]">
          {CATS.map((c, i) => (
            <DepthTilt
              key={c.label}
              max={6}
              glare={false}
              className={`rounded-3xl ${c.span}`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`group relative h-full overflow-hidden rounded-3xl border ${c.border} bg-gradient-to-br ${c.tone} p-5 shadow-soft-sm hover:shadow-soft-md transition-shadow`}
              >
                <Art kind={c.art} />

                <div className="relative h-full flex flex-col justify-between">
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.iconColor} shadow-soft-sm group-hover:scale-110 transition-transform`}
                  >
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-base text-stone-900">
                      {c.label}
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5 leading-snug">
                      {c.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </DepthTilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function Art({ kind }: { kind: Cat["art"] }) {
  const reduce = useReducedMotion();
  const dur = reduce ? 0 : undefined;

  if (kind === "drip") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 100 60"
        className="absolute -bottom-2 -left-2 w-32 h-20 opacity-30"
      >
        <path
          d="M 8 6 Q 20 0 32 6"
          stroke="#3b82f6"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        {[14, 22, 30].map((x, i) => (
          <circle key={x} cx={x} cy="14" r="1.6" fill="#3b82f6">
            {!reduce && (
              <animate
                attributeName="cy"
                values="14;55;14"
                dur={`${2.4 + i * 0.4}s`}
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            )}
            {!reduce && (
              <animate
                attributeName="opacity"
                values="0.9;0;0"
                dur={`${2.4 + i * 0.4}s`}
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </svg>
    );
  }

  if (kind === "spark") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 100 60"
        className="absolute -top-2 -right-2 w-28 h-16 opacity-30"
      >
        <path
          d="M 10 10 L 30 30 L 22 30 L 40 50"
          stroke="#f59e0b"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="60"
          style={{ strokeDashoffset: dur === 0 ? 0 : 60 }}
        >
          {!reduce && (
            <animate
              attributeName="stroke-dashoffset"
              values="60;0;0;60"
              dur="2.6s"
              repeatCount="indefinite"
            />
          )}
        </path>
        <circle cx="40" cy="50" r="2" fill="#f59e0b">
          {!reduce && (
            <animate
              attributeName="r"
              values="0;3;0"
              dur="2.6s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </svg>
    );
  }

  if (kind === "signal") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 60 60"
        className="absolute -bottom-3 -right-3 w-24 h-24 opacity-25"
      >
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="30"
            cy="40"
            r={6 + i * 8}
            fill="none"
            stroke="#f97316"
            strokeWidth="1.2"
            opacity={0.7 - i * 0.2}
          >
            {!reduce && (
              <animate
                attributeName="opacity"
                values={`${0.8 - i * 0.2};0;${0.8 - i * 0.2}`}
                dur={`${2 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
        <circle cx="30" cy="40" r="2.5" fill="#f97316" />
      </svg>
    );
  }

  if (kind === "grow") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 60 60"
        className="absolute -bottom-2 -left-2 w-24 h-24 opacity-25"
      >
        <path
          d="M 30 55 L 30 25"
          stroke="#10b981"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 30 30 Q 22 22 18 26 M 30 36 Q 38 28 42 32"
          stroke="#10b981"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        >
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="-2 30 35"
              to="2 30 35"
              dur="2.4s"
              repeatCount="indefinite"
              additive="sum"
            />
          )}
        </path>
      </svg>
    );
  }

  return (
    <span
      aria-hidden
      className="absolute -top-2 -left-2 w-20 h-20 rounded-full bg-current opacity-10 blur-xl"
    />
  );
}
