import { cn } from "@/lib/utils";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  SLA_LABELS,
  SLA_COLORS,
  CASE_TYPE_LABELS,
  CASE_TYPE_COLORS,
} from "@/lib/constants";
import type { CaseStatus, Priority, SLAStatus, CaseType } from "@/types";

interface StatusBadgeProps {
  status: CaseStatus;
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({
  status,
  className,
  showDot = true,
}: StatusBadgeProps) {
  const colors = STATUS_COLORS[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold font-display",
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            colors.dot,
            status === "in_progress" || status === "field_visit"
              ? "animate-pulse-dot"
              : ""
          )}
        />
      )}
      {STATUS_LABELS[status]}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const colors = PRIORITY_COLORS[priority];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold font-display",
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  );
}

interface SLABadgeProps {
  sla: SLAStatus;
  className?: string;
}

export function SLABadge({ sla, className }: SLABadgeProps) {
  const colors = SLA_COLORS[sla];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold font-display",
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      {SLA_LABELS[sla]}
    </span>
  );
}

interface CaseTypeBadgeProps {
  type: CaseType;
  className?: string;
}

export function CaseTypeBadge({ type, className }: CaseTypeBadgeProps) {
  const colors = CASE_TYPE_COLORS[type];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold font-display",
        colors.bg,
        colors.text,
        className
      )}
    >
      {CASE_TYPE_LABELS[type]}
    </span>
  );
}
