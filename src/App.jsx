import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchPage from "./pages/Search";
import QuestionDetailPage from "./pages/QuestionDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/forgot_password";
import HomePage from "./pages/Home";
import AboutPage from "./pages/AboutUsPage";
import ChallengesPage from "./pages/ChallengesPage";
import Account from "./pages/Account";
import QuestionsPage from "./pages/QuestionPage";
import LeaderBoard from "./pages/LeaderBoard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main className="bg-white text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/profile"
              element={<ProtectedRoute>{/* <ProfilePage /> */}</ProtectedRoute>}
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/questiondetail" element={<QuestionDetailPage />} />
            {/* <Route path="/admin" element={<AdminDashboard />} /> */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/challange" element={<ChallengesPage />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/question" element={<QuestionsPage />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
