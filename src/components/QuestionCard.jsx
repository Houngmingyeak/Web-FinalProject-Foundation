<<<<<<<<< Temporary merge branch 1
// src/components/QuestionCard.jsx
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FiMessageCircle, FiEye } from 'react-icons/fi';
=========
import { FaRegEye } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FiMessageCircle, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
>>>>>>>>> Temporary merge branch 2

export default function QuestionCard({
  id,
  title,
  description,
  author,
  tags,
  createdAt,
  viewCount,
  answerCount,
  status,
}) {
  const timeAgo = createdAt?.toDate ? formatDistanceToNow(createdAt.toDate(), { addSuffix: true }) : 'Recently';

<<<<<<<<< Temporary merge branch 1
  const statusColors = {
    open: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
  };
=========
function EyeIcon() {
  return <FaRegEye />;
}

export default function QuestionCard({ question }) {
  if (!question) return null;
>>>>>>>>> Temporary merge branch 2

  const {
    author = {},
    comments = 0,
    views = 0,
    time = "",
    id,
  } = question;

  return (
<<<<<<<<< Temporary merge branch 1
    <Link to={`/question/${id}`} className="block">
      <div className="bg-gray-900 p-4 rounded-xl hover:shadow-lg transition-shadow cursor-pointer border border-gray-800">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-white hover:text-orange-400 line-clamp-2 flex-1">
            {title}
          </h3>
          <span className={`ml-2 flex-shrink-0 px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700">
              +{tags.length - 3}
            </span>
          )}
        </div>

=========
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

>>>>>>>>> Temporary merge branch 2
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <FiMessageCircle className="w-4 h-4" />
<<<<<<<<< Temporary merge branch 1
              <span>{answerCount} answer{answerCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye className="w-4 h-4" />
              <span>{viewCount} views</span>
            </div>
          </div>
          <div className="text-xs">
            by <span className="font-semibold text-gray-300">{author}</span> {timeAgo}
=========
              <span>{comments} answer{comments !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye className="w-4 h-4" />
              <span>{views} view{views !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <div className="text-xs">
            by <span className="font-semibold text-gray-300">{author.name || "Unknown"}</span> {time}
>>>>>>>>> Temporary merge branch 2
          </div>
        </div>
      </div>
    </Link>
  );
}