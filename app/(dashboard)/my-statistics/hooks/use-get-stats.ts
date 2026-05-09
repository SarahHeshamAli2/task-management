import { fetchStats } from "@/lib/actions/stats.actions";
import { StatsFilters } from "@/lib/types/stats.types";
import { useQuery } from "@tanstack/react-query";

export default function useGetStats(filters: StatsFilters) {
  const { data, isLoading } = useQuery({
    queryKey: ["stats", filters],
    queryFn: () => fetchStats(filters),
  });

  return {
    data,
    isLoading,
  };
}
