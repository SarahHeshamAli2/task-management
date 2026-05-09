  import Link from "next/link";
import useGetTasks from "../hooks/use-get-tasks";
import { useMemo } from "react";
import PlusIcon from "@/components/icons/plus-icon";
import BoardView from "./board-view";
import { ParamValue } from "next/dist/server/request/params";
import { useInfiniteScroll } from "@/lib/hooks/use-infinite-scroll";

const LIMIT = 10;

type Props = {
  status: { label: string; value: string };
  projectId: string | ParamValue;
  dotColor: string;
  search: string;
};

export default function TaskColumn({
  status,
  projectId,
  dotColor,
  search,
}: Props) {
  // Stable params object — prevents infinite query key churn
  const params = useMemo(
    () => ({
      project_id: `eq.${projectId}`,
      status: `eq.${status.value}`,
      ...(search && { title: `ilike.%${search}%` }),
    }),
    [projectId, status.value, search]
  );

  const {
    tasks,
    total,
    isLoading,
    error,
    hasMore,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetTasks({
    limit: LIMIT,
    params,
    mode: "infinite", // board is always infinite scroll
  });

  const { lastElementRef } = useInfiniteScroll({
    isLoading: isFetchingNextPage ?? false,
    hasMore,
    onLoadMore: () => fetchNextPage?.(),
  });

  const isInitialLoad = isLoading && tasks.length === 0;

  return (
    <div className="flex-1 min-w-[288px]">
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

      <div className="flex flex-col gap-3">
        {isInitialLoad && (
          <p className="text-placeholder text-xs text-center py-6">Loading…</p>
        )}

        {!isLoading && error && (
          <p className="text-error text-xs text-center py-6">Failed to load</p>
        )}

        {!isInitialLoad && !error && tasks.length === 0 && (
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

        {isFetchingNextPage && (
          <p className="text-placeholder text-xs text-center py-2">
            Loading more…
          </p>
        )}
      </div>
    </div>
  );
}
