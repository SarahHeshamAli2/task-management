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
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const hasFilters = Object.keys(filterParams).length > 0;
    if (!enabled || !hasFilters) return;

    const getTasks = async () => {
      if (isFetchingRef.current) return;

      try {
        isFetchingRef.current = true;
        setIsLoading(true);
        setError(false);

        const params = new URLSearchParams();
        if (limit !== undefined) params.append("limit", String(limit));
        if (offset !== undefined) params.append("offset", String(offset));
        Object.entries(filterParams).forEach(([key, value]) => {
          params.append(key, value);
        });

        const response = await fetch(`/api/tasks?${params.toString()}`);
        const data = await response.json();

        setTasks((prev) =>
          !append || offset === 0 ? data.data : [...prev, ...data.data]
        );
        setTotal(data.total);
        setHasMore((offset ?? 0) + data.data.length < data.total);
      } catch (err) {
        setError(true);
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
        if (isFirstFetch.current) {
          setIsInitialLoad(false);
          isFirstFetch.current = false;
        }
      }
    };

    getTasks();
  }, [limit, offset, append, enabled, JSON.stringify(filterParams)]);

  return { tasks, total, isLoading, isInitialLoad, error, hasMore };
}
