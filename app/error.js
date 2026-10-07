"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="text-5xl">⚠️</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-800">
        দামের তথ্য আনা যাচ্ছে না
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        সার্ভার থেকে ডেটা লোড করা যায়নি। ইন্টারনেট বা API একটু পরে আবার চেষ্টা
        করুন।
      </p>
      <p className="mt-1 text-xs text-slate-400">
        {error?.message || "unknown error"}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
        >
          আবার চেষ্টা করুন
        </button>
        <Link
          href="/"
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
