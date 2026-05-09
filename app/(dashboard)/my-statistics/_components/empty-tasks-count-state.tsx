export default function EmptyTasksState() {
  return (
    <div className="flex flex-col  p-8 bg-white w-116 min-h-62">
      <p className="text-sm font-semibold text-gray-500">No projects yet</p>
      <p className="text-xs text-gray-400 mt-1">
        Tasks will appear here once projects are created
      </p>
    </div>
  );
}
