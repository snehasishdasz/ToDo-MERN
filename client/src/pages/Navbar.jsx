import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message, { duration: 2000 });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.error, { duration: 2000 });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user", {
          withCredentials: true,
        });
        if (res.data.success) {
          setUserData(res.data.user);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="w-full backdrop-blur-md bg-[#18122B]/90 border-b border-[#2A2250] py-3 px-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-[#6C63FF] p-2 rounded-lg">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="3" rx="4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">TodoVault</h1>
        </Link>

        {userData ? (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="flex items-center gap-3 py-1.5 px-2 rounded-full hover:bg-[#2A2250]/50 transition-colors"
            >
              <div className="h-8 w-8 bg-[#6C63FF] rounded-full flex items-center justify-center text-white font-medium">
                {userData.fullName?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium text-white">
                  {userData.fullName}
                </span>
                <span className="text-xs text-yellow-400">{userData.email}</span>
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-[#201c35] border border-[#2A2250] rounded-xl shadow-lg overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-3 border-b border-[#2A2250]">
                    <p className="text-sm font-medium text-white">
                      {userData.fullName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {userData.email}
                    </p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 p-2 text-sm text-red-400 hover:bg-[#2A2250]/50 rounded-lg transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#2A2250] rounded-full animate-pulse"></div>
            <div className="hidden sm:block h-4 w-20 bg-[#2A2250] rounded animate-pulse"></div>
          </div>
        )}
      </div>
    </nav>
  );
}
