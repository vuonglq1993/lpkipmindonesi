import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import OurRoleEditor from "./pages/OurRoleEditor";
import OurThoughtsEditor from "./pages/OurThoughtsEditor";
import ComparisonTableEditor from "./pages/ComparisonTableEditor";
import SkillSystemEditor from "./pages/SkillSystemEditor";
import TechnicalInternEditor from "./pages/TechnicalInternEditor";
import OverviewEditor from "./pages/UnionOverviewEditor";
import NewsEditor from "./pages/AdminNewsEditor";
import AdminContact from "./pages/AdminContact";
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contact"
            element={
              <ProtectedRoute>
                <AdminContact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/our-role"
            element={
              <ProtectedRoute>
                <OurRoleEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/our-thoughts"
            element={
              <ProtectedRoute>
                <OurThoughtsEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/skill-system"
            element={
              <ProtectedRoute>
                <SkillSystemEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/technical-intern"
            element={
              <ProtectedRoute>
                <TechnicalInternEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/overview"
            element={
              <ProtectedRoute>
                <OverviewEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news"
            element={
              <ProtectedRoute>
                <NewsEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/comparison-table"
            element={
              <ProtectedRoute>
                <ComparisonTableEditor />
              </ProtectedRoute>
            }
          />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}
