import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchPage from "./pages/Search";
import QuestionDetailPage from "./pages/QuestionDetail";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/forgot_password";
import HomePage from "./pages/Home";
import AboutPage from "./pages/AboutUsPage";
import QuestionForm from "./pages/Question";
import ChallengesPage from "./pages/ChallengesPage";
import Leaderboard from "./pages/LeaderBoard";
import Account from "./pages/Account";
import QuestionsPage from "./pages/QuestionPage";
import Sidebar from "./layout/Sidebar";
import BookmarkCard from "./pages/BookMarkCard";

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
            <Route path="/search" element={<SearchPage />} />
            <Route path="/question/:id" element={<QuestionDetailPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/que" element={<QuestionForm />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/sb" element={<Sidebar />} />
            <Route path="/saves" element={<BookmarkCard />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
