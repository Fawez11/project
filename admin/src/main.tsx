// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router";
import "./styles/reset.css";
import "./App.css";
import { ToastProvider } from "./services/ToastContext";
import { AuthProvider } from "./services/AuthContext";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
