import Link from "next/link";
import {
  arrowOf,
  changeLabel,
  changeStyle,
  percent,
  taka,
  unitLabel,
} from "@/lib/format";

export default function ProductCard({ product }) {
  const change = product.change || { dir: "flat", pct: 0 };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-2xl">
          {product.image}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
          {product.categoryIcon} {product.categoryNameBn}
        </span>
      </div>

      <h3 className="mt-3 text-base font-semibold text-slate-800">
        {product.nameBn}
      </h3>
      <p className="mt-0.5 text-xs text-slate-500">{unitLabel(product.unit)}</p>

      <div className="mt-3 flex items-end justify-between gap-2 border-t border-dashed border-slate-200 pt-3">
        <div>
          <p className="text-[11px] text-slate-400">আজকের দাম</p>
          <p className="text-lg font-bold text-slate-800">{taka(product.today)}</p>
        </div>

        <span
          title={changeLabel(change.dir)}
          className={`rounded-md border px-2 py-1 text-xs font-medium ${changeStyle(
            change.dir
          )}`}
        >
          {arrowOf(change.dir)} {percent(change.pct)}
        </span>
      </div>
    </Link>
  );
}
