"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MdRefresh, MdHome, MdReportProblem } from "react-icons/md";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
            <MdReportProblem className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="mb-3 text-3xl font-bold text-slate-900 dark:text-zinc-100 sm:text-4xl">
            Something Went Wrong
          </h1>
          <p className="mb-2 text-base text-slate-600 dark:text-zinc-400 sm:text-lg">
            We encountered an unexpected error. Don&apos;t worry, our team has
            been notified.
          </p>
          {process.env.NODE_ENV === "development" && error?.message && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-left dark:border-red-800 dark:bg-red-900/10">
              <p className="text-sm font-mono text-red-800 dark:text-red-300">
                {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-sky-400 dark:hover:text-white"
          >
            <MdRefresh className="h-5 w-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
          >
            <MdHome className="h-5 w-5" />
            Go Home
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-zinc-700">
          <p className="text-sm text-slate-600 dark:text-zinc-400">
            If this problem persists, please{" "}
            <Link
              href="/contact"
              className="font-semibold text-sky-600 underline-offset-4 hover:underline dark:text-sky-400"
            >
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
