"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

const sortOptions = [
  { value: "default", label: "ডিফল্ট" },
  { value: "low", label: "দাম: কম থেকে বেশি" },
  { value: "high", label: "দাম: বেশি থেকে কম" },
  { value: "change", label: "দাম পরিবর্তন: বেশি" },
];

export default function CategoryProducts({ products }) {
  const [sortBy, setSortBy] = useState("default");

  let shown = [...products];

  if (sortBy === "low") {
    shown.sort((a, b) => a.today - b.today);
  } else if (sortBy === "high") {
    shown.sort((a, b) => b.today - a.today);
  } else if (sortBy === "change") {
    shown.sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct));
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="text-4xl">🧺</p>
        <h2 className="mt-4 text-lg font-semibold text-slate-800">
          এই ক্যাটাগরিতে কোনো পণ্য নেই
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          দুঃখিত, এই ক্যাটাগরির জন্য এখনো কোনো দাম যোগ করা হয়নি।
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">মোট {shown.length} টি পণ্য</p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">সাজান</span>
          <div className="relative">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-700"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M6 8l4 4 4-4" strokeLinecap="round" />
          </svg>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
