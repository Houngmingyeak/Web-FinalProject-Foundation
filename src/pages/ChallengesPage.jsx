import { useState } from "react";

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

const NAV_ITEMS = [
  {
    label: "Home",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    label: "Questions",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Leaderboard",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "Challenges",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    label: "Profile",
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

function ProgressBar({ current, total }) {
  const pct =
    total === 0 ? 0 : Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-400 to-blue-300 rounded-full transition-[width] duration-700 ease-in-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ChallengeCard({ challenge }) {
  const { title, description, type, current, total, xp } = challenge;
  const done = current >= total;

  return (
    <div className="relative flex flex-col gap-3 bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-200 hover:shadow-md hover:shadow-blue-100 hover:border-blue-200">
      {done && (
        <span className="absolute top-4 right-4 bg-blue-50 text-blue-500 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full">
          ✓ Complete
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-800">{title}</p>
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        </div>
        <span className="shrink-0 text-xs font-semibold text-slate-400 bg-slate-100 rounded-md px-2.5 py-0.5">
          {type}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-500">
          {current}/{total}
        </span>
        <span className="flex items-center gap-1 font-bold text-slate-800">
          <svg
            className="w-3.5 h-3.5 text-blue-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {xp} XP
        </span>
      </div>

      <ProgressBar current={current} total={total} />
    </div>
  );
}

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeNav, setActiveNav] = useState("Challenges");
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

  const userLevel = 12;
  const userXP = 720;
  const userMaxXP = 1000;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 h-[60px] flex items-center gap-5 px-8 bg-white border-b border-slate-200">
        {/* Logo */}
        <div className="flex items-center gap-2.5 w-44 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 20V6l8 6 8-6v14"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-[17px] font-extrabold tracking-tight text-slate-900">
            MindStack
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions....."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          <button className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="5" />
              <path
                strokeLinecap="round"
                d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              />
            </svg>
          </button>

          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Ask Questions
          </button>

          <div className="w-9 h-9 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs font-bold cursor-pointer select-none shrink-0">
            AC
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="sticky top-[60px] h-[calc(100vh-60px)] w-56 shrink-0 flex flex-col py-5 bg-white border-r border-slate-200">
          <nav className="flex flex-col gap-0.5 px-3">
            {NAV_ITEMS.map(({ label, icon }) => {
              const active = activeNav === label;
              return (
                <button
                  key={label}
                  onClick={() => setActiveNav(label)}
                  className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  {icon}
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Your Progress */}
          <div className="mt-auto px-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Your Progress
            </p>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-violet-600 flex items-center justify-center text-white text-xs font-extrabold shrink-0">
                {userLevel}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Level {userLevel}
                </p>
                <p className="text-xs text-slate-400">
                  {userXP} / {userMaxXP} XP
                </p>
              </div>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-violet-500 rounded-full"
                style={{ width: `${Math.round((userXP / userMaxXP) * 100)}%` }}
              />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-8 py-8">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <svg
                className="w-7 h-7 text-slate-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h1 className="text-2xl font-extrabold text-slate-900">
                Challenges
              </h1>
            </div>

            <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded-xl p-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
                    activeFilter === f
                      ? "bg-slate-900 text-white font-semibold"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {rows.length === 0 ? (
              <p className="text-center text-slate-400 py-16">
                No challenges found.
              </p>
            ) : (
              rows.map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  {row.map((c) => (
                    <ChallengeCard key={c.id} challenge={c} />
                  ))}
                  {row.length === 1 && <div />}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
