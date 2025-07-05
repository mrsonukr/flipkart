import React from "react";
import { FaStar } from "react-icons/fa";
const ProductCard = ({
  href,
  image,
  title,
  brand = "", // brand is optional
  discountPercent,
  oldPrice,
  badgeText,
  rating = 0,
  deliveryText,
  assuredImg = "/assets/images/svg/assured_new.png",
}) => {
  const numericOldPrice = parseFloat(oldPrice.replace(/[^0-9.]/g, ""));
  const numericDiscount = parseFloat(discountPercent.replace(/[^0-9.]/g, ""));
  const newPrice = `₹${Math.round(
    numericOldPrice * (1 - numericDiscount / 100)
  )}`;

  const badgeStyle = badgeText
    ? badgeText.includes("Top Discount")
      ? "text-green-700 bg-green-100"
      : badgeText.includes("Left")
      ? "text-red-600 bg-red-100"
      : badgeText.includes("Bank")
      ? "text-blue-600 bg-blue-100"
      : "text-gray-600 bg-gray-100"
    : "";

  return (
    <a
      href={href}
      className="flex flex-col relative box-border border-b border-r border-gray-200 bg-white"
    >
      <div className="relative h-[200px] bg-white w-full overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 flex justify-center items-center">
          <svg width="24" height="24" viewBox="0 0 256 256">
            <path fill="none" d="M0 0h256v256H0z" />
            <path
              d="M128 216S28 160 28 92a52 52 0 0 1 100-20h0a52 52 0 0 1 100 20c0 68-100 124-100 124Z"
              fill="#fff"
              stroke="#B8BBBF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
          </svg>
        </div>
      </div>

      <div className="w-full px-3 py-2">
        <h2 className="font-semibold text-sm min-h-[20px] text-black">
          {brand || <span>&nbsp;</span>}
        </h2>

        <h3 className="text-xs leading-[18px] font-normal text-gray-500 truncate text-left">
          {title}
        </h3>

        <div className="flex items-center my-1 text-[14px] font-semibold leading-tight">
          <span className="text-green-500 mr-2 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              className="-ml-1 "
            >
              <path
                fill="currentColor"
                d="M11 4.5v11.586l-4.5-4.5L5.086 13L12 19.914L18.914 13L17.5 11.586l-4.5 4.5V4.5z"
              />
            </svg>
            <span className="-ml-1">{discountPercent}</span>
          </span>
          <span className="text-gray-500 line-through mr-2">{oldPrice}</span>
          <span className="text-gray-800 font-semibold">{newPrice}</span>
        </div>

        {badgeText && (
          <div
            className={`inline-block text-[10px] mb-2 font-medium px-2 py-1 rounded ${badgeStyle}`}
          >
            {badgeText}
          </div>
        )}

        <div className="flex justify-between items-center pt-1 pb-1">
          <div className="flex text-lg space-x-[2px]">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < rating ? "text-green-600" : "text-gray-300"}
              />
            ))}
          </div>
          <img className="h-4" src={assuredImg} alt="assured" />
        </div>

        <div className="text-xs font-medium py-1 rounded">{deliveryText}</div>
      </div>
    </a>
  );
};

export default ProductCard;
