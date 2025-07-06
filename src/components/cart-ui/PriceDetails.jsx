import React, { useState } from "react";

const PriceDetails = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [animate, setAnimate] = useState(true);

  const toggle = () => {
    if (isOpen) {
      setAnimate(false); // trigger closing animation
      setTimeout(() => setIsOpen(false), 200); // wait before hiding
    } else {
      setIsOpen(true);
      setTimeout(() => setAnimate(true), 10); // small delay to trigger animation
    }
  };

  return (
    <div className="bg-white p-4 m-4 rounded-xl">
      {/* Header with Toggle */}
      <div
        className="flex items-center justify-between border-b border-dashed border-gray-300 pb-2 mb-3 cursor-pointer"
        onClick={toggle}
      >
        <h1 className="text-base font-semibold">Price Details</h1>
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 17 17"
          className={`transform transition-transform duration-200 ${
            isOpen && animate ? "rotate-90" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m6.627 3.749 5 5-5 5"
            stroke="#111112"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Collapsible Content (Animated) */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? (animate ? "max-h-[500px]" : "max-h-0") : "max-h-0"
        }`}
      >
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Price (1 item)</span>
            <span className="text-gray-800 font-medium">₹20,000</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Discount</span>
            <span className="text-green-700 font-medium">- ₹2,000</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Delivery Charges</span>
            <span>
              <span className="line-through text-gray-400 mr-1">₹40</span>
              <span className="text-green-700 font-medium">FREE Delivery</span>
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Secured Packaging Fee</span>
            <span className="text-gray-800 font-medium">₹59</span>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-300 my-3 scale-y-[0.6]"></div>
        </div>
      </div>

      {/* Always Visible Total */}
      <div className="flex justify-between text-sm font-semibold mb-3 mt-2">
        <span>Total Amount</span>
        <span>₹18,059</span>
      </div>

      {/* Always Visible Savings Note */}
      <div className="text-green-700 text-sm text-center bg-green-100 p-1 rounded-md font-medium">
        You will save ₹2,000 on this order
      </div>
    </div>
  );
};

export default PriceDetails;
