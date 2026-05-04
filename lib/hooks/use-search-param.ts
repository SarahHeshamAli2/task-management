import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDebounce } from "./use-debounce";

export function useSearchParam(initialValue = "", delay = 400) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState(initialValue);
  const [mobilePage, setMobilePage] = useState(1);
  const debouncedSearch = useDebounce(searchInput, delay);

  const updateSearchInUrl = useCallback(
    (newSearch: string) => {
      const params = new URLSearchParams(window.location.search);
      if (newSearch) {
        params.set("search", newSearch);
      } else {
        params.delete("search");
      }
      // replace + with %20
      const query = params.toString().replace(/\+/g, "%20");
      router.replace(`${pathname}${query ? `?${query}` : ""}`, {
        scroll: false,
      });
    },
    [router, pathname]
  );

  useEffect(() => {
    setMobilePage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    updateSearchInUrl(debouncedSearch);
  }, [debouncedSearch]);

  return {
    searchInput,
    setSearchInput,
    debouncedSearch,
    mobilePage,
    setMobilePage,
  };
}
