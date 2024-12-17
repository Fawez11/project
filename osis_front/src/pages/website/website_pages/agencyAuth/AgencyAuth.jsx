import "./AgencyAuth.css";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import sideImg from "../../../../assets/website/authAgency.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Modal, Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorMessages = {
  required: "Ce champ est obligatoire",
  email: {
    invalid: "Format d'email invalide",
    exists: "Cet email est déjà enregistré",
  },
  password: {
    mismatch: "Les mots de passe ne correspondent pas",
    tooShort: "Le mot de passe doit contenir au moins 8 caractères",
  },
  taxNumber: {
    invalid: "Numéro de taxe invalide (format: 12345678-123-12)",
  },
  server: {
    noResponse: "Serveur non disponible. Veuillez réessayer plus tard",
    connection: "Erreur de connexion. Vérifiez votre connexion internet",
  },
};

const AgencyAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(
    location?.state?.initialView === "login" ? "login" : "register"
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    titreSocial: "",
    enterprise: "",
    taxNumber: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "user",
    rememberMe: true,
  });
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.defaultAuth) {
      setAuth(location.state.defaultAuth);
    }
  }, [location.state]);

  useEffect(() => {
    if (location?.state?.initialView === "login") {
      setAuth("login");
      window.history.replaceState({}, document.title);

      setTimeout(() => {
        toast.success("👋 Welcome back!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }, 500);
    }
  }, [location]);

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
      // ... reset other fields
    });
    setError("");
  }, [auth]);

  const handleInputChange = (e, formType = "register") => {
    const { name, value, files } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "taxNumber") {
      const formattedValue = formatTaxNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "image") {
      setImage(files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      formType === "register"
        ? setFormData((prev) => ({ ...prev, [name]: value }))
        : setLoginData((prev) => ({ ...prev, [name]: value }));
    }
    console.log(formData);
  };

  const formatTaxNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    const match = digits.match(/^(\d{0,8})(\d{0,3})(\d{0,2})$/);
    if (match) {
      return `${match[1]}${match[2] ? "-" + match[2] : ""}${
        match[3] ? "-" + match[3] : ""
      }`;
    }
    return value;
  };

  const register = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Enhanced validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = errorMessages.required;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = errorMessages.required;
    }
    if (!formData.email.trim()) {
      newErrors.email = errorMessages.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = errorMessages.email.invalid;
    }
    if (!formData.password.trim()) {
      newErrors.password = errorMessages.required;
    } else if (formData.password.length < 8) {
      newErrors.password = errorMessages.password.tooShort;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = errorMessages.password.mismatch;
    }
    if (!formData.taxNumber.trim()) {
      newErrors.taxNumber = errorMessages.required;
    } else if (!/^\d{8}-\d{3}-\d{2}$/.test(formData.taxNumber)) {
      newErrors.taxNumber = errorMessages.taxNumber.invalid;
    }

    setFormErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // Highlight first error field
      const firstError = Object.keys(newErrors)[0];
      document.getElementsByName(firstError)[0]?.focus();
      return;
    }

    setLoading(true);
    try {
      // Log registration attempt
      console.log("Starting registration process...");

      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("titreSocial", formData.titreSocial);
      formDataToSend.append("enterprise", formData.enterprise);
      formDataToSend.append("taxNumber", formData.taxNumber);

      if (image) {
        formDataToSend.append("image", image);
      }

      // Log data being sent (excluding sensitive info)
      console.log("Sending registration data:", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        titreSocial: formData.titreSocial,
        enterprise: formData.enterprise,
        taxNumber: formData.taxNumber,
        hasImage: !!image,
      });

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Registration response:", response.data);
      setError(null);
      setFormErrors({}); // Clear any previous errors
      setOpenModal(true);
    } catch (err) {
      console.error("Registration error details:", err);

      if (err.response) {
        console.error("Server error response:", err.response.data);

        if (err.response.status === 400) {
          // Handle validation errors from server
          const serverErrors = err.response.data.errors || {};
          const newFormErrors = {};

          // Map server errors to form fields
          Object.keys(serverErrors).forEach((field) => {
            switch (field) {
              case "email":
                newFormErrors.email = "Format d'email invalide";
                break;
              case "password":
                newFormErrors.password =
                  "Le mot de passe doit contenir au moins 8 caractères";
                break;
              case "taxNumber":
                newFormErrors.taxNumber =
                  "Format de numéro de taxe invalide (12345678-123-12)";
                break;
              case "firstName":
                newFormErrors.firstName = "Le prénom est requis";
                break;
              case "lastName":
                newFormErrors.lastName = "Le nom est requis";
                break;
              default:
                newFormErrors[field] = serverErrors[field];
            }
          });

          // If no specific fields are indicated, highlight common fields
          if (Object.keys(newFormErrors).length === 0) {
            newFormErrors.email = "Veuillez vérifier votre email";
            newFormErrors.taxNumber = "Veuillez vérifier votre numéro de taxe";
          }

          setFormErrors(newFormErrors);

          // Focus the first error field
          const firstErrorField = Object.keys(newFormErrors)[0];
          if (firstErrorField) {
            const element = document.getElementsByName(firstErrorField)[0];
            if (element) {
              element.focus();
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }

          setError("Veuillez corriger les champs indiqués en rouge");
        } else if (err.response.status === 409) {
          setFormErrors({ email: "Cet email est déjà enregistré" });
          document.getElementsByName("email")[0]?.focus();
        } else if (err.response.status === 422) {
          setFormErrors({ taxNumber: "Format de numéro de taxe invalide" });
          document.getElementsByName("taxNumber")[0]?.focus();
        } else {
          setError(
            err.response.data.message ||
              "L'inscription a échoué. Veuillez réessayer."
          );
        }
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("Serveur non disponible. Veuillez réessayer plus tard.");
      } else {
        console.error("Error setting up request:", err.message);
        setError("Erreur de connexion. Vérifiez votre connexion internet.");
      }
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationEmail = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/request-email-verification",
        {
          email: formData.email,
        }
      );
      console.log(formData.email);
      setEmailSent(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send verification email!"
      );
      console.log(err);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );

      // Store user data and token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Success animation
      toast.success("👋 Bienvenue!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "#4CAF50",
          color: "white",
        },
      });

      // Add a small delay before redirect for better UX
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Échec de la connexion", {
        position: "top-right",
        autoClose: 3000,
      });
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      {auth === "register" ? (
        <div className="agencyAuthWrapper">
          <div className="descriptive_img">
            <img src={sideImg} alt="aaa" />
          </div>
          <form className="form" onSubmit={register}>
            <p className="title">Devenir partner</p>
            <p className="message">
              Signup now and get full access to our app.
            </p>
            <div className="flex">
              <label>
                <input
                  required
                  type="text"
                  className={`input ${formErrors.firstName ? "error" : ""}`}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <span>Nom</span>
                {formErrors.firstName && (
                  <p className="error">{formErrors.firstName}</p>
                )}
              </label>
              <label>
                <input
                  required
                  type="text"
                  className={`input ${formErrors.lastName ? "error" : ""}`}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <span>Prénom</span>
                {formErrors.lastName && (
                  <p className="error">{formErrors.lastName}</p>
                )}
              </label>
            </div>
            <label>
              <input
                required
                type="email"
                className={`input ${formErrors.email ? "error" : ""}`}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <span>Email</span>
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </label>
            <label className="password-input">
              <input
                required
                type={showPassword ? "text" : "password"}
                className={`input ${formErrors.password ? "error" : ""}`}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span>Mot de passe</span>
              <div
                className="icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
              {formErrors.password && (
                <p className="error-message">{formErrors.password}</p>
              )}
            </label>
            <label className="password-input">
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                className={`input ${formErrors.confirmPassword ? "error" : ""}`}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <span>Confirmer votre mot de passe</span>
              <div
                className="icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
              {formErrors.confirmPassword && (
                <p className="error-message">{formErrors.confirmPassword}</p>
              )}
            </label>
            <div className="flex">
              <label>
                <input
                  type="text"
                  className={`input ${formErrors.titreSocial ? "error" : ""}`}
                  name="titreSocial"
                  value={formData.titreSocial}
                  onChange={handleInputChange}
                />
                <span>
                  Titre social{" "}
                  <span style={{ fontStyle: "italic", color: "grey" }}>
                    (optional)
                  </span>
                </span>
              </label>
              <label>
                <input
                  type="text"
                  className={`input ${formErrors.enterprise ? "error" : ""}`}
                  name="enterprise"
                  value={formData.enterprise}
                  onChange={handleInputChange}
                />
                <span>
                  Entreprise{" "}
                  <span style={{ fontStyle: "italic", color: "grey" }}>
                    (optional)
                  </span>
                </span>
              </label>
            </div>

            <label>
              <input
                type="text"
                className={`input ${formErrors.taxNumber ? "error" : ""}`}
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleInputChange}
              />
              <span>Tax Number: 12345678-123-12</span>
              {formErrors.taxNumber && (
                <p className="error">{formErrors.taxNumber}</p>
              )}
            </label>
            <label className="image-upload">
              <input
                type="file"
                className="input"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                style={{ display: "none" }}
              />
              <div className="image-upload-area">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                ) : (
                  <span>Upload Image (optional)</span>
                )}
              </div>
            </label>
            <LoadingButton
              className="submit"
              type="submit"
              loading={loading}
              loadingPosition="start"
              variant="outlined"
            >
              Sign up
            </LoadingButton>
            {/* <button className="submit" type="submit">
              Sign up
            </button> */}
            {error && <p className="error">{error}</p>}
            <p style={{ color: "#333" }}>
              Already have an account?{" "}
              <button
                className="colore link-button"
                onClick={() => {
                  setAuth("login");
                  setError("");
                }}
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      ) : (
        <div className="agencyAuthWrapper">
          <div className="descriptive_img">
            <img src={sideImg} alt="image" />
          </div>
          <form
            className="form"
            onSubmit={login}
            style={{ width: "30rem", gap: 24 }}
          >
            <p className="title">Devenir partner</p>
            <p className="message">Signin now and access to our app.</p>
            <label>
              <input
                required
                type="email"
                className={`input ${formErrors.email ? "error" : ""}`}
                name="email"
                value={loginData.email}
                onChange={(e) => handleInputChange(e, "login")}
              />
              <span>Email</span>
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </label>
            <label className="password-input">
              <input
                required
                type={showLoginPassword ? "text" : "password"}
                className={`input ${formErrors.password ? "error" : ""}`}
                name="password"
                value={loginData.password}
                onChange={(e) => handleInputChange(e, "login")}
              />
              <span>Mot de passe</span>
              <div
                className="icon"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </label>
            <LoadingButton
              className="submit"
              type="submit"
              loading={loading}
              loadingPosition="start"
              variant="outlined"
            >
              Sign in
            </LoadingButton>
            {error && <p className="error">{error}</p>}
            <div className="link_auth_wrapper">
              <p style={{ color: "#333" }}>
                Don't have an account?{" "}
                <button
                  className="link-button"
                  onClick={() => {
                    setAuth("register");
                    setError("");
                  }}
                >
                  Sign up
                </button>
              </p>
              <Link to="/forget-password" className="forget-password-link">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Verify Your Email
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Un e-mail de vérification a été envoyé à{" "}
            <span style={{ fontWeight: "500" }}>{formData.email}</span>.
            Veuillez vérifier votre boîte de réception pour vérifier votre
            compte.
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={sendVerificationEmail}
              style={{ marginTop: 20 }}
            >
              Resend Verification Email
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
              style={{ marginTop: 20 }}
            >
              Close
            </Button>
          </div>
          {emailSent && (
            <Typography sx={{ mt: 2, color: "green" }}>
              Verification email sent successfully!
            </Typography>
          )}
        </div>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "34vh",
  width: "30vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  border: "none",
  outline: "none",
  boxShadow: 24,
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
};

export default AgencyAuth;
