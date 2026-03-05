import { useState } from "react";
import { GoTrophy } from "react-icons/go";
import Sidebar from "../layout/Sidebar";
import { LuMedal } from "react-icons/lu";
import { LuCrown } from "react-icons/lu";
import { useState, useEffect } from "react";
const users = [
  {
    rank: 1,
    initials: "SM",
    name: "Sarah Miller",
    rep: 12450,
    level: 24,
    xp: 890,
    maxXp: 1000,
  },
  {
    rank: 2,
    initials: "JL",
    name: "James Liu",
    rep: 9820,
    level: 20,
    xp: 450,
    maxXp: 1000,
  },
  {
    rank: 3,
    initials: "EW",
    name: "Emma Wilson",
    rep: 8340,
    level: 18,
    xp: 670,
    maxXp: 1000,
  },
  {
    rank: 4,
    initials: "DP",
    name: "Dev Patel",
    rep: 7100,
    level: 16,
    xp: 320,
    maxXp: 1000,
    gold: 5,
    silver: 14,
    bronze: 25,
  },
  {
    rank: 5,
    initials: "MZ",
    name: "Mia Zhang",
    rep: 6500,
    level: 15,
    xp: 800,
    maxXp: 1000,
    gold: 4,
    silver: 12,
    bronze: 22,
  },
  {
    rank: 6,
    initials: "AC",
    name: "Alex Chen",
    rep: 4250,
    level: 12,
    xp: 720,
    maxXp: 1000,
    gold: 3,
    silver: 8,
    bronze: 15,
  },
  {
    rank: 7,
    initials: "RK",
    name: "Raj Kumar",
    rep: 3800,
    level: 11,
    xp: 550,
    maxXp: 1000,
    gold: 2,
    silver: 6,
    bronze: 12,
  },
  {
    rank: 8,
    initials: "OB",
    name: "Olivia Brown",
    rep: 2900,
    level: 9,
    xp: 200,
    maxXp: 1000,
    gold: 1,
    silver: 5,
    bronze: 10,
  },
];

const Avatar = ({ initials, size = "md" }) => {
  const sizeClass =
    size === "lg"
      ? "w-14 h-14 text-base"
      : size === "sm"
        ? "w-9 h-9 text-xs"
        : "w-12 h-12 text-sm";

// const LeaderBoard = ( ) => {
//   const [data , setData ] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       try{
//         const res = await fetch ('https://forum-istad-api.cheat.casa/api/v1');
//         const result = await res.jason();
//       setData(result);
//       }catch(error){
//         console.error("Error fetching data",error);
//     };
//     fetchData();
//   }
// },[]);

  return (
    <div
      className={`${sizeClass} rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center font-bold text-indigo-600 shrink-0`}
    >
      {initials}
    </div>
  );
};

const XpBar = ({ xp, maxXp }) => (
  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-[#3C83F6] to-[#6B26D9] rounded-full transition-all duration-500"
      style={{ width: `${(xp / maxXp) * 100}%` }}
    />
  </div>
);

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("All-time");

  const top3 = [users[1], users[0], users[2]];
  const rankOrder = [2, 1, 3];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <span className="text-[24px] text-black font">
              <GoTrophy />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Leaderboard</h1>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-200/70 rounded-xl p-1 gap-0.5">
            {["Weekly", "Monthly", "All-time"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium transition-all duration-150 rounded-lg
        ${
          activeTab === tab
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-400 hover:text-slate-500"
        }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          {top3.map((user, i) => {
            const rank = rankOrder[i];

            return (
              <div
                key={user.name}
                className="bg-white rounded-2xl px-5 py-6 flex flex-col items-center
                border border-slate-200 shadow-sm
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-xl
                hover:shadow-indigo-100
                hover:border-indigo-200"
              >
                <div className="mb-3">
                  {rank === 1 ? (
                    <LuCrown className="text-[26px] text-yellow-500" />
                  ) : (
                    <LuMedal
                      className="text-[22px]"
                      color={rank === 2 ? "#94a3b8" : "#f97316"}
                    />
                  )}
                </div>

                <Avatar initials={user.initials} size="lg" />

                <p className="mt-3 font-semibold text-slate-900 text-sm">
                  {user.name}
                </p>

                <p className="text-amber-500 font-bold text-sm mb-3">
                  {user.rep.toLocaleString()} rep
                </p>

                <div className="w-full flex items-center gap-2">
                  <span className="text-xs text-black font-medium whitespace-nowrap">
                    Lv.{user.level}
                  </span>
                  <XpBar xp={user.xp} maxXp={user.maxXp} />
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {user.xp}/{user.maxXp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ranked List */}
        <div className="flex flex-col gap-2.5">
          {users.slice(3).map((user) => (
            <div
              key={user.name}
              className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex items-center gap-3.5 shadow-sm
              transition-all duration-300
              hover:-translate-y-1.5
              hover:shadow-lg
              hover:border-indigo-200"
            >
              <span className="text-sm font-bold text-slate-400 w-6 text-center">
                #{user.rank}
              </span>

              <Avatar initials={user.initials} size="sm" />

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm mb-1">
                  {user.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-black font-medium whitespace-nowrap">
                    Lv.{user.level}
                  </span>
                  <XpBar xp={user.xp} maxXp={user.maxXp} />
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-amber-500 font-bold text-sm">
                  {user.rep.toLocaleString()}
                </span>
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
