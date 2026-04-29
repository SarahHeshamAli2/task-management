"use client";

import CalendarIcon from "@/components/icons/calendar-icon";
import UnassignedIcon from "@/components/icons/unassigned-icon";
import Avatar from "@/components/shared/avatar";

import { Task } from "@/lib/types/tasks.type";
import { formatDate } from "@/lib/utils/format-date";
import { cn } from "@/lib/utils/tailwind-merge";
import { Ref } from "react";

type ProjectCardProps = {
  ref?: Ref<HTMLDivElement>;
  task: Task;
};

export default function BoardView({ ref, task }: ProjectCardProps) {
  const { title, due_date, assignee } = task;

  return (
    <div ref={ref}>
      <div
        className={cn(
          "bg-white p-4 rounded-lg min-h-25 min-w-[288px]",
          task.status === "BLOCKED" && "bg-[#FFDAD633] border border-error/10"
        )}
      >
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-slate-dark font-medium text-sm">{title}</h1>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#94A3B8] font-medium text-sm flex items-center gap-1.5">
            <CalendarIcon />
            {formatDate(due_date, false)}
          </span>
          {assignee.name ? (
            <Avatar
              name={assignee.name}
              textClassName="text-xs"
              sizeClassName="w-6 h-6"
              className="bg-[#E0E8FF] text-slate-dark"
            />
          ) : (
            <span className="flex items-center gap-1 text-[#94A3B8] text-xs">
              <UnassignedIcon />
              Unassigned
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
