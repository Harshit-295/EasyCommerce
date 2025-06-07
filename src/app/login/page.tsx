"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful! Redirecting...");
      router.push("/profile");
    } catch (error: any) {
      toast.error("Login failed: " + (error?.response?.data?.message || error.message));
    }
  };

  return (
    <div data-theme="cupcake" className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 space-y-4 bg-base-100 shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-center text-primary">Login</h1>

        {/* Email */}
        <div className="form-control w-full">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="input input-bordered input-primary w-full"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="form-control w-full">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="input input-bordered input-primary w-full"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <button className="btn btn-primary w-full mt-4" onClick={onLogin}>
          Login
        </button>

        <p className="text-center mt-2">
          Don't have an account?{" "}
          <Link href="/signup" className="text-info underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

