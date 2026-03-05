
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// src/App.jsx
import Footer from "./components/Footer";
import  Home  from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import QuestionsPage from "./pages/QuestionPage";
import BookmarkCard from "./pages/BookMarkCard";
import QuestionDetailPage from "./pages/QuestionDetail";
import Header from "./components/Header";

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

export default function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/questions" element={<QuestionsPage />} />
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

    </BrowserRouter>
   );
}