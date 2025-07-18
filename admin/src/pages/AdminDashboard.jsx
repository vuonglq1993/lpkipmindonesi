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
                    <Link to="/admin/home">📝 Chỉnh sửa trang "Home"</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/our-role">📝 Chỉnh sửa trang "Our Role"</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/our-thoughts">📝 Chỉnh sửa trang "Our Thoughts"</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/skill-system">📝 Chỉnh sửa trang "Skill system</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/technical-intern">📝 Chỉnh sửa trang "Technical Intern"</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/news">📝 Thêm, sửa news</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/contactedit">📝 Chỉnh sửa component Contact</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/overview">📝 Chỉnh sửa bảng UnionOverview</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/comparison-table">📝 Chỉnh sửa bảng ComparisonTable</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/news">📰 Quản lý Tin tức</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/contact">📬 Xem phản hồi Liên hệ</Link>
                </li>
                {/* Thêm các link khác ở đây */}
            </ul>
        </div>
    );
}
