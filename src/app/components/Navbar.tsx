"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { cartItems } = useCart();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const Logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout error", error.message);
    }
  };

  return (
    <nav className="w-full bg-base-200 shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          ShopWave
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4 items-center">
          <Link href="/" className="btn btn-ghost btn-sm">
            Home
          </Link>
          <Link href="/cart" className="btn btn-ghost btn-sm">
            Cart ({cartItems.length})
          </Link>
          <button className="btn btn-sm btn-error text-white" onClick={Logout}>
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden btn btn-ghost btn-sm"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="flex flex-col gap-2 mt-2 md:hidden">
          <Link href="/" className="btn btn-ghost btn-sm">
            Home
          </Link>
          <Link href="/cart" className="btn btn-ghost btn-sm">
            Cart ({cartItems.length})
          </Link>
          <button className="btn btn-sm btn-error text-white" onClick={Logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
