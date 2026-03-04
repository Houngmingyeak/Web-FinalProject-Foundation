// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      // 🔥 Replace this with your real API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Password reset link sent to your Gmail 📩");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl w-full max-w-md p-8 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Forgot Password
        </h2>

        <p className="text-gray-500 dark:text-gray-300 text-center mb-6">
          Enter your Gmail address and we will send you a reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-blue-300 dark:bg-blue-700 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-500 dark:text-blue-400 hover:underline">
            Back to Login
          </Link>
        </p>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
        />
      </div>
    </div>
  );
}