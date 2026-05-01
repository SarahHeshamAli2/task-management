import LargePlusIcon from "@/components/icons/large-plus-icon";
import ListMenuIcon from "@/components/icons/list-menu";
import { ROUTES } from "@/lib/constants/routes.constants";
import Link from "next/link";

export default function EmptyTask({
  projectId,
  epicId,
}: {
  projectId: string;
  epicId: string;
}) {
  return (
    <div className="bg-surface-low flex flex-col gap-4 p-6 rounded-lg min-h-62 border-dashed border-slate-light/20 border-2 justify-center items-center">
      <div className="min-h-12 min-w-12 bg-surface-highest flex items-center justify-center rounded-xl">
        <ListMenuIcon />
      </div>
      <span className="text-slate-dark font-medium">
        No tasks have been added to this epic yet
      </span>
      <Link
        onClick={(e) => e.stopPropagation()}
        href={`${ROUTES.tasks.add(projectId)}?epic=${epicId}`}
        className="capitalize text-white text-sm min-w-37 bg-primary flex  py-2.5 items-center justify-center gap-2"
      >
        <LargePlusIcon /> add task
      </Link>
    </div>
  );
}
