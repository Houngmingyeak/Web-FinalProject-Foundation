import React from "react";

const questions = [
  {
    title:
      "How to implement WebSocket reconnection with exponential backoff in TypeScript?",
    description:
      "I'm building a real-time chat application and need a robust reconnection strategy. The current implementation...",
    tags: ["typescript", "websocket", "real-time"],
    author: "Sarah Miller",
    initials: "SM",
    stats: { answers: 7, views: "1,240", time: "2h ago" },
  },
  {
    title:
      "Best practices for React Server Components data fetching patterns in 2026?",
    description:
      "With the latest React updates, I'm confused about when to use RSC vs client components for data fetching...",
    tags: ["react", "server-components", "performance"],
    author: "James Liu",
    initials: "JL",
    stats: { answers: 12, views: "2,100", time: "4h ago" },
  },
  {
    title:
      "Rust vs Go for building microservices in 2026 — performance benchmarks?",
    description:
      "Our team is evaluating Rust and Go for a new microservices architecture. Looking for recent benchmarks and...",
    tags: ["rust", "go", "microservices", "performance"],
    author: "Emma Wilson",
    initials: "EW",
    stats: { answers: 15, views: "3,400", time: "6h ago" },
  },
  {
    title:
      "How to properly handle concurrent database migrations in a CI/CD pipeline?",
    description:
      "We have multiple services deploying simultaneously and running into migration conflicts. What's the best...",
    tags: ["database", "ci-cd", "migrations"],
    author: "Dev Patel",
    initials: "DP",
    stats: { answers: 5, views: "890", time: "8h ago" },
  },
  {
    title:
      "Understanding the new CSS Container Queries — practical examples needed",
    description:
      "I've been reading about container queries but struggling to find practical, real-world examples. Can someone...",
    tags: ["css", "container-queries", "responsive"],
    author: "Mia Zhang",
    initials: "MZ",
    stats: { answers: 3, views: "650", time: "12h ago" },
  },
  {
    title: "Optimizing LLM inference latency for production API endpoints?",
    description:
      "Running a GPT-based API and getting 3-5s response times. Need to bring it under 1s. Tried batching and caching...",
    tags: ["ai", "llm", "optimization", "api"],
    author: "Alex Chen",
    initials: "AC",
    stats: { answers: 9, views: "4,500", time: "1d ago" },
  },
];
export default function QuestionCar() {
  return (
    <main className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6"></div>
      <div className="space-y-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          {/* Title */}
          <h2 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
            Must be on the beat
          </h2>

          {/* Description */}

          <p className="text-gray-600 text-sm mb-3">asdfad</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Tag */}

            <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
              asfsad
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-3">
              {/* User name in pf */}

              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                MV
              </div>

              {/* user name */}

              <span>Mony Vat</span>
            </div>

            <div className="flex items-center space-x-4">
              {/* answers amount */}

              <span>answers</span>

              {/* view amount */}

              <span> views</span>

              {/* hour */}

              <span>2 hour ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6"></div>
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
              {q.title}
            </h2>
            <p className="text-gray-600 text-sm mb-3">{q.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {q.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                  {q.initials}
                </div>
                <span>{q.author}</span>
              </div>

              <div className="flex items-center space-x-4">
                <span>{q.stats.answers} answers</span>
                <span>{q.stats.views} views</span>
                <span>{q.stats.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
    // <main className="flex-1 p-6">
    //   {/* Header */}
    //   <div className="flex items-center justify-between mb-6"></div>
    //   <div className="space-y-4">
    //     {questions.map((q, index) => (
    //       <div
    //         key={index}
    //         className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
    //       >
    //         <h2 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
    //           {q.title}
    //         </h2>
    //         <p className="text-gray-600 text-sm mb-3">{q.description}</p>

    //         <div className="flex flex-wrap gap-2 mb-4">
    //           {q.tags.map((tag, i) => (
    //             <span
    //               key={i}
    //               className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
    //             >
    //               {tag}
    //             </span>
    //           ))}
    //         </div>

    //         <div className="flex items-center justify-between text-sm text-gray-500">
    //           <div className="flex items-center space-x-3">
    //             <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
    //               {q.initials}
    //             </div>
    //             <span>{q.author}</span>
    //           </div>

    //           <div className="flex items-center space-x-4">
    //             <span>{q.stats.answers} answers</span>
    //             <span>{q.stats.views} views</span>
    //             <span>{q.stats.time}</span>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </main>
  );
}
