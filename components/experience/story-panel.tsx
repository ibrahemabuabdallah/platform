"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Megaphone,
  ShieldCheck,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { TitleAccent } from "@/components/shared/title-accent";

const STATEMENTS = [
  {
    icon: Megaphone,
    word: "صوتك يصل",
    detail:
      "كل شكوى تُسجَّل تصل مباشرة إلى المنسّق المختص، بدون وسطاء وبدون انتظار.",
  },
  {
    icon: ShieldCheck,
    word: "بياناتك محمية",
    detail:
      "تشفير end-to-end، تقديم مجهول مدعوم، ولا يطّلع على هويتك إلا من له صلاحية رسمية.",
  },
  {
    icon: Eye,
    word: "متابعة شفافة",
    detail:
      "كل خطوة موثّقة برقم مرجعي وحالة محدّثة لحظياً — تتبع شكواك مثل تتبّع شحنة.",
  },
  {
    icon: CheckCircle2,
    word: "إغلاق موثّق",
    detail:
      "لا تُغلق القضية إلا بإثبات رسمي وإخطار للمواطن — كل القرارات قابلة للمراجعة.",
  },
];

export function StoryPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      data-experience-section="story"
      className="relative bg-stone-50 py-20 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern-light opacity-50 pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-32 right-1/2 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.4), transparent 70%)",
        }}
      />

      <div className="container relative" ref={ref}>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-display font-bold text-emerald-700 shadow-soft-sm">
                <AiSparkleIcon className="h-3 w-3" />
                ما الذي يميّز صوتك؟
              </span>

              <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
                منصة رسمية
                <br />
                <TitleAccent variant="emerald">صُمّمت للمواطن</TitleAccent>
              </h2>

              <p className="mt-4 text-stone-600 leading-relaxed">
                لسنا مجرد نموذج إلكتروني — نحن سلسلة عمليات مترابطة من لحظة
                التسجيل حتى التوثيق النهائي للحلّ.
              </p>

              <div className="mt-8 rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40 p-5 shadow-soft-md">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                    <AiSparkleIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-stone-900">
                      أربع ضمانات أساسية
                    </p>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      مرّر للأسفل لتعرّف بنفسك على الالتزامات الواضحة التي
                      تقدّمها المنصة لكل مواطن.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-12 lg:space-y-24">
              {STATEMENTS.map((s, i) => (
                <Statement
                  key={s.word}
                  index={i}
                  total={STATEMENTS.length}
                  scrollYProgress={scrollYProgress}
                  Icon={s.icon}
                  word={s.word}
                  detail={s.detail}
                  reduce={!!reduce}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatementProps {
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  Icon: React.ComponentType<{ className?: string }>;
  word: string;
  detail: string;
  reduce: boolean;
}

function Statement({
  index,
  total,
  scrollYProgress,
  Icon,
  word,
  detail,
  reduce,
}: StatementProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), start + 0.08, end - 0.05, end + 0.05],
    [0.25, 1, 1, 0.25],
  );
  const x = useTransform(
    scrollYProgress,
    [start, start + 0.1],
    [reduce ? 0 : 30, 0],
  );

  return (
    <motion.li
      style={reduce ? undefined : { opacity, x }}
      className="relative"
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <span className="font-mono text-5xl lg:text-6xl font-extrabold text-emerald-100 leading-none">
            0{index + 1}
          </span>
        </div>
        <div className="flex-1 pt-2">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-emerald-glow">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-stone-900">
              {word}
            </h3>
          </div>
          <p className="text-stone-600 leading-relaxed text-base lg:text-lg max-w-xl">
            {detail}
          </p>
        </div>
      </div>
    </motion.li>
  );
}
