import Link from "next/link";
import {
  arrowOf,
  changeLabel,
  changeStyle,
  percent,
  taka,
  unitLabel,
} from "@/lib/format";

// top bar + price panel color by price direction
const theme = {
  up: {
    bar: "from-rose-400 to-orange-300",
    panel: "bg-rose-50",
    label: "text-rose-600",
  },
  down: {
    bar: "from-emerald-400 to-teal-300",
    panel: "bg-emerald-50",
    label: "text-emerald-600",
  },
  flat: {
    bar: "from-slate-300 to-slate-200",
    panel: "bg-slate-50",
    label: "text-slate-500",
  },
};

export default function ProductCard({ product }) {
  const change = product.change || { dir: "flat", pct: 0 };
  const t = theme[change.dir] || theme.flat;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${t.bar}`} />

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-white text-3xl ring-1 ring-brand-100 transition duration-300 group-hover:rotate-[-4deg] group-hover:scale-110">
            {product.image}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {product.categoryIcon} {product.categoryNameBn}
          </span>
        </div>

        <h3 className="mt-3.5 text-lg font-semibold text-slate-800 transition group-hover:text-brand-700">
          {product.nameBn}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">{unitLabel(product.unit)}</p>

        <div
          className={`mt-3.5 flex items-end justify-between gap-2 rounded-2xl p-3 ${t.panel}`}
        >
          <div>
            <p className="text-[11px] text-slate-500">আজকের দাম</p>
            <p className="text-2xl font-extrabold leading-tight text-slate-800">
              {taka(product.today)}
            </p>
          </div>

          <div className="text-right">
            <span
              className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${changeStyle(
                change.dir
              )}`}
            >
              {arrowOf(change.dir)} {percent(change.pct)}
            </span>
            <p className={`mt-1 text-[11px] font-medium ${t.label}`}>
              {changeLabel(change.dir)}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm font-medium text-brand-700">
          বিস্তারিত দেখুন{" "}
          <span className="inline-block transition duration-300 group-hover:translate-x-1">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}