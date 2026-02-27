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
          display: "block",
        }}
        onError={(e) => {
          // Fallback to initials if image fails to load
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
        background: `${color}22`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.3,
        fontWeight: 700,
        color,
      }}
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
      className={`card ${hovered ? "card-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="avatar-ring">
        <div className="avatar-ring-inner">
          {photo ? (
            <>
              <img
                src={photo}
                alt={name}
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback initials avatar shown if image fails */}
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  background: `${color}22`,
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 220 * 0.3,
                  fontWeight: 700,
                  color,
                }}
              >
                {initials}
              </div>
            </>
          ) : (
            <Avatar name={name} size={220} />
          )}
        </div>
      </div>
      <p className="card-name">{name}</p>
      <p className="card-role">{role}</p>
      <div className="card-socials">
        <button className="social-btn" title="Facebook">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </button>
        <button className="social-btn" title="Telegram">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        </button>
        <button className="social-btn" title="GitHub">
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
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .page {
          font-family: 'DM Sans', sans-serif;
          background: #fafbff;
          color: #1a1d2e;
          min-height: 100vh;
        }

        /* ── Hero ── */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 24px;
          background: linear-gradient(160deg, #eef2ff 0%, #fafbff 60%);
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74,124,255,0.07) 0%, transparent 70%);
          top: -120px; right: -120px;
          pointer-events: none;
        }
        .hero-tag {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #4A7CFF;
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeUp 0.6s 0.1s ease forwards;
        }
        .hero-title {
          font-size: clamp(44px, 6vw, 76px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -2px;
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeUp 0.6s 0.2s ease forwards;
        }
        .hero-desc {
          font-size: 17px;
          color: #6b7280;
          line-height: 1.7;
          max-width: 460px;
          margin-bottom: 36px;
          opacity: 0;
          animation: fadeUp 0.6s 0.3s ease forwards;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0;
          animation: fadeUp 0.6s 0.4s ease forwards;
        }
        .btn-primary {
          background: #1a1d2e;
          color: #fff;
          border: none;
          padding: 12px 28px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.75; }
        .btn-ghost {
          background: none;
          color: #6b7280;
          border: 1.5px solid #e5e7eb;
          padding: 12px 28px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: #4A7CFF; color: #4A7CFF; }

        /* ── Purpose Section ── */
        .purpose-section {
          padding: 90px 24px;
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
        }
        .section-title {
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 700;
          letter-spacing: -1px;
          margin-bottom: 12px;
        }
        .section-sub {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 52px;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          text-align: left;
        }
        .purpose-card {
          background: #fff;
          border: 1.5px solid #f0f0f5;
          border-radius: 16px;
          padding: 32px 28px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .purpose-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(74,124,255,0.08);
        }
        .purpose-icon {
          font-size: 22px;
          margin-bottom: 16px;
        }
        .purpose-card h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .purpose-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.8;
        }

        /* ── Team Section ── */
        .team-section {
          background: #f5f7ff;
          padding: 80px 24px 100px;
        }
        .team-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }
        .team-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #a0aabb;
          margin-bottom: 10px;
        }
        .team-title {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-bottom: 36px;
        }
        .member-row {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        /* ── Member Card ── */
        .card {
          background: #fff;
          border: 1.5px solid #e8edf5;
          border-radius: 16px;
          padding: 48px 40px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          width: 340px;
          cursor: default;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .card-hovered {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(74,124,255,0.12);
        }
        .avatar-ring {
          border-radius: 50%;
          padding: 5px;
          background: linear-gradient(160deg, #4A7CFF, #1a3fcc);
          margin-bottom: 24px;
        }
        .avatar-ring-inner {
          border-radius: 50%;
          overflow: hidden;
          width: 220px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }
        .card-name {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 6px;
          color: #1a1d2e;
        }
        .card-role {
          font-size: 15px;
          color: #6b7280;
          margin-bottom: 22px;
        }
        .card-socials {
          display: flex;
          gap: 24px;
        }
        .social-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #1a1d2e;
          transition: color 0.2s;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .social-btn:hover { color: #4A7CFF; }

        /* ── Footer ── */
        footer {
          text-align: center;
          padding: 24px;
          font-size: 13px;
          color: #c5ccd8;
          border-top: 1px solid #f0f0f5;
        }

        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero */}
      <div className="hero">
        <p className="hero-tag">MindStack · About Us</p>
        <h1 className="hero-title">
          Ask. Answer.
          <br />
          Collaborate. Grow.
        </h1>
        <p className="hero-desc">
          A community-driven forum built for learners and developers to share
          ideas, ask questions, and grow together.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">Start for free →</button>
          <button className="btn-ghost">See more</button>
        </div>
      </div>

      {/* Purpose */}
      <div className="purpose-section">
        <h2 className="section-title">Our Purpose</h2>
        <p className="section-sub">
          To share knowledge and resources that help learners and developers
          improve their skills.
        </p>
        <div className="cards-grid">
          <div className="purpose-card">
            <div className="purpose-icon">🛡️</div>
            <h3>Mission</h3>
            <p>
              To build an inclusive, user-friendly forum where people can freely
              exchange ideas, ask questions, and share knowledge — connecting
              people from all backgrounds to grow and solve problems together.
            </p>
          </div>
          <div className="purpose-card">
            <div className="purpose-icon">🎯</div>
            <h3>Vision</h3>
            <p>
              To become a trusted knowledge-sharing platform that inspires
              innovation and meaningful collaboration worldwide — where
              knowledge is accessible to everyone and every idea is respected.
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="team-section">
        <div className="team-inner">
          <p className="team-label">The people behind it</p>

          <h2 className="team-title">Our Mentors</h2>
          <div className="member-row" style={{ marginBottom: 60 }}>
            {mentors.map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </div>

          <h2 className="team-title">Our Team</h2>
          <div className="member-row">
            {team.slice(0, 2).map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </div>
          <div className="member-row">
            {team.slice(2, 5).map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </div>
          <div className="member-row">
            {team.slice(5).map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </div>

      <footer>
        © {new Date().getFullYear()} MindStack · Built by learners, for
        learners.
      </footer>
    </div>
  );
}
