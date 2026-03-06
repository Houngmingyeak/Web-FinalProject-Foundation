<<<<<<<<< Temporary merge branch 1
// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

export default function Header() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
=========
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
>>>>>>>>> Temporary merge branch 2
      .toUpperCase()
      .slice(0, 2);
  };

<<<<<<<<< Temporary merge branch 1
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm 
      dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6 md:px-16">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={MindStack} alt="MindStack" className="w-8 h-8" />
          <p className="text-xl font-bold text-gray-900 dark:text-white">MindStack</p>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>

            {currentUser ? (
              <>
                <Link
                  to="/ask"
                  className="block w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ask Question
                </Link>
                <Link
                  to="/profile"
                  className="block w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/favorites"
                  className="block w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Favorites
                </Link>
                <Link
                  to="/chat"
                  className="block w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
=========
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
>>>>>>>>> Temporary merge branch 2
          </div>
        )}
      </div>
    </header>
  );
}