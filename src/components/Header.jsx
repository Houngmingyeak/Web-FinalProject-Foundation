import React, { useContext } from "react";
import MindStack from "../assets/Mindstack.png";
import { GoSun, GoMoon } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

export default function Header() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm 
      dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6 md:px-16">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={MindStack} alt="MindStack" className="w-8 h-8" />
          <p className="text-xl font-bold text-gray-900 dark:text-white">MindStack</p>
        </div>

        {/* Navigation */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="flex gap-6 justify-center text-gray-600 dark:text-gray-300">
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-black dark:hover:text-white transition cursor-pointer"
            >
              Feature
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="hover:text-black dark:hover:text-white transition cursor-pointer"
            >
              Testimonials
            </button>
            <Link to="/about" className="hover:text-black dark:hover:text-white transition">
              About us
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border transition-all duration-300
              bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100
              dark:bg-gray-800 dark:text-yellow-400 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            {darkMode ? <GoMoon size={18} /> : <GoSun size={18} />}
          </button>

          <Link
            to="/login"
            className="hidden lg:flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hidden lg:flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm"
          >
            Sign Up
          </Link>

        </div>
      </div>
    </header>
  );
}