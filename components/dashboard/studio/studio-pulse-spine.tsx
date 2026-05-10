"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Gavel,
  MapPin,
  Radio,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Tone = "emerald" | "amber" | "violet" | "cyan" | "gold";

interface PulseEvent {
  icon: LucideIcon;
  label: string;
  meta?: string;
  tone: Tone;
}

const events: PulseEvent[] = [
  { icon: FileText, label: "REF-2026-00498 — تسرب مياه", meta: "عمان الأول", tone: "cyan" },
  { icon: CheckCircle2, label: "إغلاق REF-2026-00472", meta: "خدمية", tone: "emerald" },
  { icon: AlertTriangle, label: "تنبيه SLA — فرع المفرق", meta: "حرجة", tone: "amber" },
  { icon: Gavel, label: "إحالة للجنة القانونية", meta: "REF-2026-00481", tone: "violet" },
  { icon: FileText, label: "REF-2026-00499 — مقترح", meta: "إربد", tone: "cyan" },
  { icon: MapPin, label: "نزول ميداني — الزرقاء", meta: "فريق ب", tone: "gold" },
  { icon: Zap, label: "تصنيف ذكي ×12", meta: "آخر دقيقة", tone: "emerald" },
  { icon: CheckCircle2, label: "إغلاق REF-2026-00489", meta: "قانونية", tone: "emerald" },
];

const toneClasses: Record<Tone, { ring: string; text: string; meta: string; icon: string }> = {
  emerald: {
    ring: "border-emerald-400/30 bg-emerald-500/10",
    text: "text-emerald-200",
    meta: "text-emerald-300/60",
    icon: "text-emerald-300",
  },
  amber: {
    ring: "border-amber-400/30 bg-amber-500/10",
    text: "text-amber-200",
    meta: "text-amber-300/60",
    icon: "text-amber-300",
  },
  violet: {
    ring: "border-violet-400/30 bg-violet-500/10",
    text: "text-violet-200",
    meta: "text-violet-300/60",
    icon: "text-violet-300",
  },
  cyan: {
    ring: "border-cyan-400/30 bg-cyan-500/10",
    text: "text-cyan-200",
    meta: "text-cyan-300/60",
    icon: "text-cyan-300",
  },
  gold: {
    ring: "border-gold-400/30 bg-gold-500/10",
    text: "text-gold-200",
    meta: "text-gold-300/60",
    icon: "text-gold-300",
  },
};

function Pill({ event }: { event: PulseEvent }) {
  const Icon = event.icon;
  const tone = toneClasses[event.tone];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-display font-semibold ${tone.ring}`}
    >
      <Icon className={`h-3 w-3 ${tone.icon}`} />
      <span className={tone.text}>{event.label}</span>
      {event.meta && <span className={`text-[10px] ${tone.meta}`}>· {event.meta}</span>}
    </span>
  );
}

export function StudioPulseSpine() {
  const reduced = useReducedMotion();
  const stream = [...events, ...events];

  return (
    <div className="relative rounded-2xl border border-emerald-400/20 bg-emerald-950/40 backdrop-blur-md overflow-hidden shadow-[0_0_60px_-20px_rgba(16,185,129,0.45)]">
      <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-emerald-400/10">
        <div className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15 border border-emerald-400/30">
          <Activity className="h-3 w-3 text-emerald-300" />
        </div>
        <span className="text-[11px] font-display font-bold text-emerald-100 tracking-wider">
          نبض المنصة
        </span>
        <span className="text-[10px] text-emerald-300/60 font-display">
          آخر 60 ثانية
        </span>
        <span className="ms-auto inline-flex items-center gap-1.5 text-[10px] text-emerald-200/70 font-display font-semibold">
          <Radio className="h-3 w-3 text-emerald-300 animate-pulse-dot" />
          مباشر
        </span>
      </div>

      <div
        className="relative h-12 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        {!reduced ? (
          <motion.div
            className="absolute inset-y-0 flex items-center gap-3 px-4 will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          >
            {stream.map((event, i) => (
              <Pill key={`${event.label}-${i}`} event={event} />
            ))}
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex items-center gap-3 px-4 overflow-x-auto scrollbar-thin">
            {events.map((event, i) => (
              <Pill key={`${event.label}-${i}`} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
