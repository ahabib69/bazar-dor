import SignUpForm from "@/components/SignUpForm";

export const metadata = {
  title: "সাইন আপ | বাজার দর",
};

export default async function SignUpPage({ searchParams }) {
  const params = await searchParams;
  const callbackUrl =
    typeof params.callbackUrl === "string" ? params.callbackUrl : "";

  return (
    <div className="mx-auto max-w-md py-6 sm:py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-bold text-slate-800">
          নতুন অ্যাকাউন্ট খুলুন
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          নাম, ইমেইল আর পাসওয়ার্ড দিয়ে অ্যাকাউন্ট খুলুন। ইমেইল ভেরিফিকেশন লাগবে
          না।
        </p>

        <SignUpForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
