"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// 1. Create context
const CartContext = createContext();

// 2. Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/users/cart");
      setCartItems(res.data.cart?.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Add item to cart
  const addToCart = async (item) => {
    try {
      await axios.post("/api/users/cart", item);
      await fetchCart(); 
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (item) => {
  try {
    await axios.delete("/api/users/cart", {
      params: { id: item.productId || item._id }, // safer fallback
    });
    await fetchCart();
  } catch (error) {
    console.error("Failed to delete from cart", error);
  }
};

useEffect(() => {
  const token = document.cookie.includes("token"); // very basic check
  if (token) {
    fetchCart();
  }
}, [typeof window !== "undefined" && document.cookie]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
