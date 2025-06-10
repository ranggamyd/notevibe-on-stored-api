import React from "react";
import { Toaster } from "react-hot-toast";
import { useTheme } from "../../contexts/ThemeContext";

const Toast = () => {
  const { isDark } = useTheme();

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: "",
        duration: 4000,
        style: {
          background: isDark ? "#374151" : "#ffffff",
          color: isDark ? "#f9fafb" : "#111827",
          border: isDark ? "1px solid #4b5563" : "1px solid #e5e7eb",
          borderRadius: "0.75rem",
          fontSize: "14px",
          fontWeight: "500",
          padding: "12px 16px",
          boxShadow: isDark ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },

        success: {
          duration: 3000,
          iconTheme: {
            primary: "#10b981",
            secondary: "#ffffff",
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
        loading: {
          iconTheme: {
            primary: "#3b82f6",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
};

export default Toast;
