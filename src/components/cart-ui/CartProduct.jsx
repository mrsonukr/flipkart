import React, { useState, useEffect, useRef } from "react";

// Your products array
const products = [
  {
    id: "prod_013",
    name: "POCO M6 Plus 5G (Misty Lavender, 128 GB)  (8 GB RAM)",
    brand: "POCO",
    category: "mobile",
    basePrice: 17999,
    discountPercentage: 80,
    images: [
      "https://rukminim2.flixcart.com/image/808/970/xif0q/mobile/9/b/n/-original-imah3afnqj84usyy.jpeg",
    ],
    averageRating: 4,
    totalReviews: 18523,
    stockStatus: "Performance Beast",
    variants: [
      { type: "color", name: "Misty Lavender" },
      { type: "storage", name: "256 GB" },
    ],
    delivery: 2,
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max (Natural Titanium, 256 GB)",
    brand: "Apple",
    category: "mobile",
    basePrice: 144900,
    discountPercentage: 90,
    images: [
      "https://rukminim2.flixcart.com/image/808/970/xif0q/mobile/u/8/w/-original-imah4jz6qhwgukgt.jpeg?q=60&crop=false",
    ],
    averageRating: 5,
    totalReviews: 71204,
    stockStatus: "Top Discount",
    variants: [
      { type: "color", name: "Natural Titanium" },
      { type: "storage", name: "256 GB" },
    ],
    delivery: 2,
  },
];
const formatDeliveryDate = (days) => {
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + days);

  const day = deliveryDate.getDate();
  const month = deliveryDate.toLocaleString("default", { month: "short" });
  const weekday = deliveryDate.toLocaleString("default", { weekday: "long" });

  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${day} ${month}, ${weekday}`;
};

const CartProduct = () => {
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const [showQtyDropdown, setShowQtyDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const discountAmount = Math.round(
    (product.basePrice * product.discountPercentage) / 100
  );
  const finalPrice = product.basePrice - discountAmount;
  const deliveryText = formatDeliveryDate(product.delivery);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowQtyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white px-4 pt-4 mt-3">
      <div className="flex justify-start flex-row gap-5 mt-1">
        {/* Image + Qty */}
        <div className="flex flex-col justify-start gap-2">
          <div className="w-20 h-18 border border-gray-400 rounded overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Qty Selector */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center text-xs font-medium p-2 text-center border border-gray-400 rounded cursor-pointer"
              onClick={() => setShowQtyDropdown(!showQtyDropdown)}
            >
              Qty:{" "}
              <span className="mx-1">
                {selectedQty.toString().padStart(2, "0")}
              </span>
              <img
                src="/assets/images/svg/down.svg"
                alt="dropdown"
                className="h-3 ml-1 mb-[-2px]"
              />
            </div>

            {showQtyDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow z-10 text-sm">
                {[1, 2, 3, 4, 5].map((qty) => (
                  <div
                    key={qty}
                    className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                      qty === selectedQty ? "font-semibold text-blue-600" : ""
                    }`}
                    onClick={() => {
                      setSelectedQty(qty);
                      setShowQtyDropdown(false);
                    }}
                  >
                    {qty}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-start gap-2">
          {/* Name (brand + name) */}
          <div className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 max-w-[230px]">
            {product.brand} {product.name}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-xs">
            <img
              src="/assets/images/svg/rating4.svg"
              alt="Rating"
              className="w-[70px]"
            />
            <span className="mt-0.5 text-green-700">
              {product.averageRating}
            </span>
            <span className="mt-0.5 text-gray-500">•</span>
            <span className="mt-0.5 font-medium text-gray-500">
              ({product.totalReviews.toLocaleString()})
            </span>
          </div>

          {/* Price + Discount */}
          <div className="flex gap-1 font-medium text-lg items-center">
            <img
              src="/assets/images/svg/discount.svg"
              alt="Discount"
              className="w-auto h-4"
            />
            <span className="text-green-700 ml-[-3px]">
              {product.discountPercentage}%
            </span>
            <span className="text-gray-500 line-through text-base mt-0.5 ml-1">
              ₹{product.basePrice.toLocaleString()}
            </span>
            <span className="text-black">₹{finalPrice.toLocaleString()}</span>
          </div>

          {/* Offers */}
          <div className="mt-[-5px] text-green-700 text-sm font-medium">
            3 offers available
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="flex gap-1 my-2 items-center">
        <img
          src="/assets/images/svg/car.png"
          alt="Delivery"
          className="w-5 h-5 mt-1"
        />
        <span className="text-xs font-medium italic mt-1.5">EXPRESS</span>
        <span className="text-xs mt-1 ml-1">
          Free delivery by {deliveryText}
        </span>
        <span className="mt-1 text-gray-700">•</span>
        <span className="text-gray-600 text-xs font-light mt-1 line-through">
          ₹70
        </span>
        <span className="text-green-700 text-sm mt-1 font-medium">FREE</span>
      </div>

      {/* Save & Remove */}
      <div className="flex justify-around gap-4 p-3 bg-white border-t border-gray-200">
        <div className="flex-1 text-center relative after:content-[''] after:absolute after:right-0 after:top-0 after:h-[170%] after:w-px after:mt-[-13px] after:bg-gray-200">
          <div className="inline-flex items-center gap-2 justify-center text-sm font-medium text-gray-500">
            <svg
              width="16"
              height="16"
              viewBox="0 0 256 256"
              className="inline-block align-middle"
            >
              <path fill="none" d="M0 0h256v256H0z" />
              <path
                d="M208 216H48a8 8 0 0 1-8-8V72l16-32h144l16 32v136a8 8 0 0 1-8 8Z"
                fill="none"
                stroke="#717478"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <path
                fill="none"
                stroke="#717478"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                d="M94.1 150.1L128 184l33.9-33.9M128 104v80M40 72h176"
              />
            </svg>
            <span>Save for later</span>
          </div>
        </div>

        <div className="flex-1 text-center">
          <div className="inline-flex items-center gap-2 justify-center text-sm font-medium text-gray-500">
            <svg
              width="16"
              height="16"
              viewBox="0 0 256 256"
              className="inline-block align-middle"
            >
              <path fill="none" d="M0 0h256v256H0z" />
              <path
                fill="none"
                stroke="#717478"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                d="M216 56H40M104 104v64M152 104v64M200 56v152a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8V56M168 56V40a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v16"
              />
            </svg>
            <span>Remove</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
