import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

function EyeIcon({ visible }) {
  return visible ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z"
        stroke="black"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <path
        d="M3 3L17 17"
        stroke="black"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z"
        stroke="black"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <circle
        cx="10"
        cy="10"
        r="2.5"
        stroke="black"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Assuming the auth slice provides 'user' on success
  const { loading, error, user } = useSelector((state) => state.auth);

  // Redirect to home page when user is logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password");
      return;
    }

    dispatch(loginUser({ ...formData, remember }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl w-[520px] p-12 transition-all duration-300 hover:shadow-blue-300">
        
        <h2 className="text-3xl font-bold mb-2 text-black">
          Login To Your Account
        </h2>
        <p className="text-gray-500 mb-8">
          Welcome back! Please sign in to continue.
        </p>

        {/* Social Login Buttons */}
        <div className="mb-6 flex flex-col-2 gap-4">
          <button
            type="button"
            onClick={() => alert("Google login coming soon!")}
            className="w-full h-12 rounded-xl font-semibold bg-sky-100 text-sky-500 hover:bg-sky-50 transition flex items-center justify-center gap-3"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/32px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="w-6 h-6"
            />
            Google
          </button>
          <button
            type="button"
            onClick={() => alert("GitHub login coming soon!")}
            className="w-full h-12 rounded-xl font-semibold bg-sky-100 text-sky-500 hover:bg-sky-50 transition flex items-center justify-center gap-3"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="w-6 h-6"
            />
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4">
            {error.message || error}
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-5 text-black">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-12 border border-blue-400 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div className="mb-3 text-black">
            <label className="block font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 border border-blue-400 rounded-xl px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-blue-500"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-xl font-semibold text-white transition-all duration-300 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
}