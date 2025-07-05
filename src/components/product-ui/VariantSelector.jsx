import React from "react";

const VariantSelector = ({ color = "Midnight Black", storage = "128GB" }) => {
  return (
    <div className="bg-white">
      {/* Top gray line */}
      <div className="h-2 bg-gray-100" />

      {/* Section title */}
      <div className="px-4 py-2 text-sm font-semibold border-b border-gray-200">
        Select Variant
      </div>

      {/* Color Selector */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <div className="text-sm">
          Color: <span className="font-medium">{color}</span>
        </div>
        <img
          src="/assets/images/img/next-arrow.png"
          alt="Next"
          className="h-3.5"
        />
      </div>

      {/* Storage Selector */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-sm">
          Storage: <span className="font-medium">{storage}</span>
        </div>
        <img
          src="/assets/images/img/next-arrow.png"
          alt="Next"
          className="h-3.5"
        />
      </div>
    </div>
  );
};

export default VariantSelector;
