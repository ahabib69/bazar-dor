import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PriceTicker from "@/components/PriceTicker";
import { CartProvider } from "@/lib/cart-context";
import { getCategories } from "@/lib/api";
import { auth } from "@/lib/auth";
import { bnDate } from "@/lib/format";
import { headers } from "next/headers";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata = {
  title: "বাজার দর | নিত্যপণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ আর মাংসের আজকের বাজার দর। প্রতিদিনের দাম আপডেট আর বাজারভিত্তিক তুলনা।",
};

export default async function RootLayout({ children }) {
  let categories = [];

  try {
    categories = await getCategories();
  } catch (error) {
    categories = [];
  }

  let user = null;

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    user = session?.user || null;
  } catch (error) {
    user = null;
  }

  return (
    <html lang="bn" data-scroll-behavior="smooth" className={hindSiliguri.variable}>
      <body className="flex min-h-screen flex-col font-sans text-slate-800 antialiased">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#1f2937",
              border: "1px solid #e2e8f0",
              fontSize: "14px",
            },
          }}
        />

        <CartProvider>
          <Navbar categories={categories} user={user} today={bnDate()} />
          <PriceTicker />

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">
            {children}
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
