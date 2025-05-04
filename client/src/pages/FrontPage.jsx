import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const FrontPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleGetStarted = () => {
        if (isLoggedIn) {
            navigate("/home");
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#393053] to-[#18122B] flex items-center justify-center px-2">
            <div className="bg-[#1a1530] rounded-2xl shadow-2xl p-6 md:p-10 w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl min-h-[400px] border border-[#2A2250] relative">
                {/* Navbar */}
                <nav className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 sm:gap-0">
                    <div className="flex items-center space-x-2">
                        <div className="bg-[#6C63FF] p-2 rounded-lg">
                            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                <rect width="18" height="18" x="3" y="3" rx="4" />
                            </svg>
                        </div>
                        <span className="text-base md:text-lg font-semibold text-white">
                            TodoVault
                        </span>
                    </div>

                    <div className="flex space-x-2">
                        {isLoggedIn ? (
                            <Link
                                to="/home"
                                className="bg-[#6C63FF] hover:bg-[#4B45B6] text-white px-5 py-2 rounded-md font-semibold transition"
                            >
                                Create
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-[#bcb7e3] font-medium no-underline  px-3 py-1 rounded transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="bg-[#6C63FF] hover:bg-[#4B45B6] text-white px-5 py-2 rounded-md font-semibold transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="text-left md:text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        Welcome to <span className="text-[#bcb7e3]">TodoVault</span> 🚀
                    </h2>
                    <p className="text-[#bcb7e3] text-base sm:text-lg mb-8">
                        Manage tasks and boost productivity with TodoVault.
                    </p>

                    <button
                        onClick={handleGetStarted}
                        className="bg-[#6C63FF] hover:bg-[#4B45B6] text-white px-8 py-3 rounded-lg font-semibold transition text-lg w-full sm:w-auto inline-block text-center"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;
