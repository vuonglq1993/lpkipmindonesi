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
import AdminContact from "./pages/AdminContact";
import HomeEditor from "./pages/HomeEditor";
import CreateNewsPage from "./pages/CreateNewsPage";
import EditNewsPage from "./pages/EditNewsPage";
import EditNewsById from "./pages/EditNewsById";
import EditNewsPagejp from "./pages/EditNewsByIdJP";
import EditRecruitmentById from "./pages/EditRecruitmentById";
import CreateRecruitment from "./pages/CreateRecruitment";
import EditrecruitmentPage from "./pages/EditRecruitmentPage";

import ContactEditor from "./pages/ContactComponentEditor";
import { Editor } from "@tiptap/react";
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
            path="/admin/home"
            element={
              <ProtectedRoute>
                <HomeEditor />
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
            path="/admin/contactedit"
            element={
              <ProtectedRoute>
                <ContactEditor />
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
                <EditNewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news/:id"
            element={
              <ProtectedRoute>
                <EditNewsById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/newsjp/:id"
            element={
              <ProtectedRoute>
                <EditNewsPagejp />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create"
            element={
              <ProtectedRoute>
                <CreateNewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/recruitment"
            element={
              <ProtectedRoute>
                <CreateRecruitment />
              </ProtectedRoute>
            }
          />

<Route
            path="/admin/editrecruitment"
            element={
              <ProtectedRoute>
                <EditrecruitmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/recruitment/:id"
            element={
              <ProtectedRoute>
                <EditRecruitmentById />
              </ProtectedRoute>
            }
          />
                    <Route
            path="/admin/recruitmentjp/:id"
            element={
              <ProtectedRoute>
                <EditRecruitmentById />
              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}
