import { useRef, useCallback, useEffect } from "react";

type UseInfiniteScrollOptions = {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  enabled?: boolean;
};

export function useInfiniteScroll({
  isLoading,
  hasMore,
  onLoadMore,
  enabled = true,
}: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null);

  // Stable ref so the observer callback never captures a stale onLoadMore
  // without needing it in the dependency array
  const onLoadMoreRef = useRef(onLoadMore);
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  // Disconnect on unmount
  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!enabled) return;

      observer.current?.disconnect();

      if (!node || isLoading || !hasMore) return;

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) onLoadMoreRef.current();
      });

      observer.current.observe(node);
    },
    [enabled, isLoading, hasMore] // onLoadMore intentionally excluded
  );

  return { lastElementRef };
}
