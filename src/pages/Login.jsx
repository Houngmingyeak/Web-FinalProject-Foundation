import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetState } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EyeIcon({ visible }) {
  return visible ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z"
        stroke="black"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <path d="M3 3L17 17" stroke="black" strokeOpacity="0.4" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z"
        stroke="black"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="2.5" stroke="black" strokeOpacity="0.4" strokeWidth="1.5" />
    </svg>
  );
}

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, success } = useSelector((state) => state.auth);

  // Toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetState());
    }
    if (success || user) {
      toast.success("Login Successful ✅");
      dispatch(resetState());
      navigate("/ask"); // Redirect after login
    }
  }, [error, success, user, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and password");
      return;
    }
    dispatch(loginUser({ ...formData, remember: true }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-2xl shadow-2xl w-[520px] p-12 transition-all duration-300 hover:shadow-blue-300">
        <h2 className="text-3xl font-bold mb-2 text-black">Welcome Back 👋</h2>
        <p className="text-gray-500 mb-8">Please login to your account</p>

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
          <div className="mb-6 text-black">
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-xl font-semibold text-white transition-all duration-300 ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-semibold hover:underline">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
}