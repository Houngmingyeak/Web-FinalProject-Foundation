import React from "react";
import Sidebar from "../layout/Sidebar";
import { FaArrowLeftLong } from "react-icons/fa6";
import AnswerForm from "../components/AnswerForm";
import AnswerCard from "../components/AnswerCard";
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
];

export default function QuestionDetai() {
  return (
    <div className="flex bg-gray-50 min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 p-4">
        <button className="text-gray-400 font-medium flex items-center gap-2 mb-2 hover:underline-offset-8 hover:text-blue-500 cursor-pointer transition-colors"  >
          <FaArrowLeftLong />
          Back to Question
        </button>
        <div className="flex flex-col gap-4 mb-2">
          {questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
        <div>
          <h1 className="text-black text-2xl font-bold mb-2">Answer</h1>
        </div>
        <div>
          <AnswerCard />
        </div>
        <div className="max-w-8xl">
          <AnswerForm />
        </div>
      </main>
    </div>
  );
}

