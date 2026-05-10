"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  casesByType,
  branchPerformance,
  weeklyTrend,
} from "@/data/charts";
import { formatLocaleNumber } from "@/lib/utils";

const tooltipStyle = {
  backgroundColor: "#1c1917",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontFamily: "var(--font-tajawal)",
  fontSize: "12px",
  padding: "8px 12px",
};

export function CasesByTypeChart() {
  return (
    <div className="h-[240px] sm:h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={casesByType}
            cx="50%"
            cy="50%"
            innerRadius="42%"
            outerRadius="78%"
            paddingAngle={3}
            dataKey="value"
          >
            {casesByType.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="white"
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
          <Legend
            iconType="circle"
            wrapperStyle={{
              fontFamily: "var(--font-tajawal)",
              fontSize: "11px",
              paddingTop: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BranchPerformanceChart() {
  return (
    <div className="h-[260px] sm:h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={branchPerformance}
          margin={{ top: 5, right: 5, left: 0, bottom: 30 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e7e5e4"
            vertical={false}
          />
          <XAxis
            dataKey="branch"
            tick={{ fill: "#78716c", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            reversed
            interval={0}
            angle={-25}
            textAnchor="end"
            height={50}
          />
          <YAxis
            tick={{ fill: "#78716c", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            orientation="right"
            width={32}
          />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f5f5f4" }} />
          <Legend
            iconType="circle"
            wrapperStyle={{
              fontFamily: "var(--font-tajawal)",
              fontSize: "11px",
              paddingTop: "4px",
            }}
          />
          <Bar
            dataKey="cases"
            fill="#047857"
            radius={[6, 6, 0, 0]}
            name="القضايا"
          />
          <Bar
            dataKey="closed"
            fill="#c9a227"
            radius={[6, 6, 0, 0]}
            name="مغلقة"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WeeklyTrendChart() {
  return (
    <div className="h-[240px] sm:h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={weeklyTrend}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#047857" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#047857" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c9a227" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#c9a227" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e7e5e4"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fill: "#78716c", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            reversed
          />
          <YAxis
            tick={{ fill: "#78716c", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            orientation="right"
            width={32}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend
            iconType="circle"
            wrapperStyle={{
              fontFamily: "var(--font-tajawal)",
              fontSize: "11px",
              paddingTop: "4px",
            }}
          />
          <Area
            type="monotone"
            dataKey="new"
            stroke="#047857"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorNew)"
            name="جديدة"
          />
          <Area
            type="monotone"
            dataKey="resolved"
            stroke="#c9a227"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorResolved)"
            name="مغلقة"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
