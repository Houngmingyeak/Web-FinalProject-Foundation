// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./hooks/useAuth";
// // import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// // import  Home  from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import SearchPage from "./pages/Search";
// // import QuestionDetailPage from "./pages/QuestionDetail";
// import AdminDashboard from "./pages/AdminDashboard";
// import HomePage from "./pages/Home";
// import AboutPage from "./pages/AboutUsPage";
// import QuestionForm from "./pages/Question";
// import ChallengesPage from "./pages/ChallengesPage";
// import Account from "./pages/Account";
// import QuestionsPage from "./pages/QuestionPage";
// import Leaderboard from "./pages/LeaderBoard";
// import { ThemeProvider } from "./components/ThemeContext";
// import BookmarkCard from "./pages/BookMarkCard";
// // import Leaderboard from "./pages/Leaderboard"; 
// // import BookmarkCard from "./pages/BookMarkCard";
// import QuestionDetailPage from "./pages/QuestionDetail";

// function Layout() {
//   return (
//     <div className="min-h-screen flex flex-col bg-[var(--bg-color)] transition-colors duration-300">
//       <Header />
//       <main className="flex-1 p-6">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <ThemeProvider>
//         <Header />
//         <main className="bg-white text-white">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/search" element={<SearchPage />} />
//             <Route path="/questions/:id" element={<QuestionDetailPage />} />
//             {/* <Route path="/admin" element={<AdminDashboard />} /> */}
//             <Route path="/home" element={<HomePage />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/que" element={<QuestionForm />} />
//             <Route path="/challenges" element={<ChallengesPage />} />
//             <Route path="/leaderboard" element={<Leaderboard />} />
//             <Route path="/account" element={<Account />} />
//             <Route path="/questions" element={<QuestionsPage />} />
//             {/* <Route path="/sb" element={<Sidebar />} /> */}
//             <Route path="/saves" element={<BookmarkCard />} />
//           </Routes>
//         </main>
//         <Footer />
//         </ThemeProvider>
//       </AuthProvider>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
//       />
//     </BrowserRouter>
//   );
// }

//       // <Routes>
//       //   <Route element={<Layout />}>
//       //     <Route path="/" element={<Home />} />
//       //     <Route path="/login" element={<Login />} />
//       //     <Route path="/signup" element={<Signup />} />
//       //     <Route path="challenges" element={<ChallengesPage />} />
//       //     <Route path="/account" element={<Account />} />
//       //     <Route path="/questions" element={<QuestionsPage />} />
//       //     <Route path="/leaderboard" element={<Leaderboard />} />
//       //     <Route path="/bookmarks" element={<BookmarkCard />} />
//       //     <Route path="/question/:id" element={<QuestionDetailPage />} />

//       //   </Route>
//       // </Routes>

//       // <ToastContainer
//       //   position="top-right"
//       //   autoClose={3000}
//       //   hideProgressBar={false}
//       //   newestOnTop={false}
//       //   closeOnClick
//       //   rtl={false}
//       //   pauseOnFocusLoss
//       //   draggable
//       //   pauseOnHover
//       //   theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
//       // />
// //     // </BrowserRouter>
// //   );
// // }

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
import QuestionForm from "./pages/Question";
import ChallengesPage from "./pages/ChallengesPage";
import Account from "./pages/Account";
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