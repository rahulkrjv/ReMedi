import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import OrgProfile from "./pages/OrgProfile";
import Medications from "./pages/Medications";
import Requests from "./pages/Requests";
import Licenses from "./pages/Licenses";
import AuditLog from "./pages/AuditLog";
import Layout from "./components/Layout";
import "./index.css";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="flex items-center justify-center min-h-screen text-lg">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      
      {/* Protected - Wrapped in Layout */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout><Dashboard /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/org-profile"
        element={
          <PrivateRoute>
            <Layout><OrgProfile /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/medications"
        element={
          <PrivateRoute>
            <Layout><Medications /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/requests"
        element={
          <PrivateRoute>
            <Layout><Requests /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/licenses"
        element={
          <PrivateRoute>
            <Layout><Licenses /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/auditlog"
        element={
          <PrivateRoute>
            <Layout><AuditLog /></Layout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
