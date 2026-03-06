import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./components/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchPage from "./pages/Search";
import AboutPage from "./pages/AboutUsPage";
import ChallengesPage from "./pages/ChallengesPage";
import QuestionsPage from "./pages/QuestionPage";
import Leaderboard from "./pages/LeaderBoard";
import BookmarkCard from "./pages/BookMarkCard";
import QuestionDetailPage from "./pages/QuestionDetail";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Header />
          <main className="bg-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/que" element={<QuestionForm />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/questions" element={<QuestionsPage />} />
              <Route path="/questions/:id" element={<QuestionDetailPage />} />
              <Route path="/saves" element={<BookmarkCard />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={
              document.documentElement.classList.contains("dark")
                ? "dark"
                : "light"
            }
          />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}