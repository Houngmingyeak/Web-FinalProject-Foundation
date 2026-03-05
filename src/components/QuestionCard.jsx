// src/components/QuestionCard.jsx
import { useState } from "react";
import { FaRegEye, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FiMessageCircle, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function QuestionCard({ question }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!question) return null;

  const {
    author = {},
    comments = 0,
    views = 0,
    time = "",
    id,
    title,
    excerpt,
    tags = []
  } = question;

  const handleBookmark = (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    setIsBookmarked(!isBookmarked);
    // Add your bookmark logic here (API call, Redux dispatch, etc.)
  };

  return (
    <Link
      to={`/question/${id}`}
      className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-5 py-4 hover:shadow-md transition-shadow relative"
    >
      {/* Bookmark Icon - Absolute positioned */}
      <button
        onClick={handleBookmark}
        className="absolute top-4 right-4 text-gray-400 hover:text-yellow-500 transition-colors"
        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        {isBookmarked ? (
          <FaBookmark className="w-4 h-4 text-yellow-500" />
        ) : (
          <FaRegBookmark className="w-4 h-4" />
        )}
      </button>

      {/* Title */}
      <h3 className="text-[16px] font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug mb-1.5 pr-8">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-1">
        {excerpt}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: author and stats */}
      <div className="flex items-center justify-between">
        {/* Author info */}
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full ${author.color || "bg-gray-400"} flex items-center justify-center text-[12px] font-bold text-white shrink-0`}
          >
            {author.initials || "?"}
          </div>
          <span className="text-[12px] text-gray-600 dark:text-gray-300 font-medium">
            {author.name || "Unknown"}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FiMessageCircle className="w-4 h-4" />
            <span>{comments} {comments === 1 ? 'answer' : 'answers'}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiEye className="w-4 h-4" />
            <span>{views} {views === 1 ? 'view' : 'views'}</span>
          </div>
          {time && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {time}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}