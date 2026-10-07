import Link from "next/link";
import { Fragment } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import {
  arrowOf,
  changeLabel,
  changeStyle,
  groupMarkets,
  percent,
  taka,
  toBn,
  unitLabel,
} from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  // this page is protected, guests go to sign in first
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(`/signin?callbackUrl=/product/${slug}`);
  }

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const change = product.change || { dir: "flat", pct: 0 };
  const markets = product.markets || [];

  const lowest = markets.length
    ? Math.min(...markets.map((item) => item.min))
    : product.today;
  const highest = markets.length
    ? Math.max(...markets.map((item) => item.max))
    : product.today;
  const average = markets.length
    ? Math.round(
        markets.reduce((sum, item) => sum + (item.min + item.max) / 2, 0) /
          markets.length
      )
    : product.today;

  const cheapest = markets.length
    ? markets.reduce((a, b) => (b.min < a.min ? b : a))
    : null;
  const costliest = markets.length
    ? markets.reduce((a, b) => (b.max > a.max ? b : a))
    : null;

  const groups = groupMarkets(markets);
  const diff = product.today - product.yesterday;

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm text-slate-500 hover:text-brand-700">
        ← সব পণ্যের দাম
      </Link>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-4xl">
            {product.image}
          </span>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {product.categoryNameBn} ক্যাটাগরির পণ্য, দাম হিসাব করা হয়{" "}
              {unitLabel(product.unit)} হিসেবে।
              {cheapest && costliest
                ? ` ${cheapest.market}-এ সবচেয়ে কম ${taka(
                    cheapest.min
                  )} আর ${costliest.market}-এ সবচেয়ে বেশি ${taka(
                    costliest.max
                  )} পাওয়া যায়।`
                : ""}
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                {unitLabel(product.unit)}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                {toBn(markets.length)} টি বাজার
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center sm:min-w-[170px]">
            <p className="text-xs text-slate-500">আজকের দাম</p>
            <p className="mt-1 text-2xl font-bold text-slate-800">
              {taka(product.today)}
            </p>
            <span
              className={`mt-2 inline-block rounded-md border px-2 py-1 text-xs font-medium ${changeStyle(
                change.dir
              )}`}
            >
              {arrowOf(change.dir)} {percent(change.pct)}
            </span>
            <p className="mt-2 text-xs text-slate-500">{changeLabel(change.dir)}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-800">
            দামের পরিবর্তন
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {diff === 0
              ? "গতকালের সাথে দাম একই আছে।"
              : diff > 0
              ? `গতকালের চেয়ে ${taka(Math.abs(diff))} বেড়েছে।`
              : `গতকালের চেয়ে ${taka(Math.abs(diff))} কমেছে।`}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {[
              { label: "আজ", value: product.today },
              { label: "গতকাল", value: product.yesterday },
              { label: "গত সপ্তাহ", value: product.lastWeek },
              { label: "গত মাস", value: product.lastMonth },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-slate-100 bg-slate-50 p-3"
              >
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {taka(item.value)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-800">
            দামের সারসংক্ষেপ
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            সব বাজারের হিসাব ধরে ({unitLabel(product.unit)})
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-brand-50 px-4 py-3">
              <span className="text-brand-800">সর্বনিম্ন দাম</span>
              <span className="font-semibold text-brand-900">
                {taka(lowest)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <span className="text-slate-600">গড় দাম</span>
              <span className="font-semibold text-slate-800">
                {taka(average)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-3">
              <span className="text-red-700">সর্বোচ্চ দাম</span>
              <span className="font-semibold text-red-700">{taka(highest)}</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-800">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          বিভাগ অনুযায়ী সাজানো, সব দাম {unitLabel(product.unit)}
        </p>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[420px] text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">বাজার</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  বিভাগ
                </th>
                <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-medium">সর্বোচ্চ</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <Fragment key={group.division}>
                  <tr className="bg-brand-50/70">
                    <td
                      colSpan={4}
                      className="px-4 py-2 text-xs font-semibold text-brand-800"
                    >
                      {group.division} বিভাগ
                    </td>
                  </tr>
                  {group.list.map((market) => (
                    <tr
                      key={market.market}
                      className="border-t border-slate-100"
                    >
                      <td className="px-4 py-3 text-slate-700">
                        {market.market}
                      </td>
                      <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">
                        {market.division}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-700">
                        {taka(market.min)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-700">
                        {taka(market.max)}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
