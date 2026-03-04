import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EyeIcon({ visible }) {
  // Stroke color adapts to dark mode
  const strokeClass = "stroke-gray-600 dark:stroke-gray-300";
  return visible ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
  ) : (
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    dispatch(registerUser(formData));
  };

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