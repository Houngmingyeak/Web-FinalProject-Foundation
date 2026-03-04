// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { Eye, EyeOff } from "lucide-react";
import { LuGithub } from "react-icons/lu";

// ── Brand icons ──────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
      <path
        d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z"
        className={strokeClass}
        strokeWidth="1.5"
      />
      <path
        d="M3 3L17 17"
        className={strokeClass}
        strokeWidth="1.5"
      />
    </svg>
  ) ; (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z"
        className={strokeClass}
        strokeWidth="1.5"
      />
      <circle
        cx="10"
        cy="10"
        r="2.5"
        className={strokeClass}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-white"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// ── Helper: build a Firestore user doc from a Firebase user object ────────────
async function createUserDoc(user, overrides = {}) {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: user.displayName || overrides.displayName || "",
    email: user.email,
    role: "user",
    avatar:
      user.photoURL ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
    bio: "",
    achievements: { contributions: 0, helpful: 0, solved: 0 },
    createdAt: serverTimestamp(),
    ...overrides,
  });
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/login");
      toast.success("Registration Successful! ✅");
    }
  }, [success, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || error);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      updateProfile(userCredential.user, {
        displayName: username
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };




  // ── Google OAuth ────────────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setError("");
    setOauthLoading("google");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await createUserDoc(result.user);
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

  // ── GitHub OAuth ────────────────────────────────────────────────────────
  const handleGithubSignIn = async () => {
    setError("");
    setOauthLoading("github");
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await createUserDoc(result.user);
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

  const busy = loading || !!oauthLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md w-[540px] p-10 transition-colors duration-300">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Create an account
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Join our community of developers and start sharing knowledge. 
        </p>

        {/* Social Login */}
        <div className="flex gap-4 mb-6">
          {/* Google */}
          <button
            type="button"
            className="bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center gap-3 w-full py-3 rounded-lg hover:shadow-md hover:bg-sky-50 dark:hover:bg-sky-800/30 transition"
            onClick={() => toast.success("Google sign-up coming soon!")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/32px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="text-sky-600 dark:text-sky-400 font-medium">Google</span>
          </button>

          {/* GitHub */}
          <button
            type="button"
            className="bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center gap-3 w-full py-3 rounded-lg hover:shadow-md hover:bg-sky-50 dark:hover:bg-sky-800/30 transition"
            onClick={() => toast.info("GitHub sign-up coming soon!")}
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

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full h-12 border border-blue-400 dark:border-blue-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-12 border border-blue-400 dark:border-blue-600 rounded-xl px-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 border border-blue-400 dark:border-blue-600 rounded-xl px-4 pr-12 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum 8 characters</p>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full h-12 border border-blue-400 dark:border-blue-600 rounded-xl px-4 pr-12 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-xl font-semibold text-white transition-all duration-300 ${
              loading
                ? "bg-blue-300 dark:bg-blue-700 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            }`}
          >
            {loading ? "Loading..." : "Create Account"}
          </button>

          {/* Already have an account? */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 dark:text-blue-400 hover:underline">
              Login
            </a>
          </p>

          {/* Terms and conditions note */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 mt-3">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">Privacy Policy</a>.
          </p>
        </form>

        {/* ToastContainer with dark mode support */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
        />
      </div>
    </div>
  );
}