import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.info("អ្នកបានចាកចេញពីប្រព័ន្ធ");
    navigate("/");
  };

  // បង្កើតអក្សរកាត់ពីឈ្មោះអ្នកប្រើ (ឧទាហរណ៍ "John Doe" → "JD")
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // កំណត់ពណ៌សម្រាប់ Avatar ដោយផ្អែកលើឈ្មោះ
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

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/questions" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
          Questions
        </Link>
        <Link to="/challenges" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
          Challenges
        </Link>
        <Link to="/leaderboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
          Leaderboard
        </Link>
      </nav>

      {/* User Section */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full ${getAvatarColor(
                  user.displayName
                )} flex items-center justify-center text-white font-bold`}
              >
                {getInitials(user.displayName)}
              </div>
              {/* Username (លាក់លើអេក្រង់តូច) */}
              <span className="hidden sm:inline text-gray-700 dark:text-gray-300">
                {user.displayName}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2 z-10">
                <Link
                  to="/account"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link
              to="/login"
              className="px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Signup
            </Link>
          </div>
        )}
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