"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Discover Premium Apple Accessories",
    subtitle: "Gadget Hub",
    description: "Shop the latest devices, authentic accessories, and unbeatable deals for your everyday tech lifestyle.",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&h=800&fit=crop&q=80",
    ctaText: "Shop Now",
    ctaLink: "/products",
    bgGradient: "from-sky-500/20 via-blue-500/10 to-emerald-500/20",
  },
  {
    id: 2,
    title: "Best Deals on Apple Products",
    subtitle: "Limited Time",
    description: "Get exclusive discounts on iPhone, iPad, AirPods, and more. Fast delivery across Bangladesh.",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1200&h=800&fit=crop&q=80",
    ctaText: "View Deals",
    ctaLink: "/products",
    bgGradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
  },
  {
    id: 3,
    title: "New Arrivals Every Week",
    subtitle: "Fresh Stock",
    description: "Be the first to get the latest Apple products and accessories. Stay ahead with Apple Nation.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=800&fit=crop&q=80",
    ctaText: "Explore",
    ctaLink: "/products",
    bgGradient: "from-amber-500/20 via-orange-500/10 to-red-500/20",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };


  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative isolate overflow-hidden rounded-sm bg-gradient-to-br from-slate-200 via-white to-slate-100 shadow-lg shadow-slate-900/5 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.bgGradient} transition-all duration-1000`} />
      
      <div className="relative mx-auto flex max-w-7xl flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
        {/* Image */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full overflow-hidden rounded-sm bg-white/90 p-3 shadow-xl shadow-slate-900/10 backdrop-blur-sm sm:max-w-4xl sm:p-4 dark:bg-zinc-900/70">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-slate-100 dark:bg-zinc-800">
              <Image
                src={currentSlideData.image}
                alt={currentSlideData.title}
                fill
                className="object-contain transition-transform duration-700"
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 900px"
                priority={currentSlide === 0}
              />
            </div>
          </div>
          
          {/* Decorative Blobs */}
          <div className="absolute -left-20 top-8 hidden h-32 w-32 rounded-full bg-sky-400/20 blur-3xl lg:block" />
          <div className="absolute -right-14 -bottom-8 hidden h-28 w-28 rounded-full bg-emerald-400/20 blur-3xl lg:block" />
        </div>

        {/* Content at Bottom */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700 dark:bg-white/10 dark:text-zinc-200">
            Apple Nation BD
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {currentSlideData.subtitle}
            </span>
          </div>
          
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-zinc-100">
            {currentSlideData.title}
          </h1>
          
          <p className="max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base dark:text-zinc-300">
            {currentSlideData.description}
          </p>

          {/* Slide Indicators */}
          <div className="flex items-center gap-2 py-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-sky-600 dark:bg-sky-500"
                    : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href={currentSlideData.ctaLink}
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/30 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
            >
              {currentSlideData.ctaText}
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors duration-300 hover:border-slate-400 hover:bg-slate-200/60 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/60"
            >
              Browse All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

