<<<<<<<<< Temporary merge branch 1
// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
=========
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

>>>>>>>>> Temporary merge branch 2
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
<<<<<<<<< Temporary merge branch 1
import SearchPage from "./pages/Search";
import QuestionDetailPage from "./pages/QuestionDetail";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/forgot_password";
=========
import ChallengesPage from "./pages/ChallengesPage";
import Account from "./pages/Account";
import QuestionsPage from "./pages/QuestionPage";
import Leaderboard from "./pages/Leaderboard";
import BookmarkCard from "./pages/BookMarkCard";
import QuestionDetailPage from "./pages/QuestionDetail";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-color)] transition-colors duration-300">
      <Header />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
>>>>>>>>> Temporary merge branch 2

export default function App() {
  return (
    <BrowserRouter>
<<<<<<<<< Temporary merge branch 1
      <AuthProvider>
        <Header />
        <main className="min-h-screen bg-gray-950 text-white p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/question/:id" element={<QuestionDetailPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
=========
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/bookmarks" element={<BookmarkCard />} />
          <Route path="/question/:id" element={<QuestionDetailPage />} />

        </Route>
      </Routes>

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
        theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
      />
>>>>>>>>> Temporary merge branch 2
    </BrowserRouter>
   );
}