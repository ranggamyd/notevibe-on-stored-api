import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import useInput from "../../hooks/useInput";
import Input from "../common/Input";
import Button from "../common/Button";

const LoginForm = ({ onSubmit, loading = false }) => {
  const { t } = useLanguage();
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = t("emailRequired");
    if (!password.trim()) newErrors.password = t("passwordRequired");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({ email, password });
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("welcomeBack")}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t("loginPrompt")}{" "}
          <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium transition-colors duration-200">
            {t("register")}
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 mb-2">
            <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <label className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">{t("email")}</label>
          </div>
          <Input type="email" value={email} onChange={onEmailChange} error={errors.email} placeholder={t("emailPlaceholder")} autoComplete="email" required />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 mb-2">
            <Lock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("password")}</label>
          </div>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} value={password} onChange={onPasswordChange} error={errors.password} placeholder={t("passwordPlaceholder")} autoComplete="current-password" required className="pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {showPassword ? <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" /> : <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full flex items-center justify-center space-x-2" loading={loading} disabled={!email.trim() || !password.trim()}>
          <span>{t("loginButton")}</span>
          <LogIn className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default LoginForm;
