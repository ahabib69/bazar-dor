import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-base font-bold text-brand-800">
            <span>🛒</span> বাজার দর
          </p>
          <p className="mt-1 text-sm text-slate-600">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
          <p className="mt-2 text-xs text-slate-400">
            ডেটা সূত্র: নিত্যপণ্যের বাজারদর API
          </p>
        </div>

        <div className="sm:text-right">
          <div className="flex gap-4 sm:justify-end">
            <Link href="/" className="text-sm text-slate-600 hover:text-brand-700">
              হোম
            </Link>
            <Link
              href="/profile"
              className="text-sm text-slate-600 hover:text-brand-700"
            >
              প্রোফাইল
            </Link>
            <Link
              href="/signin"
              className="text-sm text-slate-600 hover:text-brand-700"
            >
              সাইন ইন
            </Link>
          </div>
          <p className="mt-2 max-w-xs text-xs italic text-slate-500">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
}
