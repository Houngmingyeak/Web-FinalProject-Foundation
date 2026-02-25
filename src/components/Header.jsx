import React from "react";
import MindStack from "../assets/Mindstack.png";
import { GoSun } from "react-icons/go";

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
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions....."
              className="w-full bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex items-center space-y-0 space-x-4">
          {/* Theme Toggle Button */}
          <button className="p-2 bg-gray-50 text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-100 transition">
            {/* Replace with <Sun size={18} /> */}
            {/* <span className="text-xs">☀</span> */}
            <GoSun />
          </button>

          {/* Ask Questions Button */}
          <button className="hidden lg:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm">
            {/* Replace with <SquarePen size={18} /> */}
            <span>Log in</span>
          </button>
          <button className="hidden lg:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm">
            {/* Replace with <SquarePen size={18} /> */}
            <span>Sign up free</span>
          </button>
        </div>
      </div>
    </header>
  );
}
