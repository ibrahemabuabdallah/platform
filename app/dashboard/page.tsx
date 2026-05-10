"use client";

import { Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Download,
  Map,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Heatmap } from "@/components/shared/heatmap";
import { FiltersBar } from "@/components/dashboard/filters-bar";
import {
  CasesByTypeChart,
  BranchPerformanceChart,
  WeeklyTrendChart,
} from "@/components/dashboard/charts";
import { RecentCases } from "@/components/dashboard/recent-cases";
import { SLAOverdue } from "@/components/dashboard/sla-overdue";
import { DuplicatesCard } from "@/components/dashboard/duplicates";
import { useDashboardFilters } from "@/lib/dashboard-filters";
import { toast } from "sonner";

function DashboardInner() {
  const { filteredCases } = useDashboardFilters();

  const kpis = useMemo(() => {
    const total = filteredCases.length;
    const closedStatuses = new Set(["resolved", "closed"]);
    const open = filteredCases.filter(
      (c) => !closedStatuses.has(c.status)
    ).length;
    const breached = filteredCases.filter(
      (c) => c.slaStatus === "breached"
    ).length;
    const closed = filteredCases.filter((c) =>
      closedStatuses.has(c.status)
    ).length;
    return { total, open, breached, closed };
  }, [filteredCases]);

  return (
    <>
      <PageHeader
        badge="لوحة قيادة مركزية"
        title="مرحباً بك في لوحة القيادة"
        description="رؤية شاملة لكل القضايا والفروع والأداء التشغيلي في الوقت الفعلي."
        actions={
          <Button
            variant="outline"
            onClick={() =>
              toast.success("جاري تحضير التقرير...", {
                description: "سيصلك ملف PDF خلال لحظات",
              })
            }
          >
            <Download className="h-4 w-4" />
            تصدير تقرير
          </Button>
        }
      />

      <div className="container py-6 lg:py-8">
        <FiltersBar />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="إجمالي القضايا"
            value={kpis.total}
            icon={FileText}
            change={12.4}
            trend="up"
          />
          <StatCard
            label="قضايا مفتوحة"
            value={kpis.open}
            icon={TrendingUp}
            iconColor="text-amber-700"
            iconBg="bg-amber-50"
            change={3.2}
            trend="up"
          />
          <StatCard
            label="متأخرة عن SLA"
            value={kpis.breached}
            icon={AlertTriangle}
            iconColor="text-red-700"
            iconBg="bg-red-50"
            change={8.1}
            trend="down"
          />
          <StatCard
            label="مغلقة"
            value={kpis.closed}
            icon={CheckCircle2}
            iconColor="text-emerald-700"
            iconBg="bg-emerald-50"
            change={18.6}
            trend="up"
          />
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-5 h-full">
              <div className="mb-4">
                <h3 className="font-display font-bold text-base text-stone-900">
                  القضايا حسب النوع
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  توزيع كل أنواع القضايا
                </p>
              </div>
              <CasesByTypeChart />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-5 h-full">
              <div className="mb-4">
                <h3 className="font-display font-bold text-base text-stone-900">
                  الاتجاه الأسبوعي
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  مقارنة بين الجديدة والمغلقة
                </p>
              </div>
              <WeeklyTrendChart />
            </Card>
          </motion.div>
        </div>

        {/* Branch performance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-stone-900">
                  أداء الفروع
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  مقارنة عدد القضايا والمُغلقة لكل فرع
                </p>
              </div>
            </div>
            <BranchPerformanceChart />
          </Card>
        </motion.div>

        {/* Recent + side */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <RecentCases cases={filteredCases} />
          </div>
          <div className="space-y-4">
            <SLAOverdue cases={filteredCases} />
          </div>
        </div>

        {/* Duplicates + Heatmap */}
        <div className="grid lg:grid-cols-2 gap-4">
          <DuplicatesCard cases={filteredCases} />
          <Card className="p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Map className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-stone-900">
                  التوزيع الجغرافي
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  كثافة القضايا حسب المنطقة
                </p>
              </div>
            </div>
            <Heatmap />
          </Card>
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardInner />
    </Suspense>
  );
}
