import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import QuestionCard from "../components/QuestionCard";

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
  {
    id: 2,
    title:
      "Best practices for React Server Components data fetching patterns in 2026?",
    excerpt:
      "With the latest React updates, I'm confused about when to use RSC vs client components for data fetching.",
    tags: ["react", "server-components", "performance"],
    author: { initials: "JL", name: "James Liu", color: "bg-sky-500" },
    comments: 12,
    views: 2100,
    time: "4h ago",
  },
  {
    id: 3,
    title:
      "Rust vs Go for building microservices in 2026 — performance benchmarks?",
    excerpt:
      "Our team is evaluating Rust and Go for a new microservices architecture. Looking for recent benchmarks.",
    tags: ["rust", "go", "microservices", "performance"],
    author: { initials: "EW", name: "Emma Wilson", color: "bg-emerald-500" },
    comments: 15,
    views: 3400,
    time: "6h ago",
  },
  {
    id: 4,
    title:
      "How to properly handle concurrent database migrations in a CI/CD pipeline?",
    excerpt:
      "We have multiple services deploying simultaneously and running into migration conflicts.",
    tags: ["database", "ci-cd", "migrations"],
    author: { initials: "DP", name: "Dev Patel", color: "bg-orange-500" },
    comments: 5,
    views: 890,
    time: "6h ago",
  },
  {
    id: 5,
    title:
      "Understanding the new CSS Container Queries — practical examples needed",
    excerpt:
      "I've been reading about container queries but struggling to find practical, real-world examples.",
    tags: ["css", "container-queries", "responsive"],
    author: { initials: "MZ", name: "Mia Zhang", color: "bg-pink-500" },
    comments: 3,
    views: 650,
    time: "12h ago",
  },
  {
    id: 6,
    title: "Optimizing LLM inference latency for production API endpoints?",
    excerpt:
      "Running a GPT-based API and getting 3-5s response times. Need to bring it under 1s. Tried batching and caching.",
    tags: ["ai", "llm", "optimization", "api"],
    author: { initials: "AC", name: "Alex Chen", color: "bg-amber-500" },
    comments: 9,
    views: 4500,
    time: "1d ago",
  },
];

export default function QuestionsPage() {
  const [activeTab, setActiveTab] = useState("Active");

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
            {["Newest", "Active", "Unanswered", "Most Voted"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-2xl px-4 py-1.5 text-[18px] font-medium transition-all duration-150
                  ${
                    activeTab === tab
                      ? "bg-white dark:bg-gray-900 text-black dark:text-white"
                      : "text-slate-400 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Question Cards */}
          <div className="flex flex-col gap-4">
            {questions.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
