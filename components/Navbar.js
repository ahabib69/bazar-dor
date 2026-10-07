"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/lib/cart-context";
import { toBn } from "@/lib/format";

export default function Navbar({ categories = [], user = null, today = "" }) {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // close the menus when the user goes to another page
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest("#user-menu")) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  async function handleSignOut() {
    await authClient.signOut();
    setDropdownOpen(false);
    setMenuOpen(false);
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  function linkClass(isActive) {
    if (isActive) {
      return "rounded-md bg-brand-100 px-3 py-1.5 text-sm font-medium text-brand-800";
    }
    return "rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900";
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span>
            <span className="block text-lg font-bold leading-tight text-brand-800">
              বাজার দর
            </span>
            <span className="block text-[11px] text-slate-500">{today}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <span className="text-base">🛒</span>
            <span className="hidden sm:inline">কার্ট</span>
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-600 px-1 text-[11px] font-semibold text-white">
                {toBn(cartCount)}
              </span>
            )}
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            {user ? (
              <div id="user-menu" className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-3 hover:bg-slate-50"
                >
                  {user.image ? (
                    // user photo can be any url, so a normal img is easier here
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                      {user.name ? user.name.charAt(0) : "ই"}
                    </span>
                  )}
                  <span className="max-w-[7rem] truncate text-sm font-medium text-slate-700">
                    {user.name}
                  </span>
                  <svg
                    className="h-4 w-4 text-slate-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M6 8l4 4 4-4" strokeLinecap="round" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                    <div className="border-b border-slate-100 px-3 py-2">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    আমার প্রোফাইল
                  </Link>
                  <Link
                    href="/profile/update"
                    className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    তথ্য আপডেট করুন
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800"
              >
                সাইন আপ
              </Link>
            </>
          )}
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 sm:hidden"
          aria-label="মেনু"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <nav className="border-t border-slate-100 bg-brand-50/70">
        <div className="no-scrollbar mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2">
          <Link
            href="/"
            className={`whitespace-nowrap ${linkClass(pathname === "/")}`}
          >
            সব পণ্য
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={`whitespace-nowrap ${linkClass(
                pathname === `/category/${category.slug}`
              )}`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.nameBn}
            </Link>
          ))}
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 sm:hidden">
          <Link
            href="/cart"
            className="mb-2 flex items-center justify-between rounded-md bg-brand-50 px-3 py-2 text-sm font-medium text-brand-800"
          >
            <span>🛒 কার্ট</span>
            <span>{toBn(cartCount)} টি</span>
          </Link>

          {user ? (
            <div className="space-y-1">
              <p className="pb-1 text-sm text-slate-500">{user.email}</p>
              <Link
                href="/profile"
                className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                আমার প্রোফাইল
              </Link>
              <Link
                href="/profile/update"
                className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                তথ্য আপডেট করুন
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/signin"
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="flex-1 rounded-lg bg-brand-700 px-4 py-2 text-center text-sm font-medium text-white"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
