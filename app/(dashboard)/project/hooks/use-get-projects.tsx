import { useEffect, useState, useRef } from "react";
import { projectsList } from "@/lib/types/projects.type";

export default function UseGetProjects({
  limit,
  offset,
  append = false,
}: {
  limit?: number;
  offset?: number;
  append?: boolean;
}) {
  const [projects, setProjects] = useState<projectsList>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const isFirstFetch = useRef(true);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const getAllProjects = async () => {
      if (isFetchingRef.current) return;

      try {
        isFetchingRef.current = true;

        setIsLoading(true);
        setError(false);

        const response = await fetch(
          `/api/projects?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();

        setProjects((prev) =>
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

    getAllProjects();
  }, [limit, offset, append]);

  return { projects, total, isLoading, isInitialLoad, error, hasMore };
}
