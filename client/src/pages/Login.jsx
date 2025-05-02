import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginHandler =async () => {
    console.log(user.email, user.password);
    try{
      const res = await axios.post("http://localhost:8000/api/v1/user/login",{
        email: user.email,
        password: user.password,
      },
      {
        headers:{
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
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
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 px-4">
      <Card className="w-full max-w-md shadow-lg border-none bg-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-white">
            Welcome Back 👋
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="you@example.com"
              className="bg-gray-700 text-white border-gray-600 focus-visible:ring-indigo-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
              className="bg-gray-700 text-white border-gray-600 focus-visible:ring-indigo-400"
            />
          </div>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold"
            onClick={loginHandler}
          >
            Login 🚀
          </Button>
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <span className="text-indigo-400 cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
