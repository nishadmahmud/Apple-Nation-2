import Link from "next/link";
import { MdHome, MdShoppingBag, MdSearch } from "react-icons/md";

export const metadata = {
  title: "404 - Page Not Found | Apple Nation BD",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-slate-50 px-4 py-16 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-2xl text-center">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-slate-900 dark:text-zinc-100 sm:text-9xl">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-zinc-100 sm:text-3xl">
            Page Not Found
          </h2>
          <p className="text-base text-slate-600 dark:text-zinc-400 sm:text-lg">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-sky-400 dark:hover:text-white"
          >
            <MdHome className="h-5 w-5" />
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
          >
            <MdShoppingBag className="h-5 w-5" />
            Browse Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
          >
            <MdSearch className="h-5 w-5" />
            Contact Us
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-zinc-700">
          <p className="mb-4 text-sm font-medium text-slate-700 dark:text-zinc-300">
            Popular Pages:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 dark:text-zinc-400">
            <Link
              href="/products"
              className="underline-offset-4 hover:text-sky-600 hover:underline dark:text-zinc-400 dark:hover:text-sky-400"
            >
              All Products
            </Link>
            <Link
              href="/blogs"
              className="underline-offset-4 hover:text-sky-600 hover:underline dark:text-zinc-400 dark:hover:text-sky-400"
            >
              Blogs
            </Link>
            <Link
              href="/contact"
              className="underline-offset-4 hover:text-sky-600 hover:underline dark:text-zinc-400 dark:hover:text-sky-400"
            >
              Contact
            </Link>
            <Link
              href="/warranty"
              className="underline-offset-4 hover:text-sky-600 hover:underline dark:text-zinc-400 dark:hover:text-sky-400"
            >
              Warranty
            </Link>
            <Link
              href="/return-refund"
              className="underline-offset-4 hover:text-sky-600 hover:underline dark:text-zinc-400 dark:hover:text-sky-400"
            >
              Returns & Refunds
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
