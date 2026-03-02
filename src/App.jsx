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
import ProfilePage from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/forgot_password";

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
    </BrowserRouter>
  );
}
