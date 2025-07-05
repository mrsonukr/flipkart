import React from "react";

const DeliveryDetails = () => {
  return (
    <div>
      {/* Pincode Box */}
      <div className="flex justify-between items-center px-3 py-3 mx-2 border-b border-gray-200">
        <p className="text-sm f">Find a seller that delivers to you</p>
        <button className="border border-gray-300 px-4 py-1.5 text-blue-600 rounded font-medium text-sm">
          Enter Pincode
        </button>
      </div>

      {/* Delivery Info */}
      <div className="flex justify-between items-center px-3 py-4 mx-2">
        <div className="flex items-center gap-2">
          <img
            src="https://rukminim1.flixcart.com/www/48/48/promos/16/08/2022/df850a95-675e-479f-aa51-77c863fb682d.png?"
            alt="Truck"
            className="w-6 h-6"
          />
          <p className="text-sm text-gray-800 font-medium">
            Delivery by 8 Jul, Tuesday
          </p>
        </div>
        <svg
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 17 17"
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
    </div>
  );
};

export default DeliveryDetails;
