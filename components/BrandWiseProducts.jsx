"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { getBrandProducts } from "../lib/api";
import { useCart } from "./CartContext";

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

// Brand tabs configuration
const BRAND_TABS = [
  { id: 0, name: "All" },
  { id: 1682, name: "One Plus" }, // Redmi/OnePlus brand ID from API example
  // Add more brands as needed - these IDs should match your actual brand IDs
  { id: 1, name: "Pixel" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Xiaomi" },
];

export default function BrandWiseProducts() {
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem, items } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const url = getBrandProducts(selectedBrand, 1);
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data?.success && data?.data?.data) {
          // Limit to first 12 products for display
          setProducts(data.data.data.slice(0, 12));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching brand products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedBrand]);

  const calculatePrice = (product) => {
    const retailPrice = product.retails_price || 0;
    if (product.discount && product.discount_type === "Percentage") {
      return retailPrice - (retailPrice * product.discount) / 100;
    } else if (product.discount && product.discount_type !== "Percentage") {
      return retailPrice - product.discount;
    }
    return retailPrice;
  };

  const handleAddToCart = (product) => {
    const price = calculatePrice(product);
    addItem({
      id: product.id,
      name: product.name,
      price: price || 0,
      image: product.image_path || product.image_url || "/globe.svg",
    });
  };

  const isInCart = (productId) => {
    return items.some((it) => String(it.id) === String(productId));
  };

  const isOutOfStock = (product) => {
    return product.current_stock === 0 || product.current_stock === null;
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-zinc-100">
          Top Brand Products
        </h2>
      </div>

      {/* Brand Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-200 pb-4 dark:border-zinc-700 lg:justify-start">
        {BRAND_TABS.map((brand) => (
          <button
            key={brand.id}
            onClick={() => setSelectedBrand(brand.id)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
              selectedBrand === brand.id
                ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {brand.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 dark:border-zinc-700 dark:border-t-zinc-100" />
        </div>
      ) : products.length === 0 ? (
        <div className="py-12 text-center text-slate-600 dark:text-zinc-400">
          No products found for this brand.
        </div>
      ) : (
        <div className="-mx-6 overflow-x-auto px-6 scrollbar-hide">
          <div className="flex snap-x snap-mandatory gap-6 pb-4">
            {products.map((product) => {
              const imageSrc =
                product.image_path || product.image_url || "/globe.svg";
              const price = calculatePrice(product);
              const original = product.retails_price || 0;
              const hasDiscount = price !== original && original && product.discount;
              const stockOut = isOutOfStock(product);
              const inCart = isInCart(product.id);

              return (
                <article
                  key={product.id}
                  className="group relative flex w-72 shrink-0 snap-start flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800/90 dark:hover:border-sky-500/60"
                >
                  {/* Product Image */}
                  <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-700/50">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 16rem, 18rem"
                        unoptimized
                      />
                    </Link>
                    {product.discount ? (
                      <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        {product.discount_type === "Percentage"
                          ? `${product.discount}% OFF`
                          : `৳${Number(product.discount || 0).toLocaleString("en-US")}`}
                      </span>
                    ) : null}
                    {stockOut && (
                      <span className="absolute right-3 top-3 z-10 inline-flex items-center rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                        Stock Out
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <Link href={`/products/${product.id}`} className="block">
                      <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-sky-600 dark:text-zinc-100 dark:group-hover:text-sky-400 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold text-slate-900 dark:text-zinc-100">
                        {formatCurrency(price)}
                      </span>
                      {hasDiscount ? (
                        <span className="text-sm text-slate-500 line-through dark:text-zinc-500">
                          {formatCurrency(original)}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto flex items-center gap-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 rounded-full bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-sky-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-sky-400 dark:hover:text-white"
                    >
                      Buy Now
                    </Link>
                    {inCart ? (
                      <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-slate-900 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                      >
                        <MdShoppingCart className="h-4 w-4" />
                        In Cart
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        disabled={stockOut}
                        className={`inline-flex items-center gap-2 rounded-full border-2 border-slate-900 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 ${
                          stockOut
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }`}
                      >
                        <MdShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

