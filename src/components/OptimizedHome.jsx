import React, { Suspense, lazy } from "react";
import Header from "./Header";

// Lazy load heavy components for faster initial load
const CatScroll = lazy(() => import("./ui/CatScroll"));
const BannerSlider = lazy(() => import("./ui/BannerSlider"));
const ProductGrid = lazy(() => import("./ui/ProductGrid"));
const SaleCountdown = lazy(() => import("./ui/SaleCountdown"));

// Lightweight skeleton components for better perceived performance
const CatScrollSkeleton = () => (
  <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide px-2">
    <div className="inline-flex gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="w-16 h-16 bg-gray-200 animate-pulse rounded"></div>
      ))}
    </div>
  </div>
);

const BannerSkeleton = () => (
  <div className="w-full max-w-7xl mx-auto mb-4">
    <div className="h-40 bg-gray-200 animate-pulse rounded-lg mx-3 mb-2"></div>
  </div>
);

const ProductGridSkeleton = () => (
  <div className="border border-gray-200 bg-white">
    <div className="grid grid-cols-2 gap-0">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="border-b border-r border-gray-200 last:border-r-0 even:border-r-0 bg-white">
          <div className="p-3 h-[200px] bg-gray-100 animate-pulse"></div>
          <div className="px-3 py-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
const OptimizedHome = () => {
  return (
    <div>
      {/* Header loads immediately */}
      <Header />

      {/* Category scroll with fast fallback */}
      <Suspense fallback={<CatScrollSkeleton />}>
        <CatScroll />
      </Suspense>
      
      {/* Sale countdown loads quickly */}
      <Suspense fallback={<div className="h-12 bg-blue-50 animate-pulse"></div>}>
        <SaleCountdown duration={754} /> {/* 1 Hr 1 Min 0 Sec */}
      </Suspense>

      {/* Banner slider with fast fallback */}
      <Suspense fallback={<BannerSkeleton />}>
        <BannerSlider />
      </Suspense>
      
      {/* Product grid with optimized loading */}
      <div className="min-h-screen bg-gray-100">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  );
};

export default OptimizedHome;
