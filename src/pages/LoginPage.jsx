import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { login as loginAPI } from "../utils/network-data";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleLogin = async (credentials) => {
    setLoading(true);

    try {
      const accessToken = await loginAPI(credentials);
      await login(accessToken);
      toast.success(t("loginSuccess"));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </AuthLayout>
  );
};

export default LoginPage;
