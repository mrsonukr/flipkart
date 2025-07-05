import React from "react";

const Header = () => {
  return (
    <div>
      <header className="flex justify-between items-center p-4 py-2 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <img src="/assets/images/svg/menu.svg" alt="" />
          <img src="/assets/images/svg/flogo.svg" alt="" />
        </div>
        <div className="flex items-center gap-4">
          <img src="/assets/images/svg/download.svg" alt="" />
          <img src="/assets/images/svg/cart.svg" alt="" />
        </div>
      </header>
      <div className="w-full py-1 px-2 bg-white" id="customSearchGuid">
        <a
          href="#"
          className="mx-[10px] block w-[calc(100%-20px)] h-10 text-sm text-[#777] text-left rounded-[10px] bg-white relative overflow-hidden whitespace-nowrap"
        >
          {/* Search Icon inside input */}
          <img
            src="assets/images/svg/search.webp"
            alt="Search Icon"
            className="w-4 h-4 absolute left-[10px] top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
          <input
            type="text"
            className="w-full h-[38px] pl-10 text-sm bg-[#f0f8ff] border-0 outline-none placeholder:text-[#878787] placeholder:text-sm placeholder:font-['Roboto'] placeholder:tracking-[-0.2px]"
            placeholder="Search for Products, Brands and More"
            readOnly
          />
        </a>
      </div>
    </div>
  );
};

export default Header;
