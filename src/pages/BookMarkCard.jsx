import { FaBookmark } from "react-icons/fa";
import Sidebar from "../layout/Sidebar";
import { useBookmarks } from "../hooks/useBookmarks";
import QuestionCard from "../components/QuestionCard"; // ← import QuestionCard

export default function BookmarkCard() {
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 p-6">

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center font-semibold text-blue-600 dark:text-blue-400 text-[16px]">
              AC
            </div>
            <div>
              <h2 className="text-[20px] font-semibold text-gray-900 dark:text-white">SreyKa</h2>
              <div className="text-[15px] text-gray-500 dark:text-gray-400 flex items-center gap-4 mt-0.5">
                <span className="text-yellow-500 font-medium">★ 4,250 rep</span>
                <span>Level 12</span>
                <span>Rank #42</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[13px] text-gray-500 dark:text-gray-400 mb-1">
              <span>Level 12</span>
              <span>720 / 1000 XP</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-[72%]" />
            </div>
          </div>
        </div>

        {/* Saves Section */}
        <div>
          <h3 className="text-[17px] font-semibold text-gray-700 dark:text-gray-200 mb-1">
            All Saves
          </h3>
          <p className="text-[14px] text-gray-400 dark:text-gray-500 mb-4">
            {bookmarks.length} Saved Items
          </p>

          {bookmarks.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">No saved questions yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {bookmarks.map((post) => (
                // ← ប្រើ QuestionCard ដូចគ្នាជាមួយ QuestionsPage
                <QuestionCard
                  key={post.id}
                  question={post}
                  isBookmarked={isBookmarked(post.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}