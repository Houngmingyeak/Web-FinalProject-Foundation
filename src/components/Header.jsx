import React from "react";
import MindStack from "../assets/Mindstack.png";
import { GoSun } from "react-icons/go";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6 md:px-16">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src={MindStack} alt="" className="w-8 h-8" />
          <p className="text-xl font-bold text-gray-900">MindStack</p>
        </div>

        {/* Search Bar Section */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block ">
          <div className="flex gap-4 justify-center text-gray-300">
            <a href="" className="hover:text-black transition-colors">
              Feature
            </a>
            <a  href="" className="hover:text-black transition-colors">
              Testimonials
            </a>
            <Link to="/about" className="hover:text-black transition-colors">
              About us
            </Link>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex items-center space-y-0 space-x-4">
          {/* Theme Toggle Button */}
          <button className="p-2 bg-gray-50 text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-100 transition">
            <GoSun />
          </button>

          {/* Ask Questions Button */}
          <button className="hidden lg:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm">
            <span>Log in</span>
          </button>
          <Link to="/signu" className="hidden lg:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm">
            <span>Sign up free</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
