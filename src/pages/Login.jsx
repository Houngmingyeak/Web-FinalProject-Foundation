import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { Eye, EyeOff } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import z from "zod";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
      <path d="M44.5 20H24v8.5h11.8C34.1 33.9 29.6 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.2-2.7-.5-4z" fill="#FFC107" />
      <path d="M6.3 14.7l7 5.1C15.2 16.2 19.3 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 5.1 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z" fill="#FF3D00" />
      <path d="M24 45c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.6C29.5 35.9 26.9 37 24 37c-5.6 0-10.3-3.8-11.9-9l-6.9 5.3C8.9 41.1 15.9 45 24 45z" fill="#4CAF50" />
      <path d="M44.5 20H24v8.5h11.8c-.8 2.4-2.3 4.4-4.3 5.8l6.6 5.6C42.3 36.2 45 30.6 45 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2" />
    </svg>
  );
}

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState("");

  const navigate = useNavigate();
  const busy = loading || !!oauthLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") return;
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setOauthLoading("google");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") return;
      if (err.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with this email.");
      } else {
        setError("Google authentication failed. Please try again.");
      }
    } finally {
      setOauthLoading("");
    }
  };

  const handleGithubSignIn = async () => {
    setError("");
    setOauthLoading("github");
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") return;
      if (err.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with this email.");
      } else {
        setError("GitHub authentication failed. Please try again.");
      }
    } finally {
      setOauthLoading("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl w-100 shadow-xl border border-gray-200 dark:border-gray-700">
        
        {/* Title */}
        <h2 className="text-[22px] font-bold text-start mb-6 text-black dark:text-white">
          Login to your account
        </h2>

        {/* Error banner */}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-[14px]">
            {error}
          </div>
        )}

        {/* OAuth buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={busy}
            className="flex items-center justify-center gap-2 py-2.5 rounded-[11px] bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-[14px] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            {oauthLoading === "google" ? "Connecting…" : "Google"}
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            disabled={busy}
            className="flex items-center justify-center gap-2 py-2.5 rounded-[11px] bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-[14px] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LuGithub className="text-black dark:text-white text-[17px]" />
            {oauthLoading === "github" ? "Connecting…" : "GitHub"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-[13px] text-gray-500 dark:text-gray-400 font-bold tracking-widest">
            Or
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label className="text-[15px] text-gray-700 dark:text-gray-300 font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={busy}
            className="w-full mt-1 pl-4 p-2 mb-4 rounded-[11px] text-[15px] text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-blue-700 dark:border-blue-600 focus:border-blue-500 focus:border-2 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-50"
          />

          {/* Password label row */}
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[15px] text-gray-700 dark:text-gray-300 font-bold">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-[14px] text-blue-500 hover:text-blue-600 font-medium"
            >
              Forgot?
            </Link>
          </div>

          {/* Password input */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={busy}
              className="w-full pl-4 p-2 pr-11 rounded-[11px] text-[15px] text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-blue-700 dark:border-blue-600 focus:border-blue-500 focus:border-2 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-[11px] bg-blue-500 hover:bg-blue-600 text-white text-[16px] font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login now"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-4 text-gray-400 dark:text-gray-500 text-[14px]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:text-blue-500 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}