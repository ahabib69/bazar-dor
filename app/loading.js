import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="space-y-10">
      <div className="animate-pulse rounded-2xl border border-brand-100 bg-white p-8">
        <div className="h-4 w-40 rounded bg-slate-100" />
        <div className="mt-5 h-9 w-3/4 rounded bg-slate-100" />
        <div className="mt-3 h-4 w-full rounded bg-slate-100" />
        <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
        <div className="mt-6 h-10 w-44 rounded-lg bg-slate-100" />
      </div>

      <div>
        <div className="h-6 w-52 animate-pulse rounded bg-slate-200" />
        <div className="mt-3 h-4 w-80 animate-pulse rounded bg-slate-100" />
        <div className="mt-5">
          <ProductSkeleton count={6} />
        </div>
      </div>

      <div>
        <div className="h-6 w-52 animate-pulse rounded bg-slate-200" />
        <div className="mt-5">
          <ProductSkeleton count={3} />
        </div>
      </div>
    </div>
  );
}
