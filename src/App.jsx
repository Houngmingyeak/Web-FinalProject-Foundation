import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuestionDetailPage from "./pages/QuestionDetail";
// import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/Home";
import AboutPage from "./pages/AboutUsPage";
import QuestionForm from "./pages/Question";
import ChallengesPage from "./pages/ChallengesPage";
import Leaderboard from "./pages/LeaderBoard";
import Account from "./pages/Account";
import QuestionsPage from "./pages/QuestionPage";
import SearchPage from "./pages/Search";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  // optional: read theme if you want to debug or extend
  const { mode } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      {/* Global Layout Wrapper */}
      <div className="min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
        
        <Header />
        <main className="bg-white text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/question/:id" element={<QuestionDetailPage />} />
            {/* <Route path="/admin" element={<AdminDashboard />} /> */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/que" element={<QuestionForm />} />
            <Route path="/cha" element={<ChallengesPage />} />
            <Route path="/leader" element={<Leaderboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/questions" element={<QuestionsPage />} />
          </Routes>
        </main>

        <Footer />

        {/* Toastify - supports dark automatically */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme={mode === "dark" ? "dark" : "light"}
        />
      </div>
    </BrowserRouter>
  );
}