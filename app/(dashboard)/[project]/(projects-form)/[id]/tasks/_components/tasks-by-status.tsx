"use client";

import { STATUS_VALUES } from "@/lib/constants/tasks.constants";
import TaskColumn from "./task-column";
import { useParams } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import { useState, useCallback } from "react";
import { Task } from "@/lib/types/tasks.type";
import BoardView from "./board-view";
import { toast } from "sonner";
import { updateTaskAction } from "@/lib/actions/tasks.actions";
import { DragStartEvent } from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";

const STATUS_DOT_COLORS: Record<string, string> = {
  blocked: "bg-error",
  in_progress: "bg-primary",
  to_do: "bg-[#94A3B8]",
  done: "bg-green-500",
  review: "bg-purple-400",
};

export default function TaskListBoardView({ search }: { search: string }) {
  const params = useParams();
  const projectId = params.id;

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const queryClient = useQueryClient();

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setDraggedTask(null);
      if (!over) return;

      const taskId = active.id as string;
      const newStatus = over.id as string;
      const task = active.data.current?.task as Task;

      if (!task || task.status === newStatus) return;

      const previousData = queryClient.getQueriesData({ queryKey: ["tasks"] });

      queryClient.setQueriesData({ queryKey: ["tasks"] }, (old: any) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((t: Task) =>
              t.id === taskId ? { ...t, status: newStatus } : t
            ),
          })),
        };
      });

      try {
        const result = await updateTaskAction(taskId, { status: newStatus });
        if (!result.success) throw new Error(result.error);
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      } catch {
        previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
        toast.error("Failed to move task. Please try again.");
      }
    },
    [queryClient]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );
  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e: DragStartEvent) =>
        setDraggedTask(e.active.data.current?.task ?? null)
      }
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-8 overflow-x-auto overflow-y-hidden items-stretch mt-6 h-full">
        {STATUS_VALUES.map((status) => {
          const dotColor =
            STATUS_DOT_COLORS[status.value.toLocaleLowerCase()] ??
            "bg-gray-400";

          return (
            <TaskColumn
              search={search}
              key={status.value}
              status={status}
              projectId={projectId}
              dotColor={dotColor}
            />
          );
        })}
      </div>

      <DragOverlay>
        {draggedTask ? (
          <div className="opacity-95 shadow-xl w-[288px] rotate-1">
            {" "}
            <BoardView task={draggedTask} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
