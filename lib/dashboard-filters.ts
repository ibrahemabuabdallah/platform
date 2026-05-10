"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { cases } from "@/data/cases";
import type { Case, CaseStatus, CaseType } from "@/types";

export type DashboardPeriod =
  | "today"
  | "this_week"
  | "this_month"
  | "this_quarter"
  | "this_year"
  | "all";

export interface DashboardFilters {
  branch: string;
  type: string;
  status: string;
  period: DashboardPeriod;
}

const DEFAULTS: DashboardFilters = {
  branch: "all",
  type: "all",
  status: "all",
  period: "this_week",
};

export function readDashboardFilters(
  params: URLSearchParams
): DashboardFilters {
  return {
    branch: params.get("branch") || DEFAULTS.branch,
    type: params.get("type") || DEFAULTS.type,
    status: params.get("status") || DEFAULTS.status,
    period: (params.get("period") as DashboardPeriod) || DEFAULTS.period,
  };
}

export function isDefaultFilters(filters: DashboardFilters): boolean {
  return (
    filters.branch === DEFAULTS.branch &&
    filters.type === DEFAULTS.type &&
    filters.status === DEFAULTS.status &&
    filters.period === DEFAULTS.period
  );
}

function getPeriodStart(period: DashboardPeriod): Date | null {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  switch (period) {
    case "today":
      return start;
    case "this_week": {
      const day = start.getDay();
      const diff = day === 6 ? 0 : day + 1;
      start.setDate(start.getDate() - diff);
      return start;
    }
    case "this_month":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "this_quarter": {
      const q = Math.floor(now.getMonth() / 3);
      return new Date(now.getFullYear(), q * 3, 1);
    }
    case "this_year":
      return new Date(now.getFullYear(), 0, 1);
    case "all":
    default:
      return null;
  }
}

export function filterCases(
  list: Case[],
  filters: DashboardFilters
): Case[] {
  const periodStart = getPeriodStart(filters.period);
  return list.filter((c) => {
    if (filters.branch !== "all" && c.branchId !== filters.branch) return false;
    if (filters.type !== "all" && c.type !== (filters.type as CaseType))
      return false;
    if (filters.status !== "all" && c.status !== (filters.status as CaseStatus))
      return false;
    if (periodStart) {
      const updated = new Date(c.updatedAt);
      if (updated < periodStart) return false;
    }
    return true;
  });
}

export function useDashboardFilters() {
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => readDashboardFilters(new URLSearchParams(searchParams.toString())),
    [searchParams]
  );
  const filteredCases = useMemo(() => filterCases(cases, filters), [filters]);
  const isDefault = useMemo(() => isDefaultFilters(filters), [filters]);
  return { filters, filteredCases, isDefault };
}

export const DASHBOARD_FILTER_DEFAULTS = DEFAULTS;
