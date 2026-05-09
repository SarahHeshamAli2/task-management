import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { TasksList } from "@/lib/types/tasks.type";

interface TasksPage {
  data: TasksList;
  total: number;
}

async function fetchTasksPage(
  filterParams: Record<string, string>,
  limit: number,
  offset: number,
  signal: AbortSignal
): Promise<TasksPage> {
  const params = new URLSearchParams();
  params.append("limit", String(limit));
  params.append("offset", String(offset));
  Object.entries(filterParams).forEach(([k, v]) => params.append(k, v));

  const res = await fetch(`/api/tasks?${params.toString()}`, { signal });
  if (!res.ok) throw new Error(`Tasks fetch failed: ${res.status}`);
  return res.json();
}

export default function useGetTasks({
  limit = 20,
  offset = 0,
  params: filterParams = {},
  enabled = true,
  mode = "paginated",
}: {
  limit?: number;
  offset?: number;
  params?: Record<string, string>;
  enabled?: boolean;
  mode?: "paginated" | "infinite";
}) {
  const hasFilters = Object.keys(filterParams).length > 0;

  const stableKey = useMemo(
    () => JSON.parse(JSON.stringify(filterParams)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(filterParams)]
  );

  const paginated = useQuery<TasksPage, Error>({
    queryKey: ["tasks", stableKey, { limit, offset }],
    queryFn: ({ signal }) =>
      fetchTasksPage(filterParams, limit, offset, signal),
    enabled: enabled && hasFilters && mode === "paginated",
    placeholderData: (prev) => prev, // keep old page visible while loading next
  });

  const infinite = useInfiniteQuery<TasksPage, Error>({
    queryKey: ["tasks-infinite", stableKey, { limit }],
    queryFn: ({ pageParam = 0, signal }) =>
      fetchTasksPage(filterParams, limit, pageParam as number, signal),
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.reduce((sum, p) => sum + p.data.length, 0);
      return fetched < lastPage.total ? fetched : undefined;
    },
    initialPageParam: 0,
    enabled: enabled && hasFilters && mode === "infinite",
    placeholderData: (prev) => prev,
  });

  if (mode === "infinite") {
    const pages = infinite.data?.pages ?? [];

    const seen = new Set<string>();
    const tasks = pages
      .flatMap((p) => p.data)
      .filter((task) => {
        if (seen.has(task.id)) return false;
        seen.add(task.id);
        return true;
      }) as TasksList;

    return {
      tasks,
      total: pages.at(-1)?.total ?? 0,
      isLoading: infinite.isLoading,
      isFetching: infinite.isFetching,
      error: infinite.isError,
      hasMore: !!infinite.hasNextPage,
      fetchNextPage: infinite.fetchNextPage,
      isFetchingNextPage: infinite.isFetchingNextPage,
    };
  }

  return {
    tasks: (paginated.data?.data ?? []) as TasksList,
    total: paginated.data?.total ?? 0,
    isLoading: paginated.isLoading,
    isFetching: paginated.isFetching,
    error: paginated.isError,
    hasMore: false,
    fetchNextPage: undefined,
    isFetchingNextPage: false,
  };
}
