"use client";
import React from "react";
import { useCart } from "@/contexts/CartContext";
import CartCard from "../components/CartCard";

interface CartItem {
  _id: string;
  productId?: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  stock?: number;
  quantity: number;
}

function CartPage() {
  const { cartItems }: { cartItems: CartItem[] } = useCart();

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">🛒 Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <CartCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;


