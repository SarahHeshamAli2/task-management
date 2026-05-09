"use client";

import Modal from "@/components/shared/modal";
import useGetTasks from "../hooks/use-get-tasks";
import { STATUS_CONFIG, STATUS_VALUES } from "@/lib/constants/tasks.constants";
import Avatar from "@/components/shared/avatar";
import UnassignedIcon from "@/components/icons/unassigned-icon";
import { formatDate } from "@/lib/utils/format-date";
import { TaskDetailModalSkeleton } from "@/components/skeletons/task-detail-modal.skeleton";
import { useCallback, useRef, useState } from "react";
import { updateTaskAction } from "@/lib/actions/tasks.actions";
import { toast } from "sonner";
import useGetProjectMembers from "../../members/hooks/use-get-project-members";
import { Task, TasksList } from "@/lib/types/tasks.type";
import useGetEpics from "../../epics/hooks/use-get-epics";
import { useQueryClient } from "@tanstack/react-query";

type TaskModalProps = {
  projectId: string;
  taskId: string;
  isOpen: boolean;
  onClose: (savedTask?: TasksList[number]) => void;
  initialTask?: Task;
  setOptimisticMoves?: React.Dispatch<
    React.SetStateAction<
      Map<
        string,
        { taskId: string; task: Task; fromStatus: string; toStatus: string }
      >
    >
  >;
};

type EditableFields = {
  title?: string;
  description?: string;
  status?: string;
  assignee_id?: string | null;
  due_date?: string | null;
  epic_id?: string | null;
};

