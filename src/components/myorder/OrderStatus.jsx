import React from "react";
import { Check } from "lucide-react";

const steps = [
  {
    status: "completed",
    color: "bg-green-600",
    icon: true,
    title: "Order Confirmed, Today",
    description: "Your Order has been placed, Tue 15th Jul",
  },
  {
    status: "pending",
    color: "border-2 border-gray-300 bg-white",
    icon: false,
    title: "Shipped,Expected By Jul 17",
    description: "",
  },
  {
    status: "pending",
    color: "border-2 border-gray-300 bg-white",
    icon: false,
    title: "Out For Delivery",
    description: "",
  },
  {
    status: "pending",
    color: "border-2 border-gray-300 bg-white",
    icon: false,
    title: "Delivery, Sat Jul 22 By 11 PM",
    description: "",
  },
];

const OrderStatus = () => {
  return (
    <div className="flex flex-col space-y-0 pt-8 px-4 bg-white">
      {steps.map((step, index) => {
        const nextStep = steps[index + 1];
        const isDashed =
          step.status === "pending" && nextStep?.status === "pending";
        const isCompleted = step.status === "completed";

        return (
          <div key={index} className="flex relative">
            {/* Background behind icon + text only if completed */}
            {isCompleted && (
              <div className="absolute inset-0 bg-[#dcfce2bd] rounded-md -ml-1 -mt-2 h-12" />
            )}

            {/* Left: Step Icon and Connector */}
            <div className="flex flex-col items-center relative mr-3 z-10">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center z-10 ${step.color}`}
              >
                {step.icon && (
                  <Check
                    strokeWidth={3}
                    className="text-white w-3.5 h-3.5 p-[.8px]"
                  />
                )}
              </div>

              {index !== steps.length - 1 &&
                (index === 0 ? (
                  // Special line after first step: 40% green, 60% gray
                  <div className="flex flex-col flex-1 w-[2px] my-[1.5px]">
                    <div className="bg-green-600" style={{ flex: "0 0 30%" }} />
                    <div className="absolute right-1 top-[40%] w-2 h-2">
                      {/* Inner dot */}
                      <div className="absolute inset-0 bg-green-600 rounded-full z-40" />

                      {/* Ripple effect */}
                      <div className="absolute inset-0 bg-green-600 rounded-full opacity-60 animate-[ripple_2s_ease-out_infinite] z-10" />
                    </div>
                    <div className="bg-gray-300 flex-1" />
                  </div>
                ) : (
                  <div
                    className={`w-[2px] flex-1 my-[1.5px] ${
                      isDashed
                        ? "border-l-[1.5px] border-dashed border-gray-300"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
            </div>

            {/* Right: Text Content */}
            <div className="pb-8 -mt-1 z-10">
              <p
                className={`text-[14px] ${
                  isCompleted ? "text-black" : "text-gray-500"
                }`}
              >
                {step.title}
              </p>
              {step.description && (
                <p
                  className={`text-xs ${
                    isCompleted ? "text-black" : "text-gray-300"
                  }`}
                >
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStatus;
