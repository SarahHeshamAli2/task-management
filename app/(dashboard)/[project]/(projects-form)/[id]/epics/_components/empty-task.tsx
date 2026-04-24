import LargePlusIcon from "@/components/icons/large-plus-icon";
import ListMenuIcon from "@/components/icons/list-menu";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function EmptyTask() {
  return (
    <div className="bg-surface-low flex flex-col gap-4 p-6 rounded-lg min-h-62 border-dashed border-slate-light/20 border-2 justify-center items-center">
      <Link
        className="min-h-12 min-w-12 bg-surface-highest flex items-center justify-center rounded-xl"
        href="/task/add"
      >
        <ListMenuIcon />
      </Link>
      <span className="text-slate-dark font-medium">
        No tasks have been added to this epic yet
      </span>
      <Button
        leftIcon={<LargePlusIcon />}
        iconClassName="me-1"
        className="capitalize text-white text-sm min-w-37"
      >
        add task
      </Button>
    </div>
  );
}
