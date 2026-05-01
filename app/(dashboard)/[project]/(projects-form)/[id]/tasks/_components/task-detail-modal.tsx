import Modal from "@/components/shared/modal";
import useGetTasks from "../hooks/use-get-tasks";
import { STATUS_CONFIG } from "@/lib/constants/tasks.constants";
import Avatar from "@/components/shared/avatar";
import UnassignedIcon from "@/components/icons/unassigned-icon";
import { formatDate } from "@/lib/utils/format-date";
import { TaskDetailModalSkeleton } from "@/components/skeletons/task-detail-modal.skeleton";

type TaskModalProps = {
  projectId: string;
  taskId: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function TaskDetailModal({
  projectId,
  taskId,
  isOpen,
  onClose,
}: TaskModalProps) {
  const { tasks, isLoading } = useGetTasks({
    params: { project_id: `eq.${projectId}`, id: `eq.${taskId}` },
    enabled: isOpen && !!taskId && !!projectId,
  });
  console.log(tasks, "tasks from detail modal");
  const currentTask = tasks[0];
  return (
    <>
      <Modal
        showIcon={false}
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        className="min-w-222"
      >
        <div className="flex min-h-150 -mx-6 -mb-4 overflow-hidden ">
          {" "}
          {isLoading || !currentTask ? (
            <TaskDetailModalSkeleton />
          ) : (
            <>
              {/* ── LEFT COL ── */}
              <div className="flex flex-col flex-1 min-w-0 pt-6 ">
                {/* Eyebrow row */}
                <div className="flex items-center gap-2 mb-3 px-8">
                  <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">
                    {currentTask.task_id}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500 text-xs">
                    {currentTask.epic.epic_id} ({currentTask.epic.title})
                  </span>

                  {/* X button */}
                  <button
                    onClick={onClose}
                    className="ms-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-slate-800 leading-snug mb-3 border-b pb-6 border-ocean px-8">
                  <span className=" rounded px-0.5">{currentTask.title}</span>
                </h2>

                {/* Description */}
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 px-8">
                  Description
                </p>
                <p className="text-slate-600 text-sm leading-relaxed flex-1 px-8">
                  {currentTask.description ? (
                    currentTask.description
                  ) : (
                    <span>No description provided</span>
                  )}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-6 px-8 bg-surface-low py-4 rounded rounded-bl-2xl">
                  <button className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600">
                    <svg
                      className="w-4 h-4"
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
                    onClick={onClose}
                    className="ms-auto px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
              {/* ── RIGHT COL ── */}
              <div className="w-75 p-8 shrink-0 border-s bg-ocean border-slate-100 px-5 pt-6 pb-4 flex flex-col gap-5 rounded-tr-2xl rounded-br-2xl">
                {/* Status */}
                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
                    Status
                  </p>
                  {(() => {
                    const config = STATUS_CONFIG[currentTask.status] ?? {
                      label: currentTask.status,
                      badge: "bg-surface-highest",
                      text: "text-secondary",
                    };
                    return (
                      <span
                        className={`inline-block px-3 py-2.5 rounded-sm w-full text-xs font-semibold ${config.badge} ${config.text}`}
                      >
                        {config.label}
                      </span>
                    );
                  })()}
                </div>

                {/* Assignee */}
                <div>
                  {currentTask.assignee.name ? (
                    <>
                      <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-3 ">
                        Assignee
                      </p>
                      <div className="flex items-center bg-white p-2 gap-3 rounded-lg">
                        <Avatar
                          name={currentTask.assignee.name}
                          sizeClassName="w-7 h-7"
                          className="rounded-full bg-[#DAE2FF] text-slate-dark"
                        />
                        <span className="text-slate-dark font-semibold text-sm">
                          {currentTask.assignee.name}
                          <span className="block font-normal text-xs text-secondary">
                            {currentTask.assignee.department}
                          </span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="flex items-center gap-1 text-[#94A3B8] text-xs">
                      <UnassignedIcon />
                      Unassigned
                    </span>
                  )}
                </div>

                {/* Dates */}
                <div className="flex flex-col gap-3 ">
                  <div className="flex items-center justify-between">
                    <p className="text-xs  text-secondary  mb-0.5">Due Date</p>
                    <p className="font-medium text-slate-700 text-sm">
                      {formatDate(currentTask.due_date, true, "en-gb")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs  text-secondary  mb-0.5">
                      Created At
                    </p>
                    <p className="font-medium text-slate-700 text-sm">
                      {formatDate(currentTask.created_at, true, "en-gb")}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
