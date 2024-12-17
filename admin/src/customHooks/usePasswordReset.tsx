import { useState } from "react";
import axios from "axios";
import { UsePasswordReset } from "../types/hooks/usePassword";

const usePasswordReset = (): UsePasswordReset => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const requestResetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        `${apiUrl}/auth/request-password-change`,
        {
          email,
        }
      );
      setSuccessMessage(response.data.message);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la demande de réinitialisation du mot de passe."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        `${apiUrl}/auth/reset-password`,
        { token, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in headers
          },
        }
      );
      setSuccessMessage(response.data.message);
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la réinitialisation du mot de passe."
      );
    } finally {
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    error,
    successMessage,
    requestResetPassword,
    resetPassword,
  };
};

export default usePasswordReset;
