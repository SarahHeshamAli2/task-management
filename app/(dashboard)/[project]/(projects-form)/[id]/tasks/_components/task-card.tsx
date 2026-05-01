"use client";

import TaskCheckIcon from "@/components/icons/task-check-icon";
import UnassignedIcon from "@/components/icons/unassigned-icon";
import Avatar from "@/components/shared/avatar";
import { TasksList } from "@/lib/types/tasks.type";
import { formatDate } from "@/lib/utils/format-date";
import { useState } from "react";
import TaskDetailModal from "./task-detail-modal";

type TaskCardProps = {
  task: TasksList[number];
};

export default function TaskCard({ task }: TaskCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setOpen(true);
      }}
      className="flex justify-between border-b py-4 border-slate-light/15"
    >
      <div className="flex items-center gap-4">
        <TaskCheckIcon />
        <div>
          <p className="text-slate-dark font-medium mb-1">{task.title}</p>
          {task.assignee.name ? (
            <>
              {" "}
              <Avatar
                name={task.assignee.name}
                sizeClassName="w-6 h-6 rounded-full"
                textClassName="text-xs"
              />
              <span className="ms-1.5">{task.assignee.name}</span>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <UnassignedIcon />
              <span>Unassigned</span>
            </div>
          )}
        </div>
      </div>
      {task.due_date ? (
        <p>
          Due Date
          <span className="block">{formatDate(task.due_date)}</span>
        </p>
      ) : (
        <span>No Due Date </span>
      )}
      {open && (
        <TaskDetailModal
          isOpen={open}
          onClose={() => setOpen(false)}
          taskId={task.id}
          projectId={task.project_id}
        />
      )}
    </div>
  );
}
