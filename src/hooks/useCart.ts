"use client";

import { useState, useEffect } from 'react';
import { Cart, CartItem, Product } from '@/lib/types';
import { toast } from 'sonner';

// Cart storage key
const CART_STORAGE_KEY = 'reejh-mann-di-cart';

// Default cart state
const defaultCart: Cart = {
  id: 'default-cart',
  items: [],
  total: 0,
  itemCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export function useCart() {
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      toast.error('Error loading cart data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
        toast.error('Error saving cart data');
      }
    }
  }, [cart, isLoading]);

  // Calculate cart totals
  const calculateTotals = (items: CartItem[]): { total: number; itemCount: number } => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount };
  };

  // Add item to cart
  const addToCart = (
    product: Product, 
    quantity: number = 1, 
    selectedVariants: { [key: string]: string } = {}
  ) => {
    try {
      // Generate cart item ID based on product and variants
      const variantKey = Object.entries(selectedVariants)
        .sort()
        .map(([key, value]) => `${key}:${value}`)
        .join('|');
      const cartItemId = `${product.id}-${variantKey}`;

      // Calculate item price with variant modifiers
      let itemPrice = product.price;
      Object.entries(selectedVariants).forEach(([variantName, selectedOption]) => {
        const variant = product.variants.find(v => v.name === variantName);
        const option = variant?.options.find(o => o.value === selectedOption);
        if (option?.priceModifier) {
          itemPrice += option.priceModifier;
        }
      });

      setCart(prevCart => {
        const existingItemIndex = prevCart.items.findIndex(item => item.id === cartItemId);
        let updatedItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Update existing item
          updatedItems = [...prevCart.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
          toast.success(`Updated ${product.name} quantity in cart`);
        } else {
          // Add new item
          const newItem: CartItem = {
            id: cartItemId,
            productId: product.id,
            product,
            quantity,
            selectedVariants,
            price: itemPrice
          };
          updatedItems = [...prevCart.items, newItem];
          toast.success(`Added ${product.name} to cart`);
        }

        const { total, itemCount } = calculateTotals(updatedItems);

        return {
          ...prevCart,
          items: updatedItems,
          total,
          itemCount,
          updatedAt: new Date().toISOString()
        };
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Error adding item to cart');
    }
  };

  // Remove item from cart
  const removeFromCart = (cartItemId: string) => {
    try {
      setCart(prevCart => {
        const updatedItems = prevCart.items.filter(item => item.id !== cartItemId);
        const { total, itemCount } = calculateTotals(updatedItems);

        toast.success('Item removed from cart');

        return {
          ...prevCart,
          items: updatedItems,
          total,
          itemCount,
          updatedAt: new Date().toISOString()
        };
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Error removing item from cart');
    }
  };

  // Update item quantity
  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    try {
      if (newQuantity <= 0) {
        removeFromCart(cartItemId);
        return;
      }

      setCart(prevCart => {
        const updatedItems = prevCart.items.map(item =>
          item.id === cartItemId 
            ? { ...item, quantity: newQuantity }
            : item
        );
        const { total, itemCount } = calculateTotals(updatedItems);

        return {
          ...prevCart,
          items: updatedItems,
          total,
          itemCount,
          updatedAt: new Date().toISOString()
        };
      });
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast.error('Error updating item quantity');
    }
  };

  // Clear cart
  const clearCart = () => {
    try {
      setCart({
        ...defaultCart,
        id: cart.id,
        updatedAt: new Date().toISOString()
      });
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error clearing cart');
    }
  };

  // Get cart item by product and variants
  const getCartItem = (productId: string, selectedVariants: { [key: string]: string } = {}) => {
    const variantKey = Object.entries(selectedVariants)
      .sort()
      .map(([key, value]) => `${key}:${value}`)
      .join('|');
    const cartItemId = `${productId}-${variantKey}`;
    
    return cart.items.find(item => item.id === cartItemId);
  };

  // Check if product is in cart
  const isInCart = (productId: string, selectedVariants: { [key: string]: string } = {}) => {
    return !!getCartItem(productId, selectedVariants);
  };

  // Get total items for a specific product (all variants)
  const getProductItemCount = (productId: string) => {
    return cart.items
      .filter(item => item.productId === productId)
      .reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cart,
    isLoading,
    itemCount: cart.itemCount,
    total: cart.total,
    items: cart.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem,
    isInCart,
    getProductItemCount
  };
}