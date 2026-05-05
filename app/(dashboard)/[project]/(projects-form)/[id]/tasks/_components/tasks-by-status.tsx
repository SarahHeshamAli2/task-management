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
} from "@dnd-kit/core";
import { useState, useCallback } from "react";
import { Task } from "@/lib/types/tasks.type";
import BoardView from "./board-view";
import { toast } from "sonner";
import { updateTaskAction } from "@/lib/actions/tasks.actions";
import { DragStartEvent } from "@dnd-kit/core";

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
  // const { accessToken } = useSession(); // adjust to however you get the token

  // columnTasks: status -> Task[] (for optimistic UI)
  // We keep a "patch" map to override what columns render
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [optimisticMoves, setOptimisticMoves] = useState<
    Map<
      string,
      { taskId: string; task: Task; fromStatus: string; toStatus: string }
    >
  >(new Map());

  const [refetchKey, setRefetchKey] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, // prevents accidental drags on click
    })
  );

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;
    const task = active.data.current?.task as Task;

    if (!task || task.status === newStatus) return;

    const oldStatus = task.status;

    // Optimistic update: tell columns to treat this task as moved
    setOptimisticMoves((prev) =>
      new Map(prev).set(taskId, {
        taskId,
        task,
        fromStatus: oldStatus,
        toStatus: newStatus,
      })
    );

    try {
      await updateTaskAction(newStatus, taskId);
      setRefetchKey((k) => k + 1);
    } catch {
      // Rollback
      setOptimisticMoves((prev) => {
        const next = new Map(prev);
        next.delete(taskId);
        return next;
      });
      toast.error("Failed to move task. Please try again.");
    }
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e: DragStartEvent) =>
        setDraggedTask(e.active.data.current?.task ?? null)
      }
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-8 overflow-x-auto no-scrollbar mt-6">
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
              optimisticMoves={optimisticMoves}
              refetchKey={refetchKey}
            />
          );
        })}
      </div>

      <DragOverlay>
        {draggedTask ? (
          <div className=" opacity-90 shadow-xl">
            <BoardView task={draggedTask} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
