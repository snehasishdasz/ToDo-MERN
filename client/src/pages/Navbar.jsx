import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {

  const navigate = useNavigate();

const [userData, setUserData] = useState(null);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/logout",{}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message, {
          duration: 2000,
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.error, {
        // position: "top-center",
        duration: 2000, 
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user",
          {
            withCredentials: true,
          }
        );
        console.log(res.data.user);
        if(res.data.success) {
          setUserData(res.data.user);
          
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    console.log(userData);
    fetchUser();
  }, []);

  return (
    <nav className="w-full flex justify-center bg-black border-b border-gray-700 shadow-sm py-3">
      <div className="w-full max-w-3xl px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">TaskFlow</h1>

        {userData ? (
          <DropdownMenu className="bg-gray-600">
            <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-700 text-white">
                  {userData.fullName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium text-yellow-500">
                  {userData.fullName}
                </span>
                <span className="text-xs text-white">{userData.email}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="font-medium text-black">
                {userData.fullName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="text-white">Loading...</div>
        )}
      </div>
    </nav>
  );
}
