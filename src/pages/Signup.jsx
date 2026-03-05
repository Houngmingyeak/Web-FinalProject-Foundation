// src/pages/Signup.jsx

import { useState } from "react";
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

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../firebase/config";

// RTK Query
import {
  useGoogleLoginMutation,
  useGithubLoginMutation,
} from "../features/auth/authApi";


// -----------------------------
// Zod Validation
// -----------------------------

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters numbers underscore"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


// -----------------------------
// Create Firestore user profile
// -----------------------------

const createUserProfile = async (user) => {
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
  const navigate = useNavigate();

  const [googleLogin] = useGoogleLoginMutation();
  const [githubLogin] = useGithubLoginMutation();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  // -----------------------------
  // Handle input change
  // -----------------------------

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  // -----------------------------
  // Email Signup
  // -----------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = signupSchema.safeParse(form);

    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(userCredential.user, {
        displayName: form.username,
      });

      await createUserProfile(userCredential.user);

      toast.success("Account created successfully 🎉");

      navigate("/questions");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  // -----------------------------
  // Google Login
  // -----------------------------

  const handleGoogleLogin = async () => {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-950">

      <div className="w-[380px] bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create Account
        </h2>


        {/* OAuth Buttons */}

        <div className="grid grid-cols-2 gap-3 mb-6">

          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
          >
            {oauthLoading === "google" ? "Loading..." : "Google"}
          </button>

          <button
            onClick={handleGithubLogin}
            className="bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg text-sm"
          >
            {oauthLoading === "github" ? "Loading..." : "GitHub"}
          </button>

        </div>


        {/* Divider */}

        <div className="text-center text-gray-500 text-xs mb-4">
          OR
        </div>


        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
          />


          <div className="relative">

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>

          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg text-white font-semibold"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>


        <p className="text-center text-gray-400 mt-5 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-400 hover:text-orange-300"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}