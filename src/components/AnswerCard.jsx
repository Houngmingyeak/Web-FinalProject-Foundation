import React from "react";
import { MdOutlineContentCopy } from "react-icons/md";

const questions = [
  {
    id: 1,
    title:
      "How to implement WebSocket reconnection with exponential backoff in TypeScript?",
    excerpt:
      "I'm building a real-time chat application and need a robust reconnection strategy. The current implementation fails silently.",
    tags: ["typescript", "websocket", "real-time"],
    author: { initials: "SM", name: "Sarah Miller", color: "bg-violet-500" },
    comments: 7,
    views: 1240,
    time: "2h ago",
  },
];

export default function AnswerCard({ answer }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
      {/* Answer text */}
      <p className="text-md text-gray-700 mb-3">Here is the problem sloving</p>

      {/* Code Block */}
      <div className="rounded-xl overflow-hidden border border-gray-100">
        {/* Code header */}
        <div className="flex items-center justify-between bg-gray-50 border-b border-gray-100 px-4 py-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide"></span>
          <button
            onClick={() => navigator.clipboard?.writeText(answer.code)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors"
          >
            <MdOutlineContentCopy />
            Copy
          </button>
        </div>

        {/* Code content */}
        <pre className="bg-[#1e1e2e] text-[#cdd6f4] text-xs leading-relaxed p-4 overflow-x-auto font-mono">
          <code>make sure</code>
        </pre>
      </div>

      {/* Author + time */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center ${questions[0].author.color}`}
          >
            {questions[0].author.initials}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {questions[0].author.name}
          </span>
        </div>
        <span className="text-xs text-gray-400">{questions[0].time}</span>
      </div>
    </div>
  );
}
