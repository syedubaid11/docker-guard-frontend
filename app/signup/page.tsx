"use client";

import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);
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
              <p className="text-gray-600">Create your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

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

              {/* Company Field */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Company (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Password</label>
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

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 cursor-pointer"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <span className="font-semibold text-black hover:underline cursor-pointer">Terms of Service</span> and <span className="font-semibold text-black hover:underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors duration-200 mt-6"
              >
                Create Account
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a href="/signin" className="font-semibold text-black hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="font-bold text-black text-lg">Free</div>
              <p className="text-xs text-gray-600 mt-1">No credit card required</p>
            </div>
            <div className="text-center">
              <div className="font-bold text-black text-lg">Fast</div>
              <p className="text-xs text-gray-600 mt-1">Get started in seconds</p>
            </div>
            <div className="text-center">
              <div className="font-bold text-black text-lg">Secure</div>
              <p className="text-xs text-gray-600 mt-1">Enterprise-grade security</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
