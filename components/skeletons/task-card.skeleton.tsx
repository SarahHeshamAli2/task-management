export default function TaskCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white flex justify-between border-b py-4 border-slate-light/15"
        >
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-full"></div>
            <div>
              <div className="w-32 h-4 bg-gray-300 animate-pulse mb-1 rounded"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
}
