"use client";

import { motion } from "framer-motion";
import {
  FileText,
  UserCheck,
  Phone,
  CalendarClock,
  MapPin,
  StickyNote,
  RefreshCw,
  TrendingUp,
  GitMerge,
  Hammer,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { timeAgoAr, formatDateTimeAr } from "@/lib/utils";
import type { TimelineEvent, TimelineEventType } from "@/types";
import type { AppIcon } from "@/lib/icon-types";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";

const eventIcons: Record<TimelineEventType, AppIcon> = {
  submitted: FileText,
  classified: AiSparkleIcon,
  assigned: UserCheck,
  contacted: Phone,
  scheduled: CalendarClock,
  field_visit: MapPin,
  note_added: StickyNote,
  status_changed: RefreshCw,
  escalated: TrendingUp,
  merged: GitMerge,
  intervention: Hammer,
  resolved: CheckCircle2,
  closed: XCircle,
};

const eventColors: Record<
  TimelineEventType,
  { bg: string; text: string; border: string }
> = {
  submitted: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  classified: {
    bg: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-200",
  },
  assigned: {
    bg: "bg-cyan-100",
    text: "text-cyan-700",
    border: "border-cyan-200",
  },
  contacted: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    border: "border-indigo-200",
  },
  scheduled: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  field_visit: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  note_added: {
    bg: "bg-stone-100",
    text: "text-stone-700",
    border: "border-stone-200",
  },
  status_changed: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  escalated: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
  },
  merged: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  intervention: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  resolved: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    border: "border-emerald-300",
  },
  closed: {
    bg: "bg-stone-200",
    text: "text-stone-700",
    border: "border-stone-300",
  },
};

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute end-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-emerald-200 via-emerald-100 to-transparent" />

      <ul className="space-y-5">
        {events.map((event, idx) => {
          const Icon = eventIcons[event.type];
          const colors = eventColors[event.type];
          const isLast = idx === events.length - 1;

          return (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative flex gap-4"
            >
              <div
                className={cn(
                  "shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl border z-10 bg-white",
                  colors.bg,
                  colors.border,
                  isLast &&
                    "ring-2 ring-emerald-500/30 ring-offset-2 ring-offset-background"
                )}
              >
                <Icon className={cn("h-5 w-5", colors.text)} />
              </div>
              <div className="flex-1 min-w-0 pb-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <h4 className="font-display font-bold text-sm text-stone-900">
                    {event.title}
                  </h4>
                  <span className="text-[11px] text-stone-400">
                    · {timeAgoAr(event.timestamp)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-600 leading-relaxed">
                  {event.description}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-stone-500">
                  <span className="inline-flex items-center gap-1">
                    <span className="font-medium">{event.actor}</span>
                    <span className="text-stone-300">·</span>
                    <span>{event.actorRole}</span>
                  </span>
                  <span className="text-stone-400">
                    {formatDateTimeAr(event.timestamp)}
                  </span>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
