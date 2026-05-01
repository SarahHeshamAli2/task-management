"use client";

import CalendarIcon from "@/components/icons/calendar-icon";
import Modal from "@/components/shared/modal";
import { formatDate } from "@/lib/utils/format-date";
import { Ref, useState } from "react";
import EmptyTask from "./empty-task";
import CreatedByIcon from "@/components/icons/created-by-icon";
import { updateEpicAction } from "@/lib/actions/epics.actions";
import { toast } from "sonner";
import TextArea from "@/components/ui/shared-textarea";
import SubmissionError from "@/components/shared/submission-error";
import useGetProjectMembers from "../../members/hooks/use-get-project-members";
import { Member } from "@/lib/types/member.types";
import { EpicList } from "@/lib/types/epic.types";
import Avatar from "@/components/shared/avatar";
import EpicAssigneeField from "./epic-assignee-field";
import useGetTasks from "../../tasks/hooks/use-get-tasks";
import TaskList from "../../tasks/_components/tasks-list";
import TaskCardSkeleton from "@/components/skeletons/task-card.skeleton";
import Link from "next/link";
import { useIsMobile } from "@/lib/hooks/use-mobile";

type EpicCardProps = {
  title: string;
  createdAt: string;
  ref?: Ref<HTMLDivElement>;
  id?: string | null;
  userName: string;
  createdBy: string;
  deadline: string | null;
  asigneeName: string;
  epicId: string;
  description?: string;
  assigneeId?: string | null;
  projectId: string;
  onUpdate?: (patch: Partial<EpicList[0]>) => void;
};

