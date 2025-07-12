// src/Routing.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart"; // Uncomment if you have a Cart page
import AddressForm from "./pages/Address";
import Summary from "./pages/Summary";
import Payment from "./pages/Payment";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} /> {/* Uncomment if you have a Cart page */}
      <Route path="/address" element={<AddressForm />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/payment" element={<Payment />} />


      {/* Add more routes as needed */}
    
    </Routes>
  );
};

export default Routing;