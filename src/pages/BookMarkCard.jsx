import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const savedPosts = [
  {
    id: 1,
    title:
      "Rust vs Go for building microservices in 2026 — performance benchmarks?",
    description:
      "Our team is evaluating Rust and Go for a new microservices architecture. Looking for recent benchmarks and...",
    tags: ["rust", "go", "microservices", "performance"],
    author: "Emma Wilson",
    replies: 15,
    views: 3400,
    time: "6h ago",
  },
  {
    id: 2,
    title:
      "Rust vs Go for building microservices in 2026 — performance benchmarks?",
    description:
      "Our team is evaluating Rust and Go for a new microservices architecture. Looking for recent benchmarks and...",
    tags: ["rust", "go", "microservices", "performance"],
    author: "Emma Wilson",
    replies: 15,
    views: 3400,
    time: "6h ago",
  },
  {
    id: 3,
    title:
      "Rust vs Go for building microservices in 2026 — performance benchmarks?",
    description:
      "Our team is evaluating Rust and Go for a new microservices architecture. Looking for recent benchmarks and...",
    tags: ["rust", "go", "microservices", "performance"],
    author: "Emma Wilson",
    replies: 15,
    views: 3400,
    time: "6h ago",
  },
  {
    id: 4,
    title:
      "Rust vs Go for building microservices in 2026 — performance benchmarks?",
    description:
      "Our team is evaluating Rust and Go for a new microservices architecture. Looking for recent benchmarks and...",
    tags: ["rust", "go", "microservices", "performance"],
    author: "Emma Wilson",
    replies: 15,
    views: 3400,
    time: "6h ago",
  },
  {
    id: 5,
    title:
      "Rust vs Go for building microservices in 2026 — performance benchmarks?",
    description:
      "Our team is evaluating Rust and Go for a new microservices architecture. Looking for recent benchmarks and...",
    tags: ["rust", "go", "microservices", "performance"],
    author: "Emma Wilson",
    replies: 15,
    views: 3400,
    time: "6h ago",
  },
];

export default function BookmarkCard() {
  const [bookmarks, setBookmarks] = useState(savedPosts.map((post) => post.id));

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

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
              <h2 className="text-[20px] font-semibold text-gray-900 dark:text-white">
                SreyKa
              </h2>
              <div className="text-[15px] text-gray-500 dark:text-gray-400 flex items-center gap-4 mt-0.5">
                <span className="text-yellow-500 font-medium">★ 4,250 rep</span>
                <span>Level 12</span>
                <span>Rank #42</span>
              </div>
            </div>
          </div>

          {/* Level Bar */}
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

          <div className="space-y-4">
            {savedPosts.map((post) => {
              const isSaved = bookmarks.includes(post.id);

              return (
                <div
                  key={post.id}
                  className="relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700
                    transition-all duration-200 hover:shadow-lg hover:-translate-y-1
                    hover:border-blue-200 dark:hover:border-blue-700"
                >
                  {/* Bookmark Icon */}
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className="absolute top-4 right-4 text-[18px] transition hover:scale-110"
                  >
                    {isSaved ? (
                      <FaBookmark className="text-yellow-400" />
                    ) : (
                      <FaRegBookmark className="text-gray-400 dark:text-gray-500 hover:text-yellow-400" />
                    )}
                  </button>

                  {/* Title */}
                  <h4 className="text-[17px] font-semibold text-gray-800 dark:text-white mb-2 pr-8 hover:text-blue-600 dark:hover:text-blue-400 transition">
                    {post.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[15px] text-gray-500 dark:text-gray-400 mb-3">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-[13px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center text-[13px] text-gray-400 dark:text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 text-[11px] font-semibold">
                        EW
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">
                        {post.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span>💬 {post.replies}</span>
                      <span>👁 {post.views}</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
