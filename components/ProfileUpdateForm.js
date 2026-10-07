"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileUpdateForm({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [photoUrl, setPhotoUrl] = useState(user.image || "");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(event) {
    event.preventDefault();

    if (name.trim().length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের দিতে হবে");
      return;
    }
    if (photoUrl && !photoUrl.startsWith("http")) {
      toast.error("ছবির লিংক http:// বা https:// দিয়ে শুরু হতে হবে");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: photoUrl.trim(),
    });

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      setLoading(false);
      return;
    }

    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleUpdate} className="mt-6 space-y-5">
      <div className="flex items-center gap-4">
        {photoUrl.startsWith("http") ? (
          <img
            src={photoUrl}
            alt="প্রোফাইল ছবি"
            className="h-16 w-16 rounded-full border border-slate-200 object-cover"
          />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-semibold text-white">
            {name ? name.charAt(0) : "ই"}
          </span>
        )}
        <p className="text-xs text-slate-500">
          ছবির লিংক দিলে এখানে প্রিভিউ দেখা যাবে
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">নাম</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          ছবির লিংক (photo URL)
        </label>
        <input
          type="text"
          value={photoUrl}
          onChange={(event) => setPhotoUrl(event.target.value)}
          placeholder="https://example.com/my-photo.jpg"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-500">ইমেইল</label>
        <input
          type="text"
          value={user.email}
          readOnly
          className="mt-1 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500"
        />
        <p className="mt-1 text-xs text-slate-400">
          এই প্রজেক্টে ইমেইল বদলানোর সুবিধা রাখা হয়নি
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-800 disabled:opacity-70 sm:w-auto sm:px-6"
      >
        {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}
