<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./components/ThemeContext";
=======
// App.jsx
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

>>>>>>> 5f04263ef15645cf400e9f140b9a6d7d985d400a
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
<<<<<<< HEAD
import SearchPage from "./pages/Search";
import AboutPage from "./pages/AboutUsPage";
=======
>>>>>>> 5f04263ef15645cf400e9f140b9a6d7d985d400a
import ChallengesPage from "./pages/ChallengesPage";
import QuestionsPage from "./pages/QuestionPage";
import Leaderboard from "./pages/Leaderboard";
import BookmarkCard from "./pages/BookMarkCard";
import QuestionDetailPage from "./pages/QuestionDetail";
import AskQuestion from "./pages/AskQuestion";
import ForgotPassword from "./pages/ForgotPassword.jsx";

import { useTheme } from "./main.jsx"; // <- ThemeProvider hook

function Layout() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-gray-900 text-black dark:text-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


export default function App() {
  const { theme } = useTheme(); // get current theme

  return (
<<<<<<< HEAD
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
              {/* <Route path="/que" element={<QuestionForm />} /> */}
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              {/* <Route path="/account" element={<Account />} /> */}
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
=======
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        {/* ── Standalone pages (no Header / Footer) ── */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ── App pages (with Layout: Header + Footer) ── */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/saves" element={<BookmarkCard />} />
          <Route path="/question/:id" element={<QuestionDetailPage />} />
          <Route path="/ask" element={<AskQuestion />} />
        </Route>
      </Routes>

      {/* Toast notifications respect current theme */}
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
        theme={theme === "dark" ? "dark" : "light"}
      />
>>>>>>> 5f04263ef15645cf400e9f140b9a6d7d985d400a
    </BrowserRouter>
  );
}
