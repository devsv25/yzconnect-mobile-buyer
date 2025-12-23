/**
 * Format price in Indian Rupees
 * @param {number} price - Price in rupees
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (!price || price === 0) return '₹0';
  return `₹${price.toLocaleString('en-IN')}`;
};

/**
 * Convert price to number
 * @param {string} priceString - Price string or number
 * @returns {number} Price as number
 */
export const parsePrice = (priceString) => {
  if (typeof priceString === 'number') return priceString;
  return parseFloat(String(priceString).replace(/₹|,/g, '')) || 0;
};
