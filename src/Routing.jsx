import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Lazy load components
const Home = lazy(() => import("./components/OptimizedHome"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const AddressForm = lazy(() => import("./pages/Address"));
const Summary = lazy(() => import("./pages/Summary"));
const Payment = lazy(() => import("./pages/Payment"));
const MyOrder = lazy(() => import("./pages/MyOrder"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const PayWaiting = lazy(() => import("./pages/PayWaiting"));
const OrderPlaced = lazy(() => import("./pages/OrderPlaced"));

const Routing = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      // External redirect to Flipkart homepage
      window.location.href = "https://www.flipkart.com/";
    }
  }, [location.pathname]);

  // While redirecting, render nothing or loading
  if (location.pathname === "/") {
    return null;
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/homepage" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/details/" element={<OrderDetails />} />
        <Route path="/pay/" element={<PayWaiting />} />
        <Route path="/success" element={<OrderPlaced />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;
