"use client";
import React from "react";
import { useRouter } from "next/navigation";

function Admin() {
  const router = useRouter();
  const [product, setProduct] = React.useState<{
    name: string;
    description: string;
    price: string;
    size: string;
    stock: string;
    category:string,
    image: File | null;
  }>({
    name: "",
    description: "",
    price: "",
    size: "",
    stock: "",
    category:"",
    image: null,
  });

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("size", product.size);
      formData.append("stock", product.stock);
      formData.append("category",product.category);
      if (product.image) {
        formData.append("file", product.image);
      }

      const response = await fetch("/api/users/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Product created successfully:", data);
      window.location.reload();
    } catch (error: any) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-cover bg-center px-4 py-10 relative" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-md shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => router.push("/home")}
          className="btn btn-outline btn-primary"
        >
          ⬅️ Home
        </button>
      </nav>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Form Card */}
      <div className="relative z-10 mt-24 w-full max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          🛍️ Add a New Product
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Size"
            className="input input-bordered w-full"
            value={product.size}
            onChange={(e) => setProduct({ ...product, size: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="input input-bordered w-full"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="category"
            className="input input-bordered w-full"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            className="input input-bordered w-full"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />
        </div>

        <textarea
          placeholder="Product Description"
          className="textarea textarea-bordered w-full"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        ></textarea>

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={(e) =>
            setProduct({ ...product, image: e.target.files?.[0] ?? null })
          }
        />

        <button
          onClick={handleSubmit}
          className="btn btn-primary w-full hover:scale-105 transition-transform duration-200"
        >
          ➕ Add Product
        </button>
      </div>
    </div>
  );
}

export default Admin;

