import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiSettings, 
  FiEdit2, 
  FiKey, 
  FiLogOut, 
  FiChevronDown, 
  FiUser
} from "react-icons/fi";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function AccountProfileDropdown({ profile, onEditProfile, onChangePassword }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out successfully");
    navigate("/login");
    setIsOpen(false);
  };

  const menuItems = [
    {
      label: "Edit Profile",
      icon: FiEdit2,
      onClick: () => {
        if (onEditProfile) onEditProfile();
        setIsOpen(false);
      },
      color: "text-gray-700 dark:text-gray-200",
      hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
      hoverText: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      label: "Change Password",
      icon: FiKey,
      onClick: () => {
        if (onChangePassword) onChangePassword();
        setIsOpen(false);
      },
      color: "text-gray-700 dark:text-gray-200",
      hoverBg: "hover:bg-amber-50 dark:hover:bg-amber-900/20",
      hoverText: "hover:text-amber-600 dark:hover:text-amber-400",
    },
    {
      label: "Logout",
      icon: FiLogOut,
      onClick: handleLogout,
      color: "text-red-500",
      hoverBg: "hover:bg-red-50 dark:hover:bg-red-900/20",
      hoverText: "hover:text-red-600",
    },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2.5 px-5 py-2.5 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 
          rounded-2xl shadow-sm 
          text-gray-800 dark:text-gray-100 
          font-bold text-[14px]
          transition-all duration-300
          hover:border-blue-500/50 dark:hover:border-blue-400/50
          hover:shadow-md hover:shadow-blue-500/5 dark:hover:shadow-blue-400/5
          active:scale-95
          ${isOpen ? "ring-2 ring-blue-500/20 border-blue-500 dark:border-blue-400" : ""}
        `}
      >
        <div className={`p-1 rounded-lg transition-colors ${isOpen ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
          <FiSettings className={`w-4.5 h-4.5 ${isOpen ? "animate-spin-slow" : ""}`} />
        </div>
        <span>Setting</span>
        <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              absolute right-0 mt-3 w-64 
              bg-white dark:bg-gray-900 
              border border-gray-100 dark:border-gray-800 
              rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-black/50
              backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95 
              overflow-hidden z-[100]
            "
          >
            {/* Profile Brief (Optional but looks premium) */}
            {profile && (
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-sm ring-2 ring-white dark:ring-gray-800">
                    {profile.displayName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {profile.displayName}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {profile.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Sections */}
            <div className="p-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`
                    w-full flex items-center gap-3.5 px-3.5 py-3 
                    rounded-xl transition-all duration-200
                    group relative
                    ${item.hoverBg} ${item.hoverText}
                  `}
                >
                  <div className={`p-2 rounded-lg transition-colors bg-gray-100/50 dark:bg-gray-800/50 group-hover:bg-white dark:group-hover:bg-gray-700 shadow-xs`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[14px] font-semibold ${item.color} group-hover:inherit transition-colors`}>
                    {item.label}
                  </span>
                  
                  {/* Subtle arrow for non-logout items */}
                  {item.label !== "Logout" && (
                     <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <FiChevronDown className="-rotate-90 w-3.5 h-3.5" />
                     </div>
                  )}
                </button>
              ))}
            </div>

            {/* Bottom Decoration */}
            <div className="h-1 bg-linear-to-r from-blue-500 via-purple-500 to-amber-500 opacity-20" />
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
}
