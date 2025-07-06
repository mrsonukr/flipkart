import React from "react";
import Header3 from "../components/Header3";
import PriceDetails from "../components/cart-ui/PriceDetails";
import AddressBar from "../components/cart-ui/AddressBar";
import CartProduct from "../components/cart-ui/CartProduct";

const Cart = () => {
  return (
    <div>
      <Header3 title="My Cart" />
      <div className="overflow-x-hidden  bg-gray-100 min-h-screen">
        {/* Address Section */}
        <AddressBar />
        {/* Cart Item */}
        <CartProduct />
        <PriceDetails />

        {/* Safe Payment Section */}
        <div className="flex justify-center items-center flex-col px-16 my-3">
          <div className="flex flex-row items-center">
            <div className="mr-2">
              <img
                src="/assets/images/svg/secure.png"
                alt=""
                className="w-[26px]"
              />
            </div>
            <div className="text-gray-500 text-xs leading-[18px] font-semibold font-['Inter']">
              Safe and secure payments. Easy returns. 100% Authentic products.
            </div>
          </div>
        </div>

        <div className="h-[10px] bg-gray-100"></div>

        {/* Checkout Box */}
        <div
          className="flex justify-between items-center p-2 bg-white border-t border-b border-gray-300"
          id="check-box"
        >
          <div>
            <div className="ml-1 text-sm text-gray-500 line-through">
              20,000
            </div>
            <div className="ml-1 text-lg font-medium text-black flex items-center">
              18,059
              <span className="ml-1 mt-1">
                <img src="info-icon.svg" alt="" className="w-[15px]" />
              </span>
            </div>
          </div>
          <div>
            <a
              href="#"
              className="inline-block bg-yellow-400 text-black py-3 px-12 text-sm font-medium rounded"
            >
              Place Order
            </a>
          </div>
        </div>

        {/* Quantity Popup */}
        <div
          className="hidden absolute bg-white shadow-md z-[1000]"
          id="qtyPopup"
        >
          <div className="flex flex-col items-center">
            <button className="text-black w-full py-0.5 px-6 text-sm cursor-pointer border-none bg-white hover:bg-gray-200 text-center">
              1
            </button>
            <button className="text-black w-full py-0.5 px-6 text-sm cursor-pointer border-none bg-white hover:bg-gray-200 text-center">
              2
            </button>
            <button className="text-black w-full py-0.5 px-6 text-sm cursor-pointer border-none bg-white hover:bg-gray-200 text-center">
              3
            </button>
            <button className="text-black w-full py-0.5 px-6 text-sm cursor-pointer border-none bg-white hover:bg-gray-200 text-center">
              more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
