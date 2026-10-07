export default function ProductSkeleton({ count = 8, columns = 4 }) {
  const gridClass =
    columns === 3
      ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((item, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-4"
        >
          <div className="flex items-start justify-between">
            <div className="h-12 w-12 rounded-lg bg-slate-100" />
            <div className="h-6 w-20 rounded-full bg-slate-100" />
          </div>
          <div className="mt-3 h-4 w-3/4 rounded bg-slate-100" />
          <div className="mt-2 h-3 w-1/3 rounded bg-slate-100" />
          <div className="mt-4 flex items-end justify-between border-t border-dashed border-slate-200 pt-3">
            <div className="h-6 w-20 rounded bg-slate-100" />
            <div className="h-6 w-14 rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
