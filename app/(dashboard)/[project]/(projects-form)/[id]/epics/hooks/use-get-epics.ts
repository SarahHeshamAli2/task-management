import { useEffect, useState, useRef } from "react";
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

  useEffect(() => {
    const getAllEpics = async () => {
      if (isFetchingRef.current) return;

      try {
        isFetchingRef.current = true;

        setIsLoading(true);
        setError(false);

        const response = await fetch(
          `/api/epics/${id}?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();

        setEpics((prev) =>
          // On first fetch (offset === 0), replace. Otherwise append.
          !append || offset === 0 ? data.data : [...prev, ...data.data]
        );

        setTotal(data.total);

        // hasMore is true only if there are still unseen items
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

    getAllEpics();
  }, [limit, offset, append]);

  return { epics, total, isLoading, isInitialLoad, error, hasMore };
}
