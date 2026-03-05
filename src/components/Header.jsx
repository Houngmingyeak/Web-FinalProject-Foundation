import React from "react";
import { Link } from "react-router-dom";
import MindStack from "../assets/Mindstack.png";
import { GoSun } from "react-icons/go";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

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
        {/* Navigation Links */}
        <nav className="flex-1 max-w-xl mx-8 hidden md:flex justify-center gap-6 text-gray-900 dark:text-gray-200">
          <Link to="/features" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Features
          </Link>
          <Link to="/testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Testimonials
          </Link>
          <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            About Us
          </Link>
        </nav>
        {/* Action Buttons Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          {/* Ask Questions Button */}
          <button className="hidden lg:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm">
            <span>Log in</span>
          </button>
          <Link to="/signup" className="hidden lg:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm">
            <span>Sign up free</span>

          {/* Login / Signup Buttons */}
          <Link
            to="/login"
            className="hidden lg:inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hidden lg:inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm"
          >
            Sign Up Free
          </Link>
        </div>
      
    </header>
  );
}