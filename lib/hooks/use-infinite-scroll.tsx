import { useRef, useCallback } from "react";

type UseInfiniteScrollOptions = {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  enabled?: boolean; // e.g. pass `isMobile` to disable on desktop
};

export function useInfiniteScroll({
  isLoading,
  hasMore,
  onLoadMore,
  enabled = true,
}: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!enabled) return;
      if (isLoading) return;

      // Disconnect previous observer before attaching a new one
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [enabled, isLoading, hasMore, onLoadMore]
  );

  return { lastElementRef };
}
