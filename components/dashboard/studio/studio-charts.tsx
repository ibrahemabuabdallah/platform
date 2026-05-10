"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  branchPerformance,
  casesByType,
  weeklyTrend,
} from "@/data/charts";
import { formatLocaleNumber } from "@/lib/utils";

const tooltipStyle = {
  backgroundColor: "rgba(10, 10, 9, 0.92)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "12px",
  color: "#fafaf9",
  fontFamily: "var(--font-tajawal)",
  fontSize: "12px",
  padding: "8px 12px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.55)",
};

const axisTick = { fill: "#a8a29e", fontSize: 11 };
const gridStroke = "rgba(255,255,255,0.08)";
const legendStyle = {
  fontFamily: "var(--font-tajawal)",
  fontSize: "12px",
  paddingTop: "8px",
  color: "#d6d3d1",
};

export function StudioCasesByTypeChart() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {casesByType.map((entry, i) => (
              <radialGradient key={i} id={`studio-pie-${i}`} cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                <stop offset="100%" stopColor={entry.color} stopOpacity={0.55} />
              </radialGradient>
            ))}
          </defs>
          <Pie
            data={casesByType}
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={98}
            paddingAngle={4}
            dataKey="value"
          >
            {casesByType.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#studio-pie-${index})`}
                stroke="rgba(10, 10, 9, 0.85)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value: number) => [
              `${formatLocaleNumber(value)} قضية`,
              "",
            ]}
          />
          <Legend iconType="circle" wrapperStyle={legendStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StudioBranchPerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={branchPerformance}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="studio-bar-cases" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#047857" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="studio-bar-closed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde047" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#a8861f" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
          <XAxis
            dataKey="branch"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            reversed
          />
          <YAxis
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            orientation="right"
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          <Legend iconType="circle" wrapperStyle={legendStyle} />
          <Bar
            dataKey="cases"
            fill="url(#studio-bar-cases)"
            radius={[8, 8, 0, 0]}
            name="القضايا"
          />
          <Bar
            dataKey="closed"
            fill="url(#studio-bar-closed)"
            radius={[8, 8, 0, 0]}
            name="مغلقة"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StudioWeeklyTrendChart() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={weeklyTrend}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="studio-area-new" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#047857" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="studio-area-resolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fde047" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#c9a227" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
          <XAxis
            dataKey="day"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            reversed
          />
          <YAxis
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            orientation="right"
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend iconType="circle" wrapperStyle={legendStyle} />
          <Area
            type="monotone"
            dataKey="new"
            stroke="#34d399"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#studio-area-new)"
            name="جديدة"
            activeDot={{ r: 5, fill: "#34d399", stroke: "#0a0a09", strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="resolved"
            stroke="#fde047"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#studio-area-resolved)"
            name="مغلقة"
            activeDot={{ r: 5, fill: "#fde047", stroke: "#0a0a09", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
