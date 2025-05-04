import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const registerHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/signup",
        {
          fullName: user.fullName,
          email: user.email,
          password: user.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message, { duration: 2000 });
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response.data.error, { duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18122B] via-[#393053] to-[#18122B] relative overflow-hidden">
      {/* Decorative blurred background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-black/40 border border-[#2A2250] rounded-2xl shadow-2xl p-8 md:p-10 backdrop-blur-lg">
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          Create Account
        </h2>
        <p className="text-sm text-[#bcb7e3] text-center mb-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#6C63FF] hover:underline font-medium"
          >
            Login
          </Link>
        </p>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            registerHandler();
          }}
        >
          {/* Full Name */}
          <div>
            <label
              className="block text-sm text-[#bcb7e3] mb-1"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              className="bg-[#2A2250]/70 text-white placeholder-gray-400 border border-[#2A2250] rounded-lg"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              required
              autoComplete="name"
            />
          </div>
          {/* Email */}
          <div>
            <label
              className="block text-sm text-[#bcb7e3] mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="bg-[#2A2250]/70 text-white placeholder-gray-400 border border-[#2A2250] rounded-lg"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              autoComplete="email"
            />
          </div>
          {/* Password */}
          <div>
            <label
              className="block text-sm text-[#bcb7e3] mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-[#2A2250]/70 text-white placeholder-gray-400 border border-[#2A2250] rounded-lg"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          {/* Register Button */}
          <Button
            type="submit"
            className="w-full bg-[#6C63FF] hover:bg-[#7f6bfa] text-white font-semibold py-3 rounded-lg text-lg transition shadow-lg"
          >
            Register 🚀
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
