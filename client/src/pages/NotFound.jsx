import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18122B] via-[#393053] to-[#18122B] relative overflow-hidden">
      {/* Decorative blurred background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg bg-black/40 border border-[#2A2250] rounded-2xl shadow-2xl p-10 md:p-14 backdrop-blur-lg text-center">
        <div className="mb-8">
          <span className="inline-block bg-[#6C63FF] text-white font-bold rounded-full px-5 py-2 text-3xl shadow-lg mb-4">
            404
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-[#bcb7e3] text-lg mb-6">
            Oops! The page you’re looking for doesn’t exist or has been moved.
          </p>
        </div>
        <Link
          to="/"
          className="inline-block bg-[#6C63FF] hover:bg-[#7f6bfa] text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
