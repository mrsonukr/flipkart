import React from "react";
import Header from "../components/Header";
import CatScroll from "../components/ui/CatScroll";
import ProductGrid from "../components/ui/ProductGrid";
// import OfferBanner from "../components/banner-ui/Offer-Banner";

const Home = () => {
  return (
    <div>
      <Header />
      <CatScroll />
      {/* <OfferBanner /> */}
      <div className="min-h-screen bg-gray-100">
        <ProductGrid />
      </div>
    </div>
  );
};

export default Home;
