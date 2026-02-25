import React from 'react';
import Question from "../components/Question"
import { Link } from "react-router-dom";
const Sidebar = () => {
  const navItems = ['Home', 'Questions', 'Leaderboard', 'Challenges', 'Profile'];

  return (
    <aside className="w-72 h-full border-r border-gray-200 p-8 flex flex-col">
      <nav className="flex-1 space-y-1 mb-6">
        {navItems.map((item) => (
          <a 
            key={item} 
            href="#" 
            className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm transition-colors"
          >
            {item}
          </a>
        ))}
      <Question level={12} currentXP={720} maxXP={1000} />
      </nav>

    </aside>
  );
};

export default Sidebar;