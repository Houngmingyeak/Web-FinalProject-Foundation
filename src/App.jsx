import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuestionDetailPage from "./pages/QuestionDetail";
import HomePage from "./pages/Home";
import AboutPage from "./pages/AboutUsPage";
import ChallengesPage from "./pages/ChallengesPage";
import QuestionsPage from "./pages/QuestionPage";
import BookmarkCard from "./pages/BookMarkCard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main className="bg-white text-black">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/questiondetail" element={<QuestionDetailPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/saves" element={<BookmarkCard />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
