import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./components/login-form";
import { SignUpForm } from "./components/sign-up-form";
import { ForgotPasswordForm } from "./components/forgot-password-form";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/sign-up" element={<SignUpForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
