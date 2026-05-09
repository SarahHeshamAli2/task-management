import NoTasksIcon from "@/components/icons/no-tasks-icon";
import { STATUS_CONFIG_STATS } from "@/lib/constants/tasks.constants";
import { formatCalendarDay, isToday } from "@/lib/utils/format-date";
import { cn } from "@/lib/utils/tailwind-merge";
import React from "react";

type DailyTasks = {
  day: string;
  statuses: {
    status: string;
  };
};
type CalendarGridProps = {
  daily: DailyTasks[];
};
export default function CalendarGrid({ daily }: CalendarGridProps) {
  return (
    <>
      <div className="flex flex-col gap-2 sm:hidden">
        {daily?.map((day) => {
          const { weekday, day: dayNum } = formatCalendarDay(day.day);
          const today = isToday(day.day);
          const statusEntries = Object.entries(day.statuses);

          return (
            <div
              key={day.day}
              className={cn(
                "flex items-center justify-between bg-surface-low rounded-lg shadow-sm px-4 py-3 relative",
                today && "border-l-4 border-primary bg-white"
              )}
            >
              <div className="flex flex-col w-12 border-e  border-slate-light/30">
                <p
                  className={cn(
                    "text-xs font-bold uppercase",
                    today ? "text-primary" : "text-slate-dark/40"
                  )}
                >
                  {weekday}
                </p>
                <p className="text-slate-dark font-bold text-lg leading-tight">
                  {dayNum}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap  flex-1 ml-4">
                {statusEntries.length === 0 ? (
                  <span className="text-xs text-slate-dark/40">No tasks</span>
                ) : (
                  statusEntries.map(([status, count]) => {
                    const config = STATUS_CONFIG_STATS[status];
                    return (
                      <span
                        key={status}
                        className={cn(
                          "rounded px-2 py-1 text-xs font-bold",
                          config?.badge ?? "bg-gray-100",
                          config?.text ?? "text-gray-600"
                        )}
                      >
                        {count}
                      </span>
                    );
                  })
                )}
              </div>

              {/* Today pill */}
              {today && (
                <span className="ml-3 text-xs font-bold bg-primary text-white rounded-full px-3 py-1 shrink-0">
                  TODAY
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden sm:flex justify-between items-stretch">
        {daily?.map((day) => {
          const { weekday, day: dayNum, month } = formatCalendarDay(day.day);
          const today = isToday(day.day);

          return (
            <div
              key={day.day}
              className={cn(
                "flex flex-col min-h-105 min-w-31 p-4 relative bg-white rounded-lg shadow-sm",
                today && "border-3 border-primary"
              )}
            >
              {today && (
                <span className="text-xs font-bold bg-primary text-white rounded-xl px-2 py-0.5 text-center -top-3 -translate-x-1/2 inset-s-1/2 absolute">
                  Today
                </span>
              )}
              <div className="mb-4">
                <p
                  className={cn(
                    today
                      ? "text-primary font-bold text-xs uppercase"
                      : "text-slate-dark/40 font-bold text-xs uppercase"
                  )}
                >
                  {weekday}
                </p>
                <p className="text-slate-dark font-bold text-lg mt-1">
                  {dayNum} {month}
                </p>
              </div>
              {Object.keys(day.statuses).length === 0 ? (
                <div className="m-auto flex flex-col items-center text-[#b4bbc5] gap-2">
                  <NoTasksIcon />
                  <p className="text-slate-dark/40 text-sm">No Task</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {Object.entries(day.statuses).map(([status, count]) => {
                    const config = STATUS_CONFIG_STATS[status];
                    return (
                      <div
                        key={status}
                        className={cn(
                          "flex items-center justify-between rounded-xs p-2 text-xs font-bold",
                          config?.badge ?? "bg-gray-100",
                          config?.text ?? "text-gray-600"
                        )}
                      >
                        <span>{config?.label ?? status}</span>
                        <span className="text-slate-dark">{count}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
