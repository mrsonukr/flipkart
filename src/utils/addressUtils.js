// Address utility functions for localStorage management
import { encryptData, decryptData, sanitizeInput } from './securityUtils';

const ADDRESS_STORAGE_KEY = 'flipkart_address';

// Get address from localStorage
export const getAddressFromStorage = () => {
  try {
    const address = localStorage.getItem(ADDRESS_STORAGE_KEY);
    return address ? decryptData(address) : null;
  } catch (error) {
    console.error('Error reading address from localStorage:', error);
    return null;
  }
};

// Save address to localStorage
export const saveAddressToStorage = (address) => {
  try {
    // Sanitize address data
    const sanitizedAddress = {
      fullName: sanitizeInput(address.fullName),
      mobileNumber: sanitizeInput(address.mobileNumber),
      alternatePhone: sanitizeInput(address.alternatePhone),
      pincode: sanitizeInput(address.pincode),
      state: sanitizeInput(address.state),
      city: sanitizeInput(address.city),
      houseNo: sanitizeInput(address.houseNo),
      roadName: sanitizeInput(address.roadName),
      addressType: sanitizeInput(address.addressType)
    };
    
    const encryptedAddress = encryptData(sanitizedAddress);
    if (encryptedAddress) {
      localStorage.setItem(ADDRESS_STORAGE_KEY, encryptedAddress);
    }
    return true;
  } catch (error) {
    console.error('Error saving address to localStorage:', error);
    return false;
  }
};

// Clear address from localStorage
export const clearAddressFromStorage = () => {
  try {
    localStorage.removeItem(ADDRESS_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing address from localStorage:', error);
    return false;
  }
};

// Format address for display
export const formatAddressForDisplay = (address) => {
  if (!address) return null;
  
  const addressParts = [];
  
  if (address.houseNo) addressParts.push(address.houseNo);
  if (address.roadName) addressParts.push(address.roadName);
  if (address.city) addressParts.push(address.city);
  if (address.state) addressParts.push(address.state);
  
  return addressParts.join(', ');
};

// Get address type display
export const getAddressTypeDisplay = (addressType) => {
  return addressType === 'work' ? 'Work' : 'Home';
};