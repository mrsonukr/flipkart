import React from "react";
import ProductCard from "./ProductCard";
import { getAllProducts, calculateDiscountedPrice, formatPrice, getDeliveryDate } from "../../utils/productUtils";

const ProductGrid = () => {
  const products = getAllProducts();

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