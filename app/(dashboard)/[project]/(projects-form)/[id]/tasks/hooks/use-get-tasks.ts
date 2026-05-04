import { useEffect, useState, useRef } from "react";
import { TasksList } from "@/lib/types/tasks.type";

export default function useGetTasks({
  limit,
  offset,
  append = false,
  params: filterParams = {},
  enabled = true,
}: {
  limit?: number;
  offset?: number;
  append?: boolean;
  id?: string | null;
  params?: Record<string, string>;

  enabled?: boolean;
}) {
  const [tasks, setTasks] = useState<TasksList>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const isFirstFetch = useRef(true);
  useEffect(() => {
    const hasFilters = Object.keys(filterParams).length > 0;
    if (!enabled || !hasFilters) return;

    const controller = new AbortController(); // 👈

    const getTasks = async () => {
      try {
        setIsLoading(true);
        setError(false);
        if (offset === 0) setTasks([]);

        const params = new URLSearchParams();
        if (limit !== undefined) params.append("limit", String(limit));
        if (offset !== undefined) params.append("offset", String(offset));
        Object.entries(filterParams).forEach(([key, value]) => {
          params.append(key, value);
        });

        const response = await fetch(`/api/tasks?${params.toString()}`, {
          signal: controller.signal, // 👈
        });
        const data = await response.json();

        setTasks((prev) =>
          !append || offset === 0 ? data.data : [...prev, ...data.data]
        );
        setTotal(data.total);
        setHasMore((offset ?? 0) + data.data.length < data.total);
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return; // 👈 ignore cancelled fetches
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

    return () => controller.abort(); // 👈 cancel on re-fetch
  }, [limit, offset, append, enabled, JSON.stringify(filterParams)]);

  return { tasks, total, isLoading, isInitialLoad, error, hasMore };
}
