import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/auth/authSlice";
import Sidebar from "../layout/Sidebar";
import QuestionCard from "../components/QuestionCard";
import { useBookmarks } from "../hooks/useBookmarks";

const formatTimeAgo = (dateString) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} days ago`;
  return date.toLocaleDateString();
};

const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarColor = (name) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
  ];
  return colors[(name?.length || 0) % colors.length];
};

const tabs = ["Newest", "Active", "Unanswered", "Most Voted"];

export default function QuestionsPage() {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [activeTab, setActiveTab] = useState("Newest");
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const getSortedPosts = () => {
    if (!posts || posts.length === 0) return [];
    switch (activeTab) {
      case "Newest":
        return [...posts].sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate),
        );
      case "Active":
        return [...posts].sort(
          (a, b) => new Date(b.lastActivityDate) - new Date(a.lastActivityDate),
        );
      case "Unanswered":
        return posts.filter((post) => (post.comments?.length || 0) === 0);
      case "Most Voted":
        return [...posts].sort((a, b) => b.score - a.score);
      default:
        return posts;
    }
  };

  const displayedPosts = getSortedPosts();

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Sidebar />
      <main className="flex-1">
        <h1 className="text-black dark:text-white font-bold text-[24px] pl-8 pt-6">
          Questions
        </h1>
        <div className="px-6 py-8">
          {/* Tabs */}
          <div className="flex w-fit mb-5 bg-gray-200 dark:bg-gray-700 rounded-2xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-2xl px-4 py-1.5 text-sm font-medium transition-all duration-150 ${
                  activeTab === tab
                    ? "bg-white dark:bg-gray-900 text-black dark:text-white"
                    : "text-slate-400 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* States */}
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}

          {/* Questions List */}
          {!loading && !error && (
            <div className="flex flex-col gap-4">
              {displayedPosts.length > 0 ? (
                displayedPosts.map((post) => (
                  <QuestionCard
                    key={post.id}
                    question={{
                      id: post.id,
                      title: post.title,
                      excerpt:
                        post.body?.substring(0, 150) +
                        (post.body?.length > 150 ? "..." : ""),
                      tags: post.tagResponses?.map((tag) => tag.tagName) || [],
                      author: {
                        initials: getInitials(post.ownerDisplayName),
                        name: post.ownerDisplayName,
                        color: getAvatarColor(post.ownerDisplayName),
                      },
                      comments: post.comments?.length || 0,
                      views: post.viewCount || 0,
                      time: formatTimeAgo(post.creationDate),
                    }}
                    isBookmarked={isBookmarked(post.id)} // ← បន្ថែម
                    onToggleBookmark={toggleBookmark}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">No questions yet.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
