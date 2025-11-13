"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdSearch, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { getAllProducts } from "../lib/api";

// In-memory cache for search results
const searchCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 20; // Maximum number of cached searches

// Cache for all products (loaded once)
let allProductsCache = null;
let allProductsCacheTime = null;
const ALL_PRODUCTS_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

// Get cached search results
const getCachedResults = (query) => {
  const normalizedQuery = query.toLowerCase().trim();
  const cached = searchCache.get(normalizedQuery);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.results;
  }
  return null;
};

// Set cached search results
const setCachedResults = (query, results) => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Limit cache size
  if (searchCache.size >= MAX_CACHE_SIZE) {
    // Remove oldest entry
    const firstKey = searchCache.keys().next().value;
    searchCache.delete(firstKey);
  }
  
  searchCache.set(normalizedQuery, {
    results,
    timestamp: Date.now(),
  });
};

// Client-side product search
const searchProducts = (products, query, limit = 8) => {
  if (!query || query.trim().length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const searchTerms = normalizedQuery.split(/\s+/);
  
  return products
    .filter((product) => {
      const name = String(product.name || "").toLowerCase();
      return searchTerms.every((term) => name.includes(term));
    })
    .slice(0, limit);
};

export default function NavBarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const debounceTimer = useRef(null);
  const abortControllerRef = useRef(null);
  const containerRef = useRef(null);

  // Load all products once and cache them
  useEffect(() => {
    const loadAllProducts = async () => {
      // Check if cache is still valid
      if (
        allProductsCache &&
        allProductsCacheTime &&
        Date.now() - allProductsCacheTime < ALL_PRODUCTS_CACHE_TTL
      ) {
        return;
      }

      try {
        const url = getAllProducts();
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Handle different response structures
        let products = [];
        if (Array.isArray(data?.data)) {
          products = data.data;
        } else if (Array.isArray(data)) {
          products = data;
        }

        if (products.length > 0) {
          allProductsCache = products;
          allProductsCacheTime = Date.now();
        }
      } catch (error) {
        console.error("Error loading products for search:", error);
      }
    };

    loadAllProducts();
  }, []);

  // Handle search with debouncing and caching
  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    // Check cache first
    const cachedResults = getCachedResults(searchQuery);
    if (cachedResults) {
      setResults(cachedResults);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      // Use cached products if available, otherwise fetch
      let productsToSearch = allProductsCache;
      
      if (!productsToSearch) {
        const url = getAllProducts();
        const response = await fetch(url, {
          signal: abortControllerRef.current.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Handle different response structures
        if (Array.isArray(data?.data)) {
          productsToSearch = data.data;
        } else if (Array.isArray(data)) {
          productsToSearch = data;
        } else {
          productsToSearch = [];
        }

        if (productsToSearch.length > 0) {
          allProductsCache = productsToSearch;
          allProductsCacheTime = Date.now();
        }
      }

      // Perform client-side search
      const searchResults = searchProducts(productsToSearch || [], searchQuery, 8);
      
      // Cache results
      setCachedResults(searchQuery, searchResults);
      
      setResults(searchResults);
    } catch (error) {
      if (error.name === "AbortError") {
        // Request was cancelled, ignore
        return;
      }
      console.error("Search error:", error);
      setResults([]);
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // Debounced search handler
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (query.trim().length >= 2) {
      debounceTimer.current = setTimeout(() => {
        performSearch(query);
      }, 300);
    } else {
      setResults([]);
      setLoading(false);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, performSearch]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    if (value.trim().length >= 2) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) {
      if (e.key === "Enter" && query.trim().length >= 2) {
        handleViewAll();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleProductClick(results[selectedIndex].id);
        } else if (results.length > 0) {
          handleProductClick(results[0].id);
        } else {
          handleViewAll();
        }
        break;
      case "Escape":
        setShowResults(false);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  // Handle product click
  const handleProductClick = (productId) => {
    setShowResults(false);
    setQuery("");
    router.push(`/products/${productId}`);
  };

  // Handle view all results
  const handleViewAll = () => {
    setShowResults(false);
    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  // Handle clear
  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowResults(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MdSearch className="h-5 w-5 text-slate-400 dark:text-zinc-500" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim().length >= 2 && results.length > 0) {
              setShowResults(true);
            }
            setIsExpanded(true);
          }}
          placeholder="Search products..."
          className="block w-full rounded-lg border border-slate-300 bg-white px-10 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-sky-500"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            aria-label="Clear search"
          >
            <MdClose className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div
          ref={resultsRef}
          className="absolute top-full z-50 mt-2 w-full max-h-96 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
        >
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900 dark:border-zinc-600 dark:border-t-zinc-100" />
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="max-h-80 overflow-y-auto">
                {results.map((product, index) => {
                  const imageSrc =
                    product.image_path ||
                    product.image_url ||
                    "/globe.svg";
                  const price =
                    product.discounted_price ?? product.retails_price;
                  const isSelected = index === selectedIndex;

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => handleProductClick(product.id)}
                      className={`flex items-center gap-3 border-b border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-700/50 ${
                        isSelected ? "bg-slate-50 dark:bg-zinc-700/50" : ""
                      }`}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-zinc-700">
                        <Image
                          src={imageSrc}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-semibold text-slate-900 dark:text-zinc-100">
                          {product.name}
                        </h4>
                        <p className="text-xs font-medium text-slate-600 dark:text-zinc-400">
                          {formatCurrency(price)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {query.trim().length >= 2 && (
                <div className="border-t border-slate-200 px-4 py-3 dark:border-zinc-700">
                  <button
                    type="button"
                    onClick={handleViewAll}
                    className="flex w-full items-center justify-between text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                  >
                    <span>View all results for "{query}"</span>
                    <MdKeyboardArrowDown className="h-5 w-5 rotate-[-90deg]" />
                  </button>
                </div>
              )}
            </>
          ) : query.trim().length >= 2 ? (
            <div className="px-4 py-8 text-center text-sm text-slate-600 dark:text-zinc-400">
              No products found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

