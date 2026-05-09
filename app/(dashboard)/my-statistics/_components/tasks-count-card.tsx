import { TasksCountFilter, TasksStas } from "@/lib/types/stats.types";
import useGetTasksCount from "../hooks/use-get-tasks-count";
import EmptyTasksState from "./empty-tasks-count-state";

export default function TasksCountCard(filters: TasksCountFilter) {
  const { tasksCount } = useGetTasksCount(filters);
  const isEmpty = !tasksCount || tasksCount.length === 0;

  if (isEmpty) {
    return <EmptyTasksState />;
  }
  return (
    <div className="bg-white md:w-1/3 w-full min-h-66 p-8 rounded-lg">
      <p className="text-slate-dark font-bold text-lg mb-10">All Projects</p>
      {tasksCount?.map((task: TasksStas) => (
        <div
          key={task.project_id}
          className="flex items-center justify-between"
        >
          <span className="text-slate-dark/70 font-bold text-sm mt-4">
            {task.project_name}
          </span>
          <span className="text-slate-dark font-bold">
            {task.tasks_count} tasks
          </span>
        </div>
      ))}
    </div>
  );
}
