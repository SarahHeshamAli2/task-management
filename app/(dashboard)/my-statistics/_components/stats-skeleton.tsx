export default function StatisticsSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* Filter Bar Skeleton */}
      <div className="flex items-center justify-between bg-surface-low py-6 px-4 rounded-lg">
        <div className="h-10 w-48 bg-slate-200 rounded-md" />
        <div className="flex gap-4">
          <div className="h-10 w-51 bg-white rounded-md" />
          <div className="h-10 w-34 bg-white rounded-md" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white flex items-center justify-between p-6 rounded-lg h-[116px]"
          >
            <div className="flex flex-col gap-2">
              <div className="h-3 w-24 bg-slate-100 rounded-md" />
              <div className="h-8 w-16 bg-slate-200 rounded-md" />
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-xs" />
          </div>
        ))}
      </div>

      {/* Calendar Grid Skeleton */}
      <div className="flex justify-between items-stretch gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="flex flex-col min-h-105 flex-1 p-4 bg-white rounded-lg shadow-sm border border-transparent"
          >
            <div className="mb-4">
              <div className="h-3 w-12 bg-slate-100 rounded-md mb-2" />
              <div className="h-6 w-20 bg-slate-200 rounded-md" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="h-8 w-full bg-slate-50 rounded-xs" />
              <div className="h-8 w-full bg-slate-50 rounded-xs" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row Skeleton */}
      <div className="flex items-center justify-between gap-6">
        {/* Pie Chart Card Skeleton */}
        <div className="bg-white border-[1.5px] border-[#DBEAFE] rounded-[16px] p-[24px_28px] shadow-[0_2px_16px_rgba(59,130,246,0.07)] flex flex-col flex-1 h-[320px]">
          <div className="h-6 w-32 bg-slate-200 rounded-md mb-5" />
          <div className="flex items-center gap-12">
            <div className="w-[200px] h-[200px] rounded-full border-[15px] border-slate-100" />
            <div className="flex flex-col gap-4 flex-1">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-8 w-full bg-slate-50 rounded-md" />
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Count Card Skeleton */}
        <div className="bg-white w-116 p-8 h-[320px] rounded-lg">
          <div className="h-6 w-32 bg-slate-200 rounded-md mb-10" />
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="flex items-center justify-between mb-4">
              <div className="h-4 w-32 bg-slate-100 rounded-md" />
              <div className="h-4 w-16 bg-slate-200 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
