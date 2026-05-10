"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/shared/page-header";
import {
  StatusBadge,
  PriorityBadge,
  SLABadge,
  CaseTypeBadge,
} from "@/components/shared/status-badge";
import { cases } from "@/data/cases";
import { branches } from "@/data/branches";
import { coordinators } from "@/data/coordinators";
import {
  STATUS_LABELS,
  PRIORITY_LABELS,
  CASE_TYPE_LABELS,
} from "@/lib/constants";
import { timeAgoAr, cn } from "@/lib/utils";
import type { CaseStatus, Priority, CaseType } from "@/types";

const PAGE_SIZE = 8;

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (
        search &&
        !c.title.includes(search) &&
        !c.ref.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (priorityFilter !== "all" && c.priority !== priorityFilter)
        return false;
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (branchFilter !== "all" && c.branchId !== branchFilter) return false;
      return true;
    });
  }, [search, statusFilter, priorityFilter, typeFilter, branchFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setTypeFilter("all");
    setBranchFilter("all");
    setPage(1);
  };

  return (
    <>
      <PageHeader
        badge="إدارة القضايا"
        title="جميع القضايا والمقترحات"
        description="استعرض وفلتر كل القضايا في المنصة، وانتقل إلى التفاصيل بنقرة."
        actions={
          <Button asChild variant="gold">
            <Link href="/submit">
              <Plus className="h-4 w-4" />
              قضية جديدة
            </Link>
          </Button>
        }
      />

      <div className="container py-6 lg:py-8">
        <Card className="p-4 lg:p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-emerald-700" />
            <h3 className="font-display font-bold text-sm text-stone-900">
              بحث وتصفية
            </h3>
            {(search ||
              statusFilter !== "all" ||
              priorityFilter !== "all" ||
              typeFilter !== "all" ||
              branchFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="ms-auto"
              >
                إعادة تعيين
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="relative md:col-span-2 lg:col-span-1">
              <Search className="absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
              <Input
                placeholder="ابحث بالعنوان أو الرقم"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="ps-10"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الحالات</SelectItem>
                {(Object.keys(STATUS_LABELS) as CaseStatus[]).map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={priorityFilter}
              onValueChange={(v) => {
                setPriorityFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="الأولوية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الأولويات</SelectItem>
                {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
                  <SelectItem key={p} value={p}>
                    {PRIORITY_LABELS[p]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={typeFilter}
              onValueChange={(v) => {
                setTypeFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الأنواع</SelectItem>
                {(Object.keys(CASE_TYPE_LABELS) as CaseType[]).map((t) => (
                  <SelectItem key={t} value={t}>
                    {CASE_TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={branchFilter}
              onValueChange={(v) => {
                setBranchFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="الفرع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الفروع</SelectItem>
                {branches.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-3 text-xs text-stone-500">
            عرض{" "}
            <span className="font-bold text-stone-900">
              {filtered.length}
            </span>{" "}
            قضية من أصل{" "}
            <span className="font-bold text-stone-900">{cases.length}</span>
          </div>
        </Card>

        {/* Desktop table */}
        <Card className="hidden md:block overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الرقم</TableHead>
                <TableHead>العنوان</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الأولوية</TableHead>
                <TableHead>الفرع</TableHead>
                <TableHead>المنسق</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>آخر تحديث</TableHead>
                <TableHead className="w-12 text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-12">
                    <p className="text-sm text-stone-500">
                      لا توجد نتائج مطابقة
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((c) => {
                  const branch = branches.find((b) => b.id === c.branchId);
                  const coord = coordinators.find(
                    (co) => co.id === c.coordinatorId
                  );
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
                      <TableCell className="text-xs text-stone-600">
                        {coord?.name || "—"}
                      </TableCell>
                      <TableCell>
                        <SLABadge sla={c.slaStatus} />
                      </TableCell>
                      <TableCell className="text-xs text-stone-500 whitespace-nowrap">
                        {timeAgoAr(c.updatedAt)}
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/cases/${c.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {paginated.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-stone-100">
                <Search className="h-5 w-5 text-stone-400" />
              </div>
              <p className="font-display font-bold text-sm text-stone-900 mb-1">
                لا توجد نتائج مطابقة
              </p>
              <p className="text-xs text-stone-500 mb-4">
                جرّب تعديل الفلاتر أو البحث بكلمات مختلفة
              </p>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                إعادة تعيين الفلاتر
              </Button>
            </Card>
          ) : (
            paginated.map((c) => {
              const branch = branches.find((b) => b.id === c.branchId);
              return (
                <Card key={c.id} className="p-4">
                  <Link href={`/cases/${c.id}`} className="block">
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
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <StatusBadge status={c.status} />
                      <PriorityBadge priority={c.priority} />
                      <CaseTypeBadge type={c.type} />
                      <SLABadge sla={c.slaStatus} />
                    </div>
                    <p className="text-xs text-stone-500">{branch?.name}</p>
                  </Link>
                </Card>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
            <p className="text-xs text-stone-500 order-2 sm:order-1">
              صفحة <span className="font-bold text-stone-900">{page}</span> من{" "}
              <span className="font-bold text-stone-900">{totalPages}</span>
            </p>
            <div className="flex items-center gap-1.5 order-1 sm:order-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="الصفحة السابقة"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="hidden sm:inline">السابق</span>
              </Button>
              {(() => {
                const pages: (number | "ellipsis")[] = [];
                const window = 1;
                for (let i = 1; i <= totalPages; i++) {
                  if (
                    i === 1 ||
                    i === totalPages ||
                    (i >= page - window && i <= page + window)
                  ) {
                    pages.push(i);
                  } else if (
                    pages[pages.length - 1] !== "ellipsis"
                  ) {
                    pages.push("ellipsis");
                  }
                }
                return pages.map((p, idx) =>
                  p === "ellipsis" ? (
                    <span
                      key={`e-${idx}`}
                      className="px-1 text-stone-400 select-none"
                      aria-hidden
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      aria-label={`الصفحة ${p}`}
                      aria-current={page === p ? "page" : undefined}
                      className={cn(
                        "min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg text-sm font-display font-semibold transition-colors px-2",
                        page === p
                          ? "bg-emerald-700 text-white"
                          : "text-stone-600 hover:bg-stone-100"
                      )}
                    >
                      {p}
                    </button>
                  )
                );
              })()}
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-label="الصفحة التالية"
              >
                <span className="hidden sm:inline">التالي</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
