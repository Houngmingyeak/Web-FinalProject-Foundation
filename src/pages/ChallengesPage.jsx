import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import { LuSwords } from "react-icons/lu";
import { HiOutlineLightningBolt } from "react-icons/hi";

const challenges = [
  {
    id: 1,
    title: "First Answer",
    description: "Answer your first question today",
    type: "Daily",
    current: 0,
    total: 1,
    xp: 50,
  },
  {
    id: 2,
    title: "Helping Hand",
    description: "Get 5 upvotes on answers",
    type: "Daily",
    current: 3,
    total: 5,
    xp: 100,
  },
  {
    id: 3,
    title: "Tag Master",
    description: "Answer questions in 3 different tags",
    type: "Weekly",
    current: 1,
    total: 3,
    xp: 150,
  },
  {
    id: 4,
    title: "Code Reviewer",
    description: "Leave 10 comments on answers",
    type: "Weekly",
    current: 7,
    total: 10,
    xp: 200,
  },
  {
    id: 5,
    title: "Streak Hunter",
    description: "Log in 7 days in a row",
    type: "Monthly",
    current: 5,
    total: 7,
    xp: 300,
  },
  {
    id: 6,
    title: "Reputation Legend",
    description: "Earn 500 reputation points",
    type: "Monthly",
    current: 320,
    total: 500,
    xp: 500,
  },
];

function ProgressBar({ current, total }) {
  const pct =
    total === 0 ? 0 : Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full h-1.5 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#3C83F6] to-[#6B26D9] rounded-full transition-[width] duration-700 ease-in-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ChallengeCard({ challenge }) {
  const { title, description, type, current, total, xp } = challenge;
  const done = current >= total;

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 p-5 flex flex-col justify-between w-[550px] h-[150px] transition-all duration-200 hover:shadow-md hover:border-slate-200 dark:hover:border-gray-600 hover:-translate-y-0.5 cursor-pointer">
      {done && (
        <span className="absolute top-4 right-4 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 text-[12px] font-bold px-2.5 py-0.5 rounded-full">
          ✓ Complete
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[18px] font-bold text-slate-800 dark:text-white">
            {title}
          </p>
          <p className="text-[14px] text-slate-400 dark:text-gray-400 mt-0.5">
            {description}
          </p>
        </div>
        <span className="shrink-0 text-[13px] font-semibold text-slate-400 dark:text-gray-400 bg-slate-100 dark:bg-gray-700 rounded-md px-2.5 py-0.5">
          {type}
        </span>
      </div>

      <div className="flex items-center justify-between text-[15px]">
        <span className="font-medium text-slate-500 dark:text-gray-400">
          {current}/{total}
        </span>
        <span className="flex items-center gap-1 font-bold text-slate-800 dark:text-white text-[14px]">
          <HiOutlineLightningBolt />
          {xp} XP
        </span>
      </div>

      <ProgressBar current={current} total={total} />
    </div>
  );
}

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const FILTERS = ["All", "Daily", "Weekly", "Monthly"];

  const filtered = challenges.filter((c) => {
    const byType = activeFilter === "All" || c.type === activeFilter;
    const bySearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return byType && bySearch;
  });

  const rows = [];
  for (let i = 0; i < filtered.length; i += 2)
    rows.push(filtered.slice(i, i + 2));

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-1">
        <aside>
          <Sidebar />
        </aside>

        <main className="flex-1 px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <LuSwords className="text-black dark:text-white text-[26px]" />
              <h1 className="text-[26px] font-bold text-black dark:text-white">
                Challenges
              </h1>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-0.5 bg-slate-200/70 dark:bg-gray-800 rounded-xl p-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-[15px] font-medium transition-all ${
                    activeFilter === f
                      ? "bg-white dark:bg-gray-700 text-slate-900 dark:text-white font-semibold shadow-sm"
                      : "text-slate-500 dark:text-gray-400 hover:text-slate-600 dark:hover:text-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {rows.length === 0 ? (
              <p className="text-center text-slate-400 dark:text-gray-500 text-[16px] py-16">
                No challenges found.
              </p>
            ) : (
              rows.map((row, i) => (
                <div key={i} className="flex justify-center gap-20">
                  {row.map((c) => (
                    <ChallengeCard key={c.id} challenge={c} />
                  ))}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
