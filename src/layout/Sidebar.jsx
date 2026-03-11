import { Link, useLocation } from "react-router-dom";
import { FaRegQuestionCircle, FaRegUser } from "react-icons/fa";
import { LuSwords } from "react-icons/lu";
import { GoTrophy } from "react-icons/go";
import { FiHome } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa6";
import { RiCloseLine } from "react-icons/ri";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
  fixed top-0 left-0 h-full z-30 w-64
  bg-white dark:bg-gray-950
  border-r border-gray-100 dark:border-gray-800
  flex flex-col py-4 overflow-y-auto
  transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  lg:relative lg:top-0 lg:h-auto lg:translate-x-0 lg:shrink-0 lg:z-auto
`}
      >
        <div className="lg:hidden flex items-center justify-between px-4 mb-2 pb-3 border-b border-gray-100 dark:border-gray-800">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Menu
          </span>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-2">
          <Link
            to="/"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition font-medium text-sm ${location.pathname === "/" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <FiHome className="text-[18px]" /> Home
          </Link>
          <Link
            to="/questions"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition font-medium text-sm ${location.pathname === "/questions" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <FaRegQuestionCircle className="text-[18px]" /> Questions
          </Link>
          <Link
            to="/leaderboard"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition font-medium text-sm ${location.pathname === "/leaderboard" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <GoTrophy className="text-[18px]" /> Leaderboard
          </Link>
          <Link
            to="/challenges"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition font-medium text-sm ${location.pathname === "/challenges" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <LuSwords className="text-[18px]" /> Challenges
          </Link>
          <Link
            to="/saves"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition font-medium text-sm ${location.pathname === "/saves" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <FaRegBookmark className="text-[18px]" /> Saves
          </Link>
          <Link
            to="/profile"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition font-medium text-sm ${location.pathname === "/profile" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <FaRegUser className="text-[18px]" /> Profile
          </Link>
        </nav>
      </aside>
    </>
  );
}
