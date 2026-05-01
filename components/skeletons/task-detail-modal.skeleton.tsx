import Modal from "../shared/modal";

export function TaskDetailModalSkeleton() {
  return (
    <Modal
      showIcon={false}
      size="2xl"
      onClose={() => {}}
      isOpen={true}
      className="min-w-222"
    >
      <div className="flex min-h-150 -mx-6 -mb-4 overflow-hidden animate-pulse">
        {/* ── LEFT COL ── */}
        <div className="flex flex-col flex-1 min-w-0 pt-6">
          {/* Eyebrow row */}
          <div className="flex items-center gap-2 mb-3 px-8">
            <div className="h-5 w-16 rounded bg-slate-200" />
            <div className="h-3 w-1 rounded bg-slate-200" />
            <div className="h-4 w-40 rounded bg-slate-200" />
            <button
              className="ms-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Title */}
          <div className="mb-3 border-b pb-6 border-ocean px-8 space-y-2">
            <div className="h-7 w-3/4 rounded bg-slate-200" />
            <div className="h-7 w-1/2 rounded bg-slate-200" />
          </div>

          {/* Description label */}
          <div className="px-8 mb-2">
            <div className="h-3 w-20 rounded bg-slate-200" />
          </div>

          {/* Description body */}
          <div className="px-8 space-y-2 flex-1">
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-5/6 rounded bg-slate-200" />
            <div className="h-4 w-4/6 rounded bg-slate-200" />
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-6 px-8 bg-surface-low py-4 rounded rounded-bl-2xl">
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="ms-auto h-9 w-20 rounded-lg bg-slate-200" />
          </div>
        </div>

        {/* ── RIGHT COL ── */}
        <div className="w-75 p-8 shrink-0 border-s bg-ocean border-slate-100 px-5 pt-6 pb-4 flex flex-col gap-5 rounded-tr-2xl rounded-br-2xl">
          {/* Status */}
          <div>
            <div className="h-3 w-12 rounded bg-slate-300 mb-4" />
            <div className="h-9 w-full rounded-sm bg-slate-200" />
          </div>

          {/* Assignee */}
          <div>
            <div className="h-3 w-16 rounded bg-slate-300 mb-3" />
            <div className="flex items-center gap-3 bg-white p-2 rounded-lg">
              <div className="w-7 h-7 rounded-full bg-slate-200 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3.5 w-24 rounded bg-slate-200" />
                <div className="h-3 w-16 rounded bg-slate-200" />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="h-3 w-14 rounded bg-slate-300" />
              <div className="h-4 w-20 rounded bg-slate-200" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 rounded bg-slate-300" />
              <div className="h-4 w-20 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
