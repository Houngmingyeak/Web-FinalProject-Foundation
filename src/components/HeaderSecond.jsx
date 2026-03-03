import React from "react";
import MindStack from "../assets/Mindstack.png";
import { GoSun } from "react-icons/go";
import { Link } from "react-router-dom";

export default function HeaderSecond() {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6 md:px-16">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src={MindStack} alt="" className="w-8 h-8" />
          <p className="text-xl font-bold text-gray-900">MindStack</p>
        </div>

        {/* Search Bar Section */}
        <form className="w-lg h-10 ">
          <div className="relative">
            <input
              type="search"
              id="search"
              className="block w-full p-2 mt-1 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body "
              placeholder="Search here ..."
            />
          </div>
        </form>

        {/* Action Buttons Section */}
        <div className="flex items-center space-y-0 space-x-4">
          {/* Theme Toggle Button */}
          <button className="p-2 bg-gray-50 text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-100 transition">
            <GoSun />
          </button>

          {/* Ask Questions Button */}
          <button className="hidden lg:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm">
            <span>Ask Question</span>
          </button>
          <button className="bg-gray-200 w-9 h-9 rounded-2xl ">
            <span className="text-center">AC</span>
          </button>
        </div>
      </div>
    </header>
  );
}
