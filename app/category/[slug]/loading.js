import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />

      <div className="mt-4 flex animate-pulse items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="h-14 w-14 rounded-xl bg-slate-100" />
        <div>
          <div className="h-6 w-32 rounded bg-slate-100" />
          <div className="mt-2 h-4 w-44 rounded bg-slate-100" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
        <div className="h-10 w-52 animate-pulse rounded-lg bg-slate-100" />
      </div>

      <div className="mt-4">
        <ProductSkeleton count={8} />
      </div>
    </div>
  );
}
