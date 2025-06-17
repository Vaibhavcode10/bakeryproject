import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [selectedCookies, setSelectedCookies] = useState([]); // Array of { name, quantity }
  const [selectedSnacks, setSelectedSnacks] = useState([]); // Array of { name, quantity }
  const [selectedPastries, setSelectedPastries] = useState([]); // Array of { name, quantity }
  const [total, setTotal] = useState(0); // Total price
  const [email, setEmail] = useState(''); // Email state

  const addToCart = (itemObj, itemType = 'cookie') => {
    if (itemType === 'cookie') {
      setSelectedCookies((prev) => {
        const existingItem = prev.find(item => item.name === itemObj.name);
        if (existingItem) {
          return prev.map(item =>
            item.name === itemObj.name ? { ...item, quantity: item.quantity + itemObj.quantity } : item
          );
        }
        return [...prev, itemObj];
      });
    } else if (itemType === 'snack') {
      setSelectedSnacks((prev) => {
        const existingItem = prev.find(item => item.name === itemObj.name);
        if (existingItem) {
          return prev.map(item =>
            item.name === itemObj.name ? { ...item, quantity: item.quantity + itemObj.quantity } : item
          );
        }
        return [...prev, itemObj];
      });
    } else if (itemType === 'pastry') {
      setSelectedPastries((prev) => {
        const existingItem = prev.find(item => item.name === itemObj.name);
        if (existingItem) {
          return prev.map(item =>
            item.name === itemObj.name ? { ...item, quantity: item.quantity + itemObj.quantity } : item
          );
        }
        return [...prev, itemObj];
      });
    }
  };

  const sendCartToBackend = async () => {
    try {
      const cartData = {
        email: email || 'guest@example.com',
        cookies: selectedCookies.map(item => ({
          name: item.name,
          price: item.price || 0, // Adjust if price isn’t available
        })),
        snacks: selectedSnacks.map(item => ({
          name: item.name,
          price: item.price || 0,
        })),
        pastries: selectedPastries.map(item => ({
          name: item.name,
          price: item.price || 0,
        })),
        total: total,
      };

      const response = await fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update cart: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Cart sent to backend successfully:', result);
      return result;
    } catch (error) {
      console.error('Error sending cart to backend:', error.message);
      throw error;
    }
  };

  console.log(email); // For debugging

  const value = {
    selectedCookies,
    selectedSnacks,
    selectedPastries,
    addToCart,
    total,
    setTotal,
    email,
    setEmail,
    sendCartToBackend,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export const useProducts = () => useContext(ProductContext);