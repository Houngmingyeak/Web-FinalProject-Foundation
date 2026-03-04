import { useState } from "react";
import { FaRegEye, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

function ChatIcon() {
  return <IoChatboxEllipsesOutline />;
}

function EyeIcon() {
  return <FaRegEye />;
}

export default function QuestionCard({ question }) {
  const [bookmarked, setBookmarked] = useState(false);

  if (!question) return null;

  return (
    <div
      className="relative bg-white border border-gray-200 rounded-lg px-5 py-4 
                 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1 
                 transition-all duration-200 cursor-pointer"
    >
      {/* Bookmark Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setBookmarked(!bookmarked);
        }}
        className="absolute top-4 right-4 text-gray-400 
                   hover:text-yellow-500 transition-colors duration-200"
      >
        {bookmarked ? (
          <FaBookmark className="text-yellow-400 text-lg" />
        ) : (
          <FaRegBookmark className="text-lg" />
        )}
      </button>

      {/* Title */}
      <h3 className="text-[16px] font-bold text-gray-900 hover:text-blue-600 transition-colors leading-snug mb-1.5">
        {question.title}
      </h3>

      {/* Excerpt */}
      <p className="text-[14px] text-gray-500 leading-relaxed mb-3 line-clamp-1">
        {question.excerpt}
      </p>

      {/* Tags */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-blue-50 text-blue-600 border border-blue-100"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-5 h-5 rounded-full ${question.author.color} flex items-center justify-center text-[12px] font-bold text-white shrink-0`}
          >
            {question.author.initials}
          </span>
          <span className="text-[12px] text-gray-600 font-medium">
            {question.author.name}
          </span>
        </div>

        <div className="flex items-center gap-4 text-gray-400 text-xs">
          <span className="flex items-center gap-1">
            <ChatIcon />
            {question.comments}
          </span>
          <span className="flex items-center gap-1">
            <EyeIcon />
            {question.views.toLocaleString()}
          </span>
          <span>{question.time}</span>
        </div>
      </div>
    </div>
  );
}

