import { getProducts } from "@/lib/api";
import { arrowOf, percent, toBn, unitShort } from "@/lib/format";

export default async function PriceTicker() {
  let products = [];

  try {
    products = await getProducts();
  } catch (error) {
    // ticker is not important, if the api is down the page itself shows the error
    return null;
  }

  const items = products.slice(0, 14);

  return (
    <div className="overflow-hidden bg-brand-800 py-2 text-white">
      <div className="marquee">
        {[...items, ...items].map((product, index) => (
          <span
            key={`${product.id}-${index}`}
            className="flex items-center gap-2 whitespace-nowrap px-6 text-sm"
          >
            <span>{product.image}</span>
            <span className="font-medium">{product.nameBn}</span>
            <span className="text-brand-100">
              {toBn(product.today)} টাকা/{unitShort(product.unit)}
            </span>
            <span
              className={
                product.change.dir === "down" ? "text-red-200" : "text-accent-200"
              }
            >
              {arrowOf(product.change.dir)} {percent(product.change.pct)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
