import React from "react";
import Header2 from "../components/Header2";
import ProductSlider from "../components/product-ui/ProductSlider";
import ProductDetails from "../components/product-ui/ProductDetails";
import DeliveryDetails from "../components/product-ui/DeliveryDetails";
import ProductPolicy from "../components/product-ui/ProductPolicy";
import Reviews from "../components/Reviews";
import VariantSelector from "../components/product-ui/VariantSelector";
import SizeSelector from "../components/product-ui/SizeSelector";
import BottomButtons from "../components/product-ui/BottomButtons";

const Product = () => {
  return (
    <div>
      <Header2 />
      <ProductSlider />
      <ProductDetails />
      <VariantSelector color="Pearl White" storage="256GB" />
      <SizeSelector />
      <div className="h-2 bg-gray-100"></div>
      <DeliveryDetails />
      <div className="h-2 bg-gray-100"></div>
      <ProductPolicy />
      <div className="h-2 bg-gray-100"></div>
      <Reviews />
      <BottomButtons />
    </div>
  );
};

export default Product;
