// admin/src/hooks/useAuthGuard.tsx
import { useEffect } from "react";
import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

const useAuthGuard = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [loading, isAuthenticated, navigate]);
};

export default useAuthGuard;
