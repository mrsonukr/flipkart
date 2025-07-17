import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import successAnim from "../animations/success.json";
import { calculateCartTotals } from "../utils/cartUtils";

const OrderPlaced = () => {
  const [showHeading, setShowHeading] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [cartTotals, setCartTotals] = useState({
    totalDiscount: 0
  });

  useEffect(() => {
    // Load cart totals to get actual discount amount
    const totals = calculateCartTotals();
    setCartTotals(totals);
    
    const timer1 = setTimeout(() => setShowHeading(true), 1000); // Heading after 1s
    const timer2 = setTimeout(() => setShowSubtext(true), 1500); // Subtext after 1.5s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Lottie Animation */}
      <div className="w-[200px] md:w-[300px] mb-4">
        <Lottie animationData={successAnim} loop={false} autoplay />
      </div>

      {/* Heading */}
      <h1
        className={`font-semibold text-xl text-gray-600 transition-all duration-500 transform ${
          showHeading ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        Order Placed
      </h1>

      {/* Subtext */}
      <p
        className={`text-sm text-green-600 mt-1 transition-all duration-500 transform ${
          showSubtext ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        You saved ₹{cartTotals.totalDiscount.toLocaleString()}
      </p>
    </div>
  );
};

export default OrderPlaced;
