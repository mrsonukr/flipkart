// Security utility functions
const ALLOWED_DOMAINS = [
  'rukminim1.flixcart.com',
  'rukminim2.flixcart.com',
  'm.media-amazon.com',
  'your-domain.com' // Add your actual domain
];

// Validate external image URLs
export const validateImageUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return ALLOWED_DOMAINS.includes(urlObj.hostname) && urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// Sanitize user input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Encrypt sensitive data for localStorage
export const encryptData = (data) => {
  try {
    return btoa(JSON.stringify(data));
  } catch {
    return null;
  }
};

// Decrypt data from localStorage
export const decryptData = (encryptedData) => {
  try {
    return JSON.parse(atob(encryptedData));
  } catch {
    return null;
  }
};

// Validate URLs before navigation
export const validateUrl = (url) => {
  try {
    const urlObj = new URL(url);
    // Only allow HTTPS and relative URLs
    return urlObj.protocol === 'https:' || url.startsWith('/');
  } catch {
    return url.startsWith('/'); // Allow relative URLs
  }
};

// Remove potentially dangerous content
export const sanitizeHtml = (html) => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};