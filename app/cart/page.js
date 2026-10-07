"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { taka, toBn, unitLabel } from "@/lib/format";

function CartRow({ item, increaseQuantity, decreaseQuantity, removeFromCart }) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-2xl">
        {item.image}
      </span>

      <div className="min-w-[9rem] flex-1">
        <Link
          href={`/product/${item.slug}`}
          className="font-medium text-slate-800 hover:text-brand-700"
        >
          {item.nameBn}
        </Link>
        <p className="mt-0.5 text-xs text-slate-500">
          {unitLabel(item.unit)} · {taka(item.today)}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => decreaseQuantity(item.id)}
          disabled={item.quantity <= 1}
          aria-label="পরিমাণ কমান"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>
        <span className="w-9 text-center text-sm font-medium text-slate-800">
          {toBn(item.quantity)}
        </span>
        <button
          onClick={() => increaseQuantity(item.id)}
          aria-label="পরিমাণ বাড়ান"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          +
        </button>
      </div>

      <p className="w-24 text-right text-sm font-semibold text-slate-800">
        {taka(item.today * item.quantity)}
      </p>

      <button
        onClick={() => removeFromCart(item.id)}
        className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
      >
        ✕ মুছুন
      </button>
    </div>
  );
}

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    cartReady,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // wait for the saved cart to load, so the empty state does not flash
  if (!cartReady) {
    return (
      <div className="animate-pulse">
        <div className="h-7 w-40 rounded bg-slate-200" />
        <div className="mt-5 space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="h-14 rounded-lg bg-slate-100" />
          <div className="h-14 rounded-lg bg-slate-100" />
          <div className="h-14 rounded-lg bg-slate-100" />
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-800">
          আপনার কার্ট এখন খালি
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          পণ্যের দাম দেখে কার্টে যোগ করুন, এখানে সব একসাথে দেখতে পাবেন।
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
      <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">আমার কার্ট</h1>
      <p className="mt-1 text-sm text-slate-500">
        কার্টে {toBn(cartCount)} টি পণ্য আছে
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <section className="rounded-2xl border border-slate-200 bg-white px-5 py-2 shadow-sm">
          {cartItems.map((item) => (
            <CartRow
              key={item.id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </section>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-800">হিসাব</h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>মোট পণ্য</span>
              <span className="font-medium text-slate-800">
                {toBn(cartCount)} টি
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-3">
              <span className="font-medium text-slate-800">আনুমানিক মোট দাম</span>
              <span className="text-lg font-bold text-brand-800">
                {taka(cartTotal)}
              </span>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            কার্টে যোগ করার সময়ের দাম ধরে হিসাব করা হয়েছে, বাজার অনুযায়ী দাম
            বদলাতে পারে।
          </p>

          <Link
            href="/"
            className="mt-5 block rounded-lg border border-slate-200 px-5 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            আরও পণ্য দেখুন
          </Link>
        </aside>
      </div>
    </div>
  );
}
