export function TaskTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b last:border-0 border-slate-100">
          {/* Task ID */}
          <td className="px-5 py-4">
            <div className="h-3 w-13 rounded bg-slate-200 animate-pulse" />
          </td>
          {/* Title */}
          <td className="px-5 py-4">
            <div
              className="h-3 rounded bg-slate-200 animate-pulse"
              style={{ width: `${60 + (i % 3) * 15}%` }}
            />
          </td>
          {/* Status badge */}
          <td className="px-5 py-4">
            <div className="h-5 w-18 rounded-xs bg-slate-200 animate-pulse" />
          </td>
          {/* Due date */}
          <td className="px-5 py-4">
            <div className="h-3 w-20 rounded bg-slate-200 animate-pulse" />
          </td>
          {/* Assignee */}
          <td className="px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-200 animate-pulse shrink-0" />
              <div className="h-3 w-22 rounded bg-slate-200 animate-pulse" />
            </div>
          </td>
          {/* Actions */}
          <td className="px-5 py-4">
            <div className="h-3 w-6 rounded bg-slate-200 animate-pulse" />
          </td>
        </tr>
      ))}
    </>
  );
}
