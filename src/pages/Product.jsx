import React from "react";
import Header2 from "../components/Header2";
import ProductSlider from "../components/product-ui/ProductSlider";
import ProductDetails from "../components/product-ui/ProductDetails";
import DeliveryDetails from "../components/product-ui/DeliveryDetails";
import ProductPolicy from "../components/product-ui/ProductPolicy";

const Product = () => {
  return (
    <div>
      <Header2 />
      <ProductSlider />
      <ProductDetails />
      <div className="h-2 bg-gray-100"></div>
      <DeliveryDetails />
      <div className="h-2 bg-gray-100"></div>
      <ProductPolicy />
      <div className="h-2 bg-gray-100"></div>

    </div>
  );
};

export default Product;
