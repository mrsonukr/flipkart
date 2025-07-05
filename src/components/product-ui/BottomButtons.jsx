import React, { useState } from "react";

const BottomButtons = () => {
  const [loadingCart, setLoadingCart] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  const [loadingBuy, setLoadingBuy] = useState(false);

  const addToCart = () => {
    setLoadingCart(true);
    setShowAdded(false);

    // 0.5s: show "Added"
    setTimeout(() => {
      setShowAdded(true);

      // 2s later: reset button
      setTimeout(() => {
        setLoadingCart(false);
        setShowAdded(false);
      }, 2000);
    }, 500);
  };

  const buyNow = () => {
    setLoadingBuy(true);
    setTimeout(() => {
      setLoadingBuy(false);
      alert("Buying Now!");
    }, 1000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex w-full h-[50px] z-[99]">
      {/* Add to Cart Button */}
      <button
        disabled={loadingCart || loadingBuy}
        onClick={addToCart}
        className={`w-1/2 flex items-center justify-center text-[15px] font-medium
          bg-white text-black transition-all duration-300
          ${loadingCart || loadingBuy ? "cursor-not-allowed" : ""}
        `}
      >
        {!loadingCart ? (
          "Add to Cart"
        ) : showAdded ? (
          "Added"
        ) : (
          <span className="w-[15px] h-[15px] border-2 border-black rounded-full animate-spin border-t-transparent"></span>
        )}
      </button>

      {/* Buy Now Button */}
      <button
        disabled={loadingCart || loadingBuy}
        onClick={buyNow}
        className={`w-1/2 flex items-center justify-center text-[15px] font-medium
          bg-[#ffc200] text-black hover:bg-yellow-400 transition-all duration-300
          ${loadingCart || loadingBuy ? "cursor-not-allowed" : ""}
        `}
      >
        Buy Now
      </button>
    </div>
  );
};

export default BottomButtons;
