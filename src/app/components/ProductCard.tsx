import { useCart } from "@/contexts/CartContext";
import React from "react";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <div className="card w-full bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden group">
      <figure className="relative aspect-[4/3] bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
          {product.category || "Product"}
        </span>
      </figure>

      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-green-600 text-lg font-bold">₹{product.price}</span>

          <button
            onClick={() =>
              addToCart({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: product.size,
                stock: product.stock,
                quantity: 1,
              })
            }
            className="btn btn-sm btn-primary flex items-center gap-2 px-4 py-1.5 hover:scale-105 transition-transform duration-200"
          >
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
