import { useEffect, useState, useRef } from "react";
import { TasksList } from "@/lib/types/tasks.type";

export default function useGetTasks({
  limit,
  offset,
  append = false,
  params: filterParams = {},
  enabled = true,
  refetchKey = 0,
}: {
  limit?: number;
  offset?: number;
  append?: boolean;
  id?: string | null;
  params?: Record<string, string>;
  enabled?: boolean;
  refetchKey?: number;
}) {
  const [tasks, setTasks] = useState<TasksList>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const isFirstFetch = useRef(true);

  // Stable string key — only recompute when content changes
  const filterKey = JSON.stringify(filterParams);

  const prevFilterKey = useRef(filterKey);
  const prevRefetchKey = useRef(refetchKey);

  useEffect(() => {
    const parsed = JSON.parse(filterKey) as Record<string, string>;
    const hasFilters = Object.keys(parsed).length > 0;
    if (!enabled || !hasFilters) return;

    const isBackgroundRefetch =
      !isFirstFetch.current &&
      prevRefetchKey.current !== refetchKey &&
      prevFilterKey.current === filterKey;

    prevFilterKey.current = filterKey;
    prevRefetchKey.current = refetchKey;

    const controller = new AbortController();

    const getTasks = async () => {
      try {
        if (!isBackgroundRefetch) {
          setIsLoading(true);
        }
        setError(false);

        const params = new URLSearchParams();
        if (limit !== undefined) params.append("limit", String(limit));
        if (offset !== undefined) params.append("offset", String(offset));
        Object.entries(parsed).forEach(([key, value]) => {
          params.append(key, value);
        });

        const response = await fetch(`/api/tasks?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        // Single state update to avoid cascading re-renders
        setTasks((prev) =>
          !append || offset === 0 ? data.data : [...prev, ...data.data]
        );
        setTotal(data.total);
        setHasMore((offset ?? 0) + data.data.length < data.total);
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return;
        setError(true);
      } finally {
        setIsLoading(false);
        if (isFirstFetch.current) {
          setIsInitialLoad(false);
          isFirstFetch.current = false;
        }
      }
    };

    getTasks();

    return () => controller.abort();
  }, [limit, offset, append, enabled, filterKey, refetchKey]); // ✅ filterKey not filterParams

  return { tasks, total, isLoading, isInitialLoad, error, hasMore };
}
