import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { getCategories, getProducts } from "@/lib/api";

function ProductSection({ title, subtitle, badge, badgeClass, products }) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}>
          {badge}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  // both calls run together
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const risers = [...products]
    .filter((item) => item.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((item) => item.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-10">
      <Hero />

      <ProductSection
        title="আজ দাম বেড়েছে"
        subtitle="গতকালের তুলনায় যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে"
        badge="▲ বাড়তি দাম"
        badgeClass="bg-brand-50 text-brand-700"
        products={risers}
      />

      <ProductSection
        title="আজ দাম কমেছে"
        subtitle="গতকালের তুলনায় যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে"
        badge="▼ কমতি দাম"
        badgeClass="bg-red-50 text-red-600"
        products={fallers}
      />

      <section id="সব-পণ্য">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
              সব পণ্য
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              ক্যাটাগরি বেছে নিন, দাম অনুযায়ী সাজান আর পণ্যের বিস্তারিত দেখুন
            </p>
          </div>
        </div>

        <div className="mt-5">
          <ProductFilter products={products} categories={categories} />
        </div>
      </section>
    </div>
  );
}
