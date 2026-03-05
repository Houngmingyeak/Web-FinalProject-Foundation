import { useState } from "react";
import { useGetPostsQuery } from "../features/post/postsApi"; // adjust path
import Sidebar from "../layout/Sidebar";
import QuestionCard from "../components/QuestionCard";

// ── Helper functions ──────────────────────────────────────────────

// Format a date string to "X minutes/hours/days ago"
const formatTimeAgo = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // difference in seconds

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

// Get initials from a full name
const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.split(" ");
  return parts.length > 1
    ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    : name[0].toUpperCase();
};

// Generate a color based on the name (for avatars)
const getAvatarColor = (name) => {
  const colors = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return colors[hash % colors.length];
};

// ── Tabs ─────────────────────────────────────────────────────────
const tabs = ["Newest", "Active", "Unansered", "Most Vote"];

export default function QuestionsPage() {
  const [activeTab, setActiveTab] = useState("Newest");

  // RTK Query hook
  const { data: posts = [], isLoading, error } = useGetPostsQuery();

  // Client-side sorting/filtering
  const getSortedPosts = () => {
    if (!posts.length) return [];
    switch (activeTab) {
      case "Newest":
        return [...posts].sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        );
      case "Active":
        return [...posts].sort(
          (a, b) => new Date(b.lastActivityDate) - new Date(a.lastActivityDate)
        );
      case "Unansered":
        return posts.filter((post) => post.comments?.length === 0);
      case "Most Vote":
        return [...posts].sort((a, b) => b.score - a.score);
      default:
        return posts;
    }
  };

  const displayedPosts = getSortedPosts();

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <h1 className="text-black font-bold text-[24px] pl-8 pt-6">Questions</h1>
        <div className="px-6 py-8">
          {/* Tabs */}
          <div className="flex w-fit mb-5 bg-gray-200 border-0 rounded-2xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-2xl px-4 py-1.5 text-sm font-medium transition-all duration-150 ${
                  activeTab === tab
                    ? "bg-slate-50 text-black"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Questions list */}
          {displayedPosts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {displayedPosts.map((post) => (
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
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No questions yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}