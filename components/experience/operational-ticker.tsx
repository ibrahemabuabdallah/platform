"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Hammer,
  MapPin,
  Plus,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";

type EventKind = "new" | "classify" | "field" | "fix" | "close" | "track";

interface TickEvent {
  id: number;
  kind: EventKind;
  ref: string;
  city: string;
}

const CITIES = [
  "عمّان",
  "إربد",
  "العقبة",
  "الزرقاء",
  "الكرك",
  "السلط",
  "المفرق",
  "جرش",
  "مادبا",
  "الطفيلة",
  "معان",
  "عجلون",
];

const KIND_META: Record<
  EventKind,
  { label: string; icon: React.ComponentType<{ className?: string }>; tone: string }
> = {
  new: {
    label: "شكوى جديدة",
    icon: Plus,
    tone: "text-blue-300 bg-blue-400/10 border-blue-400/30",
  },
  classify: {
    label: "تصنيف ذكي",
    icon: AiSparkleIcon,
    tone: "text-violet-300 bg-violet-400/10 border-violet-400/30",
  },
  track: {
    label: "قيد المتابعة",
    icon: Clock,
    tone: "text-amber-300 bg-amber-400/10 border-amber-400/30",
  },
  field: {
    label: "نزول ميداني",
    icon: MapPin,
    tone: "text-orange-300 bg-orange-400/10 border-orange-400/30",
  },
  fix: {
    label: "تدخل مختص",
    icon: Hammer,
    tone: "text-gold-300 bg-gold-400/10 border-gold-400/30",
  },
  close: {
    label: "أُغلقت",
    icon: CheckCircle2,
    tone: "text-emerald-300 bg-emerald-400/10 border-emerald-400/30",
  },
};

const KINDS: EventKind[] = ["new", "classify", "track", "field", "fix", "close"];

function makeEvent(seed: number): TickEvent {
  return {
    id: seed,
    kind: KINDS[seed % KINDS.length],
    ref: String(1000 + ((seed * 37) % 9000)),
    city: CITIES[seed % CITIES.length],
  };
}

export function OperationalTicker() {
  const reduce = useReducedMotion();
  const [events, setEvents] = useState<TickEvent[]>(() =>
    Array.from({ length: 5 }, (_, i) => makeEvent(i + 7)),
  );

  useEffect(() => {
    if (reduce) return;
    let seed = 12;
    const interval = setInterval(() => {
      seed += 1;
      setEvents((prev) => {
        const next = [makeEvent(seed), ...prev];
        return next.slice(0, 5);
      });
    }, 2400);
    return () => clearInterval(interval);
  }, [reduce]);

  return (
    <div className="absolute top-0 bottom-0 left-2 sm:left-4 z-10 hidden md:flex flex-col items-start justify-center pointer-events-none">
      <div className="relative w-[260px] py-6">
        <div className="absolute -right-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-400/40 to-transparent" />
        <div className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_12px_rgba(232,197,71,0.8)] animate-pulse" />

        <div className="mb-3 flex items-center gap-2 text-[10px] font-display font-bold tracking-widest uppercase text-gold-300/80">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span>بثّ مباشر · غرفة العمليات</span>
        </div>

        <ul className="space-y-2">
          <AnimatePresence initial={false}>
            {events.map((e, idx) => {
              const meta = KINDS_META(e.kind);
              const Icon = meta.icon;
              return (
                <motion.li
                  key={e.id}
                  layout
                  initial={{ opacity: 0, x: -16, scale: 0.96 }}
                  animate={{
                    opacity: idx === 0 ? 1 : 0.85 - idx * 0.16,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, x: 16, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 240, damping: 28 }}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 backdrop-blur-sm text-[11px] font-display ${meta.tone}`}
                >
                  <Icon className="h-3 w-3 shrink-0" />
                  <span className="font-bold">{meta.label}</span>
                  <span className="text-white/30">·</span>
                  <span className="font-mono text-white/70" dir="ltr">
                    #{e.ref}
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/70">{e.city}</span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

function KINDS_META(kind: EventKind) {
  return KIND_META[kind];
}
