import Link from "next/link";
import useGetTasks from "../hooks/use-get-tasks";
import { useState, useCallback, useEffect, useMemo } from "react";
import PlusIcon from "@/components/icons/plus-icon";
import BoardView from "./board-view";
import { ParamValue } from "next/dist/server/request/params";
import { useInfiniteScroll } from "@/lib/hooks/use-infinite-scroll";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils/tailwind-merge";
import { Task } from "@/lib/types/tasks.type";

const LIMIT = 10;

type Props = {
  status: { label: string; value: string };
  projectId: string | ParamValue;
  dotColor: string;
  search: string;
  optimisticMoves: Map<
    string,
    { taskId: string; task: Task; fromStatus: string; toStatus: string }
  >;
  refetchKey: number;
};

export default function TaskColumn({
  status,
  projectId,
  dotColor,
  search,
  optimisticMoves,
  refetchKey,
}: Props) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    setOffset(0);
  }, [search]);

  const {
    tasks: rawTasks,
    total,
    isLoading,
    error,
    hasMore,
  } = useGetTasks({
    limit: LIMIT,
    offset,
    append: true,
    params: {
      project_id: `eq.${projectId}`,
      status: `eq.${status.value}`,
      ...(search && { title: `ilike.%${search}%` }),
    },
    refetchKey: refetchKey,
  });

  const loadMore = useCallback(() => {
    if (isLoading) return;
    setOffset((prev) => prev + LIMIT);
  }, [isLoading]);

  const { lastElementRef } = useInfiniteScroll({
    isLoading,
    hasMore,
    onLoadMore: loadMore,
  });

  const { setNodeRef, isOver } = useDroppable({ id: status.value });

  const tasks = useMemo(() => {
    const movedAwayIds = new Set(
      [...optimisticMoves.values()]
        .filter((m) => m.fromStatus === status.value)
        .map((m) => m.taskId)
    );

    const incomingTasks = [...optimisticMoves.values()]
      .filter((m) => m.toStatus === status.value)
      .map((m) => ({ ...m.task, status: m.toStatus }));

    return [
      ...rawTasks.filter((t) => !movedAwayIds.has(t.id)),
      ...incomingTasks.filter((t) => !rawTasks.find((r) => r.id === t.id)),
    ];
  }, [rawTasks, optimisticMoves, status.value]);

  return (
    <div className="flex-1 min-w-[288px]">
      <div className="flex items-center gap-2 mb-4">
        <span className={`size-2 rounded-full shrink-0 ${dotColor}`} />
        <p className="uppercase text-placeholder font-bold text-xs">
          {status.label}
        </p>
        <span className="text-placeholder text-xs font-medium">
          {isLoading && offset === 0 ? "…" : total}
        </span>
      </div>
      <Link
        href={`/project/${projectId}/tasks/new?status=${status.value}`}
        className="text-xs font-bold text-secondary/60 uppercase flex items-center gap-2 border-dashed border-slate-light/30 p-4 rounded-lg border-2 mb-3"
      >
        <PlusIcon fill="currentColor" /> <span>Add New Task</span>
      </Link>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-col gap-3 min-h-24 rounded-lg transition-colors duration-150",
          isOver && "bg-primary/5 ring-2 ring-primary/20"
        )}
      >
        {isLoading && offset === 0 && (
          <p className="text-placeholder text-xs text-center py-6">Loading…</p>
        )}
        {!isLoading && error && (
          <p className="text-error text-xs text-center py-6">Failed to load</p>
        )}
        {!isLoading && !error && tasks.length === 0 && (
          <p className="text-placeholder text-xs text-center py-6">No tasks</p>
        )}

        {tasks.map((task, i) => {
          const isLast = i === tasks.length - 1;
          return (
            <BoardView
              key={task.id}
              task={task}
              ref={isLast ? lastElementRef : undefined}
            />
          );
        })}

        {isLoading && offset > 0 && (
          <p className="text-placeholder text-xs text-center py-2">
            Loading more…
          </p>
        )}
      </div>
    </div>
  );
}
