"use client";

import Image from "next/image";
import Link from "next/link";
import { MdDelete, MdShoppingCart } from "react-icons/md";
import { useCart } from "../../components/CartContext";

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

export default function CartPage() {
  const { items, updateQuantity, removeItem, clear, subtotal, count, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <span className="text-sm text-slate-600 dark:text-zinc-400">Loading cart…</span>
      </div>
    );
  }

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-10 lg:px-16">
        <h1 className="mb-6 text-3xl font-bold">Your Cart ({count})</h1>

        {isEmpty ? (
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-10 text-center dark:border-zinc-700 dark:bg-zinc-800/90">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:bg-sky-500/15">
              <MdShoppingCart className="h-6 w-6" />
            </div>
            <p className="mb-2 text-lg font-semibold">Your cart is empty</p>
            <p className="mb-6 text-sm text-slate-600 dark:text-zinc-400">
              Browse products and add your favorites to the cart.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white/95 p-4 dark:border-zinc-700 dark:bg-zinc-800/90"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-white">
                    <Image src={item.image || "/globe.svg"} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold">{item.name}</h3>
                        {item.attributes ? (
                          <p className="text-xs text-slate-600 dark:text-zinc-400">
                            {item.attributes.color} {item.attributes.storage} {item.attributes.region}
                          </p>
                        ) : null}
                      </div>
                      <span className="text-sm font-semibold">{formatCurrency(item.price)}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-900">
                        <button
                          className="px-2"
                          onClick={() => updateQuantity(item.key, Math.max(1, item.quantity - 1))}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.key, Number(e.target.value))}
                          className="w-12 border-0 bg-transparent text-center outline-none"
                        />
                        <button
                          className="px-2"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="inline-flex items-center gap-2 rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-600/40 dark:hover:bg-red-900/20"
                        onClick={() => removeItem(item.key)}
                      >
                        <MdDelete className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-6 dark:border-zinc-700 dark:bg-zinc-800/90">
              <h2 className="text-lg font-semibold">Summary</h2>
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400">
                Taxes and shipping will be calculated at checkout.
              </p>
              <Link
                href="/checkout"
                className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={clear}
                className="w-full rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800/70"
              >
                Clear Cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}


