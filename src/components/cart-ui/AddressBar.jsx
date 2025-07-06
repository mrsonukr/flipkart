import React from "react";

const AddressBar = () => {
  return (
    <div className="flex justify-between items-center text-sm shadow-sm py-2 bg-white px-4">
      <div className="py-2 w-[70%]">
        <div className="mb-1">
          Deliver To:{""}
          <span className="font-semibold ml-2">John Doe, 123456</span>
          <span className="ml-2 mt-1 bg-gray-100 px-1 py-0.5 font-medium rounded text-gray-500 text-sm">
            Home
          </span>
        </div>
        <div className="mt-0.5 text-sm text-gray-500 truncate">
          123, ABC Apartments, Main Street, Mumbai, Maharashtra
        </div>
      </div>
      <div>
        <button className="px-5 py-2 text-blue-600 font-semibold text-xs bg-white border border-gray-300 rounded">
          Change
        </button>
      </div>
    </div>
  );
};

export default AddressBar;
