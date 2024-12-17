import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import { AuthContextType } from "../types/services/auth";
import { User } from "../types/dataTypes/user";
import { ErrorType } from "../types/utils/error";
import { useToast } from "./ToastContext";
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showToast } = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [error, setError] = useState<ErrorType | null>(null); // State to hold error messages
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
    isOpen: boolean;
  }>({
    message: "",
    type: "success",
    isOpen: false,
  });
  useEffect(() => {
    if (token) {
      getUser();
      // Optionally, you can fetch user data here if needed
    }
    setLoading(false);
  }, [token]);
  const getUser = async () => {
    try {
      setLoading(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get<{ user: User }>(
        `${apiUrl}/auth/currentuser`
      );
      console.log("user is here", response.data.user);

      setUser(response.data.user);
    } catch (error) {
      showToast("Erreur lors du chargement de l'utilisateur", "error");
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };
  const login = async (
    email: string,
    password: string,
    rememberMe: boolean,
    role: string
  ) => {
    try {
      const response = await axios.post<{ user: User; token: string }>(
        `${apiUrl}/auth/login`,
        { email, password, rememberMe, role }
      );

      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      // Set token first
      setToken(newToken);
      // Then set user
      setUser(response.data.user);

      setError(null);
      showToast("Login successful!", "success");

      // Return true to indicate successful login
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      if (axios.isAxiosError(error) && error.response?.data.message) {
        // Handle specific error responses
        const message =
          error.response.data?.message || "Login failed. Please try again.";
        setError(message);
        showToast(message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setError(null); // Clear error on logout
  };

  const isAuthenticated = () => {
    // Check only token for immediate response
    return !!token;
  };
  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, isOpen: false }); // Close the snackbar
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated,
        error,
        snackbar,
        closeSnackbar,
        setSnackbar,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
