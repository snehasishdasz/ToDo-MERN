import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const SignUp = () => {
   const [user, setUser] = useState({
        fullName:"",
        email: "",
        password: "",
     });
     const navigate = useNavigate();

     const registerHandler = async()=>{
        try{
            const res = await axios.post(
              "http://localhost:8000/api/v1/user/signup",
              {
                fullName: user.fullName,
                email: user.email,
                password: user.password,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message, {
                    duration: 2000,
                });
                navigate("/");
            }
        }
        catch (error) {
            toast.error(error.response.data.error, {
              // position: "top-center",
              duration: 2000, // 3 seconds
            });
            console.log(error);
        }
     }

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
            value={user.fullName}
            onChange={(e)=> setUser({...user, fullName: e.target.value })}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <Input
            type="email"
            placeholder="john@example.com"
            className="bg-gray-700 text-white placeholder-gray-400"
            value={user.email}
            onChange={(e)=> setUser({...user, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            className="bg-gray-700 text-white placeholder-gray-400"
            value={user.password}
            onChange={(e)=> setUser({...user, password: e.target.value })}
          />
        </div>


        {/* Register Button */}
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          onClick={registerHandler}
          >
          Register 🚀
        </Button>
      </div>
    </div>
  );
};

export default SignUp