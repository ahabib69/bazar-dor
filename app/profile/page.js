import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { bnDate } from "@/lib/format";
import SignOutButton from "@/components/SignOutButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "আমার প্রোফাইল | বাজার দর",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin?callbackUrl=/profile");
  }

  const user = session.user;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
        আমার প্রোফাইল
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখা যাবে।
      </p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          {user.image ? (
            // google account photo or the link given by the user
            <img
              src={user.image}
              alt={user.name}
              className="h-20 w-20 rounded-full border border-slate-200 object-cover"
            />
          ) : (
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-600 text-2xl font-semibold text-white">
              {user.name ? user.name.charAt(0) : "ই"}
            </span>
          )}

          <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold text-slate-800">{user.name}</h2>
            <p className="text-sm text-slate-500">{user.email}</p>
            <span className="mt-2 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              নিবন্ধিত ব্যবহারকারী
            </span>
          </div>
        </div>

        <dl className="mt-6 divide-y divide-slate-100 border-t border-slate-100 text-sm">
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-slate-500">নাম</dt>
            <dd className="text-right font-medium text-slate-700">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-slate-500">ইমেইল</dt>
            <dd className="text-right font-medium text-slate-700">
              {user.email}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-slate-500">অ্যাকাউন্ট খোলা হয়েছে</dt>
            <dd className="text-right font-medium text-slate-700">
              {bnDate(user.createdAt)}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-slate-500">ইউজার আইডি</dt>
            <dd className="max-w-[50%] truncate text-right font-medium text-slate-700">
              {user.id}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/profile/update"
            className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
          >
            তথ্য আপডেট করুন
          </Link>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
