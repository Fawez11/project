// admin/src/pages/ResetPassword.tsx
import React, { useState } from "react";
import axios from "axios"; // Import axios directly
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../services/ToastContext";

const ResetPassword: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [RepeatshowPassword, setRepeatShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const token: string = query.get("token") || "";

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    const apiUrl = import.meta.env.VITE_API_URL; // Moved inside the function

    try {
      if (newPassword !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }
      const response = await axios.post(
        `${apiUrl}/auth/reset-password`,
        { token, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast(response.data.message, "success");
      setIsSuccess(true);
    } catch (err: any) {
      showToast(
        err.response?.data?.message ||
          "Erreur lors de la réinitialisation du mot de passe.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-lg-6 col-md-6 col-12">
        <div className="sherah-wc__form">
          <div className="sherah-wc__form-inner">
            {loading ? (
              <h3>Chargement...</h3>
            ) : isSuccess ? (
              <h3 className="sherah-wc__form-title sherah-wc__form-title__one">
                Mot de passe réinitialisé avec succès!
              </h3>
            ) : (
              <>
                <h3 className="sherah-wc__form-title sherah-wc__form-title__one">
                  Réinitialiser votre mot de passe
                  <span>Veuillez entrer votre nouveau mot de passe</span>
                </h3>
                <form
                  className="sherah-wc__form-main p-0"
                  onSubmit={handleChangePassword}
                >
                  <div className="form-group">
                    <label
                      className="sherah-wc__form-label"
                      htmlFor="newPassword"
                    >
                      Nouveau mot de passe
                    </label>
                    <div className="form-group__input">
                      <input
                        className="sherah-wc__form-input"
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="************"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <span
                        className="password-look"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      className="sherah-wc__form-label"
                      htmlFor="confirmPassword"
                    >
                      Confirmer le mot de passe
                    </label>
                    <div className="form-group__input">
                      <input
                        className="sherah-wc__form-input"
                        id="confirmPassword"
                        type={RepeatshowPassword ? "text" : "password"}
                        placeholder="************"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <span
                        className="password-look"
                        onClick={() =>
                          setRepeatShowPassword(!RepeatshowPassword)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon
                          icon={RepeatshowPassword ? faEye : faEyeSlash}
                        />
                      </span>
                    </div>
                  </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {successMessage && (
                    <p style={{ color: "green" }}>{successMessage}</p>
                  )}
                  <div className="form-group form-mg-top25">
                    <div className="sherah-wc__button sherah-wc__button--bottom">
                      <button type="submit" className="ntfmax-wc__btn">
                        Changer le mot de passe
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
