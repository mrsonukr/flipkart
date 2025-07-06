import React from "react";

const Header3 = ({ title }) => {
  return (
    <div className="flex items-center bg-white p-4 shadow-md space-x-4 border-b-2 border-gray-100">
      <svg
        width="19"
        height="16"
        viewBox="0 0 19 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.556 7.847H1M7.45 1L1 7.877l6.45 6.817"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="font-semibold ml-2">{title}</span>
    </div>
  );
};

export default Header3;
