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
  // ✅ Bookmark state
  const [bookmarks, setBookmarks] = useState(
    savedPosts.map((post) => post.id)
  );

  // ✅ Toggle function
  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 p-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
              AC
            </div>

            <div>
              <h2 className="text-lg font-semibold">SreyKa</h2>
              <div className="text-sm text-gray-500 flex items-center gap-4">
                <span className="text-yellow-500 font-medium">
                  ★ 4,250 rep
                </span>
                <span>Level 12</span>
                <span>Rank #42</span>
              </div>
            </div>
          </div>

          {/* Level Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Level 12</span>
              <span>720 / 1000 XP</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-[72%]" />
            </div>
          </div>
        </div>

        {/* Saves Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">
            All Saves
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            {bookmarks.length} Saves Items
          </p>

          <div className="space-y-4">
            {savedPosts.map((post) => {
              const isSaved = bookmarks.includes(post.id);

              return (
                <div
                  key={post.id}
                  className="relative bg-white rounded-xl p-5 shadow-sm border border-gray-100 
                  transition-all duration-200 hover:shadow-lg hover:-translate-y-1 
                  hover:border-blue-200"
                >
                  {/* ✅ Bookmark Icon */}
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className="absolute top-4 right-4 text-lg transition hover:scale-110"
                  >
                    {isSaved ? (
                      <FaBookmark className="text-yellow-400" />
                    ) : (
                      <FaRegBookmark className="text-gray-400 hover:text-yellow-400" />
                    )}
                  </button>

                  <h4 className="font-semibold text-gray-800 mb-2 pr-8 hover:text-blue-600 transition">
                    {post.title}
                  </h4>

                  <p className="text-sm text-gray-500 mb-3">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md hover:bg-blue-100 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-semibold">
                        EW
                      </div>
                      <span>{post.author}</span>
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