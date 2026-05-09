export default function TaskCardBoardViewSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg min-h-25 min-w-[288px] animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-3/4 mb-4" />
      <div className="flex justify-between items-center mt-4">
        <div className="h-3 bg-slate-200 rounded w-1/3" />
        <div className="h-6 w-6 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
}
