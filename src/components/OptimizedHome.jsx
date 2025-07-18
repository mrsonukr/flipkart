import React, { Suspense, lazy } from "react";
import Header from "./Header";

// Lazy load heavy components for faster initial load
const CatScroll = lazy(() => import("./ui/CatScroll"));
const BannerSlider = lazy(() => import("./ui/BannerSlider"));
const ProductGrid = lazy(() => import("./ui/ProductGrid"));
const SaleCountdown = lazy(() => import("./ui/SaleCountdown"));


const OptimizedHome = () => {
  return (
    <div>
      {/* Header loads immediately */}
      <Header />

      {/* Category scroll with fast fallback */}
      <Suspense fallback={<div></div>}>
        <CatScroll />
      </Suspense>
      
      {/* Sale countdown loads quickly */}
      <Suspense fallback={<div></div>}>
        <SaleCountdown duration={754} /> {/* 1 Hr 1 Min 0 Sec */}
      </Suspense>

      {/* Banner slider with fast fallback */}
      <Suspense fallback={<div></div>}>
        <BannerSlider />
      </Suspense>
      
      {/* Product grid with optimized loading */}
      <div className="min-h-screen bg-gray-100">
        <Suspense fallback={<div></div>}>
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  );
};

export default OptimizedHome;
