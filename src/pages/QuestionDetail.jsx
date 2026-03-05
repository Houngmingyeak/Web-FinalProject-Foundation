// // import React from "react";
// // import Sidebar from "../layout/Sidebar";
// // import { FaArrowLeftLong } from "react-icons/fa6";
// // import AnswerForm from "../components/AnswerForm";
// // import AnswerCard from "../components/AnswerCard";
// // import QuestionCard from "../components/QuestionCard";

// // const questions = [
// //   {
// //     id: 1,
// //     title:
// //       "How to implement WebSocket reconnection with exponential backoff in TypeScript?",
// //     excerpt:
// //       "I'm building a real-time chat application and need a robust reconnection strategy. The current implementation fails silently.",
// //     tags: ["typescript", "websocket", "real-time"],
// //     author: { initials: "SM", name: "Sarah Miller", color: "bg-violet-500" },
// //     comments: 7,
// //     views: 1240,
// //     time: "2h ago",
// //   },
// // ];

// // export default function QuestionDetailPage() {
// //   return (
// //     <div className="flex bg-gray-50 min-h-screen w-full">
// //       <Sidebar />
// //       <main className="flex-1 p-4">
// //         <button className="text-gray-400 font-medium flex items-center gap-2 mb-4 hover:underline-offset-8">
// //           <FaArrowLeftLong />
// //           Back to Question
// //         </button>{" "}
// //         <div className="text-black text-2xl font-semibold mb-4">
// //           <h1>
// //             How to implement WebSocket reconnection with exponential backoff in
// //             TypeScript?
// //           </h1>
// //         </div>
// //         <div className="flex flex-col gap-4 mb-8">
// //           {questions.map((q) => (
// //             <QuestionCard key={q.id} question={q} />
// //           ))}
// //         </div>
// //         <div>
// //           <AnswerCard />
// //         </div>
// //         <div className="max-w-8xl">
// //           <AnswerForm />
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../layout/Sidebar";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import AnswerForm from "../components/AnswerForm";
// import AnswerCard from "../components/AnswerCard";

// const questions = [
//   {
//     id: 1,
//     title: "How to implement WebSocket reconnection with exponential backoff in TypeScript?",
//     excerpt: "I'm building a real-time chat application and need a robust reconnection strategy. The current implementation fails silently.",
//     tags: ["typescript", "websocket", "real-time"],
//     author: { initials: "SM", name: "Sarah Miller", color: "bg-violet-500" },
//     comments: 7,
//     views: 1240,
//     time: "2h ago",
//   },
// ];

// export default function QuestionDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const question = questions.find((q) => q.id === Number(id));

//   if (!question) return <div className="p-8 text-gray-500">Question not found.</div>;

//   return (
//     <div className="flex bg-gray-50 min-h-screen w-full">
//       <Sidebar />
//       <main className="flex-1 p-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-gray-400 font-medium flex items-center gap-2 mb-4 hover:underline"
//         >
//           <FaArrowLeftLong />
//           Back to Questions
//         </button>

//         {/* Question Header */}
//         <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 mb-6">
//           <h1 className="text-2xl font-semibold text-gray-900 mb-2">{question.title}</h1>
//           <p className="text-gray-500 mb-3">{question.excerpt}</p>

//           <div className="flex items-center gap-2 mb-3 flex-wrap">
//             {question.tags.map((tag) => (
//               <span
//                 key={tag}
//                 className="px-2.5 py-0.5 rounded-full text-[13px] font-medium bg-blue-50 text-blue-600 border border-blue-100"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>

//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <span className={`w-6 h-6 rounded-full ${question.author.color} flex items-center justify-center text-[13px] font-bold text-white`}>
//               {question.author.initials}
//             </span>
//             <span className="font-medium text-gray-700">{question.author.name}</span>
//             <span>·</span>
//             <span>{question.time}</span>
//             <span>·</span>
//             <span>{question.views.toLocaleString()} views</span>
//           </div>
//         </div>

//         {/* Answers */}
//         <AnswerCard />
//         <AnswerForm />
//       </main>
//     </div>
//   );
// }

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import { FaArrowLeftLong } from "react-icons/fa6";
import AnswerForm from "../components/AnswerForm";
import AnswerCard from "../components/AnswerCard";

const questions = [
  {
    id: 1,
    title: "How to implement WebSocket reconnection with exponential backoff in TypeScript?",
    excerpt: "I'm building a real-time chat application and need a robust reconnection strategy. The current implementation fails silently.",
    tags: ["typescript", "websocket", "real-time"],
    author: { initials: "SM", name: "Sarah Miller", color: "bg-violet-500" },
    comments: 7,
    views: 1240,
    time: "2h ago",
  },
];

export default function QuestionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = questions.find((q) => q.id === Number(id));

  if (!question) return (
    <div className="p-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 min-h-screen">
      Question not found.
    </div>
  );

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen w-full transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 p-6">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 font-medium flex items-center gap-2 mb-5 transition"
        >
          <FaArrowLeftLong />
          Back to Questions
        </button>

        {/* Question Header */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-5 py-5 mb-6">
          <h1 className="text-[22px] font-semibold text-gray-900 dark:text-white mb-2">
            {question.title}
          </h1>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 mb-4">
            {question.excerpt}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-[13px] font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Author row */}
          <div className="flex items-center gap-2 text-[14px] text-gray-500 dark:text-gray-400">
            <span className={`w-6 h-6 rounded-full ${question.author.color} flex items-center justify-center text-[13px] font-bold text-white`}>
              {question.author.initials}
            </span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {question.author.name}
            </span>
            <span>·</span>
            <span>{question.time}</span>
            <span>·</span>
            <span>{question.views.toLocaleString()} views</span>
          </div>
        </div>

        {/* Answers */}
        <AnswerCard />
        <AnswerForm />

      </main>
    </div>
  );
}