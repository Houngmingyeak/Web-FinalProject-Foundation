import { useState } from "react";
import AboutHero from "../assets/aboutHero.png";

import CherPhengPic from "../assets/CherPhengPic.jpg";
import CherCheatPic from "../assets/CherCheatPic.JPG";
import YeakPic from "../assets/YeakPic.JPG";
import SoriyaPic from "../assets/SoriyaPic.jpg";
import VanPic from "../assets/LokbongPic.png";
import SaveunPic from "../assets/SavaunPic.png";
import LongfuPic from "../assets/LongfuPic.jpg";
import ReachPic from "../assets/ReachPic.jpg";
import TeviPic from "../assets/TeviPic.png";

/* ================= DATA ================= */

const mentors = [
  { name: "Kim Chansopheng", role: "Mentor", photo: CherPhengPic },
  { name: "Srorng Sokcheat", role: "Mentor", photo: CherCheatPic },
];

const team = [
  { name: "Houng Mingyeak", role: "Leader", photo: YeakPic },
  { name: "Sin Soriya", role: "Sub-Leader", photo: SoriyaPic },
  { name: "Vin Van", role: "Member", photo: VanPic },
  { name: "Chhorn Saveun", role: "Member", photo: SaveunPic },
  { name: "Lim Longfou", role: "Member", photo: LongfuPic },
  { name: "Ches Sovanreach", role: "Member", photo: ReachPic },
  { name: "Chamreun Molikatevy", role: "Member", photo: TeviPic },
];

const palette = [
  "#4A7CFF",
  "#6C5CE7",
  "#00B894",
  "#E17055",
  "#0984E3",
  "#FDCB6E",
];

/* ================= AVATAR ================= */

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
        src={AboutHero}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          objectPosition: "center top",
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
        color,
        fontSize: size * 0.3,
      }}
      className="flex items-center justify-center font-bold"
    >
      {initials}
    </div>
  );
}

/* ================= MEMBER CARD ================= */

function MemberCard({ name, role, photo }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl px-10 py-12 flex flex-col items-center w-80 transition-all duration-300 ${
        hovered ? "transform -translate-y-1 shadow-xl shadow-blue-500/20" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="mb-6">
        <Avatar name={name} size={160} photo={photo} />
      </div>

      <p className="text-xl font-bold text-gray-900 mb-1.5">{name}</p>
      <p className="text-base text-gray-500">{role}</p>
    </div>
  );
}

/* ================= MAIN PAGE ================= */

export default function AboutPage() {
  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <div className="min-h-screen flex items-center px-6 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - TEXT */}
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#4A7CFF] mb-5">
              MindStack · About Us
            </p>

            <h1 className="text-[clamp(44px,6vw,76px)] font-bold leading-tight tracking-tighter mb-5">
              Ask. Answer.
              <br />
              Collaborate. Grow.
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-md mb-9 mx-auto md:mx-0">
              A community-driven forum built for learners and developers to
              share ideas, ask questions, and grow together.
            </p>

            <div className="flex gap-3 flex-wrap justify-center md:justify-start">
              <button className="bg-gray-900 text-white px-7 py-3 rounded-full text-sm font-semibold hover:opacity-75 transition-opacity">
                Start for free →
              </button>

              <button className="text-gray-500 border-2 border-gray-200 px-7 py-3 rounded-full text-sm font-medium hover:border-[#4A7CFF] hover:text-[#4A7CFF] transition-colors">
                See more
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PURPOSE ================= */}
      <div className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight mb-3">
          Our Purpose
        </h2>
        <p className="text-base text-gray-500 leading-relaxed">
          To share knowledge and resources that help learners and developers
          improve their skills.
        </p>
      </div>

      {/* ================= TEAM ================= */}
      <div className="bg-blue-50/50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
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
          <div className="flex justify-center gap-6 flex-wrap">
            {team.map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
