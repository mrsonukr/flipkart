import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayHeader2 from "../components/payment/PayHeader2";
import { calculateCartTotals } from "../utils/cartUtils";

const PayWaiting = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes = 300 seconds
  const [cartTotals, setCartTotals] = useState({
    finalAmount: 0,
  });
  const [hasReturnedToPage, setHasReturnedToPage] = useState(false);
  const [returnTimer, setReturnTimer] = useState(28); // 28 seconds for success redirect
  const [fallbackTimer, setFallbackTimer] = useState(123); // 123 seconds fallback timer

  // Load cart totals on component mount
  useEffect(() => {
    const totals = calculateCartTotals();
    setCartTotals(totals);
  }, []);

  // Handle page visibility change to detect when user returns
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !hasReturnedToPage) {
        // User has returned to the page
        setHasReturnedToPage(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasReturnedToPage]);

  // Main 5-minute timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fallback timer - redirect after 123 seconds regardless of detection
  useEffect(() => {
    const fallbackInterval = setInterval(() => {
      setFallbackTimer((prev) => {
        if (prev <= 1) {
          clearInterval(fallbackInterval);
          // Redirect to success after 123 seconds
          navigate("/success");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(fallbackInterval);
  }, [navigate]);

  // 28-second success redirect timer when user returns
  useEffect(() => {
    if (hasReturnedToPage) {
      const successTimer = setInterval(() => {
        setReturnTimer((prev) => {
          if (prev <= 1) {
            clearInterval(successTimer);
            setTimeout(() => {
              navigate("/success");
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(successTimer);
    }
  }, [hasReturnedToPage, navigate]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const totalTime = 300;
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <PayHeader2 />

      {/* Image */}
      <div className="mt-40">
        <img
          src="/assets/images/ic/upi-app-pay.jpg"
          alt="UPI Prompt"
          className="w-72 rounded-md"
        />
      </div>

      {/* Message with dynamic amount */}
      <p className="text-center text-gray-700 text-sm mt-6 px-6 max-w-sm">
        Open the UPI app to complete the payment of ₹
        {cartTotals.finalAmount.toLocaleString()}, then return to the Flipkart
        app
      </p>

      {/* Timer */}
      <div className="mt-6 relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="#e5e7eb"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="#3b82f6"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray={`${percentage}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-medium">{formatTime(timeLeft)}</span>
          <span className="text-xs text-gray-500">minutes</span>
        </div>
      </div>

      {/* Note */}
      <p className="text-gray-500 text-sm mt-4 mb-2 text-center">
        {hasReturnedToPage 
          ? `Confirming payment in ${returnTimer}s...` 
          : "Please do not refresh or press back"
        }
      </p>
      
      {/* Fallback timer info */}
      <p className="text-gray-400 text-xs mb-10 text-center">
        Auto-confirm in {Math.floor(fallbackTimer / 60)}:{(fallbackTimer % 60).toString().padStart(2, '0')}
      </p>
    </div>
  );
};

export default PayWaiting;
