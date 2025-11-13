"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdMemory, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const INITIAL_CATEGORIES_COUNT = 16; // 2 rows × 8 categories

export default function CategoryShowcase({ categories = [] }) {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  if (!categories.length) {
    return null;
  }

  const displayedCategories = showAll ? categories : categories.slice(0, INITIAL_CATEGORIES_COUNT);
  const hasMoreCategories = categories.length > INITIAL_CATEGORIES_COUNT;

  return (
    <section ref={sectionRef} className="space-y-10">
      <div className="flex flex-col gap-4 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-sky-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-sky-600 dark:bg-sky-400/10 dark:text-sky-300 lg:self-start">
          Shop by Category
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
            Explore Essentials Tailored for Your Apple Ecosystem
          </h2>
          <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-zinc-400 lg:mx-0">
            Browse curated collections featuring the most-loved Apple Nation BD categories. Each section is optimized for quick discovery and deeper exploration.
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
          {displayedCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-sky-500/60"
            >
              {category.image_url ? (
                <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-700">
                  <Image
                    src={category.image_url}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="56px"
                    unoptimized
                  />
                </div>
              ) : (
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 transition-transform duration-300 group-hover:scale-110 dark:bg-sky-400/10 dark:text-sky-200">
                  <MdMemory className="h-7 w-7" aria-hidden />
                </span>
              )}
              <h3 className="text-center text-sm font-semibold text-slate-900 dark:text-zinc-100">
                {category.name}
              </h3>
              {category.product_count > 0 && (
                <span className="text-xs text-slate-500 dark:text-zinc-400">
                  {category.product_count} {category.product_count === 1 ? "item" : "items"}
                </span>
              )}
            </Link>
          ))}
        </div>
        {hasMoreCategories && (
          <div className="flex justify-center">
            {!showAll ? (
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 rounded-full border-2 border-sky-600 bg-white px-6 py-3 text-sm font-semibold text-sky-600 transition-colors hover:bg-sky-50 dark:border-sky-400 dark:bg-zinc-800 dark:text-sky-400 dark:hover:bg-zinc-700"
              >
                View All Categories
                <MdKeyboardArrowDown className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowAll(false);
                  // Smooth scroll to top of categories section
                  setTimeout(() => {
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-sky-600 bg-white px-6 py-3 text-sm font-semibold text-sky-600 transition-colors hover:bg-sky-50 dark:border-sky-400 dark:bg-zinc-800 dark:text-sky-400 dark:hover:bg-zinc-700"
              >
                Show Less
                <MdKeyboardArrowUp className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

