import { useState } from "react";
import { FiHome } from "react-icons/fi";

const users = [
  { rank: 1, initials: "SM", name: "Sarah Miller", rep: 12450, level: 24, xp: 890, maxXp: 1000 },
  { rank: 2, initials: "JL", name: "James Liu",    rep: 9820,  level: 20, xp: 450, maxXp: 1000 },
  { rank: 3, initials: "EW", name: "Emma Wilson",  rep: 8340,  level: 18, xp: 670, maxXp: 1000 },
  { rank: 4, initials: "DP", name: "Dev Patel",    rep: 7100,  level: 16, xp: 320, maxXp: 1000, gold: 5,  silver: 14, bronze: 25 },
  { rank: 5, initials: "MZ", name: "Mia Zhang",    rep: 6500,  level: 15, xp: 800, maxXp: 1000, gold: 4,  silver: 12, bronze: 22 },
  { rank: 6, initials: "AC", name: "Alex Chen",    rep: 4250,  level: 12, xp: 720, maxXp: 1000, gold: 3,  silver: 8,  bronze: 15 },
  { rank: 7, initials: "RK", name: "Raj Kumar",    rep: 3800,  level: 11, xp: 550, maxXp: 1000, gold: 2,  silver: 6,  bronze: 12 },
  { rank: 8, initials: "OB", name: "Olivia Brown", rep: 2900,  level: 9,  xp: 200, maxXp: 1000, gold: 1,  silver: 5,  bronze: 10 },
];

const currentUser = { level: 12, xp: 720, maxXp: 1000 };

const Avatar = ({ initials, size = "md" }) => {
  const sizeClass =
    size === "lg" ? "w-14 h-14 text-base" :
    size === "sm" ? "w-9 h-9 text-xs" :
    "w-12 h-12 text-sm";
  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center font-bold text-indigo-600 shrink-0`}>
      {initials}
    </div>
  );
};

const XpBar = ({ xp, maxXp }) => (
  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500"
      style={{ width: `${(xp / maxXp) * 100}%` }}
    />
  </div>
);

const CrownIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20M4 20l2-8 6 4 6-4 2 8" />
    <circle cx="12" cy="8" r="2" fill="#6366f1" stroke="none" />
    <circle cx="4" cy="12" r="2" fill="#6366f1" stroke="none" />
    <circle cx="20" cy="12" r="2" fill="#6366f1" stroke="none" />
  </svg>
);

const MedalIcon = ({ color }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="14" r="7" stroke={color} strokeWidth="2" />
    <path d="M9 3h6l-1 5H10L9 3z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="14" r="4" fill={color} opacity="0.15" />
  </svg>
);

const navItems = [
  { label: "Home",        icon: <FiHome /> },
  { label: "Questions",   icon: "❓" },
  { label: "Leaderboard", icon: "🏆" },
  { label: "Challenges",  icon: "⚔️" },
  { label: "Profile",     icon: "👤" },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("All-time");
  const [activeNav, setActiveNav] = useState("Leaderboard");

  // Podium order: 2nd | 1st | 3rd
  const top3 = [users[1], users[0], users[2]];
  const rankOrder = [2, 1, 3];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">

      {/* ── Sidebar ── */}
      <aside className="w-56 bg-white border-r border-slate-200 flex flex-col py-6 shrink-0">

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 pb-7">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-lg">
            M
          </div>
          <span className="font-bold text-lg text-slate-800">MindStack</span>
        </div>

        {/* Nav */}
        <nav className="flex-1">
          {navItems.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-all duration-150 text-left
                ${activeNav === label
                  ? "bg-blue-50 text-blue-600 font-semibold rounded-r-lg"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        {/* Your Progress */}
        <div className="px-4 mt-4">
          <p className="text-xs font-semibold text-slate-400 tracking-widest mb-2.5">YOUR PROGRESS</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center text-white text-xs font-bold">
              {currentUser.level}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 leading-none">Level {currentUser.level}</p>
              <p className="text-xs text-slate-400 mt-0.5">{currentUser.xp} / {currentUser.maxXp} XP</p>
            </div>
          </div>
          <XpBar xp={currentUser.xp} maxXp={currentUser.maxXp} />
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <h1 className="text-2xl font-bold text-slate-900">Leaderboard</h1>
          </div>

          {/* Tabs */}
          <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden">
            {["Weekly", "Monthly", "All-time"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium transition-all duration-150
                  ${activeTab === tab
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:bg-slate-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Top 3 Podium ── */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          {top3.map((user, i) => {
            const rank = rankOrder[i];
            const isFirst = rank === 1;
            return (
              <div
                key={user.name}
                className={`bg-white rounded-2xl px-5 py-6 flex flex-col items-center
                  ${isFirst
                    ? "border-2 border-indigo-200 shadow-lg shadow-indigo-100 -translate-y-1.5"
                    : "border border-slate-200 shadow-sm"
                  }`}
              >
                {/* Icon */}
                <div className="mb-3">
                  {rank === 1
                    ? <CrownIcon />
                    : <MedalIcon color={rank === 2 ? "#94a3b8" : "#f97316"} />
                  }
                </div>

                <Avatar initials={user.initials} size="lg" />
                <p className="mt-3 font-semibold text-slate-900 text-sm">{user.name}</p>
                <p className="text-amber-500 font-bold text-sm mb-3">{user.rep.toLocaleString()} rep</p>

                {/* XP row */}
                <div className="w-full flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Lv.{user.level}</span>
                  <XpBar xp={user.xp} maxXp={user.maxXp} />
                  <span className="text-xs text-slate-400 whitespace-nowrap">{user.xp}/{user.maxXp}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Ranked List ── */}
        <div className="flex flex-col gap-2.5">
          {users.slice(3).map(user => (
            <div
              key={user.name}
              className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex items-center gap-3.5 shadow-sm"
            >
              <span className="text-sm font-bold text-slate-400 w-6 text-center">#{user.rank}</span>

              <Avatar initials={user.initials} size="sm" />

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm mb-1">{user.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Lv.{user.level}</span>
                  <XpBar xp={user.xp} maxXp={user.maxXp} />
                </div>
              </div>

              {/* Rep + badges */}
              <div className="flex flex-col items-end gap-1">
                <span className="text-amber-500 font-bold text-sm">{user.rep.toLocaleString()}</span>
                <div className="flex gap-1.5 text-xs text-slate-400">
                  <span>🥇{user.gold}</span>
                  <span>🥈{user.silver}</span>
                  <span>🥉{user.bronze}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}