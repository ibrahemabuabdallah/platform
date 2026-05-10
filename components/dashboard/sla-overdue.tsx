"use client";

import Link from "next/link";
import { AlertTriangle, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  StatusBadge,
  PriorityBadge,
} from "@/components/shared/status-badge";
import { cases as defaultCases } from "@/data/cases";
import { branches } from "@/data/branches";
import { timeAgoAr } from "@/lib/utils";
import type { Case } from "@/types";

interface SLAOverdueProps {
  cases?: Case[];
}

export function SLAOverdue({ cases = defaultCases }: SLAOverdueProps) {
  const overdue = cases.filter((c) => c.slaStatus === "breached").slice(0, 5);

  return (
    <Card>
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-stone-900">
              متأخرة عن SLA
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {overdue.length} قضية تجاوزت موعد الاستحقاق
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-stone-100">
        {overdue.length === 0 ? (
          <div className="p-6 text-center text-sm text-stone-500">
            لا توجد قضايا متأخرة حالياً 
          </div>
        ) : (
          overdue.map((c) => {
            const branch = branches.find((b) => b.id === c.branchId);
            return (
              <Link
                key={c.id}
                href={`/cases/${c.id}`}
                className="flex items-start gap-3 p-4 hover:bg-red-50/30 transition-colors group"
              >
                <div className="shrink-0 inline-flex h-2 w-2 rounded-full bg-red-500 mt-2 animate-pulse-dot" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap mb-1">
                    <span className="font-mono text-[11px] text-red-700 font-semibold">
                      {c.ref}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      تأخر {timeAgoAr(c.dueAt).replace("منذ", "بـ")}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-stone-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {c.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <StatusBadge status={c.status} />
                    <PriorityBadge priority={c.priority} />
                    <span className="text-[11px] text-stone-500">
                      · {branch?.name.replace("فرع ", "")}
                    </span>
                  </div>
                </div>
                <ChevronLeft className="h-4 w-4 text-stone-400 mt-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })
        )}
      </div>

      <div className="p-3 border-t border-border bg-stone-50/40">
        <Button asChild variant="ghost" size="sm" className="w-full">
          <Link href="/cases?filter=breached">
            عرض جميع المتأخرات
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
