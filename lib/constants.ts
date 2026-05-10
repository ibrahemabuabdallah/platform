import type { CaseStatus, Priority, SLAStatus, CaseType } from "@/types";

export const STATUS_LABELS: Record<CaseStatus, string> = {
  new: "جديدة",
  classifying: "قيد التصنيف",
  assigned: "موزّعة",
  in_progress: "قيد المتابعة",
  field_visit: "نزول ميداني",
  intervention: "قيد التدخل",
  resolved: "تم الحل",
  closed: "مُغلقة",
  escalated: "مُصعَّدة",
};

export const STATUS_COLORS: Record<
  CaseStatus,
  { bg: string; text: string; border: string; dot: string }
> = {
  new: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  classifying: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    dot: "bg-violet-500",
  },
  assigned: {
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
    dot: "bg-cyan-500",
  },
  in_progress: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  field_visit: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },
  intervention: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    dot: "bg-indigo-500",
  },
  resolved: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  closed: {
    bg: "bg-stone-100",
    text: "text-stone-700",
    border: "border-stone-200",
    dot: "bg-stone-500",
  },
  escalated: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  critical: "حرجة",
  high: "عالية",
  medium: "متوسطة",
  low: "منخفضة",
};

export const PRIORITY_COLORS: Record<
  Priority,
  { bg: string; text: string; border: string }
> = {
  critical: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-300",
  },
  high: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-300",
  },
  medium: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  low: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
  },
};

export const SLA_LABELS: Record<SLAStatus, string> = {
  on_track: "ضمن الزمن",
  at_risk: "وشيك التأخر",
  breached: "متأخر",
};

export const SLA_COLORS: Record<
  SLAStatus,
  { bg: string; text: string; border: string }
> = {
  on_track: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  at_risk: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  breached: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
};

export const CASE_TYPE_LABELS: Record<CaseType, string> = {
  service: "خدمية",
  legal: "قانونية",
  political: "سياسية",
  suggestion: "اقتراح",
};

export const CASE_TYPE_COLORS: Record<
  CaseType,
  { bg: string; text: string; iconBg: string; iconText: string }
> = {
  service: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-700",
  },
  legal: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    iconBg: "bg-blue-100",
    iconText: "text-blue-700",
  },
  political: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    iconBg: "bg-violet-100",
    iconText: "text-violet-700",
  },
  suggestion: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    iconBg: "bg-amber-100",
    iconText: "text-amber-700",
  },
};

export const SLA_HOURS: Record<Priority, number> = {
  critical: 4,
  high: 24,
  medium: 72,
  low: 120,
};

export const PLATFORM_NAME = "صوتك";
export const PLATFORM_TAGLINE = "منصة خدمة المواطن";
export const PLATFORM_FULL_NAME = "صوتك — منصة خدمة المواطن";
