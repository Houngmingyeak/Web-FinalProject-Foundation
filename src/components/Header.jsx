// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import ThemeToggle from "./ThemeToggle.jsx";
import { toast } from "react-hot-toast"; // Make sure to install react-hot-toast if you're using it

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("You have been logged out");
    navigate("/");
  };

  // Generate initials from username (e.g., "John Doe" → "JD")
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-cyan-500",
    ];
    const index = (name?.length || 0) % colors.length;
    return colors[index];
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Forum
      </Link>

      {/* Navigation Links - Desktop */}
      <nav className="flex-1 max-w-xl mx-8 hidden md:flex justify-center gap-6 text-gray-900 dark:text-gray-200">
        <Link to="/features" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
          Features
        </Link>
        <Link to="/testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
          Testimonials
        </Link>
        <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
          About Us
        </Link>
      </nav>

      {/* Action Buttons Section */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu or Auth Buttons */}
        {user ? (
          // User is logged in - show avatar and logout
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full ${getAvatarColor(user.displayName || user.email)} flex items-center justify-center text-white font-semibold text-sm`}>
                {getInitials(user.displayName || user.email)}
              </div>
              <span className="hidden lg:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                {user.displayName || user.email?.split('@')[0]}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="hidden lg:inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          // User is not logged in - show login/signup buttons
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="hidden lg:inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hidden lg:inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm"
            >
              Sign Up Free
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg md:hidden z-50">
          <div className="flex flex-col p-4 space-y-3">
            <Link 
              to="/features" 
              className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/testimonials" 
              className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              to="/about" 
              className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            
            {!user && (
              <>
                <Link 
                  to="/login" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up Free
                </Link>
              </>
            )}
            
            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}