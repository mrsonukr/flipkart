import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts, calculateDiscountedPrice, formatPrice, getDeliveryDate } from "../../utils/productUtils";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <p className="text-red-600 mb-2">{error}</p>
          <button 
            onClick={loadProducts}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200">
      <div className="grid grid-cols-2">
        {products.map((product) => {
          const discountedPrice = calculateDiscountedPrice(product.basePrice, product.discountPercentage);
          const deliveryText = `Free delivery by ${getDeliveryDate(product.delivery)}`;
          
          return (
            <ProductCard
              key={product.id}
              href={`/product/${product.id}`}
              image={product.images[0]}
              title={product.name}
              brand={product.brand}
              discountPercent={`${product.discountPercentage}%`}
              oldPrice={formatPrice(product.basePrice)}
              newPrice={formatPrice(discountedPrice)}
              badgeText={product.stockStatus}
              rating={Math.round(product.averageRating)}
              deliveryText={deliveryText}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;