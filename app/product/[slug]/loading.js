export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-4 w-32 rounded bg-slate-100" />

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="h-20 w-20 rounded-xl bg-slate-100" />
          <div className="flex-1">
            <div className="h-7 w-48 rounded bg-slate-100" />
            <div className="mt-3 h-4 w-full rounded bg-slate-100" />
            <div className="mt-2 h-4 w-3/4 rounded bg-slate-100" />
            <div className="mt-4 flex gap-2">
              <div className="h-6 w-20 rounded-full bg-slate-100" />
              <div className="h-6 w-24 rounded-full bg-slate-100" />
            </div>
          </div>
          <div className="h-28 w-full rounded-xl bg-slate-100 sm:w-40" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-48 rounded-2xl border border-slate-200 bg-white" />
        <div className="h-48 rounded-2xl border border-slate-200 bg-white" />
      </div>

      <div className="h-64 rounded-2xl border border-slate-200 bg-white" />
    </div>
  );
}
