import React from "react";
import { Link } from "react-router-dom";
import MindStack from "../assets/Mindstack.png";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6 md:px-16">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={MindStack} alt="MindStack Logo" className="w-8 h-8" />
          <p className="text-xl font-bold text-gray-900 dark:text-white">MindStack</p>
        </Link>

        {/* Navigation Links */}
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

          {/* Login / Signup Buttons */}
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
      </div>
    </header>
  );
}