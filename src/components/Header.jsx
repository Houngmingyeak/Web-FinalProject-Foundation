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
    </header>
  );
}