"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const sortOptions = [
  { value: "default", label: "ডিফল্ট" },
  { value: "low", label: "দাম: কম থেকে বেশি" },
  { value: "high", label: "দাম: বেশি থেকে কম" },
  { value: "change", label: "দাম পরিবর্তন: বেশি" },
];

export default function ProductFilter({ products, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  let shown =
    selectedCategory === "all"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  // sorting is done on the number, not on the bengali text
  if (sortBy === "low") {
    shown = [...shown].sort((a, b) => a.today - b.today);
  } else if (sortBy === "high") {
    shown = [...shown].sort((a, b) => b.today - a.today);
  } else if (sortBy === "change") {
    shown = [...shown].sort(
      (a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct)
    );
  }

  function chipClass(isActive) {
    if (isActive) {
      return "rounded-full border border-brand-600 bg-brand-600 px-3 py-1.5 text-sm font-medium text-white";
    }
    return "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:border-brand-300 hover:text-brand-700";
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={chipClass(selectedCategory === "all")}
          >
            সব
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className={chipClass(selectedCategory === category.slug)}
            >
              <span className="mr-1">{category.icon}</span>
              {category.nameBn}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="text-sm text-slate-500">সাজান</span>
          <div className="relative flex-1">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 sm:w-56"
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

      <p className="mt-4 text-sm text-slate-500">
        মোট {shown.length} টি পণ্য দেখা হচ্ছে
      </p>

      {shown.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-3xl">🧺</p>
          <p className="mt-3 font-medium text-slate-700">
            এই ক্যাটাগরিতে এখন কোনো পণ্য নেই
          </p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="mt-4 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
          >
            সব পণ্য দেখুন
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
