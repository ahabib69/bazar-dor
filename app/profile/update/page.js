import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "তথ্য আপডেট | বাজার দর",
};

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin?callbackUrl=/profile/update");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/profile" className="text-sm text-slate-500 hover:text-brand-700">
        ← প্রোফাইলে ফিরে যান
      </Link>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-bold text-slate-800">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-slate-500">
          আপনার নাম আর ছবি বদলাতে পারবেন। ছবির জন্য যেকোনো ইমেজ লিংক দিতে পারেন।
        </p>

        <ProfileUpdateForm
          user={{
            name: session.user.name,
            image: session.user.image || "",
            email: session.user.email,
          }}
        />
      </div>
    </div>
  );
}
