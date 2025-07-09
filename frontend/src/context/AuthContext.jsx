import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister, getUserInfo } from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [access, setAccess] = useState(localStorage.getItem("access") || "");
  const [refresh, setRefresh] = useState(localStorage.getItem("refresh") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (access) {
      setLoading(true);
      getUserInfo(access)
        .then((data) => {
          setUser(data);
          setError("");
        })
        .catch(() => {
          setUser(null);
          setError("Session expired. Please log in again.");
          setAccess("");
          setRefresh("");
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
        })
        .finally(() => setLoading(false));
    }
  }, [access]);

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const { access: acc, refresh: ref } = await apiLogin(email, password);
      setAccess(acc);
      setRefresh(ref);
      localStorage.setItem("access", acc);
      localStorage.setItem("refresh", ref);
      const userData = await getUserInfo(acc);
      setUser(userData);
      setError("");
      return true;
    } catch (err) {
      setError("Invalid credentials");
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTER FUNCTION ---
  const register = async ({ username, email, password, first_name, last_name, role }) => {
    setLoading(true);
    setError("");
    try {
      await apiRegister({ username, email, password, first_name, last_name, role });
      setError("");
      return true;
    } catch (err) {
      setError(
        "Registration failed: " +
          (err.response?.data?.detail || "Please check your details.")
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAccess("");
    setRefresh("");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        access,
        refresh,
        loading,
        error,
        login,
        register,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}