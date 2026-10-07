import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="text-5xl">🧺</p>
      <p className="mt-4 text-sm font-semibold tracking-widest text-brand-600">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold text-slate-800">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        আপনি যে পেজটি খুঁজছেন সেটি নেই, অথবা লিংকটি ভুল হয়ে গেছে।
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
