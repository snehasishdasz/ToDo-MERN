import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
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

      <Card className="relative z-10 w-full max-w-md bg-black/40 border border-[#2A2250] rounded-2xl shadow-2xl p-8 md:p-10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-white text-center mb-2">
            Welcome Back 👋
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#bcb7e3]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="you@example.com"
              className="bg-[#2A2250]/70 text-white placeholder-gray-400 border border-[#2A2250] rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#bcb7e3]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
              className="bg-[#2A2250]/70 text-white placeholder-gray-400 border border-[#2A2250] rounded-lg"
            />
          </div>
          <Button
            className="w-full bg-[#6C63FF] hover:bg-[#7f6bfa] transition-all text-white font-semibold text-lg py-3 rounded-lg shadow-lg"
            onClick={loginHandler}
          >
            Login 🚀
          </Button>
          <p className="text-center text-sm text-[#bcb7e3]">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="text-[#6C63FF] cursor-pointer hover:underline font-medium">
                Sign up
              </span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
