"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/lib/cart-context";
import { toBn } from "@/lib/format";

export default function AddToCartButton({ product }) {
  const { cartItems, addToCart } = useCart();

  const itemInCart = cartItems.find((item) => item.id === product.id);

  function handleAddToCart() {
    addToCart(product);

    if (itemInCart) {
      toast("কার্টে আগেই আছে, পরিমাণ ১ বাড়ানো হলো", { icon: "🛒" });
    } else {
      toast.success("কার্টে যোগ হয়েছে");
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleAddToCart}
        className="w-full rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800 sm:w-auto"
      >
        🛒 কার্টে যোগ করুন
      </button>

      {itemInCart && (
        <p className="mt-2 text-xs text-slate-500">
          কার্টে আছে ({toBn(itemInCart.quantity)} টি) ·{" "}
          <Link
            href="/cart"
            className="font-medium text-brand-700 hover:underline"
          >
            কার্ট দেখুন
          </Link>
        </p>
      )}
    </div>
  );
}
