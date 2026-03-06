import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSlice';
import { useGetProfileQuery } from '../features/profile/profileApi';
import { useAuthImage } from '../hooks/useAuthImage';
import { FiSearch, FiMoon, FiSun, FiMenu } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: profile } = useGetProfileQuery(undefined, { skip: !isAuthenticated });
  const avatarSrc = useAuthImage(profile?.profileImage ?? null);

  // Global theme from ThemeProvider (persisted in localStorage)
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Check if we are on the exact Home page
  const isHomePage = location.pathname === '/';

  // --------------------------------------------------------
  // UI 1: HOME PAGE HEADER  (Landing / Before Login)
  // White bg · Logo · Nav links · Toggle · Log in · Sign up free
  // --------------------------------------------------------
  if (isHomePage) {
    return (
      <header className="w-full bg-white dark:bg-gray-950 sticky top-0 z-50 transition-colors duration-300">
        {/* Blue accent line at the very bottom */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

            {/* ── Logo ─────────────────────────────── */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              {/* Wingmark "M" icon */}
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shadow-blue-200 dark:shadow-blue-900/30 transition-transform group-hover:scale-105">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M3 17V7l9 5 9-5v10l-9-5-9 5z" />
                </svg>
              </div>
              <span className="text-[22px] font-black text-gray-900 dark:text-white tracking-tight">
                Mind<span className="text-blue-600 dark:text-blue-400">Stack</span>
              </span>
            </Link>

            {/* ── Nav links (centre) ────────────────── */}
            <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
              {["Features", "Testimonials", "About Us"].map((label) => (
                <Link
                  key={label}
                  to={`/${label.toLowerCase().replace(" ", "-")}`}
                  className="text-[15px] font-medium text-gray-600 dark:text-gray-300
                    hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* ── Right actions ─────────────────────── */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Theme toggle */}
              <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />

              {isAuthenticated ? (
                <Link
                  to="/questions"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-bold rounded-full transition-all hover:-translate-y-0.5 shadow-sm shadow-blue-200 dark:shadow-blue-900/30"
                >
                  Go to App
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hidden sm:block text-[14px] font-semibold text-gray-700 dark:text-gray-200
                      hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="hidden sm:flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700
                      text-white text-[14px] font-bold rounded-full transition-all
                      hover:-translate-y-0.5 shadow-sm shadow-blue-200 dark:shadow-blue-900/30"
                  >
                    Sign up free
                  </Link>
                </>
              )}

              {/* Mobile hamburger */}
              <button className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <FiMenu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Blue bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600" />
        </div>
      </header>
    );
  }


  // --------------------------------------------------------
  // UI 2: APP HEADER (Questions, Profile, etc.)
  // Logo | Search Input | Dark Mode | Avatar
  // --------------------------------------------------------
  return (
    <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* 1. Logo */}
        <Link to="/questions" className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg transition-transform group-hover:scale-105">
            Q
          </div>
          <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight hidden sm:block">
            Mind<span className="text-blue-600 dark:text-blue-500">Stack</span>
          </span>
        </Link>

        {/* 2. Global Search Input */}
        <div className="flex-1 max-w-2xl px-4">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search questions, topics, or tags..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
            />
            {/* Optional Keyboard Shortcut Hint */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1">
              <kbd className="px-2 py-1 text-[10px] font-bold text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">⌘</kbd>
              <kbd className="px-2 py-1 text-[10px] font-bold text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">K</kbd>
            </div>
          </div>
        </div>

        {/* 3, 4 & 5. Ask Button + Dark Mode + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Ask Question CTA */}
          {isAuthenticated && (
            <Link
              to="/ask"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-sm shadow-blue-200 dark:shadow-blue-900/30"
            >
              <span className="text-base leading-none">✏️</span>
              Ask
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />

          {/* User Avatar */}
          {isAuthenticated ? (
            <Link to="/account" className="relative group block">
              <div className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-100 dark:bg-gray-800 transition-all group-hover:border-blue-500 dark:group-hover:border-blue-400">
                {avatarSrc ? (
                  <img src={avatarSrc} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm">
                    {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-gray-950 rounded-full"></div>
            </Link>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors border border-transparent">
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────
// Animated Dark / Light Mode Toggle Pill
// ─────────────────────────────────────────────────────────
function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Light mode' : 'Dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '999px',
        border: isDarkMode ? '1.5px solid #374151' : '1.5px solid #e5e7eb',
        background: isDarkMode
          ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
          : 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: isDarkMode
          ? '0 0 0 0 transparent, inset 0 1px 2px rgba(0,0,0,0.4)'
          : '0 1px 4px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.9)',
        outline: 'none',
      }}
    >
      {/* Sun icon */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: isDarkMode ? 'transparent' : '#fbbf24',
          color: isDarkMode ? '#6b7280' : '#ffffff',
          transition: 'all 0.25s ease',
          transform: isDarkMode ? 'scale(0.75)' : 'scale(1)',
          opacity: isDarkMode ? 0.45 : 1,
        }}
      >
        <FiSun style={{ width: '13px', height: '13px', strokeWidth: 2.5 }} />
      </span>

      {/* Moon icon */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: isDarkMode ? '#3b82f6' : 'transparent',
          color: isDarkMode ? '#ffffff' : '#9ca3af',
          transition: 'all 0.25s ease',
          transform: isDarkMode ? 'scale(1)' : 'scale(0.75)',
          opacity: isDarkMode ? 1 : 0.45,
        }}
      >
        <FiMoon style={{ width: '13px', height: '13px', strokeWidth: 2.5 }} />
      </span>
    </button>
  );
}