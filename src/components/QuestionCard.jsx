import { FaRegEye } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FiMessageCircle, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

function ChatIcon() {
  return <IoChatboxEllipsesOutline />;
}

function EyeIcon() {
  return <FaRegEye />;
}

export default function QuestionCard({ question }) {
  if (!question) return null;

  const {
    author = {},
    comments = 0,
    views = 0,
    time = "",
    id,
  } = question;

  return (
    <Link
      to={`/question/${id}`}
      className="block bg-white border border-gray-200 rounded-lg px-5 py-4 
                 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1 
                 transition-all duration-200 cursor-pointer"
    >
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

      {/* Footer: author left, stats right */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-5 h-5 rounded-full ${author.color || "bg-gray-400"} flex items-center justify-center text-[12px] font-bold text-white shrink-0`}
          >
            {author.initials || "?"}
          </span>
          <span className="text-[12px] text-gray-600 font-medium">
            {author.name || "Unknown"}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <FiMessageCircle className="w-4 h-4" />
              <span>{comments} answer{comments !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye className="w-4 h-4" />
              <span>{views} view{views !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <div className="text-xs">
            by <span className="font-semibold text-gray-300">{author.name || "Unknown"}</span> {time}
          </div>
        </div>
      </div>
    </Link>
  );
}
