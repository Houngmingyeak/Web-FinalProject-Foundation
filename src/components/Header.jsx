import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { user } = useSelector((state) => state.auth);

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = [
      "bg-red-500","bg-blue-500","bg-green-500","bg-yellow-500",
      "bg-purple-500","bg-pink-500","bg-indigo-500","bg-orange-500",
      "bg-teal-500","bg-cyan-500",
    ];
    const index = (name?.length || 0) % colors.length;
    return colors[index];
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex items-center justify-between transition-colors duration-300">
      <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
        Forum
      </Link>

      <nav className="hidden md:flex space-x-6">
        <Link to="/questions" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
          Questions
        </Link>
        <Link to="/challenges" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
          Challenges
        </Link>
        <Link to="/leaderboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
          Leaderboard
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {user ? (
          <Link to={`/account`}>
            <div className={`w-10 h-10 rounded-full ${getAvatarColor(user.displayName)} flex items-center justify-center text-white font-bold transition-colors duration-300`}>
              {getInitials(user.displayName)}
            </div>
          </Link>
        ) : (
          <div className="flex space-x-2">
            <Link to="/login" className="px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}