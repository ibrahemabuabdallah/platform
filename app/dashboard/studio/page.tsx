"use client";

import {
  Activity,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Compass,
  Download,
  FileText,
  Layers,
  Radar,
  TrendingUp,
  Waves,
} from "lucide-react";
import { AiSparkleIcon } from "@/components/icons/ai-sparkle-icon";
import { toast } from "sonner";
import { StudioShell } from "@/components/dashboard/studio/studio-shell";
import { StudioPulseSpine } from "@/components/dashboard/studio/studio-pulse-spine";
import { StudioKpiOrbit } from "@/components/dashboard/studio/studio-kpi-orbit";
import { StudioSection } from "@/components/dashboard/studio/studio-section";
import { StudioPanel } from "@/components/dashboard/studio/studio-panel";
import { StudioFilters } from "@/components/dashboard/studio/studio-filters";
import {
  StudioBranchPerformanceChart,
  StudioCasesByTypeChart,
  StudioWeeklyTrendChart,
} from "@/components/dashboard/studio/studio-charts";
import { StudioStream } from "@/components/dashboard/studio/studio-stream";
import { StudioSlaPulse } from "@/components/dashboard/studio/studio-sla-pulse";
import { StudioDuplicates } from "@/components/dashboard/studio/studio-duplicates";
import { StudioHeatmap } from "@/components/dashboard/studio/studio-heatmap";

export default function DashboardStudioPage() {
  return (
    <StudioShell
      badge="استوديو القيادة — تجربة جديدة"
      title="غرفة عمليات صوتك"
      description="مشهد بصري حي يجمع المؤشرات والقضايا والفروع في تجربة واحدة، مع نبض حقيقي لما يحدث في المنصة الآن."
      pulseSlot={<StudioPulseSpine />}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <StudioFilters />
        <button
          type="button"
          onClick={() =>
            toast.success("جاري تحضير التقرير...", {
              description: "سيصلك ملف PDF خلال لحظات",
            })
          }
          className="group inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-2.5 min-h-[40px] text-sm font-display font-semibold text-gold-200 transition-all hover:bg-gold-500/20 hover:border-gold-400/60"
        >
          <Download className="h-4 w-4" />
          تصدير لقطة الاستوديو
        </button>
      </div>

      {/* KPI orbit */}
      <StudioSection
        index={0}
        icon={AiSparkleIcon}
        eyebrow="مؤشرات اللحظة"
        title="نبض الأرقام"
        description="ابحر بمؤشرك على البطاقات لرؤية البريق الديناميكي."
      >
        <StudioKpiOrbit
          nodes={[
            {
              label: "إجمالي القضايا",
              value: 1247,
              icon: FileText,
              hue: "emerald",
              change: 12.4,
              trend: "up",
            },
            {
              label: "قضايا مفتوحة",
              value: 284,
              icon: TrendingUp,
              hue: "amber",
              change: 3.2,
              trend: "up",
            },
            {
              label: "متأخرة عن SLA",
              value: 47,
              icon: AlertTriangle,
              hue: "red",
              change: 8.1,
              trend: "down",
            },
            {
              label: "مغلقة هذا الشهر",
              value: 312,
              icon: CheckCircle2,
              hue: "gold",
              change: 18.6,
              trend: "up",
            },
          ]}
        />
      </StudioSection>

      {/* Charts: Trend (large) + Pie (small) */}
      <StudioSection
        index={1}
        icon={Waves}
        eyebrow="موجة الأسبوع"
        title="حركة الجديد والمغلق"
        description="منحنى الاستقبال مقابل الإغلاق على مدى الأيام السبعة الماضية."
      >
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <StudioPanel
              icon={Activity}
              eyebrow="منحنى أسبوعي"
              title="الجديدة مقابل المُغلقة"
              subtitle="مقارنة يومية"
            >
              <StudioWeeklyTrendChart />
            </StudioPanel>
          </div>
          <div>
            <StudioPanel
              icon={Layers}
              eyebrow="توزيع"
              title="القضايا حسب النوع"
              subtitle="حصص الأنواع الأربعة"
            >
              <StudioCasesByTypeChart />
            </StudioPanel>
          </div>
        </div>
      </StudioSection>

      {/* Branch performance — full width */}
      <StudioSection
        index={2}
        icon={Radar}
        eyebrow="رادار الفروع"
        title="أداء الفروع"
        description="مقارنة عدد القضايا والمُغلقة لكل فرع."
      >
        <StudioPanel
          icon={Building2}
          eyebrow="مقارنة"
          title="الفروع الثمانية"
          subtitle="القضايا المستقبلة مقابل المُغلقة"
        >
          <StudioBranchPerformanceChart />
        </StudioPanel>
      </StudioSection>

      {/* Stream + SLA pulse */}
      <StudioSection
        index={3}
        icon={Activity}
        eyebrow="بث حي"
        title="آخر القضايا والإنذارات"
        description="تدفق محدّث لآخر التحديثات وقضايا متأخرة عن مواعيدها."
      >
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <StudioStream />
          </div>
          <div>
            <StudioSlaPulse />
          </div>
        </div>
      </StudioSection>

      {/* Heatmap + Duplicates */}
      <StudioSection
        index={4}
        icon={Compass}
        eyebrow="رؤية أوسع"
        title="جغرافيا وذكاء"
        description="كثافة المناطق واقتراحات الدمج تلقائياً."
      >
        <div className="grid lg:grid-cols-2 gap-4">
          <StudioHeatmap />
          <StudioDuplicates />
        </div>
      </StudioSection>
    </StudioShell>
  );
}
