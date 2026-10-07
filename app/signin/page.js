import SignInForm from "@/components/SignInForm";

export const metadata = {
  title: "সাইন ইন | বাজার দর",
};

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const callbackUrl =
    typeof params.callbackUrl === "string" ? params.callbackUrl : "";

  return (
    <div className="mx-auto max-w-md py-6 sm:py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-bold text-slate-800">সাইন ইন করুন</h1>
        <p className="mt-1 text-sm text-slate-500">
          ঢুকে পড়ুন আর প্রতিটি পণ্যের আজকের দাম, গতকালের সাথে পার্থক্য আর
          বাজারভিত্তিক তুলনা দেখুন।
        </p>

        <SignInForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
