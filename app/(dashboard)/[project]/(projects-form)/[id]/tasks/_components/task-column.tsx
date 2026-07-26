import Link from "next/link";
import useGetTasks from "../hooks/use-get-tasks";
import { useMemo } from "react";
import PlusIcon from "@/components/icons/plus-icon";
import BoardView from "./board-view";
import { ParamValue } from "next/dist/server/request/params";
import { useInfiniteScroll } from "@/lib/hooks/use-infinite-scroll";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils/tailwind-merge";
import { Task } from "@/lib/types/tasks.type";
import TaskCardBoardViewSkeleton from "@/components/skeletons/task-board-view.skeleton";

const LIMIT = 10;
type Props = {
  status: { label: string; value: string };
  projectId: string | ParamValue;
  dotColor: string;
  search: string;

  setOptimisticMoves?: React.Dispatch<
    React.SetStateAction<
      Map<
        string,
        { taskId: string; task: Task; fromStatus: string; toStatus: string }
      >
    >
  >;
};

export default function TaskColumn({
  status,
  projectId,
  dotColor,
  search,
}: Props) {
  const {
    tasks,
    total,
    isLoading,
    isPending,
    error,
    hasMore,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetTasks({
    limit: LIMIT,
    mode: "infinite",
    params: {
      project_id: `eq.${projectId}`,
      status: `eq.${status.value}`,
      ...(search && { title: `ilike.%${search}%` }),
    },
  });

  const { lastElementRef } = useInfiniteScroll({
    isLoading: isFetchingNextPage ?? false,
    hasMore,
    onLoadMore: () => fetchNextPage?.(),
  });

  const isInitialLoad = isPending && tasks.length === 0;

  const { setNodeRef, isOver } = useDroppable({ id: status.value });

  return (
    <div className="flex-1 min-w-[288px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span className={`size-2 rounded-full shrink-0 ${dotColor}`} />
        <p className="uppercase text-placeholder font-bold text-xs">
          {status.label}
        </p>
        <span className="text-placeholder text-xs font-medium">
          {isInitialLoad ? "…" : total}
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
          "flex flex-col gap-3 rounded-lg transition-colors duration-150",
          "flex-1 min-h-24", // flex-1 makes it grow, remove fixed min-h or keep as fallback
          isOver && "bg-primary/5 ring-2 ring-primary/20"
        )}
      >
        {tasks.length === 0 && !isLoading && !error && (
          <p className="text-placeholder text-xs text-center py-6">No tasks</p>
        )}

        {!isLoading && error && (
          <p className="text-error text-xs text-center py-6">Failed to load</p>
        )}

        {isInitialLoad &&
          Array.from({ length: 3 }).map((_, i) => (
            <TaskCardBoardViewSkeleton key={i} />
          ))}

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

        {isFetchingNextPage && (
          <p className="text-placeholder text-xs text-center py-2">
            Loading more…
          </p>
        )}
      </div>
    </div>
  );
}
