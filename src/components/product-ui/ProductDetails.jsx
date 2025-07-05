import React from "react";
import { FaStar } from "react-icons/fa";
import FlashingTag from "../ui/FlashingTag";

const ProductDetails = () => {
  return (
    <div className="px-4">
      <div className="flex items-center justify-center space-x-2 mb-3">
        <div>
          <img
            src="https://rukminim2.flixcart.com/www/48/48/promos/15/07/2021/e2ee7c1c-ec9e-4ae7-b5dd-6b2685299686.jpg"
            alt="Increase Icon"
            className="w-6 h-6"
          />
        </div>
        <div className="text-xs text-gray-700">
          583 people ordered this in the last 1 week
        </div>
      </div>
      <h2 className="text-sm">
        <strong>PUMA</strong> UNITED COLORS OF BENETTON Winso Polyester 32L
        Laptop Backpack For Unisex
      </h2>
      {/* rating  */}
      <div className="flex items-center space-x-2 my-2">
        {/* Star Ratings */}
        <div className="flex space-x-[2px] py-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < 3 ? "text-green-600" : "text-gray-300"}
            />
          ))}
        </div>

        {/* Rating Text */}
        <div className="flex items-center text-xs text-gray-500 space-x-2">
          <span>3.0</span>
          <span className="w-[3px] h-[3px] bg-black rounded-full"></span>
          <span className="font-medium text-blue-700">Good</span>
          <span className="w-[3px] h-[3px] bg-black rounded-full"></span>
          <span className=" text-blue-700">7,203 ratings</span>
        </div>
      </div>
      <FlashingTag />

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <svg width="20" height="20" viewBox="0 0 12 12" fill="none">
            <path
              d="M6.73461 1V8.46236L9.5535 5.63352L10.5876 6.65767L5.99384 11.2415L1.41003 6.65767L2.42424 5.63352L5.25307 8.46236V1H6.73461Z"
              fill="#008C00"
            ></path>
          </svg>
          <span className="text-lg text-green-700 font-semibold">49%</span>
        </div>
        <span className="text-lg font-semibold text-gray-500 line-through ">
          ₹9,990
        </span>
        <span className="text-lg font-semibold ">₹9,990</span>
      </div>
      <p className="capitalize text-[14px] my-3">
        5% cashback & no joining fee with flipkart axis bank credit card{" "}
        <span className="text-blue-600">complete now</span>
      </p>
    </div>
  );
};

export default ProductDetails;
