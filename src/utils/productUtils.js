// Utility functions for product data manipulation
import productsData from '../data/products.json';

// Get all products
export const getAllProducts = () => {
  return productsData.products;
};

// Get product by ID
export const getProductById = (id) => {
  return productsData.products.find(product => product.id === id);
};

// Get products by category
export const getProductsByCategory = (category) => {
  return productsData.products.filter(product => product.category === category);
};

// Calculate discounted price
export const calculateDiscountedPrice = (basePrice, discountPercentage) => {
  return Math.round(basePrice * (1 - discountPercentage / 100));
};

// Format price to Indian currency
export const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

// Calculate delivery date
export const getDeliveryDate = (deliveryDays) => {
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + deliveryDays);
  
  const options = { 
    day: 'numeric', 
    month: 'short',
    weekday: 'short'
  };
  
  return deliveryDate.toLocaleDateString('en-IN', options);
};

// Get rating label based on rating
export const getRatingLabel = (rating) => {
  if (rating >= 4.5) return "Excellent";
  if (rating >= 4.0) return "Outstanding";
  if (rating >= 3.5) return "Good";
  if (rating >= 3.0) return "Average";
  if (rating >= 2.0) return "Below Average";
  return "Poor";
};

// Get rating image based on rounded rating
export const getRatingImage = (rating) => {
  const rounded = Math.round(rating);
  return `/assets/images/svg/rating${rounded}.svg`;
};

// Get random products for suggestions
export const getRandomProducts = (count = 6, excludeId = null) => {
  let products = getAllProducts();
  if (excludeId) {
    products = products.filter(p => p.id !== excludeId);
  }
  
  // Shuffle array and return first 'count' items
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};