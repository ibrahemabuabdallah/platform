"use client";

import Link from "next/link";
import { ChevronLeft, MoreHorizontal, Inbox } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  StatusBadge,
  PriorityBadge,
  CaseTypeBadge,
} from "@/components/shared/status-badge";
import { cases as defaultCases } from "@/data/cases";
import { branches } from "@/data/branches";
import { timeAgoAr } from "@/lib/utils";
import type { Case } from "@/types";

interface RecentCasesProps {
  cases?: Case[];
}

export function RecentCases({ cases = defaultCases }: RecentCasesProps) {
  const recent = [...cases]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 8);

  return (
    <Card>
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h3 className="font-display font-bold text-base text-stone-900">
            آخر القضايا
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            آخر 8 قضايا تم تحديثها
          </p>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/cases">
            عرض الكل
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {recent.length === 0 ? (
        <div className="p-10 text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-500">
            <Inbox className="h-5 w-5" />
          </div>
          <p className="font-display font-bold text-sm text-stone-900 mb-1">
            لا توجد قضايا حالياً
          </p>
          <p className="text-xs text-stone-500">
            ستظهر آخر القضايا المُحدّثة هنا
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الرقم</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead>الفرع</TableHead>
                  <TableHead>آخر تحديث</TableHead>
                  <TableHead className="text-center w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((c) => {
                  const branch = branches.find((b) => b.id === c.branchId);
                  return (
                    <TableRow key={c.id}>
                      <TableCell>
                        <Link
                          href={`/cases/${c.id}`}
                          className="font-mono text-xs text-emerald-700 hover:underline"
                        >
                          {c.ref}
                        </Link>
                      </TableCell>
                      <TableCell className="max-w-[280px]">
                        <Link
                          href={`/cases/${c.id}`}
                          className="text-sm font-medium text-stone-900 hover:text-emerald-700 line-clamp-1"
                        >
                          {c.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <CaseTypeBadge type={c.type} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={c.status} />
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={c.priority} />
                      </TableCell>
                      <TableCell className="text-xs text-stone-600">
                        {branch?.name.replace("فرع ", "")}
                      </TableCell>
                      <TableCell className="text-xs text-stone-500 whitespace-nowrap">
                        {timeAgoAr(c.updatedAt)}
                      </TableCell>
                      <TableCell>
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          aria-label="عرض التفاصيل"
                        >
                          <Link href={`/cases/${c.id}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden p-4 space-y-3">
            {recent.map((c) => {
              const branch = branches.find((b) => b.id === c.branchId);
              return (
                <Link
                  key={c.id}
                  href={`/cases/${c.id}`}
                  className="block rounded-xl border border-stone-200 p-4 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-mono text-[11px] text-emerald-700">
                      {c.ref}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {timeAgoAr(c.updatedAt)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-stone-900 mb-2 line-clamp-2">
                    {c.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <StatusBadge status={c.status} />
                    <PriorityBadge priority={c.priority} />
                    <CaseTypeBadge type={c.type} />
                  </div>
                  <p className="text-xs text-stone-500 mt-2">{branch?.name}</p>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
}
