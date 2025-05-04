import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-white text-center">
          Create Account
        </h2>
        <p className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Login
          </Link>
        </p>

        {/* Full Name */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Full Name</label>
          <Input
            type="text"
            placeholder="John Doe"
            className="bg-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <Input
            type="email"
            placeholder="john@example.com"
            className="bg-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            className="bg-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Confirm Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            className="bg-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {/* Register Button */}
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
          Register 🚀
        </Button>
      </div>
    </div>
  );
};

export default SignUp