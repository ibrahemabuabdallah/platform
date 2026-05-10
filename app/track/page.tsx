"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Hash,
  Building2,
  User,
  Clock,
  FileText,
  ChevronLeft,
  AlertCircle,
  CalendarClock,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/page-header";
import {
  StatusBadge,
  PriorityBadge,
  SLABadge,
  CaseTypeBadge,
} from "@/components/shared/status-badge";
import { Timeline } from "@/components/shared/timeline";
import { cases } from "@/data/cases";
import { branches } from "@/data/branches";
import { coordinators } from "@/data/coordinators";
import { formatDateTimeAr } from "@/lib/utils";
import type { Case } from "@/types";

const sampleRefs = ["REF-2026-00482", "REF-2026-00483", "REF-2026-00488"];

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Case | null | "not_found">(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (refValue?: string) => {
    const ref = (refValue ?? query).trim().toUpperCase();
    if (!ref) {
      toast.error("الرجاء إدخال الرقم المرجعي");
      return;
    }
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const found = cases.find((c) => c.ref === ref);
      setResult(found || "not_found");
      setLoading(false);
      if (found) {
        toast.success("تم العثور على القضية");
      }
    }, 600);
  };

  return (
    <>
      <PageHeader
        badge="تتبع طلب"
        title="ابحث عن قضيتك بالرقم المرجعي"
        description="أدخل الرقم المرجعي الذي وصلك عند تقديم الشكوى لمتابعة حالتها لحظياً."
      />

      <div className="container py-8 lg:py-12 max-w-3xl">
        <Card className="p-6 lg:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mb-3">
              <Search className="h-6 w-6" />
            </div>
            <h2 className="font-display font-bold text-xl text-stone-900 mb-1">
              تتبع شكواك في ثوانٍ
            </h2>
            <p className="text-sm text-stone-500">
              أدخل الرقم المرجعي بصيغة REF-YYYY-XXXXX
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Hash className="absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="مثال: REF-2026-00482"
                dir="ltr"
                className="ps-10 h-12 text-center font-mono tracking-wider"
                aria-label="الرقم المرجعي"
              />
            </div>
            <Button
              size="lg"
              onClick={() => handleSearch()}
              disabled={loading}
              className="sm:px-8"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري البحث
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  بحث سريع
                </>
              )}
            </Button>
          </div>

          <div className="mt-5 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-stone-500">جرّب أرقاماً تجريبية:</span>
            {sampleRefs.map((ref) => (
              <button
                key={ref}
                type="button"
                onClick={() => {
                  setQuery(ref);
                  handleSearch(ref);
                }}
                className="inline-flex items-center gap-1 rounded-full bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors px-3 py-1.5 text-xs font-mono min-h-[36px]"
              >
                {ref}
              </button>
            ))}
          </div>
        </Card>

        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading-skeleton"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 space-y-4"
            >
              <Card className="overflow-hidden p-0">
                <div className="bg-emerald-50 p-5">
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-5 w-40 mb-3" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
                <div className="p-5 grid sm:grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Skeleton className="h-4 w-4 mt-0.5" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {result === "not_found" && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <Card className="p-6 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 mb-3">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-stone-900 mb-1">
                  لم نجد قضية بهذا الرقم
                </h3>
                <p className="text-sm text-stone-500 max-w-md mx-auto">
                  تأكد من أنك أدخلت الرقم المرجعي بشكل صحيح. الصيغة الصحيحة هي
                  REF-YYYY-XXXXX
                </p>
              </Card>
            </motion.div>
          )}

          {result && result !== "not_found" && (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 space-y-5"
            >
              <CaseResultCard caseData={result} />

              <Card className="p-6">
                <div className="mb-5 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-display font-bold text-base text-stone-900">
                      رحلة القضية
                    </h3>
                    <p className="text-xs text-stone-500">
                      {result.timeline.length} حدث موثق
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/cases/${result.id}`}>
                      عرض التفاصيل الكاملة
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <Timeline events={result.timeline.slice(-5)} />
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function CaseResultCard({ caseData }: { caseData: Case }) {
  const branch = branches.find((b) => b.id === caseData.branchId);
  const coordinator = coordinators.find(
    (c) => c.id === caseData.coordinatorId
  );

  return (
    <Card className="overflow-hidden p-0">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 p-5 text-white">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <p className="text-[11px] text-emerald-200 font-display font-semibold mb-0.5">
              الرقم المرجعي
            </p>
            <p className="font-mono font-bold text-base lg:text-lg">
              {caseData.ref}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <CaseTypeBadge type={caseData.type} />
            <PriorityBadge priority={caseData.priority} />
            <SLABadge sla={caseData.slaStatus} />
          </div>
        </div>
        <h3 className="font-display font-bold text-base lg:text-lg mt-3 leading-snug">
          {caseData.title}
        </h3>
      </div>

      <div className="p-5 grid sm:grid-cols-2 gap-4">
        <ResultRow
          icon={Hash}
          label="الحالة الحالية"
          value={<StatusBadge status={caseData.status} />}
        />
        <ResultRow
          icon={Building2}
          label="الفرع المسؤول"
          value={branch?.name || "—"}
        />
        <ResultRow
          icon={User}
          label="المنسق"
          value={coordinator?.name || "لم يُسنَد بعد"}
        />
        <ResultRow
          icon={Clock}
          label="آخر تحديث"
          value={formatDateTimeAr(caseData.updatedAt)}
        />
        <ResultRow
          icon={FileText}
          label="تاريخ التقديم"
          value={formatDateTimeAr(caseData.createdAt)}
        />
        <ResultRow
          icon={CalendarClock}
          label="الموعد المتوقع"
          value={formatDateTimeAr(caseData.dueAt)}
        />
      </div>
    </Card>
  );
}

function ResultRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Hash;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="h-4 w-4 text-stone-400 mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] text-stone-500">{label}</p>
        <div className="text-sm font-medium text-stone-900 mt-0.5">
          {value}
        </div>
      </div>
    </div>
  );
}
