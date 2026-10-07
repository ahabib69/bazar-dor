import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProducts } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";
import { toBn } from "@/lib/format";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = await getProducts(slug);

  return (
    <div>
      <Link href="/" className="text-sm text-slate-500 hover:text-brand-700">
        ← হোম পেজ
      </Link>

      <header className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-3xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
            {category.nameBn}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            এই ক্যাটাগরিতে {toBn(products.length)} টি পণ্যের আজকের দাম আছে
          </p>
        </div>
      </header>

      <div className="mt-6">
        <CategoryProducts products={products} />
      </div>
    </div>
  );
}
