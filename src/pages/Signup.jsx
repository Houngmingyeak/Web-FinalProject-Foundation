import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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

  // Show success toast when registration succeeds
  useEffect(() => {
    if (success) {
      toast.success("Registration Successful! ✅");
      window.location.href = "/login"; // Redirect to login page after successful registration
    }
  }, [success]);

  // Show error toast when there's an error from Redux
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

    // Validation with toast notifications
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl w-[520px] p-10">
        <h2 className="text-3xl font-bold mb-7 text-black">
          Create an account
        </h2>

        {/* Social Login */}
        <div className="flex flex-col-2 gap-4">
          {/* Google */}
          <button
            type="button"
            className="bg-sky-100 flex items-center justify-center gap-3 w-full py-3 rounded-lg hover:shadow-md hover:bg-sky-50 transition"
            onClick={() => toast.success("Google sign-up coming soon!")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/32px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="text-sky-500 font-medium">Google</span>
          </button>

          {/* GitHub */}
          <button
            type="button"
            className="bg-sky-100 flex items-center justify-center gap-3 w-full py-3 rounded-lg hover:shadow-md hover:bg-sky-50 transition"
            onClick={() => toast.info("GitHub sign-up coming soon!")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="w-6 h-6"
            />
            <span className="text-sky-500 font-medium">GitHub</span>
          </button>
        </div>

        <p className="flex items-center justify-center text-gray-500 font-extrabold">
          or
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4 text-black">
            <label className="block font-semibold mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full h-12 border border-blue-400 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4 text-black">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-12 border border-blue-400 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4 text-black">
            <label className="block font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 border border-blue-400 rounded-xl px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
            {/* Added password hint */}
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 text-black">
            <label className="block font-semibold mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full h-12 border border-blue-400 rounded-xl px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <p className="text-end text-sm text-gray-600 mb-4">
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-xl font-semibold text-white ${
              loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Loading..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
        {/* Terms and conditions note */}
        <p className="text-xs text-gray-500 mb-4">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        {/* ToastContainer must be included once in your component tree */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
