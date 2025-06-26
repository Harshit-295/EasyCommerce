"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import {connect} from "@/dbConfig/dbConfig";
import Navbar from "../components/Navbar";
interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  size: string;
  stock: string;
  description:string;
}

connect();
export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/users/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center p-10">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 p-10">{error}</p>;

  return (
    <div data-theme="cupcake">
      <Navbar />
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {loading ? (
          <p className="col-span-full text-center p-10">Loading products...</p>
        ) : error ? (
          <p className="col-span-full text-center text-red-500 p-10">{error}</p>
        ) : products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No products found</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </main>
    </div>
  );
}


