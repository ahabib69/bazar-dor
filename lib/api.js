// api base url, change it in .env.local if the api changes
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

// all products, or one category's products
export async function getProducts(category) {
  const url = category
    ? `${BASE_URL}/products?category=${category}`
    : `${BASE_URL}/products`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("products could not be loaded");
  }
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("categories could not be loaded");
  }
  return res.json();
}

// single category, returns null if the slug is wrong so we can show 404
export async function getCategory(slug) {
  const res = await fetch(`${BASE_URL}/categories/${slug}`, {
    cache: "no-store",
  });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("category could not be loaded");
  }
  return res.json();
}

// single product, returns null if the slug is not found
export async function getProduct(slug) {
  const res = await fetch(`${BASE_URL}/products/${slug}`, {
    cache: "no-store",
  });

  if (res.ok) {
    const data = await res.json();
    // the api answers this endpoint with an id, so we only trust it if it
    // really has the slug we asked for
    if (data && data.slug === slug) {
      return data;
    }
  }

  // fallback: this api only supports /products/<id>, so search the full list
  const products = await getProducts();
  const found = products.find((item) => item.slug === slug);
  return found || null;
}
