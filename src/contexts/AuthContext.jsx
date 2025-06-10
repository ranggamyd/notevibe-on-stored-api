import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { getUserLogged, getAccessToken, putAccessToken } from "../utils/network-data";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (accessToken) => {
    putAccessToken(accessToken);
    return getUserLogged().then((userData) => {
      setUser(userData);
      return userData;
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const checkAuth = async () => {
    const accessToken = getAccessToken();
    if (accessToken) {
      try {
        const userData = await getUserLogged();
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("accessToken");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
