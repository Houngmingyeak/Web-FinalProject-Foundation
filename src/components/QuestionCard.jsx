import { FaRegEye } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

function ChatIcon() {
  return <IoChatboxEllipsesOutline />;
}

function EyeIcon() {
  return <FaRegEye />;
}

export default function QuestionCard({ question }) {
  if (!question) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 hover:border-gray-300 transition-all cursor-pointer">
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors leading-snug mb-1.5">
        {question.title}
      </h3>

      {/* Excerpt */}
      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-1">
        {question.excerpt}
      </p>

      {/* Tags */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-100"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer: author left, stats right */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-5 h-5 rounded-full ${question.author.color} flex items-center justify-center text-[9px] font-bold text-white shrink-0`}
          >
            {question.author.initials}
          </span>
          <span className="text-xs text-gray-600 font-medium">
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
