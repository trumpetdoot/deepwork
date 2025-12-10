import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/login-form";
import { SignUpForm } from "./components/sign-up-form";
import { ForgotPasswordForm } from "./components/forgot-password-form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
