import Link from "next/link";
import {
  Building2,
  CalendarClock,
  ChevronLeft,
  Clock,
  FileText,
  Hash,
  User,
} from "lucide-react";
import {
  CaseTypeBadge,
  PriorityBadge,
  SLABadge,
  StatusBadge,
} from "@/components/shared/status-badge";
import { Timeline } from "@/components/shared/timeline";
import { Button } from "@/components/ui/button";
import { formatDateTimeAr } from "@/lib/utils";
import { SHARED_ROUTES } from "@/lib/v2-routes";
import type { AppIcon } from "@/lib/icon-types";
import type { Branch, Case, Coordinator } from "@/types";

interface CaseResultProps {
  caseData: Case;
  branch: Branch | null;
  coordinator: Coordinator | null;
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: AppIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
      <div className="min-w-0">
        <dt className="text-[11px] text-stone-600">{label}</dt>
        <dd className="mt-0.5 text-[13px] font-medium text-stone-900">
          {children}
        </dd>
      </div>
    </div>
  );
}

export function CaseResult({
  caseData,
  branch,
  coordinator,
}: CaseResultProps) {
  return (
    <div className="space-y-5">
      <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft-sm">
        <header className="hero-gradient relative overflow-hidden p-5 text-white">
          <div
            aria-hidden
            className="grid-pattern-dark pointer-events-none absolute inset-0"
          />
          <div className="relative flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-display text-[11px] font-semibold text-emerald-100/80">
                الرقم المرجعي
              </p>
              <p className="number-mono mt-0.5 text-base font-bold tracking-[0.06em] lg:text-lg">
                {caseData.ref}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <CaseTypeBadge type={caseData.type} />
              <PriorityBadge priority={caseData.priority} />
              <SLABadge sla={caseData.slaStatus} />
            </div>
          </div>
          <h2 className="relative mt-3 text-balance font-display text-base font-bold leading-snug lg:text-lg">
            {caseData.title}
          </h2>
        </header>

        <dl className="grid gap-4 p-5 sm:grid-cols-2">
          <Row icon={Hash} label="الحالة الحالية">
            <StatusBadge status={caseData.status} />
          </Row>
          <Row icon={Building2} label="الفرع المسؤول">
            {branch?.name ?? "—"}
          </Row>
          <Row icon={User} label="المنسق">
            {coordinator?.name ?? "لم يُسنَد بعد"}
          </Row>
          <Row icon={Clock} label="آخر تحديث">
            <span className="tabular-nums">
              {formatDateTimeAr(caseData.updatedAt)}
            </span>
          </Row>
          <Row icon={FileText} label="تاريخ التقديم">
            <span className="tabular-nums">
              {formatDateTimeAr(caseData.createdAt)}
            </span>
          </Row>
          <Row icon={CalendarClock} label="الموعد المتوقع">
            <span className="tabular-nums">
              {formatDateTimeAr(caseData.dueAt)}
            </span>
          </Row>
        </dl>
      </article>

      <section className="rounded-2xl border border-border bg-white p-5 shadow-soft-sm lg:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-[0.95rem] font-bold text-stone-900">
              رحلة القضية
            </h3>
            <p className="mt-0.5 text-[11px] text-stone-600">
              {caseData.timeline.length} حدث موثّق — تُعرض آخر خمسة
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={SHARED_ROUTES.caseDetail(caseData.id)}>
              عرض التفاصيل الكاملة
              <ChevronLeft aria-hidden className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Timeline events={caseData.timeline.slice(-5)} />
      </section>
    </div>
  );
}
