// src/Routing.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load pages for code splitting
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
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/details/" element={<OrderDetails />} />
        <Route path="/pay/" element={<PayWaiting />} />
        <Route path="/success" element={<OrderPlaced />} />

        {/* Add more routes as needed */}
      </Routes>
    </Suspense>
  );
};

export default Routing;
