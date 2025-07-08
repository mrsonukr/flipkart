import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header2 from "../components/Header2";
import ProductSlider from "../components/product-ui/ProductSlider";
import ProductDetails from "../components/product-ui/ProductDetails";
import DeliveryDetails from "../components/product-ui/DeliveryDetails";
import ProductPolicy from "../components/product-ui/ProductPolicy";
import Reviews from "../components/Reviews";
import VariantSelector from "../components/product-ui/VariantSelector";
import SizeSelector from "../components/product-ui/SizeSelector";
import BottomButtons from "../components/product-ui/BottomButtons";
import { getProductById } from "../utils/productUtils";

const Product = () => {
  const { id } = useParams();
  const product = getProductById(id);
  // Set default size based on category
  const getDefaultSize = () => {
    if (product?.category === 'shoes') return '8';
    if (product?.category === 'cloth') return 'XL';
    return null;
  };
  
  const [selectedSize, setSelectedSize] = useState(getDefaultSize());

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  // Get color and storage variants for mobile category
  const colorVariants = product.variants?.filter(v => v.type === 'color') || [];
  const storageVariants = product.variants?.filter(v => v.type === 'storage') || [];
  
  const selectedColor = colorVariants[0]?.name || "Default";
  const selectedStorage = storageVariants[0]?.name || "Standard";

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  return (
    <div>
      <Header2 />
      <ProductSlider product={product} />
      <ProductDetails product={product} />
      
      {/* Show variant selector only for mobile category */}
      {product.category === 'mobile' && (
        <VariantSelector 
          color={selectedColor} 
          storage={selectedStorage}
          colorVariants={colorVariants}
          storageVariants={storageVariants}
        />
      )}
      
      {/* Show size selector only for cloth and shoes category */}
      {(product.category === 'cloth' || product.category === 'shoes') && (
        <SizeSelector 
          category={product.category} 
          onSizeChange={handleSizeChange}
        />
      )}
      
      <div className="h-2 bg-gray-100"></div>
      <DeliveryDetails product={product} />
      <div className="h-2 bg-gray-100"></div>
      <ProductPolicy />
      <div className="h-2 bg-gray-100"></div>
      <Reviews />
      <BottomButtons product={product} selectedSize={selectedSize} />
    </div>
  );
};

export default Product;