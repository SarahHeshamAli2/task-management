import Link from "next/link";
import useGetTasks from "../hooks/use-get-tasks";
import PlusIcon from "@/components/icons/plus-icon";
import BoardView from "./board-view";
import { ParamValue } from "next/dist/server/request/params";

type Props = {
  status: { label: string; value: string };
  projectId: string | ParamValue;
  dotColor: string;
  lastElementRef?: React.Ref<HTMLDivElement>;
};

export default function TaskColumn({
  status,
  projectId,
  dotColor,
  lastElementRef,
}: Props) {
  const { tasks, isLoading, error } = useGetTasks({
    params: { project_id: `eq.${projectId}`, status: `eq.${status.value}` },
  });

  return (
    <div className="flex-1 min-w-[288px]">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`size-2 rounded-full shrink-0 ${dotColor}`} />
        <p className="uppercase text-placeholder font-bold text-xs">
          {status.label}
        </p>
        <span className="text-placeholder text-xs font-medium">
          {isLoading ? "…" : tasks.length}
        </span>
      </div>
      <Link
        href={`/project/${projectId}/tasks/new?status=${status.value}`}
        className="text-xs font-bold text-secondary/60 uppercase flex items-center gap-2 border-dashed border-slate-light/30 p-4 rounded-lg border-2 mb-3"
      >
        <PlusIcon fill="currentColor" /> <span> Add New Task</span>
      </Link>

      {/* Task cards */}
      <div className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-placeholder text-xs text-center py-6">Loading…</p>
        )}

        {!isLoading && error && (
          <p className="text-error text-xs text-center py-6">Failed to load</p>
        )}

        {!isLoading && !error && tasks.length === 0 && (
          <p className="text-placeholder text-xs text-center py-6">No tasks</p>
        )}

        {tasks.map((task, i) => {
          const isLast = i === tasks.length - 1;
          return (
            <BoardView
              key={task.id}
              task={task}
              ref={isLast ? lastElementRef : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
