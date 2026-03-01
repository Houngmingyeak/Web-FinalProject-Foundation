import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchPage from "./pages/Search";
import Question from "./pages/Question";
import QuestionCard from "./components/QuestionCard";
import QuestionDetail from "./pages/QuestionDetail";
import AnswerForm from "./components/AnswerForm";
import QuestionsPage from "./pages/QuestionPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <QuestionCard />
        <main className="min-h-screen w bg-gray-50 text-white ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/ask" element={<Question />} />
            <Route path="/question" element={<QuestionsPage />} />
            <Route path="/questiondetail" element={<QuestionDetail />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
