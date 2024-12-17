// admin/src/pages/Login.tsx
import React, { useState, useEffect } from "react";
import welcomePng from "../assets/img/welcome-bg.png";
import welcomeVector from "../assets/img/welcome-vector.png";
import logo from "../assets/img/logo.png";
import accountBg from "../assets/img/account-bg.png";
import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loaders/Loader.tsx";
import axios from "axios"; // Import axios directly
import { useToast } from "../services/ToastContext"; // Import useToast
const Login = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();
  console.log("isAuth", isAuthenticated());

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [loadingReset, setLoadingReset] = useState<boolean>(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleForgotPasswordSubmit = async () => {
    setLoadingReset(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(
        `${apiUrl}/auth/request-password-change`,
        { email }
      );
      setSuccessMessage(response.data.message);
      showToast(response.data.message, "success");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Erreur lors de la demande de réinitialisation du mot de passe.";
      setResetError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoadingReset(false);
    }
  };

  const handleLoginSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      showToast(
        !email.trim() ? "Email est requis." : "Mot de passe est requis.",
        "error"
      );
      return;
    }

    try {
      const success = await login(email, password, rememberMe, "admin");
      if (success) {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      showToast(
        error?.response?.data?.message || "Erreur de connexion",
        "error"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isForgotPassword) {
      await handleForgotPasswordSubmit();
    } else {
      await handleLoginSubmit();
    }
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <section
      className="sherah-wc sherah-wc__full sherah-bg-cover"
      style={{ backgroundImage: `url(${accountBg})` }}
    >
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-lg-6 col-md-6 col-12 sherah-wc-col-one">
            <div
              className="sherah-wc__inner"
              style={{ backgroundImage: `url(${welcomePng})` }}
            >
              <div className="sherah-wc__logo">
                <a href="index.html">
                  <img src={logo} alt="Logo" />
                </a>
              </div>
              <div className="sherah-wc__middle">
                <a href="index.html">
                  <img src={welcomeVector} alt="Image de bienvenue" />
                </a>
              </div>
              <h2 className="sherah-wc__title">
                Bienvenue dans le panneau d'administration de Sherah eCommerce
              </h2>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12 sherah-wc-col-two">
            <div className="sherah-wc__form">
              <div className="sherah-wc__form-inner">
                <h3 className="sherah-wc__form-title sherah-wc__form-title__one">
                  {isForgotPassword
                    ? "Réinitialiser votre mot de passe"
                    : "Connectez-vous à votre compte"}
                  <span>
                    {isForgotPassword
                      ? "Veuillez entrer votre adresse e-mail pour recevoir un lien de réinitialisation."
                      : "Veuillez entrer votre email et votre mot de passe pour continuer"}
                  </span>
                </h3>
                <form
                  className="sherah-wc__form-main p-0"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label className="sherah-wc__form-label">
                      Adresse e-mail
                    </label>
                    <div className="form-group__input">
                      <input
                        className="sherah-wc__form-input"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="demo3243@gmail.com"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  {!isForgotPassword && (
                    <div className="form-group">
                      <label className="sherah-wc__form-label">
                        Mot de passe
                      </label>
                      <div className="form-group__input">
                        <input
                          className="sherah-wc__form-input"
                          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                          id="password-field"
                          type="password"
                          name="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {!isForgotPassword && (
                    <div className="form-group">
                      <div className="sherah-wc__check-inline">
                        <div className="sherah-wc__checkbox">
                          <input
                            className="sherah-wc__form-check"
                            id="checkbox"
                            name="checkbox"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <label htmlFor="checkbox">Se souvenir de moi</label>
                        </div>
                        <div className="sherah-wc__forgot">
                          <a
                            className="forgot-pass"
                            onClick={() => setIsForgotPassword(true)}
                          >
                            Mot de passe oublié ?
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="form-group form-mg-top25">
                    <div className="sherah-wc__button sherah-wc__button--bottom">
                      {!loading && (
                        <button
                          className="ntfmax-wc__btn"
                          type="submit"
                          disabled={!isFormValid}
                        >
                          {isForgotPassword ? "Envoyer le lien" : "Connexion"}
                        </button>
                      )}
                      {loading && <Loader />}
                    </div>
                  </div>
                </form>
                {isForgotPassword && (
                  <div className="form-group">
                    <p>
                      Vous avez déjà un compte?{" "}
                      <a onClick={() => setIsForgotPassword(false)}>
                        Connectez-vous ici
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