export default function TaskDetailModal({
  projectId,
  taskId,
  isOpen,
  onClose,
  initialTask,
  setOptimisticMoves,
}: TaskModalProps) {
  const { tasks, isLoading, isPending } = useGetTasks({
    params: { project_id: `eq.${projectId}`, id: `eq.${taskId}` },
    enabled: isOpen && !!taskId && !!projectId,
    usePlaceholder: false,
  });

  const { members } = useGetProjectMembers({ id: projectId });
  const epicSelectRef = useRef<HTMLSelectElement>(null);

  const currentTaskFromQuery = tasks[0];
  const currentTask = currentTaskFromQuery || initialTask;
  const { epics } = useGetEpics({ id: projectId });

  const [overrides, setOverrides] = useState<EditableFields>({});
  const [assigneeOverride, setAssigneeOverride] = useState<
    Task["assignee"] | null
  >(null);
  const [epicOverride, setEpicOverRide] = useState<Task["epic"] | null>(null);
  const queryClient = useQueryClient();

  const dirtyFields = useRef<EditableFields>({});
  const isSaving = useRef(false);

  const localTask = currentTask
    ? {
        ...currentTask,
        ...overrides,
        assignee: assigneeOverride ?? currentTask.assignee,
        epic: epicOverride ?? currentTask.epic,
      }
    : null;

  const handleField = <K extends keyof EditableFields>(
    key: K,
    value: EditableFields[K]
  ) => {
    setOverrides((prev) => ({ ...prev, [key]: value }));
    dirtyFields.current[key] = value;
  };

  const handleAssigneeChange = (userId: string) => {
    const member = members?.find((m) => m.user_id === userId);
    dirtyFields.current["assignee_id"] = userId || null;

    setAssigneeOverride(
      userId
        ? {
            id: userId,
            name: member?.metadata.name ?? currentTask?.assignee.name ?? null,
            department:
              member?.metadata.department ??
              currentTask?.assignee.department ??
              null,
          }
        : { id: null, name: null, department: null }
    );
  };

  const handleEpicChange = (epicId: string) => {
    const epic = epics?.find((e) => e.id === epicId);
    dirtyFields.current["epic_id"] = epicId || null;

    setEpicOverRide(
      epicId
        ? {
            id: epicId,
            epic_id: epic?.epic_id ?? "",
            title: epic?.title ?? "",
          }
        : { id: null, epic_id: "", title: "" }
    );
  };

  const handleClose = useCallback(async () => {
    const dirty = dirtyFields.current;
    const hasDirty = Object.keys(dirty).length > 0;

    if (hasDirty && localTask && currentTask && !isSaving.current) {
      isSaving.current = true;

      if (
        dirty.status &&
        dirty.status !== currentTask.status &&
        setOptimisticMoves
      ) {
        setOptimisticMoves((prev) =>
          new Map(prev).set(taskId, {
            taskId,
            task: currentTask,
            fromStatus: currentTask.status,
            toStatus: dirty.status!,
          })
        );
      }

      const result = await updateTaskAction(localTask.id, dirty);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["tasks"] }),
        queryClient.invalidateQueries({ queryKey: ["tasks-infinite"] }),
      ]);

      if (dirty.status && setOptimisticMoves) {
        setOptimisticMoves((prev) => {
          const next = new Map(prev);
          next.delete(taskId);
          return next;
        });
      }

      isSaving.current = false;

      if (!result.success) {
        toast.error("Failed to save changes");
        setOverrides({});
        setAssigneeOverride(null);
        dirtyFields.current = {};
        onClose();
        return;
      }

      toast.success("Changes saved");
      dirtyFields.current = {};
      onClose(localTask);
      return;
    }

    onClose();
  }, [
    localTask,
    currentTask,
    taskId,
    setOptimisticMoves,
    queryClient,
    onClose,
  ]);

  const task = localTask;

  const toDateInputValue = (iso: string | null | undefined) => {
    if (!iso) return "";
    return iso.split("T")[0];
  };

  return (
    <Modal
      showIcon={false}
      size="2xl"
      isOpen={isOpen}
      onClose={handleClose}
      // Removed fixed min-width; let Modal/screen width control sizing
      className="w-full md:min-w-222"
      disabled={isPending}
    >
      <div
        key={taskId}
        // Stack vertically on mobile, side-by-side on md+
        // Removed negative margins that caused overflow on small screens
        className="flex flex-col md:flex-row min-h-0 md:min-h-150 -mx-6 -mb-4 overflow-hidden cursor-default"
      >
        {isLoading && !currentTask ? (
          <TaskDetailModalSkeleton />
        ) : !task ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <p className="text-secondary text-sm">Task not found</p>
          </div>
        ) : (
          <>
            {/* ── LEFT COL ── */}
            <div className="flex flex-col flex-1 min-w-0 pt-6">
              {/* Header row: task ID, epic, close button */}
              <div className="flex items-center gap-2 mb-3 px-4 md:px-8">
                <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded shrink-0">
                  {task.task_id}
                </span>
                <span className="text-slate-300">·</span>

                {/* Epic — truncate long titles on mobile */}
                <div className="relative min-w-0 flex-1 md:flex-none">
                  {task.epic.id ? (
                    <div
                      onClick={() => epicSelectRef.current?.click()}
                      className="flex items-center gap-1.5 cursor-pointer min-w-0"
                    >
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded shrink-0">
                        {task.epic.epic_id}
                      </span>
                      <span className="text-xs text-slate-500 truncate hidden sm:block">
                        {task.epic.title}
                      </span>
                    </div>
                  ) : (
                    <div
                      onClick={() => epicSelectRef.current?.click()}
                      className="text-xs text-slate-400 cursor-pointer"
                    >
                      No epic
                    </div>
                  )}

                  <select
                    ref={epicSelectRef}
                    value={task.epic.id ?? ""}
                    onChange={(e) => handleEpicChange(e.target.value)}
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                  >
                    {!task.epic.id && (
                      <option value="" disabled>
                        No epic
                      </option>
                    )}
                    {epics?.map((epic) => (
                      <option key={epic.id} value={epic.id}>
                        {epic.epic_id} — {epic.title}
                      </option>
                    ))}
                    {task.epic.id && <option value="">Remove epic</option>}
                  </select>
                </div>

                <button
                  disabled={isPending}
                  onClick={handleClose}
                  className="ms-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Title */}
              <div className="border-b pb-4 md:pb-6 border-ocean px-4 md:px-8 mb-3">
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => handleField("title", e.target.value)}
                  className="text-xl md:text-2xl font-semibold text-slate-800 leading-snug outline-none rounded px-1 -mx-1 w-full
                    hover:bg-slate-50 focus:bg-slate-50 focus:ring-2 focus:ring-blue-200 cursor-text transition-colors bg-transparent"
                />
              </div>

              {/* Description */}
              <textarea
                value={task.description ?? ""}
                onChange={(e) => handleField("description", e.target.value)}
                placeholder="Add a description…"
                rows={4}
                className="text-slate-600 text-sm leading-relaxed flex-1 px-4 md:px-8 outline-none rounded resize-none w-full
                  hover:bg-slate-50 focus:bg-slate-50 focus:ring-2 focus:ring-blue-200
                  cursor-text transition-colors bg-transparent placeholder:text-slate-400"
              />

              {/* Bottom action bar */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-4 md:mt-6 px-4 md:px-8 bg-surface-low py-3 md:py-4 rounded rounded-bl-2xl">
                <button className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.101-1.102"
                    />
                  </svg>
                  Copy link
                </button>
                <button
                  onClick={handleClose}
                  className="ms-auto px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* ── RIGHT COL ──
                On mobile: full width, sits below the left col, top border instead of left border.
                On md+: fixed sidebar width with left border as before.
            */}
            <div
              className="
              w-full md:w-75 shrink-0
              border-t md:border-t-0 md:border-s
              bg-ocean border-slate-100
              px-4 md:px-5 pt-5 pb-4
              flex flex-col gap-5
              md:rounded-tr-2xl md:rounded-br-2xl
              rounded-bl-none md:rounded-bl-none
            "
            >
              {/* Status */}
              <div>
                <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">
                  Status
                </p>
                {(() => {
                  const config = STATUS_CONFIG[task.status] ?? {
                    label: task.status,
                    badge: "bg-surface-highest",
                    text: "text-secondary",
                  };
                  return (
                    <div className="relative w-full">
                      <span
                        className={`flex items-center px-3 py-2.5 rounded-sm text-xs font-semibold
                          pointer-events-none ${config.badge} ${config.text}`}
                      >
                        {config.label.toUpperCase()}
                      </span>
                      <select
                        value={task.status}
                        onChange={(e) => handleField("status", e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      >
                        {STATUS_VALUES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })()}
              </div>

              {/* Assignee */}
              <div>
                <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">
                  Assignee
                </p>
                {task.assignee.name ? (
                  <div className="flex items-center bg-white p-2 gap-3 rounded-lg mb-2">
                    <Avatar
                      name={task.assignee.name ?? ""}
                      sizeClassName="w-7 h-7"
                      className="rounded-full bg-[#DAE2FF] text-slate-dark shrink-0"
                    />
                    <span className="text-slate-dark font-semibold text-sm truncate">
                      {task.assignee.name}
                      <span className="block font-normal text-xs text-secondary">
                        {task.assignee.department}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[#94A3B8] text-xs mb-2">
                    <UnassignedIcon />
                    Unassigned
                  </div>
                )}

                <select
                  value={task.assignee.id ?? ""}
                  onChange={(e) => handleAssigneeChange(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg text-xs text-slate-600 bg-white border
                    border-slate-200 outline-none cursor-pointer focus:ring-2 focus:ring-blue-200
                    transition-colors"
                >
                  {!task.assignee.id && (
                    <option value="" disabled>
                      No assignee
                    </option>
                  )}
                  {members.map((member) => (
                    <option key={member.member_id} value={member.user_id}>
                      {member.metadata.name}
                    </option>
                  ))}
                  {task.assignee.id && (
                    <option value="">Remove assignee</option>
                  )}
                </select>
              </div>

              {/* Dates */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs text-secondary mb-1.5">Due Date</p>
                  <input
                    min={new Date().toISOString().split("T")[0]}
                    type="date"
                    value={toDateInputValue(task.due_date)}
                    onChange={(e) => {
                      const newVal = e.target.value || null;
                      const currentVal = toDateInputValue(
                        currentTask?.due_date
                      );
                      if (e.target.value !== currentVal) {
                        handleField("due_date", newVal);
                      }
                    }}
                    className="w-full px-2 py-1.5 rounded-lg text-sm font-medium text-slate-700
                      bg-white border border-slate-200 outline-none cursor-pointer
                      focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>

                {/* Created At — read-only */}
                <div className="flex items-center justify-between">
                  <p className="text-xs text-secondary mb-0.5">Created At</p>
                  <p className="font-medium text-slate-700 text-sm">
                    {formatDate(task.created_at, true, "en-gb")}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
