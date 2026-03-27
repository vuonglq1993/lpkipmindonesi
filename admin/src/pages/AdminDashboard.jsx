import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";


export default function AdminDashboard() {
    const { currentUser } = useAuth();

    const handleLogout = async () => {
        await signOut(auth);
        window.location.href = "/login";
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">👋 Xin chào, {currentUser.email}</h2>

            <div className="mb-4">
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Đăng xuất
                </button>
            </div>

            <h4>🔧 Quản lý nội dung:</h4>
            <ul className="list-group mt-3">
            <li className="list-group-item">
                    <Link to="/admin/contact"> Các thông báo mới </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/editrecruitment">💼 Quản lý Tuyển dụng</Link>
                    </li>
                <li className="list-group-item">
                    <Link to="/admin/news">📰 Quản lý Tin tức</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/overview">📝 Chỉnh sửa bảng UnionOverview</Link>
                </li>

                <li className="list-group-item">
                    <Link to="/admin/contact">📬 Xem phản hồi Liên hệ</Link>
                </li>
                {/* Thêm các link khác ở đây */}
            </ul>
        </div>
    );
}
