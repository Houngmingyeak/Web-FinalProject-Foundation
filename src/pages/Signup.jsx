<<<<<<<<< Temporary merge branch 1
//src/pages/Signup.jsx
import { useState } from "react";
=========
import { useState, useEffect } from "react";
>>>>>>>>> Temporary merge branch 2
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import z from "zod";

import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
<<<<<<<<< Temporary merge branch 1
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import z from "zod";
=========
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, resetState } from "../features/auth/authSlice";
>>>>>>>>> Temporary merge branch 2

// Icons
function EyeIcon({ visible }) {
  return visible ? <EyeOff width={20} height={20} /> : <Eye width={20} height={20} />;
}

// Helper function for Firestore (សម្រាប់ OAuth)
async function createUserDoc(user, overrides = {}) {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    role: "user",
    avatar:
      user.photoURL ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
    bio: "",
    createdAt: serverTimestamp(),
  });
};


// -----------------------------
// Component
// -----------------------------

export default function Signup() {
<<<<<<<<< Temporary merge branch 1
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(""); // "google" | "github" | ""

=========
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [oauthLoading, setOauthLoading] = useState("");

  const dispatch = useDispatch();
>>>>>>>>> Temporary merge branch 2
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

<<<<<<<<< Temporary merge branch 1
  // ── Email / password signup ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = signupSchema.safeParse({ username, email, password });
    if (!result.success) {
      // This stops the hacker and shows the error message
      setError(result.error.errors[0].message);
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, { displayName: username });

      await createUserDoc(userCredential.user, { displayName: username });

      navigate("/");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") return;

      if (err.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with this email.");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
=========
  // បង្ហាញ error ពី Redux
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetState());
    }
  }, [error, dispatch]);

  // ពេលចុះឈ្មោះជោគជ័យ
  useEffect(() => {
    if (success) {
      toast.success("Account created successfully! ✅");
      // ពន្យារពេលបន្តិចដើម្បីឱ្យ toast បង្ហាញមុនផ្លាស់ប្តូរទំព័រ
      setTimeout(() => {
        navigate("/login");
      }, 1500);
>>>>>>>>> Temporary merge branch 2
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    const { username, email, password, confirmPassword } = formData;

    // ពិនិត្យពាក្យសម្ងាត់
    if (password !== confirmPassword) {
      setLocalError("ពាក្យសម្ងាត់មិនដូចគ្នា");
      return;
    }
    if (password.length < 6) {
      setLocalError("ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ");
      return;
    }

    // បញ្ជូនទិន្នន័យទៅ API ដោយបន្ថែម confirmPassword
    dispatch(registerUser({
      username,
      email,
      password,
      confirmPassword,   // field នេះត្រូវការដោយ API
    }));
  };

  // OAuth handlers
  const handleGoogleSignIn = async () => {
    setLocalError("");
    setOauthLoading("google");

    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();

      await googleLogin({ token }).unwrap();

      await createUserProfile(result.user);

      toast.success("Login with Google successful 🎉");

      navigate("/questions");
    } catch (error) {
      toast.error("Google login failed");
    } finally {
      setOauthLoading("");
    }
  };


  // -----------------------------
  // Github Login
  // -----------------------------

  const handleGithubLogin = async () => {
    setOauthLoading("github");

    try {
      const provider = new GithubAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();

      await githubLogin({ token }).unwrap();

      await createUserProfile(result.user);

      toast.success("Login with GitHub successful 🎉");

      navigate("/questions");
    } catch (error) {
      toast.error("GitHub login failed");
    } finally {
      setOauthLoading("");
    }
  };


  // -----------------------------
  // UI
  // -----------------------------

  return (
<<<<<<<<< Temporary merge branch 1
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-xl w-100 shadow-xl border border-gray-800">
        <h2 className="text-2xl font-bold text-start mb-6 text-black">
=========
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md w-[540px] p-10">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
>>>>>>>>> Temporary merge branch 2
          Create an account
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Join our community of developers and start sharing knowledge.
        </p>

<<<<<<<<< Temporary merge branch 1
        {/* Error banner */}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
=========
        {/* Social Login */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
          >
            {oauthLoading === "google" ? "Loading..." : "Google"}
          </button>

          <button
            type="button"
            disabled={oauthLoading === "github"}
            className={`bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center gap-3 w-full py-3 rounded-lg hover:shadow-md hover:bg-sky-50 dark:hover:bg-sky-800/30 transition ${
              oauthLoading === "github" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleGithubSignIn}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="w-6 h-6 dark:invert"
            />
            <span className="text-sky-600 dark:text-sky-400 font-medium">GitHub</span>
          </button>
        </div>

        <p className="flex items-center justify-center text-gray-500 dark:text-gray-400 font-extrabold">or</p>
>>>>>>>>> Temporary merge branch 2

        {/* ── OAuth buttons ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={busy}
            className="flex items-center justify-center gap-2 py-2.5 rounded-[11px] bg-blue-200 hover:bg-blue-300 text-blue-500 font-bold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            {oauthLoading === "google" ? "Connecting…" : "Google"}
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            disabled={busy}
            className="flex items-center justify-center gap-2 py-2.5 rounded-[11px] bg-blue-200 hover:bg-blue-300 text-blue-500 font-bold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LuGithub className="text-black text-[17px]" />
            {oauthLoading === "github" ? "Connecting…" : "Git Hub"}
          </button>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 " />
          <span className="text-xs text-gray-500 font-bold tracking-widest">
            Or
          </span>
          <div className="flex-1 " />
        </div>

        {/* ── Email / password form ──────────────────────────────────────── */}
        <label className="text-sm text-gray-700 font-bold">Username</label>
        <form onSubmit={handleSubmit}>
          {/* Username */}
<<<<<<<<< Temporary merge branch 1
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={busy}
            className="w-full mt-1 pl-4 p-2 mb-4 rounded-[11px] text-gray-700 border border-blue-700 focus:border-blue-500 focus:border-2 focus:outline-none disabled:opacity-50"
          />

          {/* Email */}
          <label className="text-sm text-gray-700 font-bold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={busy}
            className="w-full mt-1 pl-4 p-2 mb-4 rounded-[11px] text-gray-700 border border-blue-700 focus:border-blue-500 focus:border-2 focus:outline-none disabled:opacity-50"
          />

          {/* Password label row with Forgot link */}
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm text-gray-700 font-bold">Password</label>
          </div>

          {/* Password input + eye toggle */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              disabled={busy}
              className="w-full pl-4 p-2 pr-11 rounded-[11px] text-gray-700 border border-blue-700 focus:border-blue-500 focus:border-2 focus:outline-none disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-[11px] bg-blue-500 hover:bg-blue-600 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
=========
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full h-12 border border-blue-400 dark:border-blue-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-12 border border-blue-400 dark:border-blue-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 border border-blue-400 dark:border-blue-600 rounded-xl px-4 pr-12 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum 6 characters</p>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full h-12 border border-blue-400 dark:border-blue-600 rounded-xl px-4 pr-12 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <EyeIcon visible={showConfirmPassword} />
              </button>
            </div>
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg text-white font-semibold"
          >
            {loading ? "កំពុងចុះឈ្មោះ..." : "Create Account"}
>>>>>>>>> Temporary merge branch 2
          </button>

        </form>

<<<<<<<<< Temporary merge branch 1
        {/* Footer */}
        <p className="text-center mt-4 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-500 font-medium"
          >
            Log in
          </Link>
        </p>
=========
        {/* យក ToastContainer ចេញពីទីនេះ ហើយដាក់ក្នុង App.jsx វិញ */}
>>>>>>>>> Temporary merge branch 2
      </div>
    </div>
  );
}