function EpicCardSkeleton() {
  return (
    <div className="bg-white  md:p-6 rounded-lg min-h-62.5 flex flex-col justify-between animate-pulse">
      {/* Title */}
      <div className="h-32  bg-ocean rounded-sm" />

      {/* Description */}
      <div className="h-6 max-w-47.5 bg-ocean rounded-xs" />

      {/* Footer */}
      <div className="h-4 max-w-31 bg-ocean rounded-xs" />
    </div>
  );
}
export default function EpicCardListSkeleton() {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <EpicCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
