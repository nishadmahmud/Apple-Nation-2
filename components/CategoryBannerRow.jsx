"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { getCategoryId, fetchBanners, getBanners } from "../lib/api";

export default function CategoryBannerRow() {
  const [smartwatchBannerImage, setSmartwatchBannerImage] = useState("");
  const [headphonesBannerImage, setHeadphonesBannerImage] = useState("");

  const smartWatchesId = getCategoryId("smart-watches") || "smart-watches";
  const headphonesId = getCategoryId("headphones") || "headphones";

  // Fetch banner images from API
  useEffect(() => {
    const loadBannerImages = async () => {
      try {
        const apiUrl = getBanners();
        
        // Check if URL is valid
        if (!apiUrl) {
          console.warn("Banner API URL is not configured.");
          return;
        }
        
        console.log("Fetching banner images for CategoryBannerRow from:", apiUrl);
        
        const response = await fetchBanners();
        if (response?.success && response?.data && Array.isArray(response.data) && response.data.length >= 4) {
          // Third banner (index 2) for smartwatches
          if (response.data[2]?.image_path) {
            setSmartwatchBannerImage(response.data[2].image_path);
            console.log("Smartwatch banner image (3rd) loaded");
          }
          
          // Fourth banner (index 3) for headphones
          if (response.data[3]?.image_path) {
            setHeadphonesBannerImage(response.data[3].image_path);
            console.log("Headphones banner image (4th) loaded");
          }
        } else {
          console.warn("Not enough banner data found in API response (need at least 4 banners)");
        }
      } catch (error) {
        console.error("Error fetching banner images for CategoryBannerRow:", error);
        console.error("Attempted URL:", getBanners());
      }
    };

    loadBannerImages();
  }, []);
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <Link
        href={`/products?category=${smartWatchesId}`}
        className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
      >
        <div className="relative h-72 w-full sm:h-80 lg:h-96">
          {smartwatchBannerImage && (
            <Image
              src={smartwatchBannerImage}
              alt="Smart Watches"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              unoptimized
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        
      </Link>

      <Link
        href={`/products?category=${headphonesId}`}
        className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
      >
        <div className="relative h-72 w-full sm:h-80 lg:h-96">
          {headphonesBannerImage && (
            <Image
              src={headphonesBannerImage}
              alt="Headphones"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              unoptimized
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      
      </Link>
    </section>
  );
}


