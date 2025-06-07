"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignup = async () => {
        try {
            const response = await axios.post("/api/users/signup", user);
            toast.success("Signup successful! Redirecting to login...");
            router.push("/login");
        } catch (error: any) {
            toast.error("Signup failed: " + error?.response?.data?.message || error.message);
            console.error("Signup failed", error.message);
        }
    };

    return (
        <div data-theme="cupcake" className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="w-full max-w-md p-8 space-y-4 bg-base-100 shadow-xl rounded-xl">
                <h1 className="text-3xl font-bold text-center text-primary">Sign Up</h1>

                {/* Username */}
                <div className="form-control w-full">
                    <label htmlFor="username" className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        className="input input-bordered input-primary w-full"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>

                {/* Email */}
                <div className="form-control w-full">
                  <label htmlFor="email" className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
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

                {/* Signup Button */}
                <button className="btn btn-primary w-full mt-4" onClick={onSignup}>
                    Sign Up
                </button>

                {/* Login Redirect */}
                <p className="text-center mt-2">
                    Already have an account?{" "}
                    <Link href="/login" className="text-info underline text">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}

