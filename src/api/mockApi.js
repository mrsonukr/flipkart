// Mock API to prevent direct JSON access
import { encryptData, decryptData } from '../utils/securityUtils';

// Encrypted product data storage
let encryptedProductData = null;

// Initialize encrypted data
const initializeData = async () => {
  if (!encryptedProductData) {
    try {
      // Import the JSON data
      const response = await fetch('/src/data/products.json');
      const data = await response.json();
      
      // Encrypt and store
      encryptedProductData = encryptData(data);
    } catch (error) {
      console.error('Failed to load product data:', error);
      // Fallback data
      encryptedProductData = encryptData({
        products: []
      });
    }
  }
};

// Mock API endpoints
export const mockApi = {
  // Get all products
  async getProducts() {
    await initializeData();
    
    try {
      const decryptedData = decryptData(encryptedProductData);
      return {
        success: true,
        data: decryptedData?.products || [],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch products',
        data: []
      };
    }
  },

  // Get product by ID
  async getProductById(id) {
    await initializeData();
    
    try {
      const decryptedData = decryptData(encryptedProductData);
      const product = decryptedData?.products?.find(p => p.id === id);
      
      if (product) {
        return {
          success: true,
          data: product,
          timestamp: new Date().toISOString()
        };
      } else {
        return {
          success: false,
          error: 'Product not found',
          data: null
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch product',
        data: null
      };
    }
  },

  // Get products by category
  async getProductsByCategory(category) {
    await initializeData();
    
    try {
      const decryptedData = decryptData(encryptedProductData);
      const products = decryptedData?.products?.filter(p => p.category === category) || [];
      
      return {
        success: true,
        data: products,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch products by category',
        data: []
      };
    }
  },

  // Search products
  async searchProducts(query) {
    await initializeData();
    
    try {
      const decryptedData = decryptData(encryptedProductData);
      const products = decryptedData?.products?.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ) || [];
      
      return {
        success: true,
        data: products,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to search products',
        data: []
      };
    }
  }
};

// Rate limiting
const rateLimiter = {
  requests: new Map(),
  
  isAllowed(endpoint, limit = 100, windowMs = 60000) {
    const now = Date.now();
    const key = `${endpoint}_${Math.floor(now / windowMs)}`;
    
    const current = this.requests.get(key) || 0;
    if (current >= limit) {
      return false;
    }
    
    this.requests.set(key, current + 1);
    
    // Clean old entries
    for (const [k, v] of this.requests.entries()) {
      if (k.split('_')[1] < Math.floor((now - windowMs) / windowMs)) {
        this.requests.delete(k);
      }
    }
    
    return true;
  }
};

// Protected API with rate limiting
export const protectedApi = {
  async getProducts() {
    if (!rateLimiter.isAllowed('getProducts')) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        data: []
      };
    }
    
    return mockApi.getProducts();
  },

  async getProductById(id) {
    if (!rateLimiter.isAllowed('getProductById')) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        data: null
      };
    }
    
    return mockApi.getProductById(id);
  },

  async getProductsByCategory(category) {
    if (!rateLimiter.isAllowed('getProductsByCategory')) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        data: []
      };
    }
    
    return mockApi.getProductsByCategory(category);
  },

  async searchProducts(query) {
    if (!rateLimiter.isAllowed('searchProducts')) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        data: []
      };
    }
    
    return mockApi.searchProducts(query);
  }
};