import React from "react";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img src={product.image} alt={product.name} className="h-48 object-cover w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-lg font-semibold text-green-600">₹{product.price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
