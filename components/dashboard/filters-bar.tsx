"use client";

import { useCallback, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Filter, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { branches } from "@/data/branches";
import { CASE_TYPE_LABELS, STATUS_LABELS } from "@/lib/constants";
import {
  DASHBOARD_FILTER_DEFAULTS,
  isDefaultFilters,
  readDashboardFilters,
  type DashboardFilters,
} from "@/lib/dashboard-filters";
import type { CaseStatus, CaseType } from "@/types";

export function FiltersBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const filters = readDashboardFilters(
    new URLSearchParams(searchParams.toString())
  );
  const hasActive = !isDefaultFilters(filters);

  const update = useCallback(
    (key: keyof DashboardFilters, value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value === DASHBOARD_FILTER_DEFAULTS[key]) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      startTransition(() => {
        const qs = next.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  const reset = useCallback(() => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [pathname, router]);

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Filter className="h-4 w-4 text-emerald-700" />
        <h3 className="font-display font-bold text-sm text-stone-900">
          تصفية البيانات
        </h3>
        {hasActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            disabled={pending}
            className="ms-auto"
          >
            <X className="h-3.5 w-3.5" />
            إعادة تعيين
          </Button>
        )}
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        aria-busy={pending}
      >
        <Select
          value={filters.branch}
          onValueChange={(v) => update("branch", v)}
        >
          <SelectTrigger aria-label="الفرع">
            <SelectValue placeholder="الفرع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الفروع</SelectItem>
            {branches.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filters.type} onValueChange={(v) => update("type", v)}>
          <SelectTrigger aria-label="النوع">
            <SelectValue placeholder="النوع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأنواع</SelectItem>
            {(Object.keys(CASE_TYPE_LABELS) as CaseType[]).map((t) => (
              <SelectItem key={t} value={t}>
                {CASE_TYPE_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.status}
          onValueChange={(v) => update("status", v)}
        >
          <SelectTrigger aria-label="الحالة">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            {(Object.keys(STATUS_LABELS) as CaseStatus[]).map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.period}
          onValueChange={(v) => update("period", v)}
        >
          <SelectTrigger aria-label="الفترة">
            <SelectValue placeholder="الفترة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">اليوم</SelectItem>
            <SelectItem value="this_week">هذا الأسبوع</SelectItem>
            <SelectItem value="this_month">هذا الشهر</SelectItem>
            <SelectItem value="this_quarter">هذا الربع</SelectItem>
            <SelectItem value="this_year">هذا العام</SelectItem>
            <SelectItem value="all">كل الفترات</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
