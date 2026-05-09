import { fetchTasksCount } from "@/lib/actions/stats.actions";
import { TasksCountFilter } from "@/lib/types/stats.types";
import { useQuery } from "@tanstack/react-query";

export default function useGetTasksCount(filters: TasksCountFilter) {
  const { data: tasksCount } = useQuery({
    queryKey: ["taskscount", filters.p_start_date, filters.p_end_date], // flat primitives, not the object
    queryFn: () => fetchTasksCount(filters),
  });

  return { tasksCount };
}
