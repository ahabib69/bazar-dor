"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm({ callbackUrl = "" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();

    if (name.trim().length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের দিতে হবে");
      return;
    }
    if (!email.includes("@")) {
      toast.error("সঠিক ইমেইল এড্রেস দিন");
      return;
    }
    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের দিতে হবে");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন করা যায়নি");
      setLoading(false);
      return;
    }

    // sign up also creates a session, so we sign out and send the user to login
    await authClient.signOut();

    toast.success("রেজিস্ট্রেশন সফল হয়েছে, এখন সাইন ইন করুন");
    setLoading(false);
    router.push(
      callbackUrl ? `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/signin"
    );
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl || "/",
    });

    if (error) {
      toast.error("গুগল দিয়ে সাইন ইন করা যায়নি");
      setGoogleLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="আপনার নাম"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            ইমেইল
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@gmail.com"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="কমপক্ষে ৬ অক্ষর"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-800 disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              রেজিস্ট্রেশন হচ্ছে...
            </span>
          ) : (
            "রেজিস্টার করুন"
          )}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400">অথবা</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-70"
      >
        <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
          <path
            fill="#EA4335"
            d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.7l7.8 6.1C12.3 14 17.7 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.4-4.7 7l7.6 5.9c4.4-4.1 6.8-10.1 6.8-17.4z"
          />
          <path
            fill="#FBBC05"
            d="M10.4 28.2c-.5-1.4-.8-2.9-.8-4.2s.3-2.9.8-4.2l-7.8-6.1C1 16.7 0 20.2 0 24s1 7.3 2.6 10.3l7.8-6.1z"
          />
          <path
            fill="#34A853"
            d="M24 47.5c6.2 0 11.5-2 15.3-5.6l-7.6-5.9c-2.1 1.4-4.8 2.3-7.7 2.3-6.3 0-11.7-4.5-13.6-10.4l-7.8 6.1C6.5 42.1 14.6 47.5 24 47.5z"
          />
        </svg>
        {googleLoading ? "অপেক্ষা করুন..." : "গুগল দিয়ে সাইন আপ"}
      </button>

      <p className="mt-5 text-center text-sm text-slate-500">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link
          href={
            callbackUrl
              ? `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
              : "/signin"
          }
          className="font-medium text-brand-700 hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
