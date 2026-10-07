import Image from "next/image";
import heroImage from "@/public/bazar-hero.png";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
      <div className="grid items-center gap-6 p-6 sm:p-8 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-600">
            প্রতিদিন সকালে দাম আপডেট
          </span>

          <h1 className="mt-4 text-2xl font-bold leading-snug text-slate-800 sm:text-3xl md:text-4xl">
            আজকের বাজার দর <span className="text-brand-700">এক নজরে</span>
          </h1>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস আর মসলার দাম কতটুকু বাড়ল বা কমল সেটা
            দেখে নিন। ৮টি ক্যাটাগরির ৩৩টি নিত্যপণ্যের দাম আর ৬টি বিভাগের বাজার
            তুলনা একসাথে।
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#সব-পণ্য"
              className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
            >
              সব পণ্যের দাম দেখুন
            </a>
            <span className="text-xs text-slate-500">
              দাম টাকায়, প্রতি কেজি / লিটার / ডজন ধরে
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={heroImage}
            alt="বাজারের ঝুড়ি"
            width={315}
            height={263}
            priority
            className="h-auto w-full max-w-xs"
          />
        </div>
      </div>
    </section>
  );
}
