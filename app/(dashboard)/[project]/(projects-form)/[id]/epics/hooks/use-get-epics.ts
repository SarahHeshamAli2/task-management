import { useEffect, useState, useRef, useCallback } from "react";
import { EpicList } from "@/lib/types/epic.types";

export default function useGetEpics({
  limit,
  offset,
  append = false,
  id,
}: {
  limit?: number;
  offset?: number;
  append?: boolean;
  id: string;
}) {
  const [epics, setEpics] = useState<EpicList>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const isFirstFetch = useRef(true);
  const isFetchingRef = useRef(false);

  // Reset initial load state when project changes
  useEffect(() => {
    isFirstFetch.current = true;
    setIsInitialLoad(true);
    setEpics([]);
    setTotal(0);
    setHasMore(false);
    setError(false);
  }, [id]);

  const getAllEpics = useCallback(async () => {
    if (isFetchingRef.current) return;

    // // Abort any in-flight request
    // abortControllerRef.current?.abort();
    // abortControllerRef.current = new AbortController();

    try {
      isFetchingRef.current = true;
      setIsLoading(true);
      setError(false);

      const response = await fetch(
        `/api/epics/${id}?limit=${limit}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const incoming: EpicList = data.data ?? [];

      setEpics((prev) =>
        !append || offset === 0 ? incoming : [...prev, ...incoming]
      );
      setTotal(data.total ?? 0);
      setHasMore((offset ?? 0) + incoming.length < (data.total ?? 0));
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(true);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
      if (isFirstFetch.current) {
        setIsInitialLoad(false);
        isFirstFetch.current = false;
      }
    }
  }, [id, limit, offset, append]);

  useEffect(() => {
    getAllEpics();
  }, [getAllEpics]);

  // Patch a single epic in local state without refetching
  const updateEpic = useCallback(
    (epicId: string, patch: Partial<EpicList[0]>) => {
      setEpics((prev) =>
        prev.map((epic) => (epic.id === epicId ? { ...epic, ...patch } : epic))
      );
    },
    []
  );

  // Add a newly created epic to the top of the list without refetching
  const addEpic = useCallback((epic: EpicList[0]) => {
    setEpics((prev) => [epic, ...prev]);
    setTotal((t) => t + 1);
  }, []);

  return {
    epics,
    total,
    isLoading,
    isInitialLoad,
    error,
    hasMore,
    refetch: getAllEpics,
    updateEpic,
    addEpic,
  };
}
