"use client";

import UnassignedIcon from "@/components/icons/unassigned-icon";
import Avatar from "@/components/shared/avatar";
import { formatDate } from "@/lib/utils/format-date";
import { cn } from "@/lib/utils/tailwind-merge";
import useGetTasks from "../hooks/use-get-tasks";
import { useParams, useSearchParams } from "next/navigation";
import { STATUS_CONFIG } from "@/lib/constants/tasks.constants";
import { TaskTableSkeleton } from "@/components/skeletons/tasks-list-table.skeleton";
import { useState } from "react";
import TaskDetailModal from "./task-detail-modal";
import Pagination from "@/app/(dashboard)/[project]/_components/pagination";

export default function ListView() {
  const LIMIT = 5;
  const params = useParams();
  const projectId = params.id;
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const offset = (page - 1) * LIMIT;

  const { tasks, total, isLoading, error } = useGetTasks({
    limit: LIMIT,
    offset,
    params: { project_id: `eq.${projectId}` },
  });
  const totalPages = Math.ceil(total / LIMIT);

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  return (
    <div className="bg-slate-50 rounded-2xl min-h-104 mb-10 md:mb-0">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm ">
        <table className="w-full">
          <thead className="bg-[#E0E8FF4D] border-b border-slate-200 h-13.5">
            <tr>
              {["Task Id", "title", "Status", "Due Date", "Assignee", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-[11px] font-bold tracking-widest text-secondary uppercase"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {isLoading && <TaskTableSkeleton />}

            {!isLoading && error && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-10 text-center text-error text-xs"
                >
                  Failed to load tasks.
                </td>
              </tr>
            )}

            {!isLoading && !error && tasks.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-10 text-center text-placeholder text-xs"
                >
                  No tasks yet.
                </td>
              </tr>
            )}

            {!isLoading &&
              !error &&
              tasks.map((task) => {
                const status =
                  STATUS_CONFIG[task.status?.toUpperCase()] ??
                  STATUS_CONFIG["TO_DO"];

                return (
                  <tr
                    onClick={() => setSelectedTaskId(task.id)}
                    key={task.id}
                    className={cn(
                      "border-b last:border-0 border-slate-100 hover:bg-slate-50 transition-colors"
                    )}
                  >
                    {/* Task ID */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <p className="text-sm text-primary hover:text-primary transition-colors">
                          {task.task_id}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <p className="text-sm text-slate-dark font-medium hover:text-primary transition-colors">
                          {task.title}
                        </p>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-xs text-[11px] font-semibold tracking-wide",
                          status.badge,
                          status.text
                        )}
                      >
                        {status.label.toUpperCase()}
                      </span>
                    </td>

                    {/* Due date */}
                    <td className="px-5 py-4">
                      <span className="text-secondary text-sm flex items-center gap-1.5">
                        {formatDate(task.due_date, true, "en-gb")}
                      </span>
                    </td>

                    {/* Assignee */}
                    <td className="px-5 py-4">
                      {task.assignee?.name ? (
                        <div className="flex items-center gap-2">
                          <Avatar
                            name={task.assignee.name}
                            textClassName="text-xs"
                            sizeClassName="w-7 h-7"
                            className="bg-[#E0E8FF] text-slate-dark"
                          />
                          <span className="text-sm text-slate-600 font-medium">
                            {task.assignee.name}
                          </span>
                        </div>
                      ) : (
                        <span className="flex items-center gap-1 text-[#94A3B8] text-xs">
                          <UnassignedIcon />
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">....</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {selectedTaskId && (
          <TaskDetailModal
            isOpen={!!selectedTaskId}
            onClose={() => setSelectedTaskId(null)}
            taskId={selectedTaskId}
            projectId={projectId as string}
          />
        )}

        <div className="px-5">
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              hasNextPage={page < totalPages}
              totalCount={total}
              perPage={LIMIT}
              label="tasks"
            />
          )}
        </div>
      </div>
    </div>
  );
}
