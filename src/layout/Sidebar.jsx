import { Link, useLocation } from "react-router-dom";
import { FaRegQuestionCircle, FaRegUser, FaBookmark } from "react-icons/fa";
import { LuSwords } from "react-icons/lu";
import { GoTrophy } from "react-icons/go";
import { FiHome } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa6";

const navItems = [
  {
    label: "Home",
    path: "/",
    icon: <FiHome />,
  },
  {
    label: "Questions",
    path: "/questions",
    icon: <FaRegQuestionCircle />,
  },
  {
    label: "Leaderboard",
    path: "/leaderboard",
    icon: <GoTrophy />,
  },
  {
    label: "Challenges",
    path: "/challenges",
    icon: <LuSwords />,
  },
  {
    label: "Saves",
    path: "/saves",
    icon: <FaRegBookmark />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <FaRegUser />,
  },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    // <aside className="w-72 bg-white border-r border-gray-300 border-b border-gray-300 flex flex-col py-4 sticky mb-4 hidden lg:block">
    //   <nav className="flex flex-col gap-0.5 px-4 text-black text-sm font-medium">

    //     {navItems.map(({ label, path, icon }) => (
    //       <Link
    //         key={label}
    //         to={path}
    //         className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-md font-medium transition-colors ${
    //           location.pathname === path
    //             ? "bg-blue-50 text-blue-600"
    //             : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
    //         }`}
    //       >
    //         {icon}
    //         {label}
    //       </Link>
    //     ))}
    //   </nav>

    //   {/* XP Progress at the bottom */}
    //   <div className="px-4 mt-2">
    //     <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
    //       Your Progress
    //     </p>
    //     <div className="flex items-center gap-2 mb-1.5">
    //       <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white">
    //         12
    //       </span>
    //       <div>
    //         <p className="text-[11px] font-semibold text-gray-700">Level 12</p>
    //         <p className="text-[10px] text-gray-400">720 / 1000 XP</p>
    //       </div>
    //     </div>
    //     <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
    //       <div
    //         className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
    //         style={{ width: "52%" }}
    //       />
    //     </div>
    //   </div>
    // </aside>
    <aside className="w-72 bg-white border-r border-gray-300 flex flex-col py-4 sticky top-0 h-screen hidden lg:block">
      <nav className="flex flex-col gap-0.5 px-4">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FiHome size={18} />
          Home
        </Link>

        <Link
          to="/questions"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaRegQuestionCircle size={18} />
          Question
        </Link>

        <Link
          to="/leaderboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <GoTrophy size={18} />
          Leaderboard
        </Link>

        <Link
          to="/challenges"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <LuSwords size={18} />
          Challenge
        </Link>

        <Link
          to="/saves"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaRegBookmark size={18} />
          Save
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaRegUser size={18} />
          Profile
        </Link>
      </nav>

      {/* Your XP Progress section can stay right here below the nav */}
      {/* XP Progress at the bottom */}
      <div className="px-4 mt-2">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Your Progress
        </p>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white">
            12
          </span>
          <div>
            <p className="text-[11px] font-semibold text-gray-700">Level 12</p>
            <p className="text-[10px] text-gray-400">720 / 1000 XP</p>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
            style={{ width: "52%" }}
          />
        </div>
      </div>
    </aside>
  );
}
