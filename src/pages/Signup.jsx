import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; // យក ToastContainer ចេញ
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, resetState } from "../features/auth/authSlice";

// Icons
function EyeIcon({ visible }) {
  return visible ? (
    <EyeOff width={20} height={20} />
  ) : (
    <Eye width={20} height={20} />
  );
}

// Helper function for Firestore (សម្រាប់ OAuth)
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

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [oauthLoading, setOauthLoading] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

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
    dispatch(
      registerUser({
        username,
        email,
        password,
        confirmPassword, // field នេះត្រូវការដោយ API
      }),
    );
  };

  // OAuth handlers
  const handleGoogleSignIn = async () => {
    setLocalError("");
    setOauthLoading("google");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await createUserDoc(result.user);
      toast.success("Google sign-up successful! ✅");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") return;
      if (err.code === "auth/account-exists-with-different-credential") {
        setLocalError("An account already exists with this email.");
      } else {
        setLocalError("Google authentication failed. Please try again.");
      }
    } finally {
      setOauthLoading("");
    }
  };

  const handleGithubSignIn = async () => {
    setLocalError("");
    setOauthLoading("github");
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await createUserDoc(result.user);
      toast.success("GitHub sign-up successful! ✅");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") return;
      if (err.code === "auth/account-exists-with-different-credential") {
        setLocalError("An account already exists with this email.");
      } else {
        setLocalError("GitHub authentication failed. Please try again.");
      }
    } finally {
      setOauthLoading("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md w-[540px] p-10">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Create an account
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Join our community of developers and start sharing knowledge.
        </p>

        {/* Social Login */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            disabled={oauthLoading === "google"}
            className={`bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center gap-3 w-full py-3 rounded-lg hover:shadow-md hover:bg-sky-50 dark:hover:bg-sky-800/30 transition ${
              oauthLoading === "google" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleGoogleSignIn}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/32px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="text-sky-600 dark:text-sky-400 font-medium">
              Google
            </span>
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
            <span className="text-sky-600 dark:text-sky-400 font-medium">
              GitHub
            </span>
          </button>
        </div>

        <p className="flex items-center justify-center text-gray-500 dark:text-gray-400 font-extrabold">
          or
        </p>

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
              required
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
              required
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
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Minimum 6 characters
            </p>
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

          {localError && (
            <p className="text-red-500 text-sm mb-2">{localError}</p>
          )}

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
            {loading ? "កំពុងចុះឈ្មោះ..." : "Create Account"}
          </button>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Login
            </Link>
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 mt-3">
            By creating an account, you agree to our{" "}
            <a
              href="#"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </form>

        {/* យក ToastContainer ចេញពីទីនេះ ហើយដាក់ក្នុង App.jsx វិញ */}
      </div>
    </div>
  );
}
