"use client";

import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign In Data:", formData);
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-hidden tasa-orbiter-display">
      {/* Grid Background */}
      <div className="fixed inset-0 w-full h-full">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="border border-gray-200 rounded-lg p-8 bg-white">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="tasa-orbiter-display text-4xl text-black mb-2">Docker Guard</h1>
              <p className="text-gray-600">Welcome back</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-black">Password</label>
                  <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                    Forgot?
                  </a>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors duration-200 mt-6"
              >
                Sign In
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="font-semibold text-black hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="font-bold text-black text-lg">Instant</div>
              <p className="text-xs text-gray-600 mt-1">Scan in seconds</p>
            </div>
            <div className="text-center">
              <div className="font-bold text-black text-lg">Accurate</div>
              <p className="text-xs text-gray-600 mt-1">99.9% detection</p>
            </div>
            <div className="text-center">
              <div className="font-bold text-black text-lg">Simple</div>
              <p className="text-xs text-gray-600 mt-1">Easy to use</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
