// src/components/OrderPlaced.tsx
import { motion } from "framer-motion";
import React from "react";

const OrderPlaced = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
      {/* Ripple/Aura layers behind checkmark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.8, opacity: 0.15 }}
          transition={{ duration: 0.6 }}
          className="absolute w-48 h-48 bg-green-200 rounded-full"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.4, opacity: 0.25 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute w-36 h-36 bg-green-300 rounded-full"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute w-24 h-24 bg-green-400 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center z-10">
        {/* Main checkmark circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center justify-center w-24 h-24 rounded-full bg-green-500 shadow-lg"
        >
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        {/* Text below */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-semibold mt-6 text-gray-900"
        >
          Order Placed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-green-600 text-sm mt-2"
        >
          You saved ₹1512
        </motion.p>
      </div>
    </div>
  );
};

export default OrderPlaced;