import React from "react";
import ProductCard from "./ProductCard";
const products = [
  {
    href: "#",
    image:
      "https://cdn.shopify.com/s/files/1/0745/3756/6505/files/ID0780-1.jpg?v=1697570939",
    title: "Adidas x Bad Bunny Unisex Response CL Shoes",
    // brand: "Adidas",
    discountPercent: "96%",
    oldPrice: "₹9,800",
    badgeText: "Top Discount of the Sale",
    rating: 4,
    deliveryText: "Free delivery by 8 Jul",
  },
  {
    href: "#",
    image:
      "https://cdn.shopify.com/s/files/1/0745/3756/6505/files/ID0780-1.jpg?v=1697570939",
    title: "Nike Air Max Alpha Training Shoes",
    brand: "Nike",
    discountPercent: "80%",
    oldPrice: "₹7,000",
    badgeText: "Only Few Left",
    rating: 3,
    deliveryText: "Free delivery by 9 Jul",
  },
  {
    href: "#",
    image:
      "https://cdn.shopify.com/s/files/1/0745/3756/6505/files/ID0780-1.jpg?v=1697570939",
    title: "Puma Motorsport Edition Sneaker",
    brand: "Puma",
    discountPercent: "70%",
    oldPrice: "₹6,000",
    badgeText: "1 Left in Stock",
    rating: 5,
    deliveryText: "Free delivery by 10 Jul",
  },
  {
    href: "#",
    image:
      "https://cdn.shopify.com/s/files/1/0745/3756/6505/files/ID0780-1.jpg?v=1697570939",
    title: "Skechers GO Walk Arch Fit Shoes",
    brand: "Skechers",
    discountPercent: "60%",
    oldPrice: "₹5,500",
    badgeText: "Hot Deal",
    rating: 4,
    deliveryText: "Free delivery by 11 Jul",
  },
  {
    href: "#",
    image:
      "https://cdn.shopify.com/s/files/1/0745/3756/6505/files/ID0780-1.jpg?v=1697570939",
    title: "Reebok Training Sports Sneakers",
    brand: "Reebok",
    discountPercent: "50%",
    oldPrice: "₹4,000",
    badgeText: "Bank Offer Available",
    rating: 2,
    deliveryText: "Free delivery by 12 Jul",
  },
  {
    href: "#",
    image:
      "https://cdn.shopify.com/s/files/1/0745/3756/6505/files/ID0780-1.jpg?v=1697570939",
    title: "Campus Roadster Lightweight Shoes",
    brand: "Campus",
    discountPercent: "85%",
    oldPrice: "₹3,500",
    badgeText: "Steal Deal!",
    rating: 3,
    deliveryText: "Free delivery by 13 Jul",
  },
];

const ProductGrid = () => {
  return (
    <div className="border border-gray-200">
      <div className="grid grid-cols-2">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
