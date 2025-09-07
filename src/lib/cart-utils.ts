// Cart utility functions for Reejh Mann Di Shopping App

import { Cart, CartItem, Product } from './types';

// Local storage key for cart data
const CART_STORAGE_KEY = 'reejh-mann-di-cart';

// Calculate price including variant modifiers
export const calculateItemPrice = (product: Product, selectedVariants: { [key: string]: string }): number => {
  let price = product.price;
  
  // Add price modifiers for selected variants
  product.variants.forEach(variant => {
    const selectedOption = selectedVariants[variant.name];
    if (selectedOption) {
      const option = variant.options.find(opt => opt.value === selectedOption);
      if (option && option.priceModifier) {
        price += option.priceModifier;
      }
    }
  });
  
  return price;
};

// Calculate cart totals
export const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate tax (18% GST)
  const tax = subtotal * 0.18;
  
  // Calculate shipping (free for orders above ₹2000, otherwise ₹199)
  const shipping = subtotal >= 2000 ? 0 : 199;
  
  const total = subtotal + tax + shipping;
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping,
    total: Math.round(total * 100) / 100,
    itemCount
  };
};

// Create empty cart
export const createEmptyCart = (): Cart => {
  const cart: Cart = {
    id: `cart-${Date.now()}`,
    items: [],
    total: 0,
    itemCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return cart;
};

// Load cart from local storage
export const loadCartFromStorage = (): Cart => {
  if (typeof window === 'undefined') {
    return createEmptyCart();
  }
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const cart: Cart = JSON.parse(stored);
      // Recalculate totals to ensure accuracy
      const totals = calculateCartTotals(cart.items);
      return {
        ...cart,
        total: totals.total,
        itemCount: totals.itemCount
      };
    }
  } catch (error) {
    console.error('Error loading cart from storage:', error);
  }
  
  return createEmptyCart();
};

// Save cart to local storage
export const saveCartToStorage = (cart: Cart): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

// Add item to cart
export const addItemToCart = (
  cart: Cart,
  product: Product,
  selectedVariants: { [key: string]: string },
  quantity: number = 1
): Cart => {
  const price = calculateItemPrice(product, selectedVariants);
  
  // Create variant key for comparison
  const variantKey = Object.keys(selectedVariants)
    .sort()
    .map(key => `${key}:${selectedVariants[key]}`)
    .join('|');
  
  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(item => 
    item.productId === product.id && 
    Object.keys(item.selectedVariants)
      .sort()
      .map(key => `${key}:${item.selectedVariants[key]}`)
      .join('|') === variantKey
  );
  
  let updatedItems: CartItem[];
  
  if (existingItemIndex > -1) {
    // Update quantity of existing item
    updatedItems = cart.items.map((item, index) => 
      index === existingItemIndex 
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    // Add new item
    const newItem: CartItem = {
      id: `cart-item-${Date.now()}-${Math.random()}`,
      productId: product.id,
      product,
      quantity,
      selectedVariants,
      price
    };
    updatedItems = [...cart.items, newItem];
  }
  
  const totals = calculateCartTotals(updatedItems);
  
  const updatedCart: Cart = {
    ...cart,
    items: updatedItems,
    total: totals.total,
    itemCount: totals.itemCount,
    updatedAt: new Date().toISOString()
  };
  
  saveCartToStorage(updatedCart);
  return updatedCart;
};

// Remove item from cart
export const removeItemFromCart = (cart: Cart, itemId: string): Cart => {
  const updatedItems = cart.items.filter(item => item.id !== itemId);
  const totals = calculateCartTotals(updatedItems);
  
  const updatedCart: Cart = {
    ...cart,
    items: updatedItems,
    total: totals.total,
    itemCount: totals.itemCount,
    updatedAt: new Date().toISOString()
  };
  
  saveCartToStorage(updatedCart);
  return updatedCart;
};

// Update item quantity in cart
export const updateItemQuantity = (cart: Cart, itemId: string, quantity: number): Cart => {
  if (quantity <= 0) {
    return removeItemFromCart(cart, itemId);
  }
  
  const updatedItems = cart.items.map(item =>
    item.id === itemId ? { ...item, quantity } : item
  );
  
  const totals = calculateCartTotals(updatedItems);
  
  const updatedCart: Cart = {
    ...cart,
    items: updatedItems,
    total: totals.total,
    itemCount: totals.itemCount,
    updatedAt: new Date().toISOString()
  };
  
  saveCartToStorage(updatedCart);
  return updatedCart;
};

// Clear entire cart
export const clearCart = (): Cart => {
  const emptyCart = createEmptyCart();
  saveCartToStorage(emptyCart);
  return emptyCart;
};

// Check if product variant is in stock
export const isVariantInStock = (product: Product, selectedVariants: { [key: string]: string }): boolean => {
  // Check overall product stock
  if (product.stock <= 0) return false;
  
  // Check individual variant stock
  for (const variant of product.variants) {
    const selectedOption = selectedVariants[variant.name];
    if (selectedOption) {
      const option = variant.options.find(opt => opt.value === selectedOption);
      if (!option || option.stock <= 0) {
        return false;
      }
    }
  }
  
  return true;
};

// Get available stock for a variant combination
export const getAvailableStock = (product: Product, selectedVariants: { [key: string]: string }): number => {
  // Start with overall product stock
  let availableStock = product.stock;
  
  // Check variant stock limits
  for (const variant of product.variants) {
    const selectedOption = selectedVariants[variant.name];
    if (selectedOption) {
      const option = variant.options.find(opt => opt.value === selectedOption);
      if (option) {
        availableStock = Math.min(availableStock, option.stock);
      }
    }
  }
  
  return Math.max(0, availableStock);
};

// Format price for display
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Validate cart before checkout
export const validateCart = (cart: Cart): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (cart.items.length === 0) {
    errors.push('Cart is empty');
  }
  
  // Check stock availability for each item
  cart.items.forEach(item => {
    const availableStock = getAvailableStock(item.product, item.selectedVariants);
    if (item.quantity > availableStock) {
      errors.push(`${item.product.name} - Only ${availableStock} items available, but ${item.quantity} requested`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};