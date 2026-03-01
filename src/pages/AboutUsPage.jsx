import { useState } from "react";

const mentors = [
  { name: "Kim Chansopheng", role: "Mentor", photo: "" },
  { name: "Srorng Sokcheat", role: "Mentor", photo: "" },
];

const team = [
  { name: "Houng Mingyeak", role: "Leader", photo: "" },
  { name: "Sin Soriya", role: "Sub-Leader", photo: "" },
  { name: "Vin Van", role: "Member", photo: "" },
  { name: "Chhorn Saveun", role: "Member", photo: "" },
  { name: "Lim Longfou", role: "Member", photo: "" },
  { name: "Ches Sovanreach", role: "Member", photo: "" },
  { name: "Chamreun Molikatvy", role: "Member", photo: "" },
];

const palette = [
  "#4A7CFF",
  "#6C5CE7",
  "#00B894",
  "#E17055",
  "#0984E3",
  "#FDCB6E",
];

function Avatar({ name, size = 150, photo }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const color = palette[name.charCodeAt(0) % palette.length];

  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          objectPosition: "center top",
        }}
        className="block"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: `${color}22`,
      }}
      className="flex items-center justify-center font-bold"
      style={{ fontSize: size * 0.3, color }}
    >
      {initials}
    </div>
  );
}

function MemberCard({ name, role, photo }) {
  const [hovered, setHovered] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const color = palette[name.charCodeAt(0) % palette.length];

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl px-10 py-12 flex flex-col items-center w-80 transition-all duration-250 ease ${
        hovered ? "transform -translate-y-1.5 shadow-xl shadow-blue-500/20" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="rounded-full p-1 mb-6 bg-gradient-to-br from-[#4A7CFF] to-[#1a3fcc]">
        <div className="rounded-full overflow-hidden w-55 h-55 flex items-center justify-center bg-white">
          {photo ? (
            <>
              <img
                src={photo}
                alt={name}
                className="w-55 h-55 rounded-full object-cover object-top block"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                style={{
                  backgroundColor: `${color}22`,
                  color,
                  fontSize: 66,
                }}
                className="w-55 h-55 rounded-full hidden items-center justify-center font-bold"
              >
                {initials}
              </div>
            </>
          ) : (
            <Avatar name={name} size={220} />
          )}
        </div>
      </div>
      <p className="text-xl font-bold text-gray-900 mb-1.5">{name}</p>
      <p className="text-base text-gray-500 mb-6">{role}</p>
      <div className="flex gap-6">
        <button className="text-gray-900 hover:text-[#4A7CFF] transition-colors p-0 flex items-center" title="Facebook">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </button>
        <button className="text-gray-900 hover:text-[#4A7CFF] transition-colors p-0 flex items-center" title="Telegram">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        </button>
        <button className="text-gray-900 hover:text-[#4A7CFF] transition-colors p-0 flex items-center" title="GitHub">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen">
      {/* Hero */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-blue-50 to-gray-50 relative overflow-hidden">
        <div className="absolute w-150 h-150 rounded-full bg-gradient-to-r from-blue-500/5 to-transparent top--30 right--30 pointer-events-none" />
        <p className="text-xs font-semibold tracking-wider uppercase text-[#4A7CFF] mb-5 animate-fade-up [animation-delay:100ms]">
          MindStack · About Us
        </p>
        <h1 className="text-[clamp(44px,6vw,76px)] font-bold leading-tight tracking-tighter mb-5 animate-fade-up [animation-delay:200ms]">
          Ask. Answer.
          <br />
          Collaborate. Grow.
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-md mb-9 animate-fade-up [animation-delay:300ms]">
          A community-driven forum built for learners and developers to share
          ideas, ask questions, and grow together.
        </p>
        <div className="flex gap-3 flex-wrap justify-center animate-fade-up [animation-delay:400ms]">
          <button className="bg-gray-900 text-white border-none px-7 py-3 rounded-full text-sm font-semibold cursor-pointer font-sans hover:opacity-75 transition-opacity">
            Start for free →
          </button>
          <button className="bg-none text-gray-500 border-2 border-gray-200 px-7 py-3 rounded-full text-sm font-medium cursor-pointer font-sans hover:border-[#4A7CFF] hover:text-[#4A7CFF] transition-colors">
            See more
          </button>
        </div>
      </div>

      {/* Purpose */}
      <div className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight mb-3">
          Our Purpose
        </h2>
        <p className="text-base text-gray-500 leading-relaxed mb-13">
          To share knowledge and resources that help learners and developers
          improve their skills.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="text-2xl mb-4">🛡️</div>
            <h3 className="text-lg font-bold mb-2.5">Mission</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              To build an inclusive, user-friendly forum where people can freely
              exchange ideas, ask questions, and share knowledge — connecting
              people from all backgrounds to grow and solve problems together.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="text-2xl mb-4">🎯</div>
            <h3 className="text-lg font-bold mb-2.5">Vision</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              To become a trusted knowledge-sharing platform that inspires
              innovation and meaningful collaboration worldwide — where
              knowledge is accessible to everyone and every idea is respected.
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-blue-50/50 py-20 px-6 pb-25">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-2.5">
            The people behind it
          </p>

          <h2 className="text-[clamp(24px,3vw,36px)] font-bold tracking-tight mb-9">
            Our Mentors
          </h2>
          <div className="flex justify-center gap-6 flex-wrap mb-15">
            {mentors.map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </div>

          <h2 className="text-[clamp(24px,3vw,36px)] font-bold tracking-tight mb-9">
            Our Team
          </h2>
          <div className="flex justify-center gap-6 flex-wrap mb-6">
            {team.slice(0, 2).map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </div>
          <div className="flex justify-center gap-6 flex-wrap mb-6">
            {team.slice(2, 5).map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </div>
          <div className="flex justify-center gap-6 flex-wrap">
            {team.slice(5).map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}