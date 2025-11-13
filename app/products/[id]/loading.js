export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-16">
        {/* Back Button Skeleton */}
        <div className="mb-6 h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-zinc-700" />

        {/* Product Details Grid Skeleton */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square w-full animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-700" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-20 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-zinc-700"
                />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-zinc-700" />
              <div className="h-6 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-zinc-700" />
            </div>
            <div className="h-12 w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-zinc-700" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-zinc-700" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-zinc-700" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-slate-200 dark:bg-zinc-700" />
            </div>
            <div className="h-12 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

