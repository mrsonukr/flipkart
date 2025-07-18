import React, { useState, useEffect, useCallback, useRef } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts, getSalePrice, getMRP, getDiscountPercentage, formatPrice, getDeliveryDate } from "../../utils/productUtils";
import { cacheManager, performanceMonitor } from "../../utils/performanceUtils";
import LoadingSpinner from "../LoadingSpinner";

const PRODUCTS_PER_PAGE = 8;

const ProductGrid = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Intersection Observer ref
  const observer = useRef();
  const loadingRef = useRef();

  // Create intersection observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px', // Start loading 100px before reaching the bottom
      threshold: 0.1
    };

    observer.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loadingMore && !loading) {
        console.log('Loading more products...');
        loadMoreProducts();
      }
    }, options);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, loading]);

  // Observe the loading element
  useEffect(() => {
    const currentObserver = observer.current;
    const currentLoadingRef = loadingRef.current;

    if (currentObserver && currentLoadingRef) {
      currentObserver.observe(currentLoadingRef);
    }

    return () => {
      if (currentObserver && currentLoadingRef) {
        currentObserver.unobserve(currentLoadingRef);
      }
    };
  }, [displayedProducts]);

  useEffect(() => {
    loadInitialProducts();
  }, []);

  const loadInitialProducts = async () => {
    try {
      setLoading(true);
      performanceMonitor.start('initial-product-loading');
      
      // Try to get from cache first
      const cachedProducts = cacheManager.get('products');
      if (cachedProducts && cachedProducts.length > 0) {
        console.log('Loading from cache:', cachedProducts.length, 'products');
        setAllProducts(cachedProducts);
        setDisplayedProducts(cachedProducts.slice(0, PRODUCTS_PER_PAGE));
        setCurrentPage(1);
        setHasMore(cachedProducts.length > PRODUCTS_PER_PAGE);
        setLoading(false);
        performanceMonitor.end('initial-product-loading');
        return;
      }
      
      const data = await getAllProducts();
      console.log('Loaded products from API:', data.length);
      setAllProducts(data);
      setDisplayedProducts(data.slice(0, PRODUCTS_PER_PAGE));
      setCurrentPage(1);
      setHasMore(data.length > PRODUCTS_PER_PAGE);
      
      // Cache the products for faster subsequent loads
      cacheManager.set('products', data, 300000); // 5 minutes
      
      setError(null);
      performanceMonitor.end('initial-product-loading');
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = useCallback(async () => {
    if (loadingMore || !hasMore || loading) {
      console.log('Skipping load more:', { loadingMore, hasMore, loading });
      return;
    }
    
    try {
      console.log('Starting to load more products...');
      setLoadingMore(true);
      
      // Simulate network delay for smooth UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const startIndex = currentPage * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const newProducts = allProducts.slice(startIndex, endIndex);
      
      console.log(`Loading products ${startIndex} to ${endIndex}:`, newProducts.length);
      
      if (newProducts.length === 0) {
        console.log('No more products to load');
        setHasMore(false);
        return;
      }
      
      setDisplayedProducts(prev => {
        const updated = [...prev, ...newProducts];
        console.log('Total displayed products:', updated.length);
        return updated;
      });
      setCurrentPage(prev => prev + 1);
      setHasMore(endIndex < allProducts.length);
      
    } catch (err) {
      console.error('Error loading more products:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [allProducts, currentPage, loadingMore, hasMore, loading]);

  if (loading) {
    return (
      <div className="border border-gray-200">
        {/* Show skeleton grid while loading */}
        <div className="grid grid-cols-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border-b border-r border-gray-200 bg-white">
              <div className="p-2 h-[200px] bg-gray-100 animate-pulse"></div>
              <div className="px-3 py-2 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center py-4">
          <LoadingSpinner size="medium" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-gray-200">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-red-600 mb-2">{error}</p>
            <button 
              onClick={loadInitialProducts}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!displayedProducts || displayedProducts.length === 0) {
    return (
      <div className="border border-gray-200">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-gray-600 mb-2">No products found</p>
            <button 
              onClick={loadInitialProducts}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 bg-white">
      <div className="grid grid-cols-2 gap-0">
        {displayedProducts.map((product, index) => {
          const salePrice = getSalePrice(product);
          const mrp = getMRP(product);
          const discountPercentage = getDiscountPercentage();
          const deliveryText = `Free delivery by ${getDeliveryDate(product.delivery)}`;
          
          return (
            <div 
              key={`${product.id}-${index}`}
              className="border-b border-r border-gray-200 last:border-r-0 even:border-r-0"
            >
              <ProductCard
                href={`/product/${product.id}`}
                image={product.images[0]}
                title={product.name}
                brand={product.brand}
                discountPercent={`${discountPercentage}%`}
                oldPrice={formatPrice(mrp)}
                newPrice={formatPrice(salePrice)}
                badgeText={product.stockStatus}
                rating={Math.round(product.averageRating)}
                deliveryText={deliveryText}
              />
            </div>
          );
        })}
      </div>
      
      {/* Loading more indicator - invisible but used for intersection observer */}
      {hasMore && (
        <div 
          ref={loadingRef}
          className="w-full h-20 flex items-center justify-center border-t border-gray-200"
        >
          {loadingMore && (
            <div className="flex items-center justify-center py-4">
              <LoadingSpinner size="small" />
            </div>
          )}
        </div>
      )}
            <div className="mb-6"></div>
    </div>
  );
};

export default ProductGrid;