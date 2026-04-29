"use client";

import { STATUS_VALUES } from "@/lib/constants/tasks.constants";
import TaskColumn from "./task-column";
import { useParams } from "next/navigation";

const STATUS_DOT_COLORS: Record<string, string> = {
  blocked: "bg-error",
  in_progress: "bg-primary",
  to_do: "bg-[#94A3B8]",
  done: "bg-green-500",
  review: "bg-purple-400",
};

export default function TaskListBoardView() {
  const params = useParams();
  const projectId = params.id;
  return (
    <>
      <div className="flex gap-8 overflow-x-auto no-scrollbar mt-6">
        {STATUS_VALUES.map((status) => {
          const dotColor =
            STATUS_DOT_COLORS[status.value.toLocaleLowerCase()] ??
            "bg-gray-400";

          return (
            <TaskColumn
              key={status.value}
              status={status}
              projectId={projectId}
              dotColor={dotColor}
            />
          );
        })}
      </div>
    </>
  );
}