export default function EpicCard({
  title,
  createdAt,
  ref,
  id,
  createdBy,
  deadline,
  asigneeName,
  epicId,
  description,
  assigneeId,
  projectId,
  onUpdate,
}: EpicCardProps) {
  // UI-only state
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [isUpdatingAssignee, setIsUpdatingAssignee] = useState(false);
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const [isSavingDescription, setIsSavingDescription] = useState(false);
  const [isSavingDeadline, setIsSavingDeadline] = useState(false);
  const [error, setError] = useState("");
  const [optimisticAssignee, setOptimisticAssignee] = useState<{
    id: string | null;
    name: string;
  } | null>(null);

  // Editing buffers — only used while actively editing, not for display
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftDescription, setDraftDescription] = useState(description ?? "");
  const [draftDeadline, setDraftDeadline] = useState<string | null>(deadline);
  const { tasks, isLoading } = useGetTasks({
    params: { epic_id: `eq.${epicId}` },
    enabled: isOpen,
  });

  const { members } = useGetProjectMembers({
    id: projectId,
    enabled: isOpen,
  });

  const getMemberAvatar = (member: Member) =>
    member.metadata?.avatar_url ??
    member.metadata?.picture ??
    member.metadata?.avatar ??
    null;

  const updateField = async (
    payload: Partial<EpicList[0]>,
    successMessage: string,
    errorMessage = "Failed to update epic. Please try again."
  ) => {
    const res = await updateEpicAction(epicId, payload);
    if (res.success) {
      toast.success(successMessage);
      onUpdate?.(payload); // patch parent list — no refetch
    } else {
      toast.error(errorMessage);
    }
    return res.success;
  };

  const isMobile = useIsMobile();
  const handleTitleSave = async () => {
    if (draftTitle === title) {
      setIsEditingTitle(false);
      return;
    }
    setIsSavingTitle(true);
    const ok = await updateField({ title: draftTitle }, "Title updated");
    if (!ok) setDraftTitle(title); // revert draft on failure
    setIsSavingTitle(false);
    setIsEditingTitle(false);
  };

  const handleDescriptionSave = async () => {
    if (draftDescription === description) return;
    setIsSavingDescription(true);
    const ok = await updateField(
      { description: draftDescription },
      "Description updated successfully"
    );
    if (!ok) setDraftDescription(description ?? "");
    setIsSavingDescription(false);
  };

  const handleDeadlineSave = async () => {
    if (draftDeadline) {
      const today = new Date().toISOString().split("T")[0];
      if (draftDeadline < today) {
        setError("Deadline must be today or a future date");
        setDraftDeadline(deadline);
        return;
      }
    }
    setIsSavingDeadline(true);
    const ok = await updateField(
      { deadline: draftDeadline },
      "Deadline updated successfully"
    );
    if (ok) setError("");
    else setDraftDeadline(deadline);
    setIsSavingDeadline(false);
  };

  const handleAssigneeChange = async (selectedId: string) => {
    const nextAssigneeId = selectedId === "unassigned" ? null : selectedId;
    const currentAssigneeId = optimisticAssignee?.id ?? assigneeId ?? null;
    const currentAssigneeName = optimisticAssignee?.name ?? asigneeName ?? "";

    if (nextAssigneeId === currentAssigneeId) {
      setIsEditingAssignee(false);
      return;
    }

    const nextMember = members.find((m) => m.user_id === nextAssigneeId);
    const nextName = nextMember?.metadata?.name ?? "";
    setOptimisticAssignee({ id: nextAssigneeId, name: nextName });

    setIsUpdatingAssignee(true);
    const ok = await updateField(
      { assignee_id: nextAssigneeId },
      nextAssigneeId ? "Assignee updated" : "Assignee removed"
    );

    if (!ok) {
      setOptimisticAssignee({
        id: currentAssigneeId,
        name: currentAssigneeName,
      });
    }
    setIsUpdatingAssignee(false);
    setIsEditingAssignee(false);
  };

  const displayAssigneeId = optimisticAssignee?.id ?? assigneeId ?? null;
  const displayAssigneeName = optimisticAssignee?.name ?? asigneeName ?? "";
  const currentMember = members.find((m) => m.user_id === displayAssigneeId);
  const currentAvatarSrc = currentMember
    ? getMemberAvatar(currentMember)
    : null;

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      ref={ref}
      className="cursor-pointer bg-white p-6 rounded-lg min-h-55 flex flex-col justify-between border-[#004E32] md:border-s-4"
    >
      <div>
        <div className="flex mb-4 justify-between">
          <span className="text-xs font-bold text-[#005235] bg-[#82F9BE] min-w-17 h-6 rounded-xs flex items-center justify-center tracking-wider">
            {id}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-slate-dark font-medium text-lg">{title}</h3>

          <div onClick={(e) => e.stopPropagation()}>
            <Modal
              size="2xl"
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title={
                isSavingTitle ? (
                  <div className="h-7 w-64 rounded bg-skeleton animate-pulse" />
                ) : isEditingTitle ? (
                  <input
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    onBlur={handleTitleSave}
                    autoFocus
                    className="border-0 outline-0 rounded px-2 py-1"
                  />
                ) : (
                  <h2
                    className="text-slate-dark font-medium text-lg cursor-pointer"
                    onClick={() => {
                      setDraftTitle(title);
                      setIsEditingTitle(true);
                    }}
                  >
                    {title}
                  </h2>
                )
              }
              eyebrow={id}
            >
              {isSavingDescription ? (
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-skeleton animate-pulse" />
                  <div className="h-3 w-4/5 rounded bg-skeleton animate-pulse" />
                  <div className="h-3 w-3/5 rounded bg-skeleton animate-pulse" />
                </div>
              ) : (
                <TextArea
                  className="bg-transparent p-0"
                  value={draftDescription}
                  onChange={(e) => setDraftDescription(e.target.value)}
                  onBlur={handleDescriptionSave}
                  placeholder="No description provided"
                />
              )}

              <div className="grid md:grid-cols-3 grid-cols-2">
                <div>
                  <p className="text-slate-dark/40 font-bold text-[10px] uppercase">
                    created by
                  </p>
                  <p className="flex items-center gap-2 text-slate-dark font-medium text-sm mt-2">
                    <Avatar
                      name={createdBy}
                      sizeClassName="w-7 h-7"
                      textClassName="text-[10px]"
                    />
                    {createdBy}
                  </p>
                </div>

                <EpicAssigneeField
                  members={members}
                  displayAssigneeName={displayAssigneeName}
                  currentAvatarSrc={currentAvatarSrc}
                  isEditing={isEditingAssignee}
                  isUpdating={isUpdatingAssignee}
                  onStartEdit={() => setIsEditingAssignee(true)}
                  onSelectAssignee={handleAssigneeChange}
                />

                <div className="border-t col-span-2 md:col-span-1 pt-2 border-ocean mt-5 md:mt-0 md:border-0">
                  <p className="text-slate-dark/40 font-bold text-[10px] uppercase">
                    Deadline
                  </p>
                  {isSavingDeadline ? (
                    <div className="h-9 w-full rounded bg-skeleton animate-pulse mt-2" />
                  ) : (
                    <input
                      type="date"
                      value={draftDeadline ?? ""}
                      onChange={(e) => setDraftDeadline(e.target.value || null)}
                      onBlur={handleDeadlineSave}
                    />
                  )}
                </div>

                <div className="border-t col-span-2 md:col-span-1 pt-2 border-ocean mt-5 md:mt-0 md:border-0">
                  <p className="text-slate-dark/40 font-bold text-[10px] uppercase">
                    Created At
                  </p>
                  <p className="flex items-center gap-2 text-slate-dark font-medium text-sm mt-2">
                    <CalendarIcon />
                    {formatDate(createdAt)}
                  </p>
                </div>
              </div>

              {error && <SubmissionError error={error} />}

              <div className="mt-8 text-slate-dark flex justify-between items-center font-semibold">
                <p>Tasks</p>
                <Link
                  onClick={(e) => e.stopPropagation()}
                  href={`/project/${projectId}/task/new`}
                  className="text-primary"
                >
                  Add Task
                </Link>
              </div>
              {isLoading ? (
                <TaskCardSkeleton count={3} />
              ) : tasks?.length === 0 ? (
                <EmptyTask />
              ) : (
                <TaskList tasks={tasks} />
              )}
            </Modal>
          </div>
        </div>
      </div>

      <div className="justify-between items-center border-t border-surface-low pt-4 md:flex hidden">
        <span className="text-placeholder text-xs capitalize flex gap-2">
          <CreatedByIcon />
          created by:{" "}
          <span className="text-slate-dark font-semibold">{createdBy}</span>
        </span>
        <span className="text-secondary font-medium text-sm flex items-center gap-1.5">
          <CalendarIcon />
          {formatDate(createdAt)}
        </span>
      </div>

      {isMobile && (
        <div className="flex justify-between items-center border-t border-surface-low pt-4">
          {displayAssigneeName ? (
            <span className="text-xs flex  items-center gap-2">
              <Avatar
                name={displayAssigneeName}
                sizeClassName="w-6 h-6"
                className="rounded-lg"
                textClassName="text-[10px]"
              />
              {displayAssigneeName}
            </span>
          ) : (
            <span className="text-xs">Unassigned</span>
          )}
          <span className="text-secondary font-medium text-sm flex items-center gap-1.5">
            <span className="text-xs">DEADLINE</span>
            {formatDate(draftDeadline)}
          </span>
        </div>
      )}
    </div>
  );
}
