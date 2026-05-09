"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { STATUS_CONFIG_STATS } from "@/lib/constants/tasks.constants";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes.constants";

const STATUS_COLORS: Record<string, string> = {
  TO_DO: "#C3C6D6",
  IN_PROGRESS: "#0052CC",
  IN_REVIEW: "#0052CC",
  READY_FOR_QA: "#0052CC",
  READY_FOR_PRODUCTION: "#0052CC",
  REOPENED: "#BA1A1A",
  BLOCKED: "#BA1A1A",
  DONE: "#006844",
};

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={700}
    />
  );
};

const CustomLegend = ({
  data,
}: {
  data: { key: string; label: string; value: number; color: string }[];
}) => {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex flex-col justify-center gap-4 px-4 ">
      {data.map((entry) => (
        <div key={entry.key} className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: entry.color }}
              />
              <span className="text-xs text-gray-700 font-medium">
                {entry.label}
              </span>
            </div>
            <span className="text-[13px] font-bold text-gray-900">
              {entry.value}
            </span>
          </div>
          <div className="h-1 rounded-sm bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-sm"
              style={{
                width: `${total > 0 ? (entry.value / total) * 100 : 0}%`,
                background: entry.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function TasksByStatus({
  totals,
  projectId,
  projectName,
}: {
  totals?: Record<string, number>;
  projectId?: string | null;
  projectName?: string | null;
}) {
  const chartData = totals
    ? Object.entries(totals)
        .filter(([, value]) => value > 0)
        .map(([key, value]) => ({
          key,
          label: STATUS_CONFIG_STATS[key]?.label ?? key,
          value,
          color: STATUS_COLORS[key] ?? "#C3C6D6",
        }))
    : [];

  const total = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white border-[1.5px] md:w-1/3 w-full border-blue-100 rounded-2xl md:p-6 shadow-sm inline-flex flex-col">
      <h2 className="font-bold text-lg text-gray-900 mb-5">Tasks by Status</h2>

      <div className="flex items-center">
        <div className="relative">
          {total === 0 ? (
            <div className="w-55 h-55 flex flex-col items-center justify-center gap-2">
              <div className="w-30 h-30 rounded-full border-[3px] border-dashed border-gray-200 flex items-center justify-center">
                <span className="text-3xl">📋</span>
              </div>
              <p className="text-md text-gray-400 font-medium m-0">
                No tasks yet
              </p>
              {projectId && (
                <Link
                  className="font-bold text-slate-dark/50 text-xs "
                  href={ROUTES.tasks.add(projectId)}
                >
                  Start Adding to{" "}
                  <span className="text-slate-dark hover:text-slate-dark/80">
                    {projectName}
                  </span>
                </Link>
              )}
            </div>
          ) : (
            <>
              <PieChart width={220} height={220}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="label"
                  cx={105}
                  cy={105}
                  innerRadius={80}
                  outerRadius={100}
                  labelLine={false}
                  label={renderCustomLabel}
                  strokeWidth={0}
                  stroke="white"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.key} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, name) => [v, name]} />
              </PieChart>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <div className="text-[28px] font-extrabold text-gray-900 leading-none">
                  {total}
                </div>
                <div className="text-[11px] text-gray-500 font-medium tracking-widest mt-0.5">
                  TOTAL
                </div>
              </div>
            </>
          )}
        </div>

        {chartData.length > 0 && <CustomLegend data={chartData} />}
      </div>
    </div>
  );
}
