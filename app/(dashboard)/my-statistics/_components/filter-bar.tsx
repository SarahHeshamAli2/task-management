"use client";

import { STATUS_VALUES } from "@/lib/constants/tasks.constants";
import UseGetAllProjects from "@/lib/hooks/use-get-all-projects";
import { project } from "@/lib/types/projects.type";
import { useMemo, useState } from "react";
import useGetStats from "../hooks/use-get-stats";
import StatsCard from "./stats-cards";
import CalendarGrid from "./calendar-grid";
import WeekRangePicker from "./week-picker";
import TasksCountCard from "./tasks-count-card";
import TasksPieChart from "./pie-chart";
import StatisticsSkeleton from "./stats-skeleton";
import { addDays, getSunday } from "@/lib/utils/format-date";

const toDateString = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
export default function FilterBar() {
  const { allProjects } = UseGetAllProjects();
  const [startDate, setStartDate] = useState<Date>(() => getSunday(new Date()));
  const [endDate, setEndDate] = useState<Date>(() =>
    addDays(getSunday(new Date()), 6)
  );
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const filters = useMemo(
    () => ({
      p_start_date: toDateString(startDate),
      p_end_date: toDateString(endDate),
      p_project_id: projectId,
      p_status: status,
    }),
    [startDate, endDate, projectId, status]
  );

  const { data: stats, isLoading } = useGetStats(filters);

  if (isLoading) {
    return <StatisticsSkeleton />;
  }
  return (
    <>
      <div className="md:bg-surface-low py-6 md:px-4">
        {/* Mobile layout */}
        <div className="flex flex-col gap-3 sm:hidden">
          {/* Row 1: Project select full width */}
          <select
            className="w-full p-2 outline-0 md:bg-white bg-surface-low rounded-lg"
            value={projectId ?? ""}
            onChange={(e) => {
              const selected = allProjects?.data?.find(
                (p: project) => p.id === e.target.value
              );
              setProjectId(e.target.value || null);
              setProjectName(selected?.name ?? null);
            }}
          >
            <option value="">All Active Projects</option>
            {allProjects?.data?.map((project: project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          {/* Row 2: Status + WeekRangePicker side by side */}
          <div className="flex items-center gap-3">
            <select
              className="flex-1 p-2 outline-0 md:bg-white bg-surface-low rounded-lg"
              value={status ?? ""}
              onChange={(e) => setStatus(e.target.value || null)}
            >
              <option value="">All Status</option>
              {STATUS_VALUES?.map((s) => (
                <option key={s.label} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <div className="flex-1 bg-white rounded-lg">
              <WeekRangePicker
                start={startDate}
                end={endDate}
                onChange={(start, end) => {
                  setStartDate(start);
                  setEndDate(end);
                }}
              />
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden sm:flex items-center justify-between">
          <WeekRangePicker
            start={startDate}
            end={endDate}
            onChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />

          <div className="flex gap-4">
            <select
              className="min-w-51 p-2 outline-0 bg-white"
              value={projectId ?? ""}
              onChange={(e) => {
                const selected = allProjects?.data?.find(
                  (p: project) => p.id === e.target.value
                );
                setProjectId(e.target.value || null);
                setProjectName(selected?.name ?? null);
              }}
            >
              <option value="">All Projects</option>
              {allProjects?.data?.map((project: project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            <select
              className="min-w-34 p-2 outline-0 bg-white"
              value={status ?? ""}
              onChange={(e) => setStatus(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              {STATUS_VALUES?.map((s) => (
                <option key={s.label} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <StatsCard
        completedTasks={stats?.done_tasks}
        overDueTasks={stats?.overdue_tasks}
        totalTasks={stats?.total_tasks}
      />
      <CalendarGrid daily={stats?.daily} />
      <div className="flex items-center justify-between md:flex-row flex-col gap-4">
        <TasksPieChart
          totals={stats?.totals}
          projectId={projectId}
          projectName={projectName}
        />
        <TasksCountCard
          p_end_date={toDateString(endDate)}
          p_start_date={toDateString(startDate)}
        />{" "}
      </div>
    </>
  );
}
