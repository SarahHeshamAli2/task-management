"use client";

import CalendarIcon from "@/components/icons/calendar-icon";
import UnassignedIcon from "@/components/icons/unassigned-icon";
import Avatar from "@/components/shared/avatar";
import { Task } from "@/lib/types/tasks.type";
import { formatDate } from "@/lib/utils/format-date";
import { cn } from "@/lib/utils/tailwind-merge";
import { useRef, useState } from "react";
import TaskDetailModal from "./task-detail-modal";
import { useDraggable } from "@dnd-kit/core";

type TaskProps = {
  ref?: (node: HTMLDivElement | null) => void;
  task: Task;
  isOverlay?: boolean;
};

export default function BoardView({ ref, task, isOverlay }: TaskProps) {
  const { title, due_date, assignee } = task;
  const [open, setOpen] = useState(false);

  // Track WHERE the pointer went down so we can measure drag distance in onClick.
  // We cannot use a separate boolean "dragMoved" flag because {…listeners} spread
  // below would override the onPointerDown that resets it — the fix is to spread
  // listeners FIRST and then override onPointerDown with our merged handler.
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: { task },
    disabled: isOverlay,
  });

  // Merge the infinite-scroll ref with dnd-kit's setNodeRef
  const mergedRef = (node: HTMLDivElement | null) => {
    setNodeRef(node);
    if (typeof ref === "function") ref(node);
  };

  // Merged handler: record position AND forward to dnd-kit so drag still works.
  // MUST be placed AFTER {...listeners} in JSX so it wins the prop override.
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    // Forward to dnd-kit's listener so the sensor can activate drag
    (
      listeners as Record<string, React.EventHandler<React.PointerEvent>>
    )?.onPointerDown?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pointerDownPos.current) return;
    const dx = e.clientX - pointerDownPos.current.x;
    const dy = e.clientY - pointerDownPos.current.y;
    // If pointer moved more than 4 px, it was a drag — don't open modal
    if (Math.sqrt(dx * dx + dy * dy) > 4) return;
    setOpen(true);
  };

  return (
    <div
      ref={mergedRef}
      // Spread listeners first, THEN override onPointerDown with our merger.
      // This ensures our handler runs AND dnd-kit's drag detection still fires.
      {...listeners}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      {...attributes}
      className={cn(
        "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-40"
      )}
    >
      <div
        className={cn(
          "bg-white p-4 rounded-lg min-h-25 min-w-[288px]",
          task.status === "BLOCKED" && "bg-[#FFDAD633] border border-error/10"
        )}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-slate-dark font-medium text-sm">{title}</h1>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#94A3B8] font-medium text-sm flex items-center gap-1.5">
            <CalendarIcon />
            {formatDate(due_date, false)}
          </span>
          {assignee.name ? (
            <Avatar
              name={assignee.name}
              textClassName="text-xs"
              sizeClassName="w-6 h-6"
              className="bg-[#E0E8FF] text-slate-dark"
            />
          ) : (
            <span className="flex items-center gap-1 text-[#94A3B8] text-xs">
              <UnassignedIcon />
              Unassigned
            </span>
          )}
        </div>
      </div>
      {open && (
        <div onClick={(e) => e.stopPropagation()}>
          <TaskDetailModal
            isOpen={open}
            onClose={() => setOpen(false)}
            taskId={task.id}
            projectId={task.project_id}
          />
        </div>
      )}
    </div>
  );
}
