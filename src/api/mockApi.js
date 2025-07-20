// API client to fetch data from hosted endpoint
// import { encryptData, decryptData } from '../utils/securityUtils';

// Hosted API endpoint
const API_BASE_URL = 'https://apiv2.instaguru.shop';

// Preconnect to API on module load for faster requests
if (typeof window !== 'undefined') {
  // Add preconnect link if not already present
  const existingPreconnect = document.querySelector('link[href="https://apiv2.instaguru.shop"]');
  if (!existingPreconnect) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://apiv2.instaguru.shop';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
}

// Cache for API responses
let productCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Initialize data from hosted API
const fetchProductsFromAPI = async () => {
  const now = Date.now();
  
  // Return cache if valid
  if (productCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return productCache;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Cache the response
    productCache = data;
    cacheTimestamp = now;
    
    return data;
  } catch (error) {
    console.error('Failed to fetch from API:', error);
    
    // Fallback: try to use any cached data even if expired
    if (productCache) {
      console.warn('Using expired cache due to API failure');
      return productCache;
    }
    
    // Ultimate fallback: return empty structure
    return {
      products: []
    };
  }
};

// Mock API endpoints
export const mockApi = {
  // Get all products
  async getProducts() {
    try {
      const data = await fetchProductsFromAPI();
      
      return {
        success: true,
        data: data?.products || [],
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
    try {
      const data = await fetchProductsFromAPI();
      const product = data?.products?.find(p => p.id === id);
      
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
    try {
      const data = await fetchProductsFromAPI();
      const products = data?.products?.filter(p => p.category === category) || [];
      
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
    try {
      const data = await fetchProductsFromAPI();
      const products = data?.products?.filter(p => 
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