"use client";

import {
  FileBarChart,
  Download,
  TrendingUp,
  Building2,
  Users,
  Lightbulb,
  Target,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import {
  BranchPerformanceChart,
  CasesByTypeChart,
  WeeklyTrendChart,
} from "@/components/dashboard/charts";
import {
  branchPerformance,
  coordinatorPerformance,
  operationalRecommendations,
} from "@/data/charts";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        badge="التقارير والتحليلات"
        title="تقارير الأداء التشغيلي"
        description="رؤى عميقة على أداء الفروع والمنسقين، مع توصيات تشغيلية قابلة للتنفيذ."
        actions={
          <Button
            variant="gold"
            onClick={() =>
              toast.success("جاري تحضير التقرير...", {
                description: "سيتم تنزيل ملف PDF خلال لحظات",
              })
            }
          >
            <Download className="h-4 w-4" />
            تصدير PDF
          </Button>
        }
      />

      <div className="container py-6 lg:py-8">
        <Tabs defaultValue="weekly">
          <div className="mb-6 -mx-4 sm:mx-0 overflow-x-auto scrollbar-thin">
            <TabsList className="inline-flex w-max sm:w-auto px-4 sm:px-1">
              <TabsTrigger value="weekly">أسبوعي</TabsTrigger>
              <TabsTrigger value="monthly">شهري</TabsTrigger>
              <TabsTrigger value="quarterly">ربع سنوي</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="weekly" className="space-y-6">
            <ReportContent period="هذا الأسبوع" />
          </TabsContent>
          <TabsContent value="monthly" className="space-y-6">
            <ReportContent period="هذا الشهر" />
          </TabsContent>
          <TabsContent value="quarterly" className="space-y-6">
            <ReportContent period="هذا الربع" />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function ReportContent({ period }: { period: string }) {
  return (
    <>
      <div>
        <h2 className="font-display font-bold text-lg text-stone-900 mb-1">
          مؤشرات الأداء الرئيسية ({period})
        </h2>
        <p className="text-sm text-stone-500 mb-4">
          ستة مؤشرات حيوية لقياس صحة المنظومة
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <StatCard
            label="إجمالي القضايا"
            value={245}
            icon={FileBarChart}
            change={12.4}
            trend="up"
          />
          <StatCard
            label="معدل الإغلاق"
            value={89}
            suffix="%"
            icon={CheckCircle2}
            iconColor="text-emerald-700"
            iconBg="bg-emerald-50"
            change={3.2}
            trend="up"
          />
          <StatCard
            label="متوسط زمن الحل"
            value={2.3}
            suffix="يوم"
            decimals={1}
            icon={Clock}
            iconColor="text-violet-700"
            iconBg="bg-violet-50"
            change={5.8}
            trend="down"
          />
          <StatCard
            label="رضا المواطنين"
            value={94}
            suffix="%"
            icon={Target}
            iconColor="text-gold-700"
            iconBg="bg-gold-50"
            change={1.2}
            trend="up"
          />
          <StatCard
            label="نزولات ميدانية"
            value={87}
            icon={TrendingUp}
            iconColor="text-blue-700"
            iconBg="bg-blue-50"
            change={15.3}
            trend="up"
          />
          <StatCard
            label="سرعة الاستجابة"
            value={4.2}
            suffix="ساعة"
            decimals={1}
            icon={Zap}
            iconColor="text-amber-700"
            iconBg="bg-amber-50"
            change={8.1}
            trend="down"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4">
            <h3 className="font-display font-bold text-base text-stone-900">
              اتجاه القضايا
            </h3>
            <p className="text-xs text-stone-500">جديدة مقابل المُغلقة</p>
          </div>
          <WeeklyTrendChart />
        </Card>
        <Card className="p-5">
          <div className="mb-4">
            <h3 className="font-display font-bold text-base text-stone-900">
              أكثر الأنواع
            </h3>
            <p className="text-xs text-stone-500">توزيع القضايا</p>
          </div>
          <CasesByTypeChart />
        </Card>
      </div>

      {/* Branch Performance */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-stone-900">
                أداء الفروع
              </h3>
              <p className="text-xs text-stone-500">
                مقارنة الفروع في معدلات الإغلاق و SLA
              </p>
            </div>
          </div>
        </div>
        <BranchPerformanceChart />
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {branchPerformance.slice(0, 4).map((b) => (
            <div
              key={b.branch}
              className="rounded-xl border border-stone-200 bg-white p-3"
            >
              <p className="text-xs font-display font-bold text-stone-900">
                {b.branch}
              </p>
              <div className="flex items-center justify-between mt-2 mb-1">
                <span className="text-[11px] text-stone-500">SLA</span>
                <span
                  className={cn(
                    "text-xs font-bold font-display",
                    b.sla >= 90 && "text-emerald-700",
                    b.sla >= 80 && b.sla < 90 && "text-amber-700",
                    b.sla < 80 && "text-red-700"
                  )}
                >
                  {b.sla}%
                </span>
              </div>
              <Progress value={b.sla} />
            </div>
          ))}
        </div>
      </Card>

      {/* Coordinator Performance */}
      <Card className="p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-stone-900">
              أداء المنسقين
            </h3>
            <p className="text-xs text-stone-500">ترتيب حسب القضايا المغلقة</p>
          </div>
        </div>
        <ul className="space-y-2.5">
          {coordinatorPerformance.map((c, i) => (
            <li
              key={c.name}
              className="flex items-center gap-3 rounded-xl border border-stone-200 p-3 bg-white"
            >
              <div
                className={cn(
                  "shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg font-display font-extrabold text-sm",
                  i === 0 && "bg-gold-100 text-gold-700",
                  i === 1 && "bg-stone-200 text-stone-700",
                  i === 2 && "bg-amber-100 text-amber-700",
                  i > 2 && "bg-stone-100 text-stone-600"
                )}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-display font-bold text-stone-900 truncate">
                  {c.name}
                </p>
                <p className="text-[11px] text-stone-500 truncate">
                  {c.branch}
                </p>
                <p className="sm:hidden text-[11px] text-emerald-700 font-display font-semibold mt-0.5">
                  {c.closed} قضية مغلقة
                </p>
              </div>
              <div className="text-center hidden sm:block">
                <p className="text-base font-display font-extrabold text-emerald-700">
                  {c.closed}
                </p>
                <p className="text-[10px] text-stone-400">قضية مغلقة</p>
              </div>
              <div className="text-center shrink-0">
                <p className="text-base font-display font-extrabold text-gold-700">
                  {c.rating}
                </p>
                <p className="text-[10px] text-stone-400">تقييم</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Recommendations */}
      <Card className="p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-stone-900">
              توصيات تشغيلية
            </h3>
            <p className="text-xs text-stone-500">
              مقترحات تحسين مبنية على البيانات
            </p>
          </div>
        </div>
        <ul className="space-y-3">
          {operationalRecommendations.map((rec) => (
            <li
              key={rec.id}
              className="rounded-xl border border-stone-200 p-4 bg-white hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                <h4 className="font-display font-bold text-sm text-stone-900">
                  {rec.title}
                </h4>
                <Badge
                  variant={
                    rec.priority === "high"
                      ? "destructive"
                      : rec.priority === "medium"
                      ? "gold"
                      : "secondary"
                  }
                >
                  {rec.priority === "high" && "أولوية عالية"}
                  {rec.priority === "medium" && "أولوية متوسطة"}
                  {rec.priority === "low" && "أولوية منخفضة"}
                </Badge>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed mb-2">
                {rec.description}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-display font-semibold bg-emerald-50 rounded-lg px-2 py-1 inline-flex">
                <TrendingUp className="h-3 w-3" />
                <span>الأثر المتوقع: {rec.impact}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
