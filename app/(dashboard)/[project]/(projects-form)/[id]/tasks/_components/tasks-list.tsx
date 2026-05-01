import { TasksList } from "@/lib/types/tasks.type";
import TaskCard from "./task-card";

export default function TaskList({ tasks }: { tasks: TasksList }) {
  return (
    <div className="border p-4 rounded-lg border-slate-light/15">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
