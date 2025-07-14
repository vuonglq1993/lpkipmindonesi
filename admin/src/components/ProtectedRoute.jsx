import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (currentUser.email !== adminEmail) {
        return <h2 className="text-danger text-center mt-5">Bạn không có quyền truy cập</h2>;
    }

    return children;
}
