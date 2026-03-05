// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="text-white">Loading...</div>
    </div>
  }

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  return children;
}