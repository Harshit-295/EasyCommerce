"use client"
import React from "react";
import { useCart } from "@/contexts/CartContext"; 

export default function CartCard({ item }: { item: any }) {
  const { removeFromCart } = useCart();

  return (
    <div className="card w-full bg-base-100 shadow-md p-4 flex flex-col md:flex-row gap-4 items-center md:items-start">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-28 h-28 object-contain rounded-md bg-white p-2"
      />

      {/* Product Info */}
      <div className="flex-1 text-center md:text-left space-y-1">
        <h2 className="text-lg font-semibold truncate">{item.name}</h2>
        <p className="text-sm text-gray-500">₹{item.price}</p>
        <p className="text-sm">Quantity: {item.quantity}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => removeFromCart(item)}
          className="btn btn-sm btn-error text-white"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

